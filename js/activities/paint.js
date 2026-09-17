/**
 * Finger Painting Activity
 * Multi-touch rainbow trail canvas with stampers (stars, hearts, flowers) and clear function.
 */

class FingerPaint {
    constructor(canvas, toolbarContainer) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.toolbarContainer = toolbarContainer;
        this.active = false;
        this.currentTool = 'rainbow'; // rainbow, star, heart, flower
        this.isDrawing = false;
        this.hue = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.particles = [];
        this.animId = null;

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
        this.clear();
    }

    start() {
        this.active = true;
        this.resize();
        this.setupEvents();
        this.renderToolbar();
        this.loop();
    }

    stop() {
        this.active = false;
        if (this.animId) cancelAnimationFrame(this.animId);
        if (this.toolbarContainer) this.toolbarContainer.innerHTML = '';
    }

    clear() {
        this.ctx.fillStyle = '#0f1123';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderToolbar() {
        if (!this.toolbarContainer) return;
        this.toolbarContainer.innerHTML = `
            <button class="paint-tool-btn active" data-tool="rainbow" title="Rainbow Brush">🌈</button>
            <button class="paint-tool-btn" data-tool="star" title="Star Stamper">⭐</button>
            <button class="paint-tool-btn" data-tool="heart" title="Heart Stamper">❤️</button>
            <button class="paint-tool-btn" data-tool="flower" title="Flower Stamper">🌸</button>
            <button class="paint-tool-btn" id="paint-clear-btn" title="Clear Canvas">🗑️</button>
        `;

        this.toolbarContainer.querySelectorAll('.paint-tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (btn.id === 'paint-clear-btn') {
                    this.clear();
                    if (typeof audioSystem !== 'undefined') audioSystem.playRipple();
                    return;
                }
                this.toolbarContainer.querySelectorAll('.paint-tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTool = btn.dataset.tool;
            });
        });
    }

    setupEvents() {
        const handleStart = (e) => {
            if (!this.active) return;
            this.isDrawing = true;
            const pos = this.getPos(e);
            this.lastX = pos.x;
            this.lastY = pos.y;
            this.drawAt(pos.x, pos.y);
        };

        const handleMove = (e) => {
            if (!this.active || !this.isDrawing) return;
            const pos = this.getPos(e);
            this.drawAt(pos.x, pos.y);
            this.lastX = pos.x;
            this.lastY = pos.y;
        };

        const handleEnd = () => {
            this.isDrawing = false;
        };

        this.canvas.addEventListener('mousedown', handleStart);
        this.canvas.addEventListener('mousemove', handleMove);
        this.canvas.addEventListener('mouseup', handleEnd);

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleStart(e);
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            handleMove(e);
        }, { passive: false });

        this.canvas.addEventListener('touchend', handleEnd);
    }

    getPos(e) {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }

    drawAt(x, y) {
        if (typeof audioSystem !== 'undefined' && Math.random() < 0.15) {
            audioSystem.playRandomNote();
        }

        if (this.currentTool === 'rainbow') {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x, y);
            this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 65%)`;
            this.ctx.lineWidth = 24;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = `hsl(${this.hue}, 100%, 65%)`;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;

            this.hue = (this.hue + 4) % 360;

            // Glitter particles
            for (let i = 0; i < 2; i++) {
                this.particles.push({
                    x: x + (Math.random() - 0.5) * 20,
                    y: y + (Math.random() - 0.5) * 20,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: 2 + Math.random() * 4,
                    color: `hsl(${this.hue}, 100%, 80%)`,
                    life: 1.0
                });
            }
        } else {
            // Stamper (star, heart, flower)
            const emojiMap = { star: '⭐', heart: '❤️', flower: '🌸' };
            const emoji = emojiMap[this.currentTool] || '⭐';

            this.ctx.font = '45px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(emoji, x, y);

            for (let i = 0; i < 6; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: 3 + Math.random() * 3,
                    color: '#ffffff',
                    life: 1.0
                });
            }
        }
    }

    loop() {
        if (!this.active) return;

        // Draw and fade glitter particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.04;

            if (p.life > 0) {
                this.ctx.save();
                this.ctx.globalAlpha = p.life;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.fill();
                this.ctx.restore();
            } else {
                this.particles.splice(i, 1);
            }
        }

        this.animId = requestAnimationFrame(() => this.loop());
    }
}
