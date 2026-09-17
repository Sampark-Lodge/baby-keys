/**
 * BaseActivity - Common Activity API Interface
 * Standardized lifecycle interface for all Baby Keys games and activities.
 */

class BaseActivity {
    constructor() {
        this.active = false;
        this.lastInteractionTime = Date.now();
    }

    init() {}

    start() {
        this.active = true;
        this.lastInteractionTime = Date.now();
    }

    pause() {
        this.active = false;
    }

    resume() {
        this.active = true;
        this.lastInteractionTime = Date.now();
    }

    stop() {
        this.active = false;
    }

    destroy() {
        this.stop();
    }

    handleTouch(x, y) {
        this.lastInteractionTime = Date.now();
    }

    handleSettingsChange(settings) {}
    
    isUserActivelyPlaying(thresholdMs = 5000) {
        return (Date.now() - this.lastInteractionTime) < thresholdMs;
    }
}
