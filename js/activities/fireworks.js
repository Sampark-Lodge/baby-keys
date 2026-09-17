/**
 * Fireworks Activity
 * Touch/click anywhere creates colorful particle fireworks with musical chimes.
 */

class FireworksPlay {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.active = false;
        this.fireworks = [];
        this.animId = null;

        this.colors = ['#FF5964', '#FF924C', '#FFCA3A', '#8AC926', '#1982C4', '#aa66ff', '#FF5992', '#ffffff'];
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
        this.active = true;
        this.resize();
        this.fireworks = [];
        this.loop();
    }

    stop() {
        this.active = false;
        if (this.animId) cancelAnimationFrame(this.animId);
    }

    handleTouch(x, y) {
        if (typeof audioSystem !== 'undefined') {
            audioSystem.playChime();
        }

        const count = 35 + Math.floor(Math.random() * 25);
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 8;
            this.fireworks.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 2 + Math.random() * 4,
                color: Math.random() > 0.3 ? color : this.colors[Math.floor(Math.random() * this.colors.length)],
                alpha: 1.0,
                decay: 0.015 + Math.random() * 0.02
            });
        }
    }

    update() {
        // Auto ambient fireworks occasionally
        if (Math.random() < 0.015 && this.fireworks.length < 150) {
            this.handleTouch(
                100 + Math.random() * (this.canvas.width - 200),
                100 + Math.random() * (this.canvas.height * 0.6)
            );
        }

        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const p = this.fireworks[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08; // gravity
            p.vx *= 0.98;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.fireworks.splice(i, 1);
            }
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(10, 10, 20, 0.25)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (const p of this.fireworks) {
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
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
