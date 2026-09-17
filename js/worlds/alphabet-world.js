/**
 * Baby Keys - Alphabet World
 * Teaches letters, phonics exposure, and linked object concepts.
 */

class AlphabetWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentIndex = 0;
        this.data = [];
    }

    start() {
        this.active = true;
        this.data = typeof conceptRegistry !== 'undefined' ? conceptRegistry.getByCategory('alphabet') : (BABY_LEARNING_DATA.alphabet || []);
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

        const letterSymbol = concept.symbol || concept.label || 'A';
        const text = concept.text || `${letterSymbol} for ${concept.name || concept.label || 'Apple'}`;
        const phoneme = concept.phoneme || '';

        diagnostics.setWorld('Alphabet', letterSymbol);
        audioEngine.speak(text);
        sessionEngine.recordExposure('alphabet', concept.id || letterSymbol);

        const linked = typeof conceptRegistry !== 'undefined' && concept.id ? conceptRegistry.getLinkedConcepts(concept.id) : [];
        const linkedEmoji = linked.length ? (linked[0].symbol || linked[0].emoji) : (concept.emoji || '🍎');

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card bounce-pop">
                    <div class="world-symbol">${letterSymbol}</div>
                    <div class="world-emoji">${babyEmoji.img(linkedEmoji)}</div>
                    <div class="world-name">${text}</div>
                    ${phoneme ? `<div style="font-size: 1.2rem; opacity: 0.85; margin-top: 6px;">${phoneme}</div>` : ''}
                </div>
            </div>
        `;
    }
}
