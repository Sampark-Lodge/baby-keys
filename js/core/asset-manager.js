/**
 * Baby Keys - Asset Manager
 * Manages local bundled audio and image assets, caching, fallback resolution,
 * missing asset detection, and preloading per activity.
 */

class BabyAssetManager {
    constructor() {
        this.audioCache = new Map();
        this.failedAssets = new Set();
        this.preloadedCategories = new Set();
    }

    /**
     * Resolves an audio file path or returns fallback
     */
    getAudioPath(category, name) {
        return `assets/audio/${category}/${name}.mp3`;
    }

    /**
     * Attempts to play a local audio asset.
     * If missing or failed, uses Speech API or Web Audio tone synthesis fallback.
     */
    playEducationalAudio(category, name, fallbackText) {
        const path = this.getAudioPath(category, name);

        if (this.failedAssets.has(path)) {
            this.triggerAudioFallback(fallbackText || name);
            return;
        }

        if (this.audioCache.has(path)) {
            const cachedAudio = this.audioCache.get(path);
            const clone = cachedAudio.cloneNode();
            clone.play().catch(() => {
                this.failedAssets.add(path);
                this.triggerAudioFallback(fallbackText || name);
            });
            return;
        }

        // Try loading audio element dynamically
        const audio = new Audio();
        audio.src = path;

        audio.oncanplaythrough = () => {
            this.audioCache.set(path, audio);
            audio.play().catch(() => {
                this.failedAssets.add(path);
                this.triggerAudioFallback(fallbackText || name);
            });
        };

        audio.onerror = () => {
            this.failedAssets.add(path);
            this.triggerAudioFallback(fallbackText || name);
        };

        audio.load();
    }

    /**
     * Speech API or Web Audio fallback when audio file is missing
     */
    triggerAudioFallback(text) {
        if (text && typeof audioEngine !== 'undefined') {
            audioEngine.speak(text);
        } else if (typeof audioEngine !== 'undefined') {
            audioEngine.playRandomNote();
        }
    }

    /**
     * Preloads assets for a world/category
     */
    preloadCategory(category, items = []) {
        if (this.preloadedCategories.has(category)) return;
        this.preloadedCategories.add(category);

        items.forEach(item => {
            const path = this.getAudioPath(category, item);
            if (!this.audioCache.has(path) && !this.failedAssets.has(path)) {
                const imgOrAudio = new Audio();
                imgOrAudio.src = path;
                imgOrAudio.oncanplaythrough = () => this.audioCache.set(path, imgOrAudio);
                imgOrAudio.onerror = () => this.failedAssets.add(path);
                imgOrAudio.load();
            }
        });
    }
}

const assetManager = new BabyAssetManager();
