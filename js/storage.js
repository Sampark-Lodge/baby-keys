/**
 * Baby Keys Storage & Settings Manager
 * Handles local storage persistence for parent controls, play statistics, Calm Mode, and density settings.
 */

class BabyStorage {
    constructor() {
        this.settingsKey = 'babykeys_settings_v3';
        this.statsKey = 'babykeys_stats_v3';
        
        this.settings = this.loadSettings();
        this.stats = this.loadStats();
        this.sessionStart = null;
    }

    getDefaultSettings() {
        return {
            sound: true,
            music: true,
            voice: true,
            animalSounds: true,
            highContrast: false,
            calmMode: false,
            playStage: 1, // 1: Hulk, 2: Press, 3: Move, 4: Mouse
            density: 'normal',
            fullscreen: true
        };
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem(this.settingsKey);
            return saved ? { ...this.getDefaultSettings(), ...JSON.parse(saved) } : this.getDefaultSettings();
        } catch (e) {
            return this.getDefaultSettings();
        }
    }

    saveSettings() {
        try {
            localStorage.setItem(this.settingsKey, JSON.stringify(this.settings));
        } catch (e) {}
    }

    updateSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
    }

    getDefaultStats() {
        return {
            totalBubbles: 0,
            poppedBubbles: 0,
            sessions: 0,
            playTimeMs: 0,
            keysPressed: 0,
            activityCounts: {},
            keys: {}
        };
    }

    loadStats() {
        try {
            const saved = localStorage.getItem(this.statsKey);
            return saved ? { ...this.getDefaultStats(), ...JSON.parse(saved) } : this.getDefaultStats();
        } catch (e) {
            return this.getDefaultStats();
        }
    }

    saveStats() {
        try {
            localStorage.setItem(this.statsKey, JSON.stringify(this.stats));
        } catch (e) {}
    }

    startSession() {
        this.stats.sessions++;
        this.sessionStart = Date.now();
        this.saveStats();
    }

    endSession() {
        if (this.sessionStart) {
            this.stats.playTimeMs += (Date.now() - this.sessionStart);
            this.sessionStart = Date.now();
            this.saveStats();
        }
    }

    recordKey(key) {
        this.stats.keysPressed++;
        const k = key.length === 1 ? key.toUpperCase() : key;
        this.stats.keys[k] = (this.stats.keys[k] || 0) + 1;
        this.saveStats();
    }

    recordBubbleCreated() {
        this.stats.totalBubbles++;
        this.saveStats();
    }

    recordBubblePopped() {
        this.stats.poppedBubbles++;
        this.saveStats();
    }

    recordActivityPlayed(activityId) {
        this.stats.activityCounts[activityId] = (this.stats.activityCounts[activityId] || 0) + 1;
        this.saveStats();
    }

    getFormattedPlayTime() {
        this.endSession();
        const totalMs = this.stats.playTimeMs;
        const totalSeconds = Math.floor(totalMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const remMinutes = minutes % 60;
        
        if (hours > 0) {
            return `${hours}h ${remMinutes}m`;
        }
        return `${minutes}m ${totalSeconds % 60}s`;
    }

    getTopKeys(limit = 8) {
        return Object.entries(this.stats.keys)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
    }

    resetStats() {
        this.stats = this.getDefaultStats();
        this.sessionStart = Date.now();
        this.saveStats();
    }
}

const storageSystem = new BabyStorage();
