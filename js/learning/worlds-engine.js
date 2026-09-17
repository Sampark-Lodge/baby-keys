/**
 * Baby Keys - Learning Worlds Engine
 * Manages active learning world views (Sensory, Alphabet, Numbers, Colours, Shapes, Animals, Objects, Music)
 * responding to percussion key smashing, spacebar bursts, taps, and mouse clicks.
 */

class BabyWorldsEngine {
    constructor() {
        this.activeWorldId = null;
        this.containerEl = null;
        this.currentIndex = 0;
    }

    init(containerEl) {
        this.containerEl = containerEl;
    }

    startWorld(worldId) {
        this.activeWorldId = worldId;
        this.currentIndex = 0;
        this.render();
    }

    stopWorld() {
        this.activeWorldId = null;
        if (this.containerEl) this.containerEl.innerHTML = '';
    }

    handleInput(inputEvent) {
        if (!this.activeWorldId) return;

        // Log interaction for parent analytics
        storageManager.recordInteraction(this.activeWorldId, inputEvent.key);

        // Visual Sparkles & Ripple Effect
        sensoryEngine.addSparkles(inputEvent.x, inputEvent.y, '#ffffff', 6);
        sensoryEngine.addRipple(inputEvent.x, inputEvent.y);

        // Audio Feedback
        audioEngine.playRandomNote();

        // Advance concept or bounce current item on Hulk smashing
        const dataset = BABY_WORLDS_DATA[this.activeWorldId];
        if (dataset && dataset.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % dataset.length;
            this.render();
        } else {
            // Sensory or Music World action
            this.triggerSensoryEffect(inputEvent);
        }
    }

    triggerSensoryEffect(inputEvent) {
        if (this.activeWorldId === 'music') {
            audioEngine.playPianoKey(Math.floor(Math.random() * 8));
        } else {
            audioEngine.playChime();
        }
    }

    render() {
        if (!this.containerEl || !this.activeWorldId) return;

        const dataset = BABY_WORLDS_DATA[this.activeWorldId];
        if (!dataset) {
            // Free-form Sensory or Music World
            this.renderFreeForm();
            return;
        }

        const item = dataset[this.currentIndex];
        if (!item) return;

        // Speak the educational concept
        const speakText = item.name || item.sound || item.symbol;
        if (speakText) {
            audioEngine.speak(speakText);
        }

        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card">
                    ${item.symbol ? `<div class="world-symbol">${item.symbol}</div>` : ''}
                    <div class="world-emoji">${item.emoji || item.sample || '🌟'}</div>
                    <div class="world-name">${item.name || item.sound || ''}</div>
                </div>
            </div>
        `;

        const cardEl = this.containerEl.querySelector('.world-giant-card');
        if (cardEl) {
            cardEl.classList.add('bounce-pop');
            setTimeout(() => cardEl.classList.remove('bounce-pop'), 400);
        }
    }

    renderFreeForm() {
        const title = this.activeWorldId === 'music' ? '🎵 Music & Rhythm' : '🌈 Sensory Playground';
        this.containerEl.innerHTML = `
            <div class="world-card-container">
                <div class="world-giant-card">
                    <div class="world-emoji">${this.activeWorldId === 'music' ? '🎹' : '✨'}</div>
                    <div class="world-name">${title}</div>
                    <p style="font-size: 1rem; opacity: 0.7; margin-top: 10px;">Smash any key or tap anywhere!</p>
                </div>
            </div>
        `;
    }
}

const worldsEngine = new BabyWorldsEngine();
