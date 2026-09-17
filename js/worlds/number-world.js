/**
 * Baby Keys - Number World
 * Teaches quantities 1, 2, 3... with spoken counting and interactive bouncy floating count objects.
 */

class NumberWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentIndex = 0;
        this.data = [];
    }

    start() {
        this.active = true;
        this.data = typeof conceptRegistry !== 'undefined' ? conceptRegistry.getByCategory('number') : (BABY_LEARNING_DATA.numbers || []);
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
        sensoryEngine.addSparkles(event.x, event.y, '#88ffff', 10);
        audioEngine.playRandomNote();

        if (!babyCanAdvance(this)) return;
        this.currentIndex = (this.currentIndex + 1) % (this.data.length || 1);
        this.render();
    }

    render() {
        if (!this.containerEl || !this.active || !this.data.length) return;
        const concept = this.data[this.currentIndex];
        if (!concept) return;

        const name = concept.label || concept.name || 'Number';
        const numSymbol = concept.symbol || concept.id || '1';
        const countEmoji = concept.countEmoji || concept.emoji || numSymbol;
        const text = concept.text || `${name} ${countEmoji}`;

        diagnostics.setWorld('Numbers', name);
        audioEngine.speak(text);
        sessionEngine.recordExposure('numbers', concept.id || name);

        const linked = typeof conceptRegistry !== 'undefined' && concept.id ? conceptRegistry.getLinkedConcepts(concept.id) : [];
        const linkedBadge = linked.length ? babyEmoji.richText(`${linked[0].symbol || linked[0].emoji} ${linked[0].label || linked[0].name}`) : '';

        // Generate interactive bouncy item grid
        const emojiChar = countEmoji.slice(0, 2) || '🍎';
        const count = parseInt(numSymbol, 10) || 1;
        const displayCount = Math.min(count, 15);
        let itemsHtml = '';
        for (let i = 0; i < displayCount; i++) {
            itemsHtml += `<span class="bouncy-count-item" style="display:inline-block; font-size:2.8rem; margin:4px; cursor:pointer; transition:transform 0.2s;" onclick="event.stopPropagation(); audioEngine.playPop(); sensoryEngine.addSparkles(event.clientX, event.clientY, '#ffca3a', 8); this.style.transform='scale(1.5) rotate(10deg)'; setTimeout(() => this.style.transform='scale(1)', 200);">${babyEmoji.img(emojiChar)}</span>`;
        }

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card bounce-pop">
                    <div class="world-symbol">${numSymbol}</div>
                    <div class="bouncy-count-grid" style="display:flex; flex-wrap:wrap; justify-content:center; max-width:80%; margin:10px 0;">
                        ${itemsHtml}
                    </div>
                    <div class="world-name">${text}</div>
                    ${linkedBadge ? `<div style="font-size: 1.2rem; opacity: 0.75; margin-top: 6px;">${linkedBadge}</div>` : ''}
                </div>
            </div>
        `;
    }
}
