/**
 * Smart Magic Play Engine
 * Rotates activities every 2.5 minutes by default.
 * Does NOT interrupt active play: waits until the child is idle before transitioning!
 */

class MagicPlayEngine {
    constructor(appInstance) {
        this.app = appInstance;
        this.active = false;
        this.intervalId = null;
        this.timerId = null;
        this.currentActivityIndex = 0;
        this.rotationDurationSeconds = 150; // 2.5 minutes default per activity

        this.playlist = [
            'bubble-world',
            'discovery',
            'animals',
            'piano',
            'balloons',
            'fireworks',
            'abc',
            'high-contrast'
        ];
    }

    start(durationMinutes = 0) {
        this.active = true;
        this.currentActivityIndex = 0;
        
        this.playNextActivity();

        this.intervalId = setInterval(() => {
            if (!this.active) return;
            this.tryNextActivity();
        }, 15000); // Check every 15s if rotation time has elapsed and child is idle

        this.lastRotationTime = Date.now();

        if (durationMinutes > 0) {
            this.timerId = setTimeout(() => {
                this.stop();
            }, durationMinutes * 60 * 1000);
        }
    }

    tryNextActivity() {
        if (!this.active) return;
        const elapsed = (Date.now() - this.lastRotationTime) / 1000;
        if (elapsed < this.rotationDurationSeconds) return;

        // Check if child is actively playing right now
        if (this.app.currentActivity && this.app.currentActivity.isUserActivelyPlaying && this.app.currentActivity.isUserActivelyPlaying(5000)) {
            // Child is active! Don't take the game away. Try again on next tick.
            return;
        }

        this.playNextActivity();
    }

    playNextActivity() {
        if (!this.active) return;
        this.lastRotationTime = Date.now();

        const actId = this.playlist[this.currentActivityIndex];
        this.currentActivityIndex = (this.currentActivityIndex + 1) % this.playlist.length;

        const overlay = document.getElementById('magic-play-overlay');
        if (overlay) {
            overlay.classList.add('active');
            setTimeout(() => {
                this.app.launchActivity(actId, true);
                setTimeout(() => {
                    overlay.classList.remove('active');
                }, 500);
            }, 600);
        } else {
            this.app.launchActivity(actId, true);
        }
    }

    stop() {
        this.active = false;
        if (this.intervalId) clearInterval(this.intervalId);
        if (this.timerId) clearTimeout(this.timerId);
        const overlay = document.getElementById('magic-play-overlay');
        if (overlay) overlay.classList.remove('active');
        this.app.exitToHome();
    }
}
