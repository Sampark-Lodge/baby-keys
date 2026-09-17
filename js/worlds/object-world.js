/**
 * Baby Keys - Object Discovery World
 * Teaches Ball, Cup, Car, Book, Apple with conceptRegistry cross-linking.
 */

class ObjectWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentIndex = 0;
        this.data = [];
    }

    start() {
        this.active = true;
        this.data = typeof conceptRegistry !== 'undefined' ? conceptRegistry.getByCategory('object') : (BABY_LEARNING_DATA.objects || []);
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
        sensoryEngine.addSparkles(event.x, event.y, '#00e5ff', 8);
        audioEngine.playRandomNote();

        if (!babyCanAdvance(this)) return;
        this.currentIndex = (this.currentIndex + 1) % (this.data.length || 1);
        this.render();
    }

    render() {
        if (!this.containerEl || !this.active || !this.data.length) return;
        const concept = this.data[this.currentIndex];
        if (!concept) return;

        const name = concept.label || concept.name || 'Object';
        const symbol = concept.symbol || concept.emoji || '📦';

        diagnostics.setWorld('Objects', name);
        audioEngine.speak(name);
        sessionEngine.recordExposure('objects', concept.id || name);

        const linked = typeof conceptRegistry !== 'undefined' && concept.id ? conceptRegistry.getLinkedConcepts(concept.id) : [];
        const linkedBadge = linked.length ? babyEmoji.richText(`${linked[0].symbol || linked[0].emoji} ${linked[0].label || linked[0].name}`) : '';

        // Prefer a real bundled photo; fall back to the illustrated icon.
        const photoUrl = typeof mediaAssets !== 'undefined' ? mediaAssets.photoUrl(concept.id) : null;
        const visual = photoUrl
            ? `<img class="world-photo" src="${photoUrl}" alt="${name}" draggable="false" onerror="this.replaceWith(babyEmoji.fallbackImg ? babyEmoji.fallbackImg('${symbol}') : document.createTextNode('${symbol}'))">`
            : `<div class="world-emoji">${babyEmoji.img(symbol)}</div>`;

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card bounce-pop">
                    ${visual}
                    <div class="world-name">${name}</div>
                    ${linkedBadge ? `<div style="font-size: 1.2rem; opacity: 0.75; margin-top: 8px;">${linkedBadge}</div>` : ''}
                </div>
            </div>
        `;
    }
}
