/**
 * Baby Keys - Learning Worlds Data
 * Data-driven educational items for Alphabet, Numbers, Colours, Shapes, Animals, Objects, and Music.
 */

const BABY_WORLDS_DATA = {
    alphabet: [
        { symbol: 'A', name: 'Apple', emoji: '🍎', sound: 'A for Apple' },
        { symbol: 'B', name: 'Bear', emoji: '🐻', sound: 'B for Bear' },
        { symbol: 'C', name: 'Cat', emoji: '🐱', sound: 'C for Cat' },
        { symbol: 'D', name: 'Dog', emoji: '🐶', sound: 'D for Dog' },
        { symbol: 'E', name: 'Elephant', emoji: '🐘', sound: 'E for Elephant' },
        { symbol: 'F', name: 'Frog', emoji: '🐸', sound: 'F for Frog' },
        { symbol: 'G', name: 'Giraffe', emoji: '🦒', sound: 'G for Giraffe' },
        { symbol: 'H', name: 'Hippo', emoji: '🦛', sound: 'H for Hippo' },
        { symbol: 'I', name: 'Ice Cream', emoji: '🍦', sound: 'I for Ice Cream' },
        { symbol: 'J', name: 'Jellyfish', emoji: '🪼', sound: 'J for Jellyfish' },
        { symbol: 'K', name: 'Koala', emoji: '🐨', sound: 'K for Koala' },
        { symbol: 'L', name: 'Lion', emoji: '🦁', sound: 'L for Lion' },
        { symbol: 'M', name: 'Monkey', emoji: '🐵', sound: 'M for Monkey' },
        { symbol: 'N', name: 'Nest', emoji: '🪹', sound: 'N for Nest' },
        { symbol: 'O', name: 'Owl', emoji: '🦉', sound: 'O for Owl' },
        { symbol: 'P', name: 'Penguin', emoji: '🐧', sound: 'P for Penguin' },
        { symbol: 'Q', name: 'Queen', emoji: '👑', sound: 'Q for Queen' },
        { symbol: 'R', name: 'Rabbit', emoji: '🐰', sound: 'R for Rabbit' },
        { symbol: 'S', name: 'Sun', emoji: '☀️', sound: 'S for Sun' },
        { symbol: 'T', name: 'Tiger', emoji: '🐯', sound: 'T for Tiger' },
        { symbol: 'U', name: 'Unicorn', emoji: '🦄', sound: 'U for Unicorn' },
        { symbol: 'V', name: 'Violin', emoji: '🎻', sound: 'V for Violin' },
        { symbol: 'W', name: 'Whale', emoji: '🐳', sound: 'W for Whale' },
        { symbol: 'X', name: 'Xylophone', emoji: '🎼', sound: 'X for Xylophone' },
        { symbol: 'Y', name: 'Yacht', emoji: '⛵', sound: 'Y for Yacht' },
        { symbol: 'Z', name: 'Zebra', emoji: '🦓', sound: 'Z for Zebra' }
    ],

    numbers: [
        { symbol: '1', name: 'One Apple', emoji: '🍎', count: 1 },
        { symbol: '2', name: 'Two Ducks', emoji: '🦆🦆', count: 2 },
        { symbol: '3', name: 'Three Stars', emoji: '⭐⭐⭐', count: 3 },
        { symbol: '4', name: 'Four Hearts', emoji: '❤️❤️❤️❤️', count: 4 },
        { symbol: '5', name: 'Five Balloons', emoji: '🎈🎈🎈🎈🎈', count: 5 },
        { symbol: '6', name: 'Six Flowers', emoji: '🌸🌸🌸🌸🌸🌸', count: 6 },
        { symbol: '7', name: 'Seven Bees', emoji: '🐝🐝🐝🐝🐝🐝🐝', count: 7 },
        { symbol: '8', name: 'Eight Sparkles', emoji: '✨✨✨✨✨✨✨✨', count: 8 },
        { symbol: '9', name: 'Nine Fish', emoji: '🐠🐠🐠🐠🐠🐠🐠🐠🐠', count: 9 },
        { symbol: '10', name: 'Ten Stars', emoji: '🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', count: 10 }
    ],

    colours: [
        { name: 'Red', hex: '#FF3B30', emoji: '🔴', sample: '🍎' },
        { name: 'Blue', hex: '#007AFF', emoji: '🔵', sample: '🐳' },
        { name: 'Yellow', hex: '#FFCC00', emoji: '🟡', sample: '☀️' },
        { name: 'Green', hex: '#34C759', emoji: '🟢', sample: '🍃' },
        { name: 'Orange', hex: '#FF9500', emoji: '🟠', sample: '🍊' },
        { name: 'Purple', hex: '#AF52DE', emoji: '🟣', sample: '🍇' },
        { name: 'Pink', hex: '#FF2D55', emoji: '🩷', sample: '🌸' },
        { name: 'Black', hex: '#1C1C1E', emoji: '⚫', sample: '🕶️' },
        { name: 'White', hex: '#FFFFFF', emoji: '⚪', sample: '☁️' }
    ],

    shapes: [
        { name: 'Circle', emoji: '🔴', path: 'circle' },
        { name: 'Square', emoji: '🟦', path: 'square' },
        { name: 'Triangle', emoji: '🔺', path: 'triangle' },
        { name: 'Star', emoji: '⭐', path: 'star' },
        { name: 'Heart', emoji: '❤️', path: 'heart' },
        { name: 'Oval', emoji: '🥚', path: 'oval' }
    ],

    animals: [
        { name: 'Dog', emoji: '🐶', sound: 'Woof woof!' },
        { name: 'Cat', emoji: '🐱', sound: 'Meow!' },
        { name: 'Cow', emoji: '🐮', sound: 'Moo!' },
        { name: 'Elephant', emoji: '🐘', sound: 'Trumpet!' },
        { name: 'Lion', emoji: '🦁', sound: 'Roar!' },
        { name: 'Monkey', emoji: '🐵', sound: 'Ooh ooh ah ah!' },
        { name: 'Frog', emoji: '🐸', sound: 'Ribbit!' },
        { name: 'Chicken', emoji: '🐔', sound: 'Cluck cluck!' },
        { name: 'Sheep', emoji: '🐑', sound: 'Baa baa!' },
        { name: 'Horse', emoji: '🐴', sound: 'Neigh!' }
    ],

    objects: [
        { name: 'Ball', emoji: '⚽' },
        { name: 'Cup', emoji: '🥛' },
        { name: 'Car', emoji: '🚗' },
        { name: 'Book', emoji: '📖' },
        { name: 'Shoe', emoji: '👟' },
        { name: 'Apple', emoji: '🍎' },
        { name: 'Chair', emoji: '🪑' },
        { name: 'Bed', emoji: '🛏️' },
        { name: 'Phone', emoji: '📱' }
    ]
};
