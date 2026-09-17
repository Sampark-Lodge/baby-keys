/**
 * Baby Keys - Feedback Governor
 * Bounds sensory output intensity and audio voice concurrency to prevent overload during rapid Hulk smashing.
 */

class BabyFeedbackGovernor {
    constructor() {
        this.maxParticles = 40;
        this.maxAudioVoices = 4;
        this.activeVoices = 0;
        this.activeParticles = 0;
        this.intensityLevel = 'NORMAL'; // LOW, NORMAL, HIGH, BOUNDED
        this.lastEventTime = 0;
        this.cooldownMs = 45;
    }

    shouldAllowAudio() {
        const now = Date.now();
        if (now - this.lastEventTime < this.cooldownMs) return false;
        if (this.activeVoices >= this.maxAudioVoices) return false;
        this.lastEventTime = now;
        return true;
    }

    onAudioVoiceStarted() {
        this.activeVoices++;
    }

    onAudioVoiceEnded() {
        this.activeVoices = Math.max(0, this.activeVoices - 1);
    }

    calculateParticleCount(requestedCount = 6) {
        if (this.activeParticles >= this.maxParticles) return 0;
        return Math.min(requestedCount, this.maxParticles - this.activeParticles);
    }

    onParticlesCreated(count) {
        this.activeParticles += count;
    }

    onParticlesDestroyed(count) {
        this.activeParticles = Math.max(0, this.activeParticles - count);
    }

    setCalmMode(isCalm) {
        if (isCalm) {
            this.maxParticles = 20;
            this.maxAudioVoices = 2;
            this.cooldownMs = 80;
        } else {
            this.maxParticles = 40;
            this.maxAudioVoices = 4;
            this.cooldownMs = 45;
        }
    }
}

const feedbackGovernor = new BabyFeedbackGovernor();
