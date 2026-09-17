/**
 * Baby Keys Audio Engine (Throttled & Polyphony Managed)
 * Pure Web Audio API Synthesizer with strict polyphony limiters, event coalescing,
 * Calm Mode support, and optional Web Speech fallback.
 */

class BabyAudio {
    constructor() {
        this.ctx = null;
        this.ready = false;
        this.enabled = true;
        this.speechEnabled = true;
        this.animalSoundsEnabled = true;
        this.calmMode = false;
        
        this.activeOscillators = 0;
        this.maxPolyphony = 4;
        this.lastPlayTime = 0;
        this.cooldownMs = 45; // prevent audio spam under rapid multi-touch chaos

        this.pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        this.pianoNotes = [
            { note: 'C', freq: 261.63, color: '#FF5964' },
            { note: 'D', freq: 293.66, color: '#FF924C' },
            { note: 'E', freq: 329.63, color: '#FFCA3A' },
            { note: 'F', freq: 349.23, color: '#8AC926' },
            { note: 'G', freq: 392.00, color: '#52B788' },
            { note: 'A', freq: 440.00, color: '#1982C4' },
            { note: 'B', freq: 493.88, color: '#6A4C93' },
            { note: 'C2', freq: 523.25, color: '#FF5992' }
        ];
    }

    init() {
        if (this.ready && this.ctx && this.ctx.state !== 'suspended') return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!this.ctx) {
                this.ctx = new AudioCtx();
            }
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            this.ready = true;
        } catch (e) {
            console.warn('Web Audio init error:', e);
        }
    }

    playRandomNote() {
        if (!this.enabled) return;
        const now = Date.now();
        if (now - this.lastPlayTime < this.cooldownMs) return; // Audio throttling
        this.lastPlayTime = now;

        const freq = this.pentatonic[Math.floor(Math.random() * this.pentatonic.length)];
        this.playTone(freq, 'sine', this.calmMode ? 1.2 : 0.8, this.calmMode ? 0.1 : 0.2);
    }

    playTone(freq, type = 'sine', duration = 0.8, volume = 0.2) {
        if (!this.enabled || !this.ready || !this.ctx) return;
        if (this.activeOscillators >= this.maxPolyphony) return; // Polyphony limiter

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);

            const finalVol = this.calmMode ? volume * 0.5 : volume;

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(finalVol, now + (this.calmMode ? 0.08 : 0.03));
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            this.activeOscillators++;
            osc.start(now);
            osc.stop(now + duration);

            osc.onended = () => {
                this.activeOscillators = Math.max(0, this.activeOscillators - 1);
            };
        } catch (e) {
            this.activeOscillators = Math.max(0, this.activeOscillators - 1);
        }
    }

    playPop() {
        if (!this.enabled) return;
        const now = Date.now();
        if (now - this.lastPlayTime < this.cooldownMs) return;
        this.lastPlayTime = now;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, t);
            osc.frequency.exponentialRampToValueAtTime(120, t + 0.12);

            const vol = this.calmMode ? 0.15 : 0.28;
            gain.gain.setValueAtTime(vol, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.14);
        } catch (e) {}
    }

    playChime() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'sine', 0.6, 0.15), idx * 90);
        });
    }

    playRipple() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(250, t);
            osc.frequency.linearRampToValueAtTime(500, t + 0.1);
            osc.frequency.exponentialRampToValueAtTime(140, t + 0.3);

            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.35);
        } catch (e) {}
    }

    playPianoKey(index) {
        if (!this.enabled) return;
        this.init();
        const noteObj = this.pianoNotes[index % this.pianoNotes.length];
        if (noteObj) {
            this.playTone(noteObj.freq, 'sine', 1.2, 0.3);
        }
    }

    playAnimalSound(animalKey) {
        if (!this.enabled || !this.animalSoundsEnabled) return;
        this.init();
        if (!this.ctx) return;
        this.playRandomNote();
    }

    speak(text) {
        if (!this.speechEnabled) return;
        // Web Speech API is an optional enhancement
        if (!('speechSynthesis' in window)) {
            // Speech fallback: play sweet musical tone instead
            this.playRandomNote();
            return;
        }

        try {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.85;
            utterance.pitch = 1.25;
            utterance.volume = this.calmMode ? 0.4 : 0.8;
            speechSynthesis.speak(utterance);
        } catch (e) {
            this.playRandomNote();
        }
    }
}

const audioSystem = new BabyAudio();
