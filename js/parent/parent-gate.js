/**
 * Baby Keys - Parent Gate Barrier
 * 1.5s hold on lock icon followed by 3s hold on Adult Confirmation Ring.
 */

class BabyParentGate {
    constructor(onUnlockedCallback) {
        this.onUnlocked = onUnlockedCallback;
        this.lockHoldTimer = null;
        this.ringHoldTimer = null;

        this.lockEl = document.getElementById('lock-indicator');
        this.adultModalEl = document.getElementById('adult-confirm-modal');
        this.ringBtn = document.getElementById('adult-ring-btn');
        this.ringText = document.getElementById('adult-ring-text');
        this.cancelBtn = document.getElementById('adult-cancel-btn');

        this.init();
    }

    init() {
        if (this.lockEl) {
            const startHold = (e) => {
                e.preventDefault();
                this.lockHoldTimer = setTimeout(() => this.showModal(), 1500);
            };
            const endHold = () => clearTimeout(this.lockHoldTimer);

            this.lockEl.addEventListener('mousedown', startHold);
            this.lockEl.addEventListener('mouseup', endHold);
            this.lockEl.addEventListener('mouseleave', endHold);
            this.lockEl.addEventListener('touchstart', startHold, { passive: false });
            this.lockEl.addEventListener('touchend', endHold);
        }

        if (this.ringBtn) {
            const startRingHold = (e) => {
                e.preventDefault();
                if (this.ringText) this.ringText.textContent = 'HOLD...';
                this.ringHoldTimer = setTimeout(() => {
                    this.hideModal();
                    if (this.onUnlocked) this.onUnlocked();
                }, 3000);
            };

            const endRingHold = () => {
                clearTimeout(this.ringHoldTimer);
                if (this.ringText) this.ringText.textContent = 'HOLD';
            };

            this.ringBtn.addEventListener('mousedown', startRingHold);
            this.ringBtn.addEventListener('mouseup', endRingHold);
            this.ringBtn.addEventListener('mouseleave', endRingHold);
            this.ringBtn.addEventListener('touchstart', startRingHold, { passive: false });
            this.ringBtn.addEventListener('touchend', endRingHold);
        }

        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.hideModal());
        }
    }

    showModal() {
        if (this.adultModalEl) this.adultModalEl.classList.remove('hidden');
    }

    hideModal() {
        if (this.adultModalEl) this.adultModalEl.classList.add('hidden');
    }
}
