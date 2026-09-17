/**
 * Baby Keys - Shape World
 * Teaches Circle, Square, Triangle, Star with conceptRegistry cross-linking.
 */

class ShapeWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentIndex = 0;
        this.data = [];
    }

    start() {
        this.active = true;
        this.data = typeof conceptRegistry !== 'undefined' ? conceptRegistry.getByCategory('shape') : (BABY_LEARNING_DATA.shapes || []);
        this.currentIndex = 0;
        this.render();
    }

    stop() {
        this.active = false;
        if (this.containerEl) this.containerEl.innerHTML = '';
    }

    handleInput(event) {
        if (!this.active) return;
        diagnostics.logInput(event);
        sensoryEngine.addSparkles(event.x, event.y, '#aa66ff', 8);
        audioEngine.playRandomNote();

        if (!babyCanAdvance(this)) return;
        this.currentIndex = (this.currentIndex + 1) % (this.data.length || 1);
        this.render();
    }

    render() {
        if (!this.containerEl || !this.active || !this.data.length) return;
        const concept = this.data[this.currentIndex];
        if (!concept) return;

        const name = concept.label || concept.name || 'Shape';
        const symbol = concept.symbol || concept.emoji || '🔺';

        diagnostics.setWorld('Shapes', name);
        audioEngine.speak(name);
        sessionEngine.recordExposure('shapes', concept.id || name);

        const linked = typeof conceptRegistry !== 'undefined' && concept.id ? conceptRegistry.getLinkedConcepts(concept.id) : [];
        const linkedBadge = linked.length ? babyEmoji.richText(`${linked[0].symbol || linked[0].emoji} ${linked[0].label || linked[0].name}`) : '';

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card bounce-pop">
                    <div class="world-emoji">${babyEmoji.img(symbol)}</div>
                    <div class="world-name">${name}</div>
                    ${linkedBadge ? `<div style="font-size: 1.2rem; opacity: 0.75; margin-top: 8px;">${linkedBadge}</div>` : ''}
                </div>
            </div>
        `;
    }
}
