/**
 * Baby Piano Activity
 * 8 Large colorful rainbow piano keys with press animations and melodic synth audio.
 */

class BabyPiano {
    constructor(container) {
        this.container = container;
        this.active = false;
        this.keysData = [
            { note: 'C', emoji: '🔴', color: '#FF5964', idx: 0 },
            { note: 'D', emoji: '🟠', color: '#FF924C', idx: 1 },
            { note: 'E', emoji: '🟡', color: '#FFCA3A', idx: 2 },
            { note: 'F', emoji: '🟢', color: '#8AC926', idx: 3 },
            { note: 'G', emoji: '🩵', color: '#52B788', idx: 4 },
            { note: 'A', emoji: '🔵', color: '#1982C4', idx: 5 },
            { note: 'B', emoji: '🟣', color: '#6A4C93', idx: 6 },
            { note: 'C2', emoji: '🩷', color: '#FF5992', idx: 7 }
        ];
    }

    start() {
        this.active = true;
        this.render();
    }

    stop() {
        this.active = false;
        this.container.innerHTML = '';
    }

    render() {
        this.container.innerHTML = `
            <div class="piano-keys-wrapper">
                ${this.keysData.map(k => `
                    <div class="piano-key" data-idx="${k.idx}" style="background: ${k.color}">
                        <span class="piano-key-emoji">${k.emoji}</span>
                        <span class="piano-key-label">${k.note}</span>
                    </div>
                `).join('')}
            </div>
        `;

        this.container.querySelectorAll('.piano-key').forEach(keyEl => {
            const idx = parseInt(keyEl.dataset.idx, 10);
            const trigger = (e) => {
                e.preventDefault();
                e.stopPropagation();
                keyEl.classList.add('pressed');
                setTimeout(() => keyEl.classList.remove('pressed'), 200);

                if (typeof audioSystem !== 'undefined') {
                    audioSystem.playPianoKey(idx);
                }
            };

            keyEl.addEventListener('mousedown', trigger);
            keyEl.addEventListener('touchstart', trigger, { passive: false });
        });
    }
}
