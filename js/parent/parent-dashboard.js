/**
 * Baby Keys - Parent Dashboard UI Controller
 */

class BabyParentDashboard {
    constructor() {
        this.dashboardModal = document.getElementById('parent-dashboard');
        this.init();
    }

    init() {
        // Controls
        const calmToggle = document.getElementById('setting-calm-mode');
        const soundToggle = document.getElementById('setting-sound');
        const voiceToggle = document.getElementById('setting-voice');
        const bgMusicToggle = document.getElementById('setting-bgmusic');
        const stageSelect = document.getElementById('setting-stage');

        if (calmToggle) {
            calmToggle.addEventListener('change', (e) => {
                storageManager.updateSetting('calmMode', e.target.checked);
                feedbackGovernor.setCalmMode(e.target.checked);
                audioEngine.calmMode = e.target.checked;
                document.body.classList.toggle('calm-mode', e.target.checked);
            });
        }

        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                storageManager.updateSetting('sound', e.target.checked);
                audioEngine.enabled = e.target.checked;
            });
        }

        if (voiceToggle) {
            voiceToggle.addEventListener('change', (e) => {
                storageManager.updateSetting('voice', e.target.checked);
                audioEngine.voiceEnabled = e.target.checked;
            });
        }

        if (bgMusicToggle) {
            bgMusicToggle.addEventListener('change', (e) => {
                storageManager.updateSetting('bgMusic', e.target.checked);
                if (e.target.checked) {
                    mediaAssets.startMusic();
                } else {
                    mediaAssets.stopMusic();
                }
            });
        }

        if (stageSelect) {
            stageSelect.addEventListener('change', (e) => {
                const s = parseInt(e.target.value, 10);
                storageManager.updateSetting('playStage', s);
                interactionEngine.setStage(s);
            });
        }
    }

    open() {
        this.renderStats();
        if (this.dashboardModal) this.dashboardModal.classList.remove('hidden');
    }

    close() {
        if (this.dashboardModal) this.dashboardModal.classList.add('hidden');
    }

    renderStats() {
        const timeEl = document.getElementById('stat-playtime');
        const sessionsEl = document.getElementById('stat-sessions');
        const interactionsEl = document.getElementById('stat-interactions');

        if (timeEl) timeEl.textContent = storageManager.getFormattedPlayTime();
        if (sessionsEl) sessionsEl.textContent = storageManager.stats.sessions;
        if (interactionsEl) interactionsEl.textContent = storageManager.stats.totalInteractions;
    }
}

const parentDashboard = new BabyParentDashboard();
