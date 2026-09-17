/**
 * Animal Sounds Activity
 * Grid of 12 friendly animated animal cards with bounce animations, sounds, and spoken names.
 */

class AnimalGrid {
    constructor(container) {
        this.container = container;
        this.active = false;
        this.animals = [
            { name: 'Dog', emoji: '🐶', soundKey: 'dog' },
            { name: 'Cat', emoji: '🐱', soundKey: 'cat' },
            { name: 'Duck', emoji: '🦆', soundKey: 'duck' },
            { name: 'Frog', emoji: '🐸', soundKey: 'frog' },
            { name: 'Lion', emoji: '🦁', soundKey: 'lion' },
            { name: 'Cow', emoji: '🐮', soundKey: 'cow' },
            { name: 'Sheep', emoji: '🐑', soundKey: 'sheep' },
            { name: 'Pig', emoji: '🐷', soundKey: 'pig' },
            { name: 'Bird', emoji: '🐤', soundKey: 'bird' },
            { name: 'Monkey', emoji: '🐵', soundKey: 'monkey' },
            { name: 'Owl', emoji: '🦉', soundKey: 'owl' },
            { name: 'Penguin', emoji: '🐧', soundKey: 'penguin' }
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
            <div class="animals-grid">
                ${this.animals.map(a => `
                    <div class="animal-card" data-sound="${a.soundKey}" data-name="${a.name}">
                        <span class="animal-emoji">${a.emoji}</span>
                        <span class="animal-name">${a.name}</span>
                    </div>
                `).join('')}
            </div>
        `;

        this.container.querySelectorAll('.animal-card').forEach(card => {
            const soundKey = card.dataset.sound;
            const name = card.dataset.name;

            const handleTap = (e) => {
                e.preventDefault();
                e.stopPropagation();

                card.classList.add('animating');
                setTimeout(() => card.classList.remove('animating'), 600);

                if (typeof audioSystem !== 'undefined') {
                    audioSystem.playAnimalSound(soundKey);
                    audioSystem.speak(name);
                }
            };

            card.addEventListener('click', handleTap);
            card.addEventListener('touchstart', handleTap, { passive: false });
        });
    }
}
