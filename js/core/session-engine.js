/**
 * Baby Keys - Session Engine
 * Tracks session duration and concept exposure metrics 100% locally.
 */

class BabySessionEngine {
    constructor() {
        this.sessionStart = null;
        this.conceptsEncountered = new Set();
        this.worldExposure = {};
    }

    startSession() {
        this.sessionStart = Date.now();
        this.conceptsEncountered.clear();
        this.worldExposure = {};
        storageManager.startSession();
    }

    recordExposure(worldId, conceptId = null) {
        if (!worldId) return;
        this.worldExposure[worldId] = (this.worldExposure[worldId] || 0) + 1;
        if (conceptId) {
            this.conceptsEncountered.add(conceptId);
        }
    }

    getSummary() {
        return {
            durationFormatted: storageManager.getFormattedPlayTime(),
            conceptsCount: this.conceptsEncountered.size,
            worldExposure: this.worldExposure
        };
    }
}

const sessionEngine = new BabySessionEngine();
