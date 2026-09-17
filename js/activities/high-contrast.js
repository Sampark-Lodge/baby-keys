/**
 * High Contrast Activity
 * Designed for newborn and infant sensory development (stark black, white, red, yellow high-contrast geometric shapes).
 */

class HighContrastPlay {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.active = false;
        this.shapes = [];
        this.animId = null;

        this.colors = ['#FFFFFF', '#FF0000', '#FFFF00', '#000000'];
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
        this.setupShapes();
    }

    start() {
        this.active = true;
        this.resize();
        this.loop();
    }

    stop() {
        this.active = false;
        if (this.animId) cancelAnimationFrame(this.animId);
    }

    setupShapes() {
        this.shapes = [];
        const types = ['circle', 'square', 'ring', 'star'];
        for (let i = 0; i < 6; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 60 + Math.random() * 80,
                color: this.colors[i % this.colors.length],
                bgColor: i % 2 === 0 ? '#000000' : '#FFFFFF',
                type: types[i % types.length],
                pulse: Math.random() * Math.PI * 2,
                speed: 0.02 + Math.random() * 0.02
            });
        }
    }

    handleTouch(x, y) {
        if (typeof audioSystem !== 'undefined') {
            audioSystem.playRandomNote();
        }

        this.shapes.push({
            x: x,
            y: y,
            size: 80 + Math.random() * 60,
            color: this.colors[Math.floor(Math.random() * (this.colors.length - 1))],
            type: ['circle', 'square', 'ring', 'star'][Math.floor(Math.random() * 4)],
            pulse: 0,
            speed: 0.03
        });

        if (this.shapes.length > 10) {
            this.shapes.shift();
        }
    }

    update() {
        for (const s of this.shapes) {
            s.pulse += s.speed;
        }
    }

    draw() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (const s of this.shapes) {
            this.ctx.save();
            this.ctx.translate(s.x, s.y);
            const scale = 1 + Math.sin(s.pulse) * 0.2;
            this.ctx.scale(scale, scale);

            this.ctx.fillStyle = s.color;
            this.ctx.strokeStyle = s.color === '#000000' ? '#FFFFFF' : '#000000';
            this.ctx.lineWidth = 6;

            if (s.type === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
            } else if (s.type === 'ring') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
                this.ctx.lineWidth = 14;
                this.ctx.stroke();
            } else if (s.type === 'square') {
                this.ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
                this.ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
            } else {
                // High contrast star/cross
                this.ctx.fillRect(-s.size / 6, -s.size / 2, s.size / 3, s.size);
                this.ctx.fillRect(-s.size / 2, -s.size / 6, s.size, s.size / 3);
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
