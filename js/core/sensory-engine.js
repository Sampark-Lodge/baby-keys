/**
 * Baby Keys - Sensory Visual Canvas Engine
 * 60 FPS particle physics, starbursts, and water ripples bounded by Feedback Governor.
 */

class BabySensoryEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.active = false;
        this.particles = [];
        this.ripples = [];
        this.bubbles = [];
        this.animId = null;

        // Ambient bubble + neon trail state
        this.bubbleTimer = 0;
        this.maxBubbles = 14;
        this.trailHue = 190;
        this.confettiColors = ['#ff4d6d', '#ffca3a', '#52b788', '#48cae4', '#4361ee', '#f72585', '#a855f7', '#ff85a1'];
    }

    attachCanvas(canvasEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        this.active = true;
        this.loop();
    }

    stop() {
        this.active = false;
        if (this.animId) cancelAnimationFrame(this.animId);
        this.particles = [];
        this.ripples = [];
        this.bubbles = [];
        feedbackGovernor.activeParticles = 0;
    }

    addSparkles(x, y, color = '#ffffff', count = 6) {
        const allowed = feedbackGovernor.calculateParticleCount(count);
        if (allowed <= 0) return;

        for (let i = 0; i < allowed; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            this.particles.push({
                x: x, y: y,
                vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 4,
                color: color,
                life: 1.0
            });
        }
        feedbackGovernor.onParticlesCreated(allowed);
    }

    addRipple(x, y, color = '#00e5ff') {
        this.ripples.push({
            x: x, y: y,
            radius: 8,
            maxRadius: 60,
            color: color,
            alpha: 1.0
        });
    }

    /**
     * Spacebar Burst Engine - multi-colored confetti explosion from screen center.
     */
    addBurst(count = 30) {
        const allowed = feedbackGovernor.calculateParticleCount(count);
        if (allowed <= 0) return;

        const cx = (this.canvas ? this.canvas.width : window.innerWidth) / 2;
        const cy = (this.canvas ? this.canvas.height : window.innerHeight) / 2;

        for (let i = 0; i < allowed; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 4 + Math.random() * 8;
            this.particles.push({
                x: cx + (Math.random() - 0.5) * 100,
                y: cy + (Math.random() - 0.5) * 100,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 4 + Math.random() * 5,
                color: this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)],
                life: 1.0,
                gravity: 0.18
            });
        }
        feedbackGovernor.onParticlesCreated(allowed);
    }

    /**
     * Touch/Drag Neon Trail - glowing rainbow sparkles following finger or mouse.
     */
    addTrail(x, y) {
        const allowed = feedbackGovernor.calculateParticleCount(3);
        if (allowed <= 0) return;

        this.trailHue = (this.trailHue + 14) % 360;
        const color = `hsl(${this.trailHue}, 100%, 65%)`;

        for (let i = 0; i < allowed; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 12,
                y: y + (Math.random() - 0.5) * 12,
                vx: (Math.random() - 0.5) * 1.6,
                vy: (Math.random() - 0.5) * 1.6,
                size: 3 + Math.random() * 3,
                color: color,
                life: 1.0,
                glow: true
            });
        }
        feedbackGovernor.onParticlesCreated(allowed);
    }

    /**
     * Ambient Floating Bubble - gentle translucent bubble rising from the bottom.
     */
    spawnBubble() {
        if (this.bubbles.length >= this.maxBubbles) return;
        const w = this.canvas ? this.canvas.width : window.innerWidth;
        const h = this.canvas ? this.canvas.height : window.innerHeight;
        this.bubbles.push({
            x: Math.random() * w,
            y: h + 30,
            radius: 10 + Math.random() * 30,
            speed: 0.4 + Math.random() * 0.9,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.02 + Math.random() * 0.03,
            hue: 180 + Math.random() * 90,
            alpha: 0.12 + Math.random() * 0.16
        });
    }

    update() {
        if (!this.active) return;

        // Ambient floating bubbles (gentler cadence in calm mode)
        this.bubbleTimer++;
        const bubbleInterval = feedbackGovernor.maxParticles <= 20 ? 100 : 50;
        if (this.bubbleTimer >= bubbleInterval) {
            this.bubbleTimer = 0;
            this.spawnBubble();
        }
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const b = this.bubbles[i];
            b.y -= b.speed;
            b.wobble += b.wobbleSpeed;
            b.x += Math.sin(b.wobble) * 0.6;
            if (b.y + b.radius < -40) this.bubbles.splice(i, 1);
        }

        // Ripples
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const r = this.ripples[i];
            r.radius += 2.5;
            r.alpha -= 0.03;
            if (r.alpha <= 0 || r.radius >= r.maxRadius) {
                this.ripples.splice(i, 1);
            }
        }

        // Particles
        let destroyed = 0;
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            if (p.gravity) p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.035;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                destroyed++;
            }
        }
        if (destroyed > 0) {
            feedbackGovernor.onParticlesDestroyed(destroyed);
        }
    }

    draw() {
        if (!this.active || !this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Ambient bubbles render behind particles/ripples
        for (const b of this.bubbles) {
            this.ctx.save();
            this.ctx.globalAlpha = b.alpha;
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsl(${b.hue}, 80%, 70%)`;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = `hsla(${b.hue}, 90%, 85%, 0.6)`;
            this.ctx.stroke();
            // Glossy highlight
            this.ctx.globalAlpha = b.alpha * 2.5;
            this.ctx.beginPath();
            this.ctx.arc(b.x - b.radius * 0.32, b.y - b.radius * 0.32, b.radius * 0.18, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.fill();
            this.ctx.restore();
        }

        for (const r of this.ripples) {
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, r.alpha);
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = r.color;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.ctx.restore();
        }

        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            if (p.glow) {
                this.ctx.shadowBlur = 14;
                this.ctx.shadowColor = p.color;
            }
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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

const sensoryEngine = new BabySensoryEngine();
