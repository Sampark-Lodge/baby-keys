/**
 * Baby Keys - Progression Engine
 * Tracks interaction patterns (exposure, repetition, directional input, matching)
 * to suggest progressive computer-control stages (Stage 1 Hulk -> Stage 5 Click).
 */

class BabyProgressionEngine {
    constructor() {
        this.stage = 1; // Default Stage 1: Hulk Mode
        this.directionalInputsCount = 0;
        this.pointerMoveCount = 0;
    }

    recordInput(event) {
        if (event.type === 'DIRECTION') {
            this.directionalInputsCount++;
            if (this.directionalInputsCount > 15 && this.stage < 3) {
                this.stage = 3; // Advance to Stage 3 Direction
            }
        } else if (event.type === 'POINTER_MOVE') {
            this.pointerMoveCount++;
            if (this.pointerMoveCount > 30 && this.stage < 4) {
                this.stage = 4; // Advance to Stage 4 Pointer
            }
        }
    }
}

const progressionEngine = new BabyProgressionEngine();
