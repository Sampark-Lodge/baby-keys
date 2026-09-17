/**
 * Bubble World - Game 1
 * Extended from BaseActivity.
 * Features 5 environments, ambient floating creatures, idle mode, and particle limiters for 60 FPS performance.
 */

class BubbleWorld extends BaseActivity {
    constructor(canvas, envSelectorContainer) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.envSelectorContainer = envSelectorContainer;
        this.env = 'ocean';
        
        this.bubbles = [];
        this.particles = [];
        this.creatures = [];
        this.maxParticles = 40; // particle limiter for lower-end devices
        this.animId = null;

        this.environments = {
            ocean: {
                bgGradient: ['#001a33', '#003366', '#000b1a'],
                bubbleColors: ['#00e5ff', '#00bfff', '#66ffee', '#4488ff'],
                creatureEmojis: ['🐠', '🐟', '🐡', '🐙', '🐬']
            },
            garden: {
                bgGradient: ['#0a2e12', '#1b4d24', '#051407'],
                bubbleColors: ['#55ee55', '#ffdd44', '#44dd88', '#ff9933'],
                creatureEmojis: ['🦋', '🌸', '🌺', '🐝', '🌼']
            },
            rainbow: {
                bgGradient: ['#2e0a2b', '#4d1b40', '#140512'],
                bubbleColors: ['#ff4444', '#ffaa00', '#ffff00', '#44ff44', '#00ddff'],
                creatureEmojis: ['🎈', '🎵', '⭐', '🌈', '✨']
            },
            night: {
                bgGradient: ['#08081a', '#121233', '#03030a'],
                bubbleColors: ['#aaddff', '#ffffff', '#e5b8ff', '#ffd700'],
                creatureEmojis: ['⭐', '🌟', '🌙', '✨', '💫']
            },
            calm: {
                bgGradient: ['#1a1528', '#2b243d', '#0e0b17'],
                bubbleColors: ['#e2cbf7', '#cbe3f7', '#f7cbd9'],
                creatureEmojis: ['🫧', '✨', '🌸', '💫']
            }
        };

        this.initResize();
    }

    initResize() {
        window.addEventListener('resize', () => {
            if (this.active) {
                this.resize();
            }
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        super.start();
        this.resize();
        this.bubbles = [];
        this.particles = [];
        this.creatures = [];
        this.spawnAmbientCreatures();
        this.loop();
    }

    stop() {
        super.stop();
        if (this.animId) {
            cancelAnimationFrame(this.animId);
        }
    }

    setEnvironment(envName) {
        if (this.environments[envName]) {
            this.env = envName;
            this.creatures = [];
            this.spawnAmbientCreatures();
        }
    }

    spawnAmbientCreatures() {
        const envConfig = this.environments[this.env];
        const count = storageSystem && storageSystem.settings.density === 'low' ? 6 : 10;
        for (let i = 0; i < count; i++) {
            this.creatures.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 28 + Math.random() * 24,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.0,
                emoji: envConfig.creatureEmojis[Math.floor(Math.random() * envConfig.creatureEmojis.length)],
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    handleTouch(x, y) {
        super.handleTouch(x, y);

        if (typeof audioSystem !== 'undefined') audioSystem.playRandomNote();
        if (typeof storageSystem !== 'undefined') storageSystem.recordBubbleCreated();

        const envConfig = this.environments[this.env];
        const numBubbles = storageSystem && storageSystem.settings.calmMode ? 2 : 3;

        for (let i = 0; i < numBubbles; i++) {
            const size = 40 + Math.random() * 55;
            const color = envConfig.bubbleColors[Math.floor(Math.random() * envConfig.bubbleColors.length)];
            const emoji = envConfig.creatureEmojis[Math.floor(Math.random() * envConfig.creatureEmojis.length)];

            this.bubbles.push({
                x: x + (Math.random() - 0.5) * 30,
                y: y + (Math.random() - 0.5) * 30,
                radius: size / 2,
                color: color,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -1.2 - Math.random() * 2,
                wobbleSpeed: 0.02,
                wobbleAmp: 1.5,
                phase: Math.random() * Math.PI * 2,
                emoji: Math.random() > 0.4 ? emoji : null,
                pop: false,
                alpha: 1.0
            });
        }

        // Particle limiter
        if (this.particles.length < this.maxParticles) {
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                this.particles.push({
                    x: x, y: y,
                    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                    radius: 2 + Math.random() * 2, color: '#ffffff', alpha: 1.0, life: 1.0
                });
            }
        }
    }

    update() {
        if (!this.active) return;
        const now = Date.now();
        const envConfig = this.environments[this.env];

        // Idle Mode (spawn gentle bubbles when idle for > 3s)
        if (!this.isUserActivelyPlaying(3000)) {
            if (Math.random() < 0.03 && this.bubbles.length < 15) {
                const size = 40 + Math.random() * 40;
                this.bubbles.push({
                    x: Math.random() * this.canvas.width,
                    y: this.canvas.height + size,
                    radius: size / 2,
                    color: envConfig.bubbleColors[Math.floor(Math.random() * envConfig.bubbleColors.length)],
                    vx: (Math.random() - 0.5) * 1.0,
                    vy: -1 - Math.random() * 1.2,
                    wobbleSpeed: 0.02,
                    wobbleAmp: 1.2,
                    phase: Math.random() * Math.PI * 2,
                    emoji: envConfig.creatureEmojis[Math.floor(Math.random() * envConfig.creatureEmojis.length)],
                    pop: false,
                    alpha: 1.0
                });
            }
        }

        // Update Bubbles
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const b = this.bubbles[i];
            b.phase += b.wobbleSpeed;
            b.x += b.vx + Math.sin(b.phase) * b.wobbleAmp;
            b.y += b.vy;
            if (b.y < -b.radius * 2) this.bubbles.splice(i, 1);
        }

        // Update Creatures
        for (const c of this.creatures) {
            c.phase += 0.02;
            c.x += c.vx + Math.sin(c.phase) * 0.4;
            c.y += c.vy + Math.cos(c.phase) * 0.4;
            if (c.x < -40) c.x = this.canvas.width + 40;
            if (c.x > this.canvas.width + 40) c.x = -40;
            if (c.y < -40) c.y = this.canvas.height + 40;
            if (c.y > this.canvas.height + 40) c.y = -40;
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.03;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    draw() {
        const envConfig = this.environments[this.env];

        const grad = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 50,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height)
        );
        grad.addColorStop(0, envConfig.bgGradient[0]);
        grad.addColorStop(0.6, envConfig.bgGradient[1]);
        grad.addColorStop(1, envConfig.bgGradient[2]);
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Creatures
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        for (const c of this.creatures) {
            this.ctx.font = `${c.size}px sans-serif`;
            this.ctx.fillText(c.emoji, c.x, c.y);
        }

        // Bubbles
        for (const b of this.bubbles) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = b.color;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.stroke();

            if (b.emoji) {
                this.ctx.font = `${b.radius * 0.9}px sans-serif`;
                this.ctx.fillText(b.emoji, b.x, b.y);
            }
            this.ctx.restore();
        }

        // Particles
        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    loop() {
        if (!this.active) return;
        this.update();
        this.draw();
        this.animId = requestAnimationFrame(() => this.loop());
    }
}
