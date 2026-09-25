/**
 * Baby Keys - Parent Gate Barrier
 * Two-step child lock: hold the lock icon, then hold the Adult Confirmation ring.
 * Uses unified Pointer Events (works for mouse, touch, and pen) with a visible
 * hold-progress indicator so a parent can tell it is registering.
 */

class BabyParentGate {
    constructor(onUnlockedCallback) {
        this.onUnlocked = onUnlockedCallback;

        this.lockEl = document.getElementById('lock-indicator');
        this.adultModalEl = document.getElementById('adult-confirm-modal');
        this.ringBtn = document.getElementById('adult-ring-btn');
        this.ringText = document.getElementById('adult-ring-text');
        this.cancelBtn = document.getElementById('adult-cancel-btn');

        this.LOCK_HOLD_MS = 1000;
        this.RING_HOLD_MS = 2500;

        this.init();
    }

    init() {
        if (this.lockEl) {
            this._bindHold(this.lockEl, this.LOCK_HOLD_MS, () => this.showModal());
        }
        if (this.ringBtn) {
            this._bindHold(this.ringBtn, this.RING_HOLD_MS, () => {
                this.hideModal();
                if (this.onUnlocked) this.onUnlocked();
            }, this.ringText);
        }
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.hideModal());
        }
    }

    /**
     * Bind a press-and-hold gesture with animated progress on `el`.
     * Fires `onComplete` only if the pointer is held for `duration` ms.
     */
    _bindHold(el, duration, onComplete, textEl) {
        let timer = null;
        let raf = null;
        let startTime = 0;

        const tick = () => {
            const p = Math.min(1, (performance.now() - startTime) / duration);
            el.style.setProperty('--hold', (p * 100) + '%');
            if (p < 1) raf = requestAnimationFrame(tick);
        };

        const cleanup = () => {
            if (timer) { clearTimeout(timer); timer = null; }
            if (raf) { cancelAnimationFrame(raf); raf = null; }
            el.classList.remove('holding');
            el.style.setProperty('--hold', '0%');
            if (textEl) textEl.textContent = 'HOLD';
        };

        const start = (e) => {
            e.preventDefault();
            e.stopPropagation();           // don't let the world/input-layer react
            if (timer) return;
            if (textEl) textEl.textContent = 'HOLD…';
            el.classList.add('holding');
            startTime = performance.now();
            raf = requestAnimationFrame(tick);
            timer = setTimeout(() => {
                cleanup();
                onComplete();
            }, duration);
            if (el.setPointerCapture && e.pointerId !== undefined) {
                try { el.setPointerCapture(e.pointerId); } catch (_) {}
            }
        };

        el.addEventListener('pointerdown', start);
        el.addEventListener('pointerup', cleanup);
        el.addEventListener('pointercancel', cleanup);
        el.addEventListener('pointerleave', cleanup);
        el.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    showModal() {
        if (this.adultModalEl) this.adultModalEl.classList.remove('hidden');
    }

    hideModal() {
        if (this.adultModalEl) this.adultModalEl.classList.add('hidden');
    }
}
