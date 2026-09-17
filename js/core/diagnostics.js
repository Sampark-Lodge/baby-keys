/**
 * Baby Keys - Diagnostic Mode Overlay (Adult/Developer Only)
 * Real-time HUD showing input telemetry, active world, concept, audio voices, and particle counts.
 */

class BabyDiagnostics {
    constructor() {
        this.enabled = false;
        this.hudContainer = null;
        this.lastEvent = 'None';
        this.currentWorld = 'None';
        this.currentConcept = 'None';
        this.fps = 60;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;

        this.initHUD();
    }

    initHUD() {
        this.hudContainer = document.createElement('div');
        this.hudContainer.id = 'baby-diagnostics-hud';
        this.hudContainer.style.cssText = `
            position: fixed;
            bottom: 12px;
            left: 12px;
            z-index: 3000;
            background: rgba(0, 0, 0, 0.85);
            color: #00e676;
            font-family: monospace;
            font-size: 11px;
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid rgba(0, 230, 118, 0.4);
            pointer-events: none;
            display: none;
            line-height: 1.5;
        `;
        document.body.appendChild(this.hudContainer);

        // Update loop
        setInterval(() => this.updateHUD(), 200);
    }

    toggle() {
        this.enabled = !this.enabled;
        this.hudContainer.style.display = this.enabled ? 'block' : 'none';
    }

    logInput(event) {
        this.lastEvent = `${event.type} (${event.key || event.code || 'Pointer'})`;
    }

    setWorld(worldId, conceptName = 'None') {
        this.currentWorld = worldId;
        this.currentConcept = conceptName;
    }

    updateHUD() {
        if (!this.enabled) return;

        this.hudContainer.innerHTML = `
            <div><b>[BABY KEYS DIAGNOSTICS]</b></div>
            <div>Input: ${this.lastEvent}</div>
            <div>World: ${this.currentWorld}</div>
            <div>Concept: ${this.currentConcept}</div>
            <div>Audio Voices: ${feedbackGovernor.activeVoices} / ${feedbackGovernor.maxAudioVoices}</div>
            <div>Particles: ${feedbackGovernor.activeParticles} / ${feedbackGovernor.maxParticles}</div>
        `;
    }
}

const diagnostics = new BabyDiagnostics();
