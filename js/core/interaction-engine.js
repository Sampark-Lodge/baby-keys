/**
 * Baby Keys - Interaction Engine
 * Interprets normalized semantic interaction events and coalesces rapid input patterns.
 */

class BabyInteractionEngine {
    constructor() {
        this.activeWorld = null;
        this.currentStage = 1; // Stage 1 (Hulk), Stage 2 (Press), Stage 3 (Direction), Stage 4 (Pointer), Stage 5 (Click)
    }

    setActiveWorld(worldInstance) {
        this.activeWorld = worldInstance;
    }

    setStage(stageNum) {
        this.currentStage = stageNum;
    }

    processEvent(semanticEvent) {
        if (!this.activeWorld) return;

        // Log to developer diagnostics
        if (typeof diagnostics !== 'undefined') {
            diagnostics.logInput(semanticEvent);
        }

        // Pass to active world
        if (this.activeWorld.handleInput) {
            this.activeWorld.handleInput(semanticEvent, this.currentStage);
        }
    }
}

const interactionEngine = new BabyInteractionEngine();
