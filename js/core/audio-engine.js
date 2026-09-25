/**
 * Baby Keys - Advanced Audio Synthesizer Engine ("God-Tier Sound Suite")
 * Polyphony-governed Web Audio synthesizer for pleasant pentatonic notes, procedural animal calls,
 * pops, bubbles, glockenspiel chimes, harp plucks, and speech fallback.
 */

class BabyAudioEngine {
    constructor() {
        this.ctx = null;
        this.ready = false;
        this.enabled = true;
        this.voiceEnabled = true;

        this.pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        this.pianoNotes = [
            { note: 'C', freq: 261.63 }, { note: 'D', freq: 293.66 }, { note: 'E', freq: 329.63 },
            { note: 'F', freq: 349.23 }, { note: 'G', freq: 392.00 }, { note: 'A', freq: 440.00 },
            { note: 'B', freq: 493.88 }, { note: 'C2', freq: 523.25 }
        ];
    }

    init() {
        if (this.ready && this.ctx && this.ctx.state !== 'suspended') return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!this.ctx) this.ctx = new AudioCtx();
            if (this.ctx.state === 'suspended') this.ctx.resume();
            this.ready = true;
        } catch (e) {
            console.warn('Audio Context init error:', e);
        }
    }

    playRandomNote() {
        if (!this.enabled || !feedbackGovernor.shouldAllowAudio()) return;
        this.init();
        const freq = this.pentatonic[Math.floor(Math.random() * this.pentatonic.length)];
        this.playTone(freq, 'sine', 0.7, 0.2);
    }

    playTone(freq, type = 'sine', duration = 0.7, volume = 0.2) {
        if (!this.enabled || !this.ready || !this.ctx) return;
        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(volume, t + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            feedbackGovernor.onAudioVoiceStarted();
            osc.start(t);
            osc.stop(t + duration);

            osc.onended = () => feedbackGovernor.onAudioVoiceEnded();
        } catch (e) {
            feedbackGovernor.onAudioVoiceEnded();
        }
    }

    playPop() {
        if (!this.enabled || !feedbackGovernor.shouldAllowAudio()) return;
        this.init();
        if (!this.ctx) return;
        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(480, t);
            osc.frequency.exponentialRampToValueAtTime(110, t + 0.12);

            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            feedbackGovernor.onAudioVoiceStarted();
            osc.start(t);
            osc.stop(t + 0.14);

            osc.onended = () => feedbackGovernor.onAudioVoiceEnded();
        } catch (e) {}
    }

    playChime() {
        if (!this.enabled) return;
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'sine', 0.6, 0.15), idx * 80);
        });
    }

    playHarpPluck() {
        if (!this.enabled) return;
        this.init();
        const notes = [329.63, 392.00, 440.00, 523.25, 659.25];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'triangle', 0.8, 0.18), idx * 60);
        });
    }

    playPianoKey(index) {
        if (!this.enabled) return;
        this.init();
        const n = this.pianoNotes[index % this.pianoNotes.length];
        if (n) this.playTone(n.freq, 'sine', 1.0, 0.3);
    }

    /**
     * Multi-instrument synthesizer. Each instrument shapes oscillators + envelope
     * differently to give a recognisable timbre. Counts as a single governed voice.
     */
    playInstrument(id, freq = 440) {
        if (!this.enabled || !feedbackGovernor.shouldAllowAudio()) return;
        this.init();
        if (!this.ctx) return;
        try {
            const t = this.ctx.currentTime;
            const master = this.ctx.createGain();
            master.gain.value = 1;
            master.connect(this.ctx.destination);

            const partial = (type, f, vol, dur, attack) => {
                const osc = this.ctx.createOscillator();
                const g = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(f, t);
                g.gain.setValueAtTime(0.0001, t);
                g.gain.linearRampToValueAtTime(vol, t + attack);
                g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
                osc.connect(g);
                g.connect(master);
                osc.start(t);
                osc.stop(t + dur + 0.02);
                return osc;
            };

            let last = null;
            switch (id) {
                case 'guitar':
                    last = partial('sawtooth', freq, 0.22, 0.9, 0.005);
                    partial('triangle', freq * 2, 0.08, 0.6, 0.005);
                    break;
                case 'drum': {
                    // Pitch-dropping kick + noise transient (freq ignored)
                    const osc = this.ctx.createOscillator();
                    const g = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(180, t);
                    osc.frequency.exponentialRampToValueAtTime(50, t + 0.18);
                    g.gain.setValueAtTime(0.4, t);
                    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
                    osc.connect(g); g.connect(master);
                    osc.start(t); osc.stop(t + 0.22);
                    const nb = this.ctx.createBufferSource();
                    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.05, this.ctx.sampleRate);
                    const d = buf.getChannelData(0);
                    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
                    nb.buffer = buf;
                    const ng = this.ctx.createGain();
                    ng.gain.value = 0.15;
                    nb.connect(ng); ng.connect(master);
                    nb.start(t);
                    last = osc;
                    break;
                }
                case 'trumpet':
                    last = partial('sawtooth', freq, 0.18, 0.6, 0.04);
                    partial('square', freq, 0.06, 0.6, 0.04);
                    break;
                case 'violin':
                    last = partial('sawtooth', freq, 0.16, 1.0, 0.14);
                    break;
                case 'sax':
                    last = partial('square', freq, 0.14, 0.7, 0.05);
                    partial('sawtooth', freq * 1.01, 0.06, 0.7, 0.05);
                    break;
                case 'bell':
                    last = partial('sine', freq, 0.22, 1.6, 0.005);
                    partial('sine', freq * 2.76, 0.10, 1.2, 0.005); // inharmonic shimmer
                    partial('sine', freq * 5.4, 0.05, 0.8, 0.005);
                    break;
                case 'flute':
                    last = partial('sine', freq, 0.2, 0.7, 0.08);
                    partial('sine', freq * 2, 0.03, 0.5, 0.08);
                    break;
                case 'piano':
                default:
                    last = partial('triangle', freq, 0.24, 1.2, 0.01);
                    partial('sine', freq * 2, 0.06, 0.8, 0.01);
                    break;
            }

            feedbackGovernor.onAudioVoiceStarted();
            if (last) {
                last.onended = () => feedbackGovernor.onAudioVoiceEnded();
            } else {
                feedbackGovernor.onAudioVoiceEnded();
            }
        } catch (e) {
            feedbackGovernor.onAudioVoiceEnded();
        }
    }

    /**
     * Procedural Animal Call Sound Synthesizer
     */
    playProceduralAnimalSound(animalId = '') {
        if (!this.enabled || !feedbackGovernor.shouldAllowAudio()) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            if (animalId.includes('dog')) {
                // Woof chirp pitch drop
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(320, t);
                osc.frequency.exponentialRampToValueAtTime(140, t + 0.18);
                gain.gain.setValueAtTime(0.3, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
            } else if (animalId.includes('cat')) {
                // Meow pitch slide up then down
                osc.type = 'sine';
                osc.frequency.setValueAtTime(450, t);
                osc.frequency.linearRampToValueAtTime(680, t + 0.2);
                osc.frequency.linearRampToValueAtTime(400, t + 0.45);
                gain.gain.setValueAtTime(0.25, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
            } else if (animalId.includes('cow')) {
                // Low Moo vibrato
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(120, t);
                osc.frequency.linearRampToValueAtTime(110, t + 0.5);
                gain.gain.setValueAtTime(0.35, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            } else if (animalId.includes('frog')) {
                // Ribbit chirp
                osc.type = 'square';
                osc.frequency.setValueAtTime(220, t);
                osc.frequency.linearRampToValueAtTime(160, t + 0.15);
                gain.gain.setValueAtTime(0.2, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
            } else {
                // Generic pleasant chirp
                osc.type = 'sine';
                osc.frequency.setValueAtTime(520, t);
                osc.frequency.exponentialRampToValueAtTime(880, t + 0.2);
                gain.gain.setValueAtTime(0.2, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
            }

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            feedbackGovernor.onAudioVoiceStarted();
            osc.start(t);
            osc.stop(t + 0.5);

            osc.onended = () => feedbackGovernor.onAudioVoiceEnded();
        } catch (e) {
            feedbackGovernor.onAudioVoiceEnded();
        }
    }

    /**
     * Speaks slowly and clearly for teaching: each word is drawn out at a low rate
     * and separated by a deliberate pause ("Rrred ... Baaall") so a baby hears every
     * word distinctly. Speaks word-by-word with gaps rather than one rushed phrase.
     */
    speak(text) {
        if (!this.voiceEnabled) {
            this.playRandomNote();
            return;
        }
        if (!('speechSynthesis' in window)) {
            this.playChime();
            return;
        }
        try {
            speechSynthesis.cancel();

            const words = String(text).split(/\s+/).filter(Boolean);
            if (!words.length) return;

            const rate = this.calmMode ? 0.45 : 0.55; // slow, drawn-out
            const gapMs = this.calmMode ? 650 : 450;   // space between words
            const pitch = 1.15;
            const volume = 0.9;

            // Tag this utterance run so a newer speak() call cancels this one cleanly.
            const runId = (this._speakRun = (this._speakRun || 0) + 1);

            let i = 0;
            const sayNext = () => {
                if (runId !== this._speakRun) return; // superseded by a newer call
                if (i >= words.length) return;
                const u = new SpeechSynthesisUtterance(words[i]);
                u.rate = rate;
                u.pitch = pitch;
                u.volume = volume;
                const advance = () => {
                    i++;
                    if (runId === this._speakRun) setTimeout(sayNext, gapMs);
                };
                u.onend = advance;
                u.onerror = advance;
                speechSynthesis.speak(u);
            };
            sayNext();
        } catch (e) {
            this.playChime();
        }
    }
}

const audioEngine = new BabyAudioEngine();
