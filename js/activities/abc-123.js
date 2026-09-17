/**
 * ABC & Numbers Learning Activity
 * Interactive visual letter and number cards with friendly emojis, speech synthesis, and next/prev controls.
 */

class ABC123Learning {
    constructor(container, mode = 'abc') {
        this.container = container;
        this.mode = mode; // 'abc' or 'numbers'
        this.active = false;
        this.currentIndex = 0;

        this.abcData = [
            { symbol: 'A', name: 'Apple', emoji: '🍎' },
            { symbol: 'B', name: 'Bear', emoji: '🐻' },
            { symbol: 'C', name: 'Cat', emoji: '🐱' },
            { symbol: 'D', name: 'Dog', emoji: '🐶' },
            { symbol: 'E', name: 'Elephant', emoji: '🐘' },
            { symbol: 'F', name: 'Frog', emoji: '🐸' },
            { symbol: 'G', name: 'Giraffe', emoji: '🦒' },
            { symbol: 'H', name: 'Hippo', emoji: '🦛' },
            { symbol: 'I', name: 'Ice Cream', emoji: '🍦' },
            { symbol: 'J', name: 'Jellyfish', emoji: '🪼' },
            { symbol: 'K', name: 'Koala', emoji: '🐨' },
            { symbol: 'L', name: 'Lion', emoji: '🦁' },
            { symbol: 'M', name: 'Monkey', emoji: '🐵' },
            { symbol: 'N', name: 'Nest', emoji: '🪹' },
            { symbol: 'O', name: 'Owl', emoji: '🦉' },
            { symbol: 'P', name: 'Penguin', emoji: '🐧' },
            { symbol: 'Q', name: 'Queen', emoji: '👑' },
            { symbol: 'R', name: 'Rabbit', emoji: '🐰' },
            { symbol: 'S', name: 'Sun', emoji: '☀️' },
            { symbol: 'T', name: 'Tiger', emoji: '🐯' },
            { symbol: 'U', name: 'Unicorn', emoji: '🦄' },
            { symbol: 'V', name: 'Violin', emoji: '🎻' },
            { symbol: 'W', name: 'Whale', emoji: '🐳' },
            { symbol: 'X', name: 'Xylophone', emoji: '🎼' },
            { symbol: 'Y', name: 'Yacht', emoji: '⛵' },
            { symbol: 'Z', name: 'Zebra', emoji: '🦓' }
        ];

        this.numberData = [
            { symbol: '1', name: 'One Star', emoji: '⭐' },
            { symbol: '2', name: 'Two Apples', emoji: '🍎🍎' },
            { symbol: '3', name: 'Three Ducks', emoji: '🦆🦆🦆' },
            { symbol: '4', name: 'Four Hearts', emoji: '❤️❤️❤️❤️' },
            { symbol: '5', name: 'Five Balloons', emoji: '🎈🎈🎈🎈🎈' },
            { symbol: '6', name: 'Six Flowers', emoji: '🌸🌸🌸🌸🌸🌸' },
            { symbol: '7', name: 'Seven Bees', emoji: '🐝🐝🐝🐝🐝🐝🐝' },
            { symbol: '8', name: 'Eight Stars', emoji: '🌟🌟🌟🌟🌟🌟🌟🌟' },
            { symbol: '9', name: 'Nine Fish', emoji: '🐠🐠🐠🐠🐠🐠🐠🐠🐠' },
            { symbol: '10', name: 'Ten Sparkles', emoji: '✨✨✨✨✨✨✨✨✨✨' }
        ];
    }

    start(mode = 'abc') {
        this.mode = mode;
        this.active = true;
        this.currentIndex = 0;
        this.render();
    }

    stop() {
        this.active = false;
        this.container.innerHTML = '';
    }

    getData() {
        return this.mode === 'abc' ? this.abcData : this.numberData;
    }

    render() {
        const data = this.getData();
        const item = data[this.currentIndex];

        this.container.innerHTML = `
            <div class="learning-display-container">
                <div class="learning-card" id="learning-card-el">
                    <span class="learning-symbol">${item.symbol}</span>
                    <span class="learning-item-emoji">${item.emoji}</span>
                    <span class="learning-item-name">${item.name}</span>
                </div>
                <div class="learning-nav">
                    <button class="learning-nav-btn" id="learning-prev">◀</button>
                    <button class="learning-nav-btn" id="learning-next">▶</button>
                </div>
            </div>
        `;

        const cardEl = this.container.querySelector('#learning-card-el');
        const prevBtn = this.container.querySelector('#learning-prev');
        const nextBtn = this.container.querySelector('#learning-next');

        const triggerItem = () => {
            if (typeof audioSystem !== 'undefined') {
                audioSystem.playRandomNote();
                audioSystem.speak(`${item.symbol}, ${item.name}`);
            }
        };

        cardEl.addEventListener('click', triggerItem);
        cardEl.addEventListener('touchstart', (e) => { e.preventDefault(); triggerItem(); }, { passive: false });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.currentIndex = (this.currentIndex - 1 + data.length) % data.length;
            this.render();
            triggerItem();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.currentIndex = (this.currentIndex + 1) % data.length;
            this.render();
            triggerItem();
        });

        triggerItem();
    }
}
