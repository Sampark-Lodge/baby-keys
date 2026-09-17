/**
 * Baby Keys - Master Application Controller
 * Connects the Decoupled Input Layer -> Interaction Engine -> Feedback Governor -> Activity System -> Parent Gate.
 */

class BabyMasterApp {
    constructor() {
        this.activeWorld = null;
        this.activeWorldId = null;

        // Elements
        this.homeScreen = document.getElementById('home-screen');
        this.playroomContainer = document.getElementById('active-playroom');
        this.playroomTitleBadge = document.getElementById('playroom-title-badge');
        this.sensoryCanvas = document.getElementById('sensory-canvas');
        this.learningDomContainer = document.getElementById('learning-dom-container');

        // Worlds Map
        this.worlds = {
            sensory: new SensoryWorld(this.learningDomContainer),
            colour: new ColourWorld(this.learningDomContainer),
            animal: new AnimalWorld(this.learningDomContainer),
            number: new NumberWorld(this.learningDomContainer),
            alphabet: new AlphabetWorld(this.learningDomContainer),
            shape: new ShapeWorld(this.learningDomContainer),
            object: new ObjectWorld(this.learningDomContainer),
            music: new MusicWorld(this.learningDomContainer)
        };

        this.parentGate = new BabyParentGate(() => parentDashboard.open());

        this.init();
    }

    init() {
        sensoryEngine.attachCanvas(this.sensoryCanvas);

        // Bind Input Adaptation Layer to Interaction Pipeline
        inputLayer.addListener((semanticEvent) => this.handleSemanticEvent(semanticEvent));

        this.setupEventListeners();
        this.applySettings();
        this.upgradeHomeIcons();
        this.preloadAssets();
    }

    /**
     * Warm the browser cache with all bundled media during idle time so every world
     * opens instantly and the app runs fully offline after the first visit.
     */
    preloadAssets() {
        if (typeof mediaAssets === 'undefined') return;
        const run = () => mediaAssets.preloadAll();
        if ('requestIdleCallback' in window) {
            requestIdleCallback(run, { timeout: 3000 });
        } else {
            setTimeout(run, 1200);
        }
    }

    upgradeHomeIcons() {
        if (typeof babyEmoji === 'undefined') return;
        document.querySelectorAll('.toy-icon').forEach(el => {
            const glyph = el.textContent.trim();
            if (glyph) el.innerHTML = babyEmoji.img(glyph);
        });
    }

    applySettings() {
        const s = storageManager.settings;
        audioEngine.enabled = s.sound;
        audioEngine.voiceEnabled = s.voice;
        audioEngine.calmMode = s.calmMode;

        feedbackGovernor.setCalmMode(s.calmMode);
        document.body.classList.toggle('calm-mode', !!s.calmMode);
        interactionEngine.setStage(s.playStage);

        document.getElementById('setting-calm-mode').checked = s.calmMode;
        document.getElementById('setting-sound').checked = s.sound;
        document.getElementById('setting-voice').checked = s.voice;
        const bgMusicEl = document.getElementById('setting-bgmusic');
        if (bgMusicEl) bgMusicEl.checked = s.bgMusic;
        document.getElementById('setting-stage').value = s.playStage;
    }

    setupEventListeners() {
        // Interactive Rainbow Piano Bar
        document.querySelectorAll('.piano-key').forEach(key => {
            key.addEventListener('click', (e) => {
                e.stopPropagation();
                const noteIndex = parseInt(key.dataset.note, 10);
                // In the Music world the keyboard plays the chosen instrument.
                if (this.activeWorldId === 'music' && this.worlds.music.currentInstrument) {
                    const note = audioEngine.pianoNotes[noteIndex] || { freq: 440 };
                    audioEngine.playInstrument(this.worlds.music.currentInstrument, note.freq);
                } else {
                    audioEngine.playPianoKey(noteIndex);
                }
                sensoryEngine.addSparkles(e.clientX, e.clientY, '#ffca3a', 6);
                key.classList.add('active-key');
                setTimeout(() => key.classList.remove('active-key'), 200);
            });
        });

        // Toy Room Grid Cards
        document.querySelectorAll('.toy-card').forEach(card => {
            const worldId = card.dataset.world;
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this.launchWorld(worldId);
            });
        });

        // Dashboard Buttons
        document.getElementById('dash-close').addEventListener('click', () => {
            parentDashboard.close();
        });

        document.getElementById('dash-exit-home').addEventListener('click', () => {
            parentDashboard.close();
            this.exitToHome();
        });

        document.getElementById('dash-reset').addEventListener('click', () => {
            storageManager.resetStats();
            parentDashboard.renderStats();
        });

        // Developer Diagnostics Shortcut (Ctrl + Shift + D)
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
                diagnostics.toggle();
            }
        });
    }

    handleSemanticEvent(semanticEvent) {
        if (!this.activeWorldId) return;

        // Global sensory particle-engine reactions (across all worlds)
        if (semanticEvent.type === 'SPACE_PRESS' || semanticEvent.type === 'BURST') {
            sensoryEngine.addBurst(30);
        } else if (semanticEvent.type === 'POINTER_MOVE') {
            sensoryEngine.addTrail(semanticEvent.x, semanticEvent.y);
        }

        // Process through Progression & Interaction Engines
        progressionEngine.recordInput(semanticEvent);
        interactionEngine.processEvent(semanticEvent);
    }

    launchWorld(worldId) {
        audioEngine.init();
        storageManager.startSession();
        sessionEngine.startSession();

        if (this.activeWorld) {
            this.activeWorld.stop();
        }

        this.activeWorldId = worldId;
        this.activeWorld = this.worlds[worldId] || this.worlds.sensory;

        interactionEngine.setActiveWorld(this.activeWorld);

        const titles = {
            sensory: '🌈 Sensory Playground',
            colours: '🎨 Colours',
            animals: '🐶 Animals',
            numbers: '🔢 Numbers',
            alphabet: '🔤 Alphabet',
            shapes: '🔺 Shapes',
            objects: '📦 Objects',
            music: '🎵 Music'
        };

        this.playroomTitleBadge.textContent = titles[worldId] || 'Baby Keys';
        this.homeScreen.classList.add('hidden');
        this.playroomContainer.classList.add('active');

        sensoryEngine.start();
        this.activeWorld.start();

        if (storageManager.settings.bgMusic) {
            mediaAssets.startMusic();
        }

        this.requestFullscreen();
    }

    exitToHome() {
        if (this.activeWorld) {
            this.activeWorld.stop();
            this.activeWorld = null;
        }
        this.activeWorldId = null;
        interactionEngine.setActiveWorld(null);
        sensoryEngine.stop();
        mediaAssets.stopMusic();

        this.playroomContainer.classList.remove('active');
        this.homeScreen.classList.remove('hidden');
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }

    requestFullscreen() {
        if (!storageManager.settings.fullscreen) return;
        const el = document.documentElement;
        (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen).call(el).catch(() => {});
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.babyApp = new BabyMasterApp();
});
