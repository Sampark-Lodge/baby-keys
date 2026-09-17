/**
 * Classic Baby Keys Keyboard Smasher Activity
 * Pressing any key or touching the screen spawns colorful letter/animal bubbles with audio tones.
 */

class BabyKeysClassic {
    constructor(container) {
        this.container = container;
        this.active = false;
        this.animals = {
            a:'🐊',b:'🐻',c:'🐱',d:'🐶',e:'🐘',f:'🐸',g:'🦒',h:'🦔',i:'🦎',j:'🐙',
            k:'🐨',l:'🦁',m:'🐵',n:'🦑',o:'🦉',p:'🐧',q:'🦆',r:'🐰',s:'🐍',t:'🐯',
            u:'🦄',v:'🦅',w:'🐋',x:'🦊',y:'🐃',z:'🦓'
        };
        this.bubbleColors = [
            'radial-gradient(circle at 30% 30%,#ff6666,#cc0000)',
            'radial-gradient(circle at 30% 30%,#ffaa44,#ee7700)',
            'radial-gradient(circle at 30% 30%,#ffff55,#cccc00)',
            'radial-gradient(circle at 30% 30%,#55ff55,#00bb00)',
            'radial-gradient(circle at 30% 30%,#55ddff,#0099dd)',
            'radial-gradient(circle at 30% 30%,#aa66ff,#7722cc)',
            'radial-gradient(circle at 30% 30%,#ff66bb,#dd2288)'
        ];
    }

    start() {
        this.active = true;
        this.container.innerHTML = '';
        this.spawnBubble('🎵');
    }

    stop() {
        this.active = false;
        this.container.innerHTML = '';
    }

    spawnBubble(key = '🎵', touchX = null, touchY = null) {
        if (!this.active) return;
        const bubbles = this.container.querySelectorAll('.bubble');
        if (bubbles.length > 25) bubbles[0].remove();

        const colorBg = this.bubbleColors[Math.floor(Math.random() * this.bubbleColors.length)];
        const size = 90 + Math.random() * 60;
        const x = touchX !== null ? touchX - size / 2 : Math.random() * (window.innerWidth - size);
        const y = touchY !== null ? touchY - size / 2 : window.innerHeight - size - Math.random() * 150;
        const dur = 3.5 + Math.random() * 2;
        const rot = (Math.random() - 0.5) * 40;

        const display = key.length === 1 ? key.toUpperCase() : key;
        const animal = key.length === 1 ? (this.animals[key.toLowerCase()] || '') : '';

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;
            --bubble-bg:${colorBg};--bubble-glow:rgba(255,255,255,0.4);--rise-duration:${dur}s;
            --rotate-end:${rot}deg;--letter-size:${size * 0.35}px;--animal-size:${size * 0.22}px`;
        
        bubble.innerHTML = `
            <div class="bubble-inner">
                <span class="bubble-letter">${display}</span>
                ${animal ? `<span class="bubble-animal">${animal}</span>` : ''}
            </div>
        `;

        bubble.addEventListener('click', e => {
            e.stopPropagation();
            bubble.classList.add('popping');
            if (typeof audioSystem !== 'undefined') audioSystem.playPop();
            if (typeof storageSystem !== 'undefined') storageSystem.recordBubblePopped();
            setTimeout(() => bubble.remove(), 350);
        });

        this.container.appendChild(bubble);
        if (typeof storageSystem !== 'undefined') storageSystem.recordBubbleCreated();
        setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, dur * 1000 + 100);
    }
}
