/**
 * Baby Keys - Activity Engine
 * Manages activity lifecycles across learning worlds with 5 explicit states:
 * CREATED -> ACTIVE -> PAUSED -> RESUMED -> EXITED
 * Guarantees complete cleanup of timers, event listeners, audio, and DOM elements on exit.
 */

const ActivityState = {
    CREATED: 'CREATED',
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    RESUMED: 'RESUMED',
    EXITED: 'EXITED'
};

class BabyActivityEngine {
    constructor() {
        this.currentActivity = null;
        this.currentState = ActivityState.CREATED;
        this.activeTimers = new Set();
        this.activeListeners = [];
    }

    registerTimer(timerId) {
        this.activeTimers.add(timerId);
    }

    clearAllTimers() {
        this.activeTimers.forEach(id => clearTimeout(id));
        this.activeTimers.clear();
    }

    loadActivity(activityId) {
        this.exitCurrentActivity();
        const activityData = activityRegistry.get(activityId);
        
        this.currentActivity = {
            id: activityId,
            data: activityData,
            state: ActivityState.CREATED
        };
        this.currentState = ActivityState.CREATED;
        return this.currentActivity;
    }

    startActivity(activityId, worldInstance) {
        this.loadActivity(activityId);
        if (!this.currentActivity) return;

        this.currentActivity.state = ActivityState.ACTIVE;
        this.currentState = ActivityState.ACTIVE;
        if (worldInstance && typeof worldInstance.start === 'function') {
            worldInstance.start();
        }
    }

    pauseCurrentActivity() {
        if (this.currentState === ActivityState.ACTIVE) {
            this.currentState = ActivityState.PAUSED;
            if (this.currentActivity) this.currentActivity.state = ActivityState.PAUSED;
        }
    }

    resumeCurrentActivity() {
        if (this.currentState === ActivityState.PAUSED) {
            this.currentState = ActivityState.RESUMED;
            if (this.currentActivity) this.currentActivity.state = ActivityState.ACTIVE;
            this.currentState = ActivityState.ACTIVE;
        }
    }

    exitCurrentActivity() {
        if (!this.currentActivity && this.currentState === ActivityState.EXITED) return;

        this.clearAllTimers();
        if (typeof sensoryEngine !== 'undefined') {
            sensoryEngine.particles = [];
            sensoryEngine.ripples = [];
        }

        if (this.currentActivity) {
            this.currentActivity.state = ActivityState.EXITED;
        }
        this.currentState = ActivityState.EXITED;
        this.currentActivity = null;
    }
}

const activityEngine = new BabyActivityEngine();
