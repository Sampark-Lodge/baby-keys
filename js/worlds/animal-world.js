/**
 * Baby Keys - Animal World
 * Teaches Dog, Cat, Cow, Elephant, Frog with visual identity, sound, and linked concepts.
 */

class AnimalWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentIndex = 0;
        this.data = [];
    }

    start() {
        this.active = true;
        this.data = typeof conceptRegistry !== 'undefined' ? conceptRegistry.getByCategory('animal') : (BABY_LEARNING_DATA.animals || []);
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
        sensoryEngine.addSparkles(event.x, event.y, '#ffca3a', 8);
        audioEngine.playRandomNote();

        if (!babyCanAdvance(this)) return;
        this.currentIndex = (this.currentIndex + 1) % (this.data.length || 1);
        this.render();
    }

    render() {
        if (!this.containerEl || !this.active || !this.data.length) return;
        const concept = this.data[this.currentIndex];
        if (!concept) return;

        const name = concept.label || concept.name || 'Animal';
        const symbol = concept.symbol || concept.emoji || '🐶';
        const soundText = concept.soundText || '';

        diagnostics.setWorld('Animals', name);
        // Speak the name, then layer a real bundled animal sound (falling back to procedural synth).
        audioEngine.speak(name);
        const soundOn = typeof storageManager === 'undefined' || storageManager.settings.animalSounds !== false;
        if (soundOn) {
            const playedReal = typeof mediaAssets !== 'undefined' && mediaAssets.playSound(concept.id);
            if (!playedReal && audioEngine.playProceduralAnimalSound) {
                audioEngine.playProceduralAnimalSound(concept.id || '');
            }
        }
        sessionEngine.recordExposure('animals', concept.id || name);

        const linked = typeof conceptRegistry !== 'undefined' && concept.id ? conceptRegistry.getLinkedConcepts(concept.id) : [];
        const linkedBadge = linked.length ? babyEmoji.richText(`${linked[0].symbol || linked[0].emoji} ${linked[0].label || linked[0].name}`) : '';

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card bounce-pop">
                    <div class="world-emoji">${babyEmoji.img(symbol)}</div>
                    <div class="world-name">${name}</div>
                    ${soundText ? `<div style="font-size: 1.5rem; opacity: 0.85; margin-top: 8px;">${soundText}</div>` : ''}
                    ${linkedBadge ? `<div style="font-size: 1.2rem; opacity: 0.75; margin-top: 6px;">${linkedBadge}</div>` : ''}
                </div>
            </div>
        `;
    }
}
