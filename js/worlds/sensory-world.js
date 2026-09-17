/**
 * Baby Keys - Sensory Playground World
 * Free-form sensory playground with 8 giant interactive cause-and-effect objects.
 */

class SensoryWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentIndex = 0;

        this.objects = [
            { id: 'sun', name: 'Sun', colorName: 'Yellow', emoji: '☀️', text: 'Yellow Sun' },
            { id: 'ball', name: 'Ball', colorName: 'Red', emoji: '🔴', text: 'Red Ball' },
            { id: 'star', name: 'Star', colorName: 'Gold', emoji: '⭐', text: 'Star' },
            { id: 'flower', name: 'Flower', colorName: 'Pink', emoji: '🌸', text: 'Pink Flower' },
            { id: 'rainbow', name: 'Rainbow', colorName: 'Rainbow', emoji: '🌈', text: 'Rainbow' },
            { id: 'bubble', name: 'Bubble', colorName: 'Blue', emoji: '🫧', text: 'Bubble' },
            { id: 'music', name: 'Note', colorName: 'Purple', emoji: '🎵', text: 'Music Note' },
            { id: 'water', name: 'Pond', colorName: 'Blue', emoji: '🌊', text: 'Water Ripples' }
        ];
    }

    start() {
        this.active = true;
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
        sensoryEngine.addRipple(event.x, event.y);

        if (event.type === 'SPACE_PRESS') {
            audioEngine.playChime();
        } else {
            audioEngine.playRandomNote();
        }

        // Advance concept (throttled so holding/mashing doesn't flip cards too fast)
        if (!babyCanAdvance(this)) return;
        this.currentIndex = (this.currentIndex + 1) % this.objects.length;
        this.render();
    }

    render() {
        if (!this.containerEl || !this.active) return;
        const obj = this.objects[this.currentIndex];
        diagnostics.setWorld('Sensory', obj.text);

        audioEngine.speak(obj.text);
        sessionEngine.recordExposure('sensory', obj.id);

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card bounce-pop">
                    <div class="world-emoji">${babyEmoji.img(obj.emoji)}</div>
                    <div class="world-name">${obj.text}</div>
                </div>
            </div>
        `;
    }
}
