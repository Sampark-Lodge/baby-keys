/**
 * Baby Keys - Music & Rhythm World
 * A pick-an-instrument playground: tap any instrument to hear it, and the chosen
 * instrument also becomes what the bottom Rainbow Piano bar plays.
 */

class MusicWorld {
    constructor(containerEl) {
        this.containerEl = containerEl;
        this.active = false;
        this.currentInstrument = 'piano';

        this.instruments = [
            { id: 'piano',   name: 'Piano',   emoji: '🎹', color: '#9d7bff' },
            { id: 'guitar',  name: 'Guitar',  emoji: '🎸', color: '#ff9f4a' },
            { id: 'drum',    name: 'Drum',    emoji: '🥁', color: '#ff5a7e' },
            { id: 'trumpet', name: 'Trumpet', emoji: '🎺', color: '#ffd23f' },
            { id: 'violin',  name: 'Violin',  emoji: '🎻', color: '#4ecb71' },
            { id: 'sax',     name: 'Sax',     emoji: '🎷', color: '#35c9c0' },
            { id: 'bell',    name: 'Bells',   emoji: '🔔', color: '#4aa9ff' },
            { id: 'flute',   name: 'Flute',   emoji: '🪈', color: '#ff77c8' }
        ];

        // Pentatonic notes for pleasant random play on key-smash input
        this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    }

    start() {
        this.active = true;
        this.render();
    }

    stop() {
        this.active = false;
        if (this.containerEl) this.containerEl.innerHTML = '';
    }

    // Map a physical key to one of the 8 keyboard notes (home row = do-re-mi-...).
    keyToNote(event) {
        const map = { KeyA: 0, KeyS: 1, KeyD: 2, KeyF: 3, KeyG: 4, KeyH: 5, KeyJ: 6, KeyK: 7 };
        if (event.code && map[event.code] !== undefined) return map[event.code];
        const s = event.key || event.code || ' ';
        let h = 0;
        for (const c of s) h += c.charCodeAt(0);
        return h % 8;
    }

    // Light up the matching on-screen keyboard key and play the chosen instrument.
    playNote(noteIndex, srcX, srcY) {
        const note = audioEngine.pianoNotes[noteIndex] || { freq: 440 };
        audioEngine.playInstrument(this.currentInstrument, note.freq);

        const keys = document.querySelectorAll('.piano-key');
        const key = keys[noteIndex];
        if (key) {
            key.classList.add('active-key');
            setTimeout(() => key.classList.remove('active-key'), 180);
            const r = key.getBoundingClientRect();
            sensoryEngine.addSparkles(r.left + r.width / 2, r.top + 6, '#ffca3a', 6);
        }
        if (srcX !== undefined) sensoryEngine.addSparkles(srcX, srcY, '#ff66bb', 5);
    }

    handleInput(event) {
        if (!this.active) return;
        diagnostics.logInput(event);
        this.playNote(this.keyToNote(event), event.x, event.y);
    }

    playInstrument(inst, x, y) {
        this.currentInstrument = inst.id;
        audioEngine.playInstrument(inst.id, this.scale[2]);
        sensoryEngine.addSparkles(x, y, inst.color, 12);
        sensoryEngine.addRipple(x, y, inst.color);
        diagnostics.setWorld('Music', inst.name);
        sessionEngine.recordExposure('music', inst.id);

        this.containerEl.querySelectorAll('.instrument-tile').forEach(t => {
            const on = t.dataset.inst === inst.id;
            t.classList.toggle('selected', on);
            if (on) {
                t.classList.remove('tap-bounce');
                void t.offsetWidth;
                t.classList.add('tap-bounce');
            }
        });
    }

    render() {
        if (!this.containerEl || !this.active) return;
        diagnostics.setWorld('Music', 'Instruments');

        const tiles = this.instruments.map(inst => `
            <button class="instrument-tile ${inst.id === this.currentInstrument ? 'selected' : ''}"
                    data-inst="${inst.id}" style="--tile-color:${inst.color};" aria-label="${inst.name}">
                <span class="instrument-emoji">${babyEmoji.img(inst.emoji)}</span>
                <span class="instrument-name">${inst.name}</span>
            </button>
        `).join('');

        this.containerEl.innerHTML = `
            <div class="music-world">
                <h2 class="music-heading">Pick an instrument</h2>
                <div class="instrument-grid">${tiles}</div>
                <p class="music-hint">Now play it on the keyboard below! 🎹</p>
            </div>
        `;

        this.containerEl.querySelectorAll('.instrument-tile').forEach(tile => {
            const inst = this.instruments.find(i => i.id === tile.dataset.inst);
            tile.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playInstrument(inst, e.clientX, e.clientY);
            });
        });
    }
}
