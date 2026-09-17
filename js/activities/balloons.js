/**
 * Balloon Play Activity
 * Colorful balloons rise continuously; touch/click pops them with pop sounds and confetti bursts.
 */

class BalloonPlay {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.active = false;
        this.balloons = [];
        this.particles = [];
        this.animId = null;

        this.colors = ['#FF5964', '#FF924C', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', '#FF5992'];
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
        this.balloons = [];
        this.particles = [];
        for (let i = 0; i < 12; i++) {
            this.spawnBalloon(true);
        }
        this.loop();
    }

    stop() {
        this.active = false;
        if (this.animId) cancelAnimationFrame(this.animId);
    }

    spawnBalloon(randomY = false) {
        const radius = 40 + Math.random() * 45;
        this.balloons.push({
            x: Math.random() * this.canvas.width,
            y: randomY ? Math.random() * this.canvas.height : this.canvas.height + radius + 50,
            radius: radius,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            vy: -1.2 - Math.random() * 1.8,
            wobbleSpeed: 0.02 + Math.random() * 0.03,
            wobbleAmp: 1.5 + Math.random() * 2,
            phase: Math.random() * Math.PI * 2,
            popped: false
        });
    }

    handleTouch(x, y) {
        let poppedAny = false;
        for (let i = this.balloons.length - 1; i >= 0; i--) {
            const b = this.balloons[i];
            const dist = Math.hypot(x - b.x, y - b.y);
            if (dist < b.radius * 1.2 && !b.popped) {
                b.popped = true;
                poppedAny = true;

                if (typeof audioSystem !== 'undefined') audioSystem.playPop();
                if (typeof storageSystem !== 'undefined') storageSystem.recordBubblePopped();

                // Confetti particles
                for (let k = 0; k < 18; k++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 3 + Math.random() * 6;
                    this.particles.push({
                        x: b.x,
                        y: b.y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        size: 4 + Math.random() * 6,
                        color: this.colors[Math.floor(Math.random() * this.colors.length)],
                        life: 1.0
                    });
                }
                this.balloons.splice(i, 1);
                this.spawnBalloon();
                break;
            }
        }

        if (!poppedAny) {
            if (typeof audioSystem !== 'undefined') audioSystem.playRandomNote();
        }
    }

    update() {
        if (Math.random() < 0.03 && this.balloons.length < 16) {
            this.spawnBalloon();
        }

        for (let i = this.balloons.length - 1; i >= 0; i--) {
            const b = this.balloons[i];
            b.phase += b.wobbleSpeed;
            b.x += Math.sin(b.phase) * b.wobbleAmp;
            b.y += b.vy;

            if (b.y < -b.radius * 2) {
                this.balloons.splice(i, 1);
                this.spawnBalloon();
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.025;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw() {
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        grad.addColorStop(0, '#101227');
        grad.addColorStop(1, '#231942');
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Balloons
        for (const b of this.balloons) {
            this.ctx.save();

            // String
            this.ctx.beginPath();
            this.ctx.moveTo(b.x, b.y + b.radius * 1.1);
            this.ctx.quadraticCurveTo(
                b.x + Math.sin(b.phase) * 15,
                b.y + b.radius * 1.1 + 25,
                b.x,
                b.y + b.radius * 1.1 + 50
            );
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Oval Balloon Body
            this.ctx.beginPath();
            this.ctx.ellipse(b.x, b.y, b.radius * 0.85, b.radius * 1.1, 0, 0, Math.PI * 2);

            const bGrad = this.ctx.createRadialGradient(
                b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.1,
                b.x, b.y, b.radius * 1.1
            );
            bGrad.addColorStop(0, '#ffffff');
            bGrad.addColorStop(0.3, b.color);
            bGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

            this.ctx.fillStyle = bGrad;
            this.ctx.fill();

            // Knot
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y + b.radius * 1.1, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = b.color;
            this.ctx.fill();

            this.ctx.restore();
        }

        // Draw Confetti
        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, p.size, p.size);
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
