/**
 * Baby Keys - Colour World
 * Teaches Red, Blue, Yellow, Green with giant solid high-contrast cards,
 * full-screen background HSL morphing, and linked concepts.
 */

class ColourWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentIndex = 0;
        this.data = [];
    }

    start() {
        this.active = true;
        this.data = typeof conceptRegistry !== 'undefined' ? conceptRegistry.getByCategory('colour') : (BABY_LEARNING_DATA.colours || []);
        this.currentIndex = 0;
        this.render();
    }

    stop() {
        this.active = false;
        const playroom = document.getElementById('active-playroom');
        if (playroom) playroom.style.background = '';
        if (this.containerEl) this.containerEl.innerHTML = '';
    }

    handleInput(event) {
        if (!this.active) return;
        diagnostics.logInput(event);
        sensoryEngine.addSparkles(event.x, event.y, '#ffffff', 12);
        audioEngine.playRandomNote();

        if (!babyCanAdvance(this)) return;
        this.currentIndex = (this.currentIndex + 1) % (this.data.length || 1);
        this.render();
    }

    render() {
        if (!this.containerEl || !this.active || !this.data.length) return;
        const concept = this.data[this.currentIndex];
        if (!concept) return;

        const name = concept.label || concept.name || 'Colour';
        const symbol = concept.symbol || concept.emoji || '🔴';
        const colorHex = concept.colorHex || concept.hex || '#FF3B30';

        const playroom = document.getElementById('active-playroom');
        if (playroom) {
            playroom.style.transition = 'background 0.6s ease';
            playroom.style.background = `radial-gradient(ellipse at 50% 35%, ${colorHex}66 0%, #120a22 70%, #0b0616 100%)`;
        }

        diagnostics.setWorld('Colours', name);
        audioEngine.speak(name);
        sessionEngine.recordExposure('colours', concept.id || name);

        const linked = typeof conceptRegistry !== 'undefined' && concept.id ? conceptRegistry.getLinkedConcepts(concept.id) : [];
        const linkedSample = linked.length ? babyEmoji.richText(`${linked[0].symbol || linked[0].emoji} ${linked[0].label || linked[0].name}`) : (concept.sample || '');

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card bounce-pop" style="background:${colorHex}44; border-color:${colorHex}; box-shadow: 0 20px 60px ${colorHex}55, inset 0 2px 0 rgba(255,255,255,0.4);">
                    <div class="world-emoji">${babyEmoji.img(symbol)}</div>
                    <div class="world-name">${name}</div>
                    ${linkedSample ? `<div style="font-size: 1.5rem; margin-top: 10px; opacity: 0.9;">${linkedSample}</div>` : ''}
                </div>
            </div>
        `;
    }
}
