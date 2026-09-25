/**
 * Baby Keys - Kid Guard
 * Best-effort "kid-proofing" so a toddler mashing the keyboard/mouse can't easily
 * escape the app or open browser tooling.
 *
 * IMPORTANT: a web page CANNOT fully block DevTools (F12), tab close, or the browser
 * menus — that is a browser security boundary. This swallows the common shortcuts so
 * the app stays put in the vast majority of cases, and adds an unload confirmation so
 * accidental reload/close is caught. For a truly locked-down experience, run the app
 * fullscreen inside an OS kiosk mode (Windows Assigned Access) or iOS/Android Guided
 * Access — see README.
 */

class BabyKidGuard {
    constructor() {
        this.enabled = true;
        this.init();
    }

    isPlaying() {
        return !!(window.babyApp && window.babyApp.activeWorldId);
    }

    init() {
        // Suppress the right-click / long-press context menu everywhere.
        window.addEventListener('contextmenu', (e) => e.preventDefault());

        // Suppress browser text selection drag / image drag.
        window.addEventListener('dragstart', (e) => e.preventDefault());
        window.addEventListener('selectstart', (e) => {
            if (!e.target.closest('input, textarea, select')) e.preventDefault();
        });

        // Swallow developer / navigation shortcuts (best effort).
        window.addEventListener('keydown', (e) => this.handleKeyDown(e), true);

        // Catch accidental reload / close while a world is being played.
        window.addEventListener('beforeunload', (e) => {
            if (this.enabled && this.isPlaying()) {
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        });
    }

    handleKeyDown(e) {
        if (!this.enabled) return;

        const key = (e.key || '').toLowerCase();
        const code = e.code || '';
        const ctrl = e.ctrlKey || e.metaKey;
        const shift = e.shiftKey;

        // Keep the built-in developer diagnostics shortcut working (Ctrl+Shift+D).
        if (ctrl && shift && code === 'KeyD') return;

        const blocked =
            key === 'f12' ||                                   // DevTools
            (ctrl && shift && ['keyi', 'keyj', 'keyc'].includes(code.toLowerCase())) || // DevTools panels
            (ctrl && ['keyu', 'keys', 'keyp'].includes(code.toLowerCase())) ||          // view-source / save / print
            (ctrl && shift && code === 'KeyR') ||              // hard reload
            (ctrl && ['keyw', 'keyn', 'keyt'].includes(code.toLowerCase()));            // close/new tab/window

        if (blocked) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
}

const kidGuard = new BabyKidGuard();
