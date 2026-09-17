/**
 * Baby Keys - Safety & Error Boundary Engine
 * Prevents application state corruption, recovers from uncaught exceptions gracefully,
 * and maintains continuous play during unpredictable child input.
 */

class BabySafetyEngine {
    constructor() {
        this.init();
    }

    init() {
        // Global Error Boundary
        window.addEventListener('error', (event) => {
            console.warn('Recovered from exception during child play:', event.error);
            event.preventDefault();
            this.recoverState();
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.warn('Recovered from unhandled promise rejection:', event.reason);
            event.preventDefault();
            this.recoverState();
        });
    }

    recoverState() {
        // Reset feedback governor counters if broken
        feedbackGovernor.activeVoices = 0;
        feedbackGovernor.activeParticles = 0;
    }
}

const safetyEngine = new BabySafetyEngine();
