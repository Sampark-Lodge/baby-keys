/**
 * Baby Keys - Storage & Settings Persistence
 */

class BabyStorageManager {
    constructor() {
        this.settingsKey = 'babykeys_master_settings_v1';
        this.statsKey = 'babykeys_master_stats_v1';
        this.settings = this.loadSettings();
        this.stats = this.loadStats();
        this.sessionStart = null;
    }

    getDefaultSettings() {
        return {
            sound: true,
            voice: true,
            animalSounds: true,
            bgMusic: false,
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

    updateSetting(key, val) {
        this.settings[key] = val;
        this.saveSettings();
    }

    getDefaultStats() {
        return {
            sessions: 0,
            playTimeMs: 0,
            totalInteractions: 0,
            worldCounts: {},
            keysPressed: {}
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

    recordInteraction(worldId, key = null) {
        this.stats.totalInteractions++;
        this.stats.worldCounts[worldId] = (this.stats.worldCounts[worldId] || 0) + 1;
        if (key) {
            const k = key.length === 1 ? key.toUpperCase() : key;
            this.stats.keysPressed[k] = (this.stats.keysPressed[k] || 0) + 1;
        }
        this.saveStats();
    }

    getFormattedPlayTime() {
        this.endSession();
        const sec = Math.floor(this.stats.playTimeMs / 1000);
        const min = Math.floor(sec / 60);
        const hrs = Math.floor(min / 60);
        if (hrs > 0) return `${hrs}h ${min % 60}m`;
        return `${min}m ${sec % 60}s`;
    }

    resetStats() {
        this.stats = this.getDefaultStats();
        this.sessionStart = Date.now();
        this.saveStats();
    }
}

const storageManager = new BabyStorageManager();
