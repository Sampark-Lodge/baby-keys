/**
 * Discovery World - Game 2 (Surprise Discovery Engine)
 * Extended from BaseActivity.
 * Features randomized multi-reactions per object for rich replayability without failure or timer mechanics.
 */

class DiscoveryWorld extends BaseActivity {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.env = 'garden';
        this.animId = null;

        this.objects = [];
        this.particles = [];
        this.ripples = [];

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
        this.setupScene();
    }

    start() {
        super.start();
        this.resize();
        this.loop();
    }

    stop() {
        super.stop();
        if (this.animId) {
            cancelAnimationFrame(this.animId);
        }
    }

    setEnvironment(envName) {
        this.env = envName;
        this.setupScene();
    }

    setupScene() {
        this.objects = [];
        this.particles = [];
        this.ripples = [];
        const w = this.canvas.width;
        const h = this.canvas.height;
        const density = storageSystem ? storageSystem.settings.density : 'normal';

        if (this.env === 'garden') {
            this.objects.push({ id: 'sun', x: w * 0.15, y: h * 0.18, size: 75, emoji: '☀️', altEmoji: '😎', type: 'sun' });
            this.objects.push({ id: 'cloud1', x: w * 0.45, y: h * 0.15, size: 85, emoji: '☁️', vx: 0.3, type: 'cloud' });
            this.objects.push({ id: 'tree', x: w * 0.82, y: h * 0.65, size: 125, emoji: '🌳', type: 'tree' });
            this.objects.push({ id: 'bird', x: w * 0.78, y: h * 0.45, size: 48, emoji: '🐦', type: 'bird' });
            this.objects.push({ id: 'pond', x: w * 0.35, y: h * 0.78, size: 115, emoji: '🌊', type: 'pond' });
            this.objects.push({ id: 'frog', x: w * 0.32, y: h * 0.74, size: 52, emoji: '🐸', type: 'frog' });
            this.objects.push({ id: 'flower1', x: w * 0.12, y: h * 0.8, size: 55, emoji: '🌸', type: 'flower' });

            if (density !== 'low') {
                this.objects.push({ id: 'flower2', x: w * 0.22, y: h * 0.84, size: 50, emoji: '🌻', type: 'flower' });
                this.objects.push({ id: 'butterfly', x: w * 0.5, y: h * 0.55, size: 45, emoji: '🦋', type: 'butterfly' });
            }
        } else if (this.env === 'farm') {
            this.objects.push({ id: 'sun', x: w * 0.85, y: h * 0.18, size: 75, emoji: '🌞', type: 'sun' });
            this.objects.push({ id: 'barn', x: w * 0.2, y: h * 0.62, size: 130, emoji: '🏠', type: 'barn' });
            this.objects.push({ id: 'cow', x: w * 0.45, y: h * 0.72, size: 70, emoji: '🐮', sound: 'cow', type: 'animal' });
            this.objects.push({ id: 'sheep', x: w * 0.65, y: h * 0.75, size: 60, emoji: '🐑', sound: 'sheep', type: 'animal' });

            if (density !== 'low') {
                this.objects.push({ id: 'pig', x: w * 0.8, y: h * 0.78, size: 55, emoji: '🐷', sound: 'pig', type: 'animal' });
                this.objects.push({ id: 'rooster', x: w * 0.22, y: h * 0.42, size: 45, emoji: '🐓', sound: 'bird', type: 'animal' });
            }
        } else if (this.env === 'ocean') {
            this.objects.push({ id: 'turtle', x: w * 0.25, y: h * 0.35, size: 70, emoji: '🐢', sound: 'calm', type: 'animal' });
            this.objects.push({ id: 'jelly', x: w * 0.7, y: h * 0.3, size: 65, emoji: '🪼', type: 'jelly' });
            this.objects.push({ id: 'chest', x: w * 0.8, y: h * 0.82, size: 65, emoji: '💎', type: 'chest' });
            this.objects.push({ id: 'crab', x: w * 0.3, y: h * 0.85, size: 55, emoji: '🦀', type: 'animal' });

            if (density !== 'low') {
                this.objects.push({ id: 'fish1', x: w * 0.15, y: h * 0.65, size: 55, emoji: '🐠', type: 'animal' });
                this.objects.push({ id: 'sub', x: w * 0.5, y: h * 0.5, size: 75, emoji: '🟡', type: 'sub' });
            }
        } else if (this.env === 'sky') {
            this.objects.push({ id: 'sun', x: w * 0.5, y: h * 0.2, size: 90, emoji: '☀️', type: 'sun' });
            this.objects.push({ id: 'rainbow', x: w * 0.5, y: h * 0.45, size: 140, emoji: '🌈', type: 'rainbow' });
            this.objects.push({ id: 'balloon1', x: w * 0.8, y: h * 0.4, size: 70, emoji: '🎈', type: 'balloon' });
            this.objects.push({ id: 'cloud1', x: w * 0.25, y: h * 0.6, size: 85, emoji: '☁️', vx: 0.5, type: 'cloud' });
        } else if (this.env === 'night') {
            this.objects.push({ id: 'moon', x: w * 0.8, y: h * 0.2, size: 85, emoji: '🌙', type: 'sun' });
            this.objects.push({ id: 'owl', x: w * 0.2, y: h * 0.35, size: 60, emoji: '🦉', sound: 'bird', type: 'animal' });
            this.objects.push({ id: 'fox', x: w * 0.75, y: h * 0.78, size: 55, emoji: '🦊', sound: 'dog', type: 'animal' });
        }
    }

    handleTouch(x, y) {
        super.handleTouch(x, y);

        let touchedObj = null;
        for (let i = this.objects.length - 1; i >= 0; i--) {
            const obj = this.objects[i];
            const dist = Math.hypot(x - obj.x, y - obj.y);
            if (dist < obj.size * 0.85) {
                touchedObj = obj;
                break;
            }
        }

        if (touchedObj) {
            this.reactToObject(touchedObj, x, y);
        } else {
            this.addSparkles(x, y, '#ffffff', 5);
            if (typeof audioSystem !== 'undefined') audioSystem.playRandomNote();
        }
    }

    // SURPRISE DISCOVERY: Randomized multi-reactions!
    reactToObject(obj, x, y) {
        if (typeof audioSystem !== 'undefined') {
            if (obj.sound) audioSystem.playAnimalSound(obj.sound);
            else if (obj.type === 'sun') audioSystem.playChime();
            else if (obj.type === 'frog' || obj.type === 'pond') audioSystem.playRipple();
            else audioSystem.playRandomNote();
        }

        const surprise = Math.random();

        switch (obj.type) {
            case 'tree':
                if (surprise < 0.35) {
                    // Leaves drop
                    this.spawnParticles(obj.x, obj.y, '🍃', 5);
                } else if (surprise < 0.7) {
                    // Red Apples drop
                    this.spawnParticles(obj.x, obj.y, '🍎', 4);
                } else {
                    // Bird appears & flies up
                    this.particles.push({ x: obj.x, y: obj.y - 30, vx: 1, vy: -2, emoji: '🐤', size: 30, life: 1.0 });
                }
                break;

            case 'flower':
                if (surprise < 0.5) {
                    obj.size = obj.size === 55 ? 75 : 55;
                    this.addSparkles(obj.x, obj.y, '#ff66bb', 8);
                } else {
                    // Butterfly flies out
                    this.particles.push({ x: obj.x, y: obj.y, vx: (Math.random() - 0.5) * 3, vy: -2, emoji: '🦋', size: 28, life: 1.0 });
                }
                break;

            case 'cloud':
                if (surprise < 0.5) {
                    // Rain sparkles
                    this.spawnParticles(obj.x, obj.y + 20, '💧', 4);
                } else {
                    // Heart drops
                    this.spawnParticles(obj.x, obj.y + 20, '❤️', 4);
                }
                obj.x += 35;
                break;

            case 'sun':
                const old = obj.emoji;
                obj.emoji = surprise < 0.5 ? '😎' : '🤩';
                setTimeout(() => obj.emoji = old, 1500);
                this.addSparkles(obj.x, obj.y, '#ffca3a', 12);
                break;

            default:
                obj.bounce = 1.3;
                this.addSparkles(obj.x, obj.y, '#ffffff', 6);
                break;
        }
    }

    spawnParticles(x, y, emoji, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 40,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: 1 + Math.random() * 2,
                emoji: emoji,
                size: 24,
                life: 1.0
            });
        }
    }

    addSparkles(x, y, color, count = 6) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 3,
                color: color,
                life: 1.0
            });
        }
    }

    update() {
        if (!this.active) return;

        for (const obj of this.objects) {
            if (obj.vx) {
                obj.x += obj.vx;
                if (obj.x > this.canvas.width + 80) obj.x = -80;
            }
            if (obj.bounce && obj.bounce > 1.0) {
                obj.bounce -= 0.05;
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx || 0;
            p.y += p.vy || 0;
            p.life -= 0.03;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    draw() {
        const envBg = {
            garden: ['#87CEEB', '#E0F6FF', '#7CFC00'],
            farm: ['#64B5F6', '#BBDEFB', '#81C784'],
            ocean: ['#0077BE', '#004488', '#001F3F'],
            sky: ['#4A90E2', '#50E3C2', '#B8E986'],
            night: ['#0B1021', '#141B36', '#1D264A']
        };

        const colors = envBg[this.env] || envBg.garden;

        const grad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        grad.addColorStop(0, colors[0]);
        grad.addColorStop(0.7, colors[1]);
        grad.addColorStop(1, colors[2]);
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (const obj of this.objects) {
            this.ctx.save();
            const scale = obj.bounce || 1.0;
            this.ctx.translate(obj.x, obj.y);
            this.ctx.scale(scale, scale);
            this.ctx.font = `${obj.size}px sans-serif`;
            this.ctx.fillText(obj.emoji, 0, 0);
            this.ctx.restore();
        }

        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            if (p.emoji) {
                this.ctx.font = `${p.size}px sans-serif`;
                this.ctx.fillText(p.emoji, p.x, p.y);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color || '#fff';
                this.ctx.fill();
            }
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
