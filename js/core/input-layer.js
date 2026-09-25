/**
 * Baby Keys - Input Layer (Physical Input -> Semantic Interaction Events)
 * Normalizes keyboard, mouse, and touch events into decoupled semantic events.
 */

class BabyInputLayer {
    constructor() {
        this.listeners = [];
        this.pressedKeys = new Set();
        this.holdTimers = new Map();
        this.lastInputTime = Date.now();
        this.lastBurstTime = 0;
        this.burstThresholdMs = 50;

        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e), { passive: false });
        window.addEventListener('keyup', (e) => this.handleKeyUp(e), { passive: false });
        window.addEventListener('contextmenu', (e) => e.preventDefault());
        
        window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        window.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        window.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    emitSemanticEvent(event) {
        this.lastInputTime = Date.now();
        for (const listener of this.listeners) {
            listener(event);
        }
    }

    handleKeyDown(e) {
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) {
            e.preventDefault();
        }

        const now = Date.now();
        const isRepeated = this.pressedKeys.has(e.code);
        this.pressedKeys.add(e.code);

        const isBurst = (now - this.lastBurstTime < this.burstThresholdMs) || this.pressedKeys.size > 2;
        this.lastBurstTime = now;

        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;

        let semanticType = 'PRESS';
        if (e.code === 'Space') semanticType = 'SPACE_PRESS';
        else if (e.code.startsWith('Arrow')) semanticType = 'DIRECTION';
        else if (isBurst) semanticType = 'BURST';
        else if (isRepeated) semanticType = 'HOLD';

        this.emitSemanticEvent({
            type: semanticType,
            key: e.key,
            code: e.code,
            x: randomX,
            y: randomY,
            isRepeated: isRepeated,
            activeCount: this.pressedKeys.size
        });
    }

    handleKeyUp(e) {
        this.pressedKeys.delete(e.code);
    }

    handleTouchStart(e) {
        if (this._isUiTarget(e.target)) return; // lock / modal / dashboard handle their own
        e.preventDefault();
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const t = touches[i];
            this.emitSemanticEvent({
                type: 'TAP',
                x: t.clientX,
                y: t.clientY,
                key: '👇',
                code: 'Touch'
            });
        }
    }

    _isUiTarget(target) {
        return !!(target && target.closest && (
            target.closest('.parent-lock-btn') ||
            target.closest('.adult-modal-panel') ||
            target.closest('.dashboard-panel')
        ));
    }

    handleTouchMove(e) {
        if (this._isUiTarget(e.target)) return;
        e.preventDefault();
        const t = e.touches[0];
        if (t && Math.random() < 0.5) { // Sub-sampled drag trail
            this.emitSemanticEvent({
                type: 'POINTER_MOVE',
                x: t.clientX,
                y: t.clientY
            });
        }
    }

    handleTouchEnd(e) {
        // Handle touch end if needed
    }

    handleMouseDown(e) {
        if (e.target.closest('.parent-lock-btn') || e.target.closest('.dashboard-panel') || e.target.closest('.adult-modal-panel')) {
            return;
        }

        this.emitSemanticEvent({
            type: 'TAP',
            x: e.clientX,
            y: e.clientY,
            key: '🖱️',
            code: 'Mouse'
        });
    }

    handleMouseMove(e) {
        if (Math.random() < 0.05) { // Sub-sampled pointer move
            this.emitSemanticEvent({
                type: 'POINTER_MOVE',
                x: e.clientX,
                y: e.clientY
            });
        }
    }

    isUserActive(thresholdMs = 4000) {
        return (Date.now() - this.lastInputTime) < thresholdMs;
    }
}

const inputLayer = new BabyInputLayer();
