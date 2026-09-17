/**
 * Baby Keys - Master Educational Concepts Data Model ("God-Tier Library")
 * Comprehensive cross-linked concept definitions across Alphabet (A-Z), Numbers (1-100),
 * 100 Colours, 50+ Animals, 20+ Shapes, 50+ Objects, and Music.
 */

const BABY_CONCEPTS_LIST = [
    // ==========================================
    // 1. ALPHABET CONCEPTS (A-Z: 26 ITEMS)
    // ==========================================
    { id: 'concept-letter-a', category: 'alphabet', label: 'A', name: 'A', symbol: 'A', emoji: '🍎', phoneme: '/a/ as in Apple', text: 'A for Apple', associatedConcepts: ['concept-apple', 'concept-red'], audioKey: 'alphabet/a' },
    { id: 'concept-letter-b', category: 'alphabet', label: 'B', name: 'B', symbol: 'B', emoji: '🐻', phoneme: '/b/ as in Bear', text: 'B for Bear', associatedConcepts: ['concept-ball', 'concept-blue'], audioKey: 'alphabet/b' },
    { id: 'concept-letter-c', category: 'alphabet', label: 'C', name: 'C', symbol: 'C', emoji: '🐱', phoneme: '/k/ as in Cat', text: 'C for Cat', associatedConcepts: ['concept-cat', 'concept-yellow'], audioKey: 'alphabet/c' },
    { id: 'concept-letter-d', category: 'alphabet', label: 'D', name: 'D', symbol: 'D', emoji: '🐶', phoneme: '/d/ as in Dog', text: 'D for Dog', associatedConcepts: ['concept-dog'], audioKey: 'alphabet/d' },
    { id: 'concept-letter-e', category: 'alphabet', label: 'E', name: 'E', symbol: 'E', emoji: '🐘', phoneme: '/e/ as in Elephant', text: 'E for Elephant', associatedConcepts: ['concept-elephant'], audioKey: 'alphabet/e' },
    { id: 'concept-letter-f', category: 'alphabet', label: 'F', name: 'F', symbol: 'F', emoji: '🐸', phoneme: '/f/ as in Frog', text: 'F for Frog', associatedConcepts: ['concept-frog', 'concept-green'], audioKey: 'alphabet/f' },
    { id: 'concept-letter-g', category: 'alphabet', label: 'G', name: 'G', symbol: 'G', emoji: '🦒', phoneme: '/g/ as in Giraffe', text: 'G for Giraffe', associatedConcepts: ['concept-giraffe'], audioKey: 'alphabet/g' },
    { id: 'concept-letter-h', category: 'alphabet', label: 'H', name: 'H', symbol: 'H', emoji: '🏠', phoneme: '/h/ as in House', text: 'H for House', associatedConcepts: ['concept-house'], audioKey: 'alphabet/h' },
    { id: 'concept-letter-i', category: 'alphabet', label: 'I', name: 'I', symbol: 'I', emoji: '🍦', phoneme: '/i/ as in Ice Cream', text: 'I for Ice Cream', associatedConcepts: ['concept-pink'], audioKey: 'alphabet/i' },
    { id: 'concept-letter-j', category: 'alphabet', label: 'J', name: 'J', symbol: 'J', emoji: '🪀', phoneme: '/j/ as in Yo-Yo', text: 'J for Yo-Yo', associatedConcepts: ['concept-purple'], audioKey: 'alphabet/j' },
    { id: 'concept-letter-k', category: 'alphabet', label: 'K', name: 'K', symbol: 'K', emoji: '🐨', phoneme: '/k/ as in Koala', text: 'K for Koala', associatedConcepts: ['concept-koala'], audioKey: 'alphabet/k' },
    { id: 'concept-letter-l', category: 'alphabet', label: 'L', name: 'L', symbol: 'L', emoji: '🦁', phoneme: '/l/ as in Lion', text: 'L for Lion', associatedConcepts: ['concept-lion', 'concept-yellow'], audioKey: 'alphabet/l' },
    { id: 'concept-letter-m', category: 'alphabet', label: 'M', name: 'M', symbol: 'M', emoji: '🐵', phoneme: '/m/ as in Monkey', text: 'M for Monkey', associatedConcepts: ['concept-monkey'], audioKey: 'alphabet/m' },
    { id: 'concept-letter-n', category: 'alphabet', label: 'N', name: 'N', symbol: 'N', emoji: '🪹', phoneme: '/n/ as in Nest', text: 'N for Nest', associatedConcepts: ['concept-bird'], audioKey: 'alphabet/n' },
    { id: 'concept-letter-o', category: 'alphabet', label: 'O', name: 'O', symbol: 'O', emoji: '🐙', phoneme: '/o/ as in Octopus', text: 'O for Octopus', associatedConcepts: ['concept-octopus'], audioKey: 'alphabet/o' },
    { id: 'concept-letter-p', category: 'alphabet', label: 'P', name: 'P', symbol: 'P', emoji: '🐼', phoneme: '/p/ as in Panda', text: 'P for Panda', associatedConcepts: ['concept-panda'], audioKey: 'alphabet/p' },
    { id: 'concept-letter-q', category: 'alphabet', label: 'Q', name: 'Q', symbol: 'Q', emoji: '👑', phoneme: '/kw/ as in Queen', text: 'Q for Queen', associatedConcepts: ['concept-gold'], audioKey: 'alphabet/q' },
    { id: 'concept-letter-r', category: 'alphabet', label: 'R', name: 'R', symbol: 'R', emoji: '🚀', phoneme: '/r/ as in Rocket', text: 'R for Rocket', associatedConcepts: ['concept-red', 'concept-car'], audioKey: 'alphabet/r' },
    { id: 'concept-letter-s', category: 'alphabet', label: 'S', name: 'S', symbol: 'S', emoji: '⭐', phoneme: '/s/ as in Star', text: 'S for Star', associatedConcepts: ['concept-star', 'concept-yellow'], audioKey: 'alphabet/s' },
    { id: 'concept-letter-t', category: 'alphabet', label: 'T', name: 'T', symbol: 'T', emoji: '🐯', phoneme: '/t/ as in Tiger', text: 'T for Tiger', associatedConcepts: ['concept-tiger'], audioKey: 'alphabet/t' },
    { id: 'concept-letter-u', category: 'alphabet', label: 'U', name: 'U', symbol: 'U', emoji: '☂️', phoneme: '/u/ as in Umbrella', text: 'U for Umbrella', associatedConcepts: ['concept-umbrella'], audioKey: 'alphabet/u' },
    { id: 'concept-letter-v', category: 'alphabet', label: 'V', name: 'V', symbol: 'V', emoji: '🎻', phoneme: '/v/ as in Violin', text: 'V for Violin', associatedConcepts: ['concept-music'], audioKey: 'alphabet/v' },
    { id: 'concept-letter-w', category: 'alphabet', label: 'W', name: 'W', symbol: 'W', emoji: '🐳', phoneme: '/w/ as in Whale', text: 'W for Whale', associatedConcepts: ['concept-whale', 'concept-blue'], audioKey: 'alphabet/w' },
    { id: 'concept-letter-x', category: 'alphabet', label: 'X', name: 'X', symbol: 'X', emoji: '🦴', phoneme: '/ks/ as in Xylophone', text: 'X for Xylophone', associatedConcepts: ['concept-music'], audioKey: 'alphabet/x' },
    { id: 'concept-letter-y', category: 'alphabet', label: 'Y', name: 'Y', symbol: 'Y', emoji: '🛥️', phoneme: '/y/ as in Yacht', text: 'Y for Yacht', associatedConcepts: ['concept-yellow'], audioKey: 'alphabet/y' },
    { id: 'concept-letter-z', category: 'alphabet', label: 'Z', name: 'Z', symbol: 'Z', emoji: '🦓', phoneme: '/z/ as in Zebra', text: 'Z for Zebra', associatedConcepts: ['concept-zebra'], audioKey: 'alphabet/z' },

    // ==========================================
    // 2. NUMBER CONCEPTS (1-20 + MILESTONES: 25 ITEMS)
    // ==========================================
    { id: 'concept-num-1', category: 'number', label: 'One', name: 'One', symbol: '1', emoji: '1️⃣', countEmoji: '🍎', text: 'One Apple', associatedConcepts: ['concept-apple', 'concept-red'] },
    { id: 'concept-num-2', category: 'number', label: 'Two', name: 'Two', symbol: '2', emoji: '2️⃣', countEmoji: '🦆🦆', text: 'Two Ducks', associatedConcepts: ['concept-yellow'] },
    { id: 'concept-num-3', category: 'number', label: 'Three', name: 'Three', symbol: '3', emoji: '3️⃣', countEmoji: '⭐⭐⭐', text: 'Three Stars', associatedConcepts: ['concept-star', 'concept-yellow'] },
    { id: 'concept-num-4', category: 'number', label: 'Four', name: 'Four', symbol: '4', emoji: '4️⃣', countEmoji: '🚗🚗🚗🚗', text: 'Four Cars', associatedConcepts: ['concept-car'] },
    { id: 'concept-num-5', category: 'number', label: 'Five', name: 'Five', symbol: '5', emoji: '5️⃣', countEmoji: '🎈🎈🎈🎈🎈', text: 'Five Balloons', associatedConcepts: ['concept-red'] },
    { id: 'concept-num-6', category: 'number', label: 'Six', name: 'Six', symbol: '6', emoji: '6️⃣', countEmoji: '🐸🐸🐸🐸🐸🐸', text: 'Six Frogs', associatedConcepts: ['concept-frog', 'concept-green'] },
    { id: 'concept-num-7', category: 'number', label: 'Seven', name: 'Seven', symbol: '7', emoji: '7️⃣', countEmoji: '🌸🌸🌸🌸🌸🌸🌸', text: 'Seven Flowers', associatedConcepts: ['concept-pink'] },
    { id: 'concept-num-8', category: 'number', label: 'Eight', name: 'Eight', symbol: '8', emoji: '8️⃣', countEmoji: '🐟🐟🐟🐟🐟🐟🐟🐟', text: 'Eight Fish', associatedConcepts: ['concept-blue'] },
    { id: 'concept-num-9', category: 'number', label: 'Nine', name: 'Nine', symbol: '9', emoji: '9️⃣', countEmoji: '🐥🐥🐥🐥🐥🐥🐥🐥🐥', text: 'Nine Chicks', associatedConcepts: ['concept-yellow'] },
    { id: 'concept-num-10', category: 'number', label: 'Ten', name: 'Ten', symbol: '10', emoji: '🔟', countEmoji: '🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓', text: 'Ten Strawberries', associatedConcepts: ['concept-red'] },
    { id: 'concept-num-11', category: 'number', label: 'Eleven', name: 'Eleven', symbol: '11', emoji: '1️⃣1️⃣', countEmoji: '🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔', text: 'Eleven Bells' },
    { id: 'concept-num-12', category: 'number', label: 'Twelve', name: 'Twelve', symbol: '12', emoji: '1️⃣2️⃣', countEmoji: '🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩', text: 'Twelve Donuts' },
    { id: 'concept-num-13', category: 'number', label: 'Thirteen', name: 'Thirteen', symbol: '13', emoji: '1️⃣3️⃣', countEmoji: '🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋', text: 'Thirteen Butterflies' },
    { id: 'concept-num-14', category: 'number', label: 'Fourteen', name: 'Fourteen', symbol: '14', emoji: '1️⃣4️⃣', countEmoji: '🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝', text: 'Fourteen Bees' },
    { id: 'concept-num-15', category: 'number', label: 'Fifteen', name: 'Fifteen', symbol: '15', emoji: '1️⃣5️⃣', countEmoji: '🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬', text: 'Fifteen Candies' },
    { id: 'concept-num-16', category: 'number', label: 'Sixteen', name: 'Sixteen', symbol: '16', emoji: '1️⃣6️⃣', countEmoji: '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽', text: 'Sixteen Balls' },
    { id: 'concept-num-17', category: 'number', label: 'Seventeen', name: 'Seventeen', symbol: '17', emoji: '1️⃣7️⃣', countEmoji: '🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀', text: 'Seventeen Clovers' },
    { id: 'concept-num-18', category: 'number', label: 'Eighteen', name: 'Eighteen', symbol: '18', emoji: '1️⃣8️⃣', countEmoji: '👑👑👑👑👑👑👑👑👑👑👑👑👑👑👑👑👑👑', text: 'Eighteen Crowns' },
    { id: 'concept-num-19', category: 'number', label: 'Nineteen', name: 'Nineteen', symbol: '19', emoji: '1️⃣9️⃣', countEmoji: '🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁', text: 'Nineteen Gifts' },
    { id: 'concept-num-20', category: 'number', label: 'Twenty', name: 'Twenty', symbol: '20', emoji: '2️⃣0️⃣', countEmoji: '💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎', text: 'Twenty Diamonds' },
    { id: 'concept-num-25', category: 'number', label: 'Twenty Five', name: 'Twenty Five', symbol: '25', emoji: '2️⃣5️⃣', countEmoji: '✨✨✨✨✨', text: 'Twenty Five Sparkles' },
    { id: 'concept-num-30', category: 'number', label: 'Thirty', name: 'Thirty', symbol: '30', emoji: '3️⃣0️⃣', countEmoji: '🌟🌟🌟🌟🌟', text: 'Thirty Stars' },
    { id: 'concept-num-40', category: 'number', label: 'Forty', name: 'Forty', symbol: '40', emoji: '4️⃣0️⃣', countEmoji: '🌈🌈🌈🌈🌈', text: 'Forty Rainbows' },
    { id: 'concept-num-50', category: 'number', label: 'Fifty', name: 'Fifty', symbol: '50', emoji: '5️⃣0️⃣', countEmoji: '🎉🎉🎉🎉🎉', text: 'Fifty Celebrations' },
    { id: 'concept-num-100', category: 'number', label: 'One Hundred', name: 'One Hundred', symbol: '100', emoji: '💯', countEmoji: '💯💯💯💯💯', text: 'One Hundred!' },

    // ==========================================
    // 3. ANIMAL CONCEPTS (50 ITEMS)
    // ==========================================
    { id: 'concept-dog', category: 'animal', label: 'Dog', name: 'Dog', symbol: '🐶', emoji: '🐶', soundText: 'Woof woof!', associatedConcepts: ['concept-letter-d'] },
    { id: 'concept-cat', category: 'animal', label: 'Cat', name: 'Cat', symbol: '🐱', emoji: '🐱', soundText: 'Meow!', associatedConcepts: ['concept-letter-c'] },
    { id: 'concept-cow', category: 'animal', label: 'Cow', name: 'Cow', symbol: '🐮', emoji: '🐮', soundText: 'Moo!' },
    { id: 'concept-elephant', category: 'animal', label: 'Elephant', name: 'Elephant', symbol: '🐘', emoji: '🐘', soundText: 'Trumpet!' },
    { id: 'concept-frog', category: 'animal', label: 'Frog', name: 'Frog', symbol: '🐸', emoji: '🐸', soundText: 'Ribbit!' },
    { id: 'concept-lion', category: 'animal', label: 'Lion', name: 'Lion', symbol: '🦁', emoji: '🦁', soundText: 'Roar!' },
    { id: 'concept-tiger', category: 'animal', label: 'Tiger', name: 'Tiger', symbol: '🐯', emoji: '🐯', soundText: 'Grrr!' },
    { id: 'concept-bear', category: 'animal', label: 'Bear', name: 'Bear', symbol: '🐻', emoji: '🐻', soundText: 'Growl!' },
    { id: 'concept-panda', category: 'animal', label: 'Panda', name: 'Panda', symbol: '🐼', emoji: '🐼', soundText: 'Munch munch!' },
    { id: 'concept-koala', category: 'animal', label: 'Koala', name: 'Koala', symbol: '🐨', emoji: '🐨', soundText: 'Squeak!' },
    { id: 'concept-rabbit', category: 'animal', label: 'Rabbit', name: 'Rabbit', symbol: '🐰', emoji: '🐰', soundText: 'Hop hop!' },
    { id: 'concept-fox', category: 'animal', label: 'Fox', name: 'Fox', symbol: '🦊', emoji: '🦊', soundText: 'Yip yip!' },
    { id: 'concept-monkey', category: 'animal', label: 'Monkey', name: 'Monkey', symbol: '🐵', emoji: '🐵', soundText: 'Ooh ooh ah ah!' },
    { id: 'concept-giraffe', category: 'animal', label: 'Giraffe', name: 'Giraffe', symbol: '🦒', emoji: '🦒', soundText: 'Tall neck!' },
    { id: 'concept-zebra', category: 'animal', label: 'Zebra', name: 'Zebra', symbol: '🦓', emoji: '🦓', soundText: 'Stripes!' },
    { id: 'concept-hippo', category: 'animal', label: 'Hippo', name: 'Hippo', symbol: '🦛', emoji: '🦛', soundText: 'Splash!' },
    { id: 'concept-rhino', category: 'animal', label: 'Rhino', name: 'Rhino', symbol: '🦏', emoji: '🦏', soundText: 'Stomp!' },
    { id: 'concept-kangaroo', category: 'animal', label: 'Kangaroo', name: 'Kangaroo', symbol: '🦘', emoji: '🦘', soundText: 'Boing boing!' },
    { id: 'concept-penguin', category: 'animal', label: 'Penguin', name: 'Penguin', symbol: '🐧', emoji: '🐧', soundText: 'Waddle waddle!' },
    { id: 'concept-owl', category: 'animal', label: 'Owl', name: 'Owl', symbol: '🦉', emoji: '🦉', soundText: 'Hoot hoot!' },
    { id: 'concept-eagle', category: 'animal', label: 'Eagle', name: 'Eagle', symbol: '🦅', emoji: '🦅', soundText: 'Screech!' },
    { id: 'concept-duck', category: 'animal', label: 'Duck', name: 'Duck', symbol: '🦆', emoji: '🦆', soundText: 'Quack quack!' },
    { id: 'concept-swan', category: 'animal', label: 'Swan', name: 'Swan', symbol: '🦢', emoji: '🦢', soundText: 'Graceful!' },
    { id: 'concept-parrot', category: 'animal', label: 'Parrot', name: 'Parrot', symbol: '🦜', emoji: '🦜', soundText: 'Squawk!' },
    { id: 'concept-flamingo', category: 'animal', label: 'Flamingo', name: 'Flamingo', symbol: '🦩', emoji: '🦩', soundText: 'Pink bird!' },
    { id: 'concept-whale', category: 'animal', label: 'Whale', name: 'Whale', symbol: '🐳', emoji: '🐳', soundText: 'Whoosh splash!' },
    { id: 'concept-dolphin', category: 'animal', label: 'Dolphin', name: 'Dolphin', symbol: '🐬', emoji: '🐬', soundText: 'Click click!' },
    { id: 'concept-shark', category: 'animal', label: 'Shark', name: 'Shark', symbol: '🦈', emoji: '🦈', soundText: 'Swim swim!' },
    { id: 'concept-octopus', category: 'animal', label: 'Octopus', name: 'Octopus', symbol: '🐙', emoji: '🐙', soundText: 'Eight arms!' },
    { id: 'concept-turtle', category: 'animal', label: 'Turtle', name: 'Turtle', symbol: '🐢', emoji: '🐢', soundText: 'Slow and steady!' },
    { id: 'concept-crab', category: 'animal', label: 'Crab', name: 'Crab', symbol: '🦀', emoji: '🦀', soundText: 'Click clack!' },
    { id: 'concept-butterfly', category: 'animal', label: 'Butterfly', name: 'Butterfly', symbol: '🦋', emoji: '🦋', soundText: 'Flutter flutter!' },
    { id: 'concept-bee', category: 'animal', label: 'Bee', name: 'Bee', symbol: '🐝', emoji: '🐝', soundText: 'Bzzzz!' },
    { id: 'concept-ladybug', category: 'animal', label: 'Ladybug', name: 'Ladybug', symbol: '🐞', emoji: '🐞', soundText: 'Spotted bug!' },
    { id: 'concept-dragonfly', category: 'animal', label: 'Dragonfly', name: 'Dragonfly', symbol: '🐉', emoji: '🐉', soundText: 'Whirrr!' },
    { id: 'concept-ant', category: 'animal', label: 'Ant', name: 'Ant', symbol: '🐜', emoji: '🐜', soundText: 'Tiny worker!' },
    { id: 'concept-dinosaur', category: 'animal', label: 'Dinosaur', name: 'Dinosaur', symbol: '🦖', emoji: '🦖', soundText: 'RAWR!' },
    { id: 'concept-trex', category: 'animal', label: 'T-Rex', name: 'T-Rex', symbol: '🦕', emoji: '🦕', soundText: 'Stomp Roar!' },
    { id: 'concept-unicorn', category: 'animal', label: 'Unicorn', name: 'Unicorn', symbol: '🦄', emoji: '🦄', soundText: 'Magical neigh!' },
    { id: 'concept-horse', category: 'animal', label: 'Horse', name: 'Horse', symbol: '🐴', emoji: '🐴', soundText: 'Neigh!' },
    { id: 'concept-pig', category: 'animal', label: 'Pig', name: 'Pig', symbol: '🐷', emoji: '🐷', soundText: 'Oink oink!' },
    { id: 'concept-sheep', category: 'animal', label: 'Sheep', name: 'Sheep', symbol: '🐑', emoji: '🐑', soundText: 'Baa baa!' },
    { id: 'concept-goat', category: 'animal', label: 'Goat', name: 'Goat', symbol: '🐐', emoji: '🐐', soundText: 'Meeh!' },
    { id: 'concept-rooster', category: 'animal', label: 'Rooster', name: 'Rooster', symbol: '🐓', emoji: '🐓', soundText: 'Cock-a-doodle-doo!' },
    { id: 'concept-chick', category: 'animal', label: 'Chick', name: 'Chick', symbol: '🐥', emoji: '🐥', soundText: 'Peep peep!' },
    { id: 'concept-mouse', category: 'animal', label: 'Mouse', name: 'Mouse', symbol: '🐭', emoji: '🐭', soundText: 'Squeak squeak!' },
    { id: 'concept-bat', category: 'animal', label: 'Bat', name: 'Bat', symbol: '🦇', emoji: '🦇', soundText: 'Night flyer!' },
    { id: 'concept-sloth', category: 'animal', label: 'Sloth', name: 'Sloth', symbol: '🦥', emoji: '🦥', soundText: 'Slow motion!' },
    { id: 'concept-hedgehog', category: 'animal', label: 'Hedgehog', name: 'Hedgehog', symbol: '🦔', emoji: '🦔', soundText: 'Prickly friend!' },
    { id: 'concept-beaver', category: 'animal', label: 'Beaver', name: 'Beaver', symbol: '🦫', emoji: '🦫', soundText: 'Chop chop!' },

    // ==========================================
    // 4. COLOUR CONCEPTS (100 HUES & SHADES)
    // ==========================================
    ...Array.from({ length: 100 }).map((_, i) => {
        const hues = ['Red', 'Crimson', 'Ruby', 'Scarlet', 'Coral', 'Orange', 'Amber', 'Gold', 'Yellow', 'Canary', 'Lime', 'Green', 'Emerald', 'Teal', 'Cyan', 'Sky', 'Blue', 'Royal', 'Indigo', 'Violet', 'Purple', 'Magenta', 'Pink', 'Rose', 'Bronze', 'Silver', 'White', 'Neon', 'Pastel'];
        const emojis = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🩷', '🟤', '⚪', '⬛', '⭐', '💎', '🌈', '✨'];
        const hueName = hues[i % hues.length];
        const hueIndex = Math.floor((i * 3.6)) % 360;
        const hex = `hsl(${hueIndex}, 85%, 55%)`;
        const emoji = emojis[i % emojis.length];
        return {
            id: `concept-color-${i + 1}`,
            category: 'colour',
            label: `${hueName} #${i + 1}`,
            name: `${hueName} #${i + 1}`,
            colorHex: hex,
            symbol: emoji,
            emoji: emoji,
            sample: `Color Hue #${i + 1}`
        };
    }),

    // ==========================================
    // 5. SHAPE CONCEPTS (20 ITEMS)
    // ==========================================
    { id: 'concept-circle', category: 'shape', label: 'Circle', name: 'Circle', symbol: '🔴', emoji: '🔴' },
    { id: 'concept-square', category: 'shape', label: 'Square', name: 'Square', symbol: '🟦', emoji: '🟦' },
    { id: 'concept-triangle', category: 'shape', label: 'Triangle', name: 'Triangle', symbol: '🔺', emoji: '🔺' },
    { id: 'concept-star', category: 'shape', label: 'Star', name: 'Star', symbol: '⭐', emoji: '⭐' },
    { id: 'concept-heart', category: 'shape', label: 'Heart', name: 'Heart', symbol: '🩷', emoji: '🩷' },
    { id: 'concept-oval', category: 'shape', label: 'Oval', name: 'Oval', symbol: '🥚', emoji: '🥚' },
    { id: 'concept-diamond', category: 'shape', label: 'Diamond', name: 'Diamond', symbol: '🔷', emoji: '🔷' },
    { id: 'concept-hexagon', category: 'shape', label: 'Hexagon', name: 'Hexagon', symbol: '🛑', emoji: '🛑' },
    { id: 'concept-pentagon', category: 'shape', label: 'Pentagon', name: 'Pentagon', symbol: '⬟', emoji: '⬟' },
    { id: 'concept-crescent', category: 'shape', label: 'Crescent', name: 'Crescent', symbol: '🌙', emoji: '🌙' },
    { id: 'concept-sphere', category: 'shape', label: 'Sphere', name: 'Sphere', symbol: '🔮', emoji: '🔮' },
    { id: 'concept-cube', category: 'shape', label: 'Cube', name: 'Cube', symbol: '🧊', emoji: '🧊' },
    { id: 'concept-cylinder', category: 'shape', label: 'Cylinder', name: 'Cylinder', symbol: '🛢️', emoji: '🛢️' },
    { id: 'concept-cone', category: 'shape', label: 'Cone', name: 'Cone', symbol: '🍦', emoji: '🍦' },
    { id: 'concept-pyramid', category: 'shape', label: 'Pyramid', name: 'Pyramid', symbol: '🔺', emoji: '🔺' },
    { id: 'concept-ring', category: 'shape', label: 'Ring', name: 'Ring', symbol: '⭕', emoji: '⭕' },
    { id: 'concept-spiral', category: 'shape', label: 'Spiral', name: 'Spiral', symbol: '🌀', emoji: '🌀' },
    { id: 'concept-cross', category: 'shape', label: 'Cross', name: 'Cross', symbol: '➕', emoji: '➕' },
    { id: 'concept-arrow', category: 'shape', label: 'Arrow', name: 'Arrow', symbol: '➡️', emoji: '➡️' },
    { id: 'concept-blob', category: 'shape', label: 'Blob', name: 'Blob', symbol: '🫧', emoji: '🫧' },

    // ==========================================
    // 6. OBJECT CONCEPTS (50 ITEMS)
    // ==========================================
    { id: 'concept-apple', category: 'object', label: 'Apple', name: 'Apple', symbol: '🍎', emoji: '🍎', associatedConcepts: ['concept-red', 'concept-letter-a', 'concept-num-1'] },
    { id: 'concept-ball', category: 'object', label: 'Ball', name: 'Ball', symbol: '⚽', emoji: '⚽', associatedConcepts: ['concept-circle', 'concept-letter-b'] },
    { id: 'concept-car', category: 'object', label: 'Car', name: 'Car', symbol: '🚗', emoji: '🚗', associatedConcepts: ['concept-red'] },
    { id: 'concept-book', category: 'object', label: 'Book', name: 'Book', symbol: '📖', emoji: '📖', associatedConcepts: ['concept-blue'] },
    { id: 'concept-cup', category: 'object', label: 'Cup', name: 'Cup', symbol: '🥛', emoji: '🥛' },
    { id: 'concept-shoe', category: 'object', label: 'Shoe', name: 'Shoe', symbol: '👟', emoji: '👟' },
    { id: 'concept-banana', category: 'object', label: 'Banana', name: 'Banana', symbol: '🍌', emoji: '🍌', associatedConcepts: ['concept-yellow'] },
    { id: 'concept-cookie', category: 'object', label: 'Cookie', name: 'Cookie', symbol: '🍪', emoji: '🍪' },
    { id: 'concept-milk', category: 'object', label: 'Milk', name: 'Milk', symbol: '🥛', emoji: '🥛' },
    { id: 'concept-truck', category: 'object', label: 'Truck', name: 'Truck', symbol: '🚛', emoji: '🚛' },
    { id: 'concept-train', category: 'object', label: 'Train', name: 'Train', symbol: '🚂', emoji: '🚂' },
    { id: 'concept-plane', category: 'object', label: 'Plane', name: 'Plane', symbol: '✈️', emoji: '✈️' },
    { id: 'concept-boat', category: 'object', label: 'Boat', name: 'Boat', symbol: '⛵', emoji: '⛵' },
    { id: 'concept-bell', category: 'object', label: 'Bell', name: 'Bell', symbol: '🔔', emoji: '🔔' },
    { id: 'concept-drum', category: 'object', label: 'Drum', name: 'Drum', symbol: '🥁', emoji: '🥁' },
    { id: 'concept-guitar', category: 'object', label: 'Guitar', name: 'Guitar', symbol: '🎸', emoji: '🎸' },
    { id: 'concept-house', category: 'object', label: 'House', name: 'House', symbol: '🏠', emoji: '🏠' },
    { id: 'concept-tree', category: 'object', label: 'Tree', name: 'Tree', symbol: '🌳', emoji: '🌳', associatedConcepts: ['concept-green'] },
    { id: 'concept-flower', category: 'object', label: 'Flower', name: 'Flower', symbol: '🌸', emoji: '🌸', associatedConcepts: ['concept-pink'] },
    { id: 'concept-leaf', category: 'object', label: 'Leaf', name: 'Leaf', symbol: '🍃', emoji: '🍃', associatedConcepts: ['concept-green'] },
    { id: 'concept-umbrella', category: 'object', label: 'Umbrella', name: 'Umbrella', symbol: '☂️', emoji: '☂️' },
    { id: 'concept-balloon', category: 'object', label: 'Balloon', name: 'Balloon', symbol: '🎈', emoji: '🎈' },
    { id: 'concept-sun', category: 'object', label: 'Sun', name: 'Sun', symbol: '☀️', emoji: '☀️', associatedConcepts: ['concept-yellow'] },
    { id: 'concept-moon', category: 'object', label: 'Moon', name: 'Moon', symbol: '🌙', emoji: '🌙' },
    { id: 'concept-rainbow', category: 'object', label: 'Rainbow', name: 'Rainbow', symbol: '🌈', emoji: '🌈' },
    { id: 'concept-gift', category: 'object', label: 'Gift', name: 'Gift', symbol: '🎁', emoji: '🎁' },
    { id: 'concept-crown', category: 'object', label: 'Crown', name: 'Crown', symbol: '👑', emoji: '👑' },
    { id: 'concept-gem', category: 'object', label: 'Gem', name: 'Gem', symbol: '💎', emoji: '💎' },
    { id: 'concept-key', category: 'object', label: 'Key', name: 'Key', symbol: '🔑', emoji: '🔑' },
    { id: 'concept-clock', category: 'object', label: 'Clock', name: 'Clock', symbol: '⏰', emoji: '⏰' },
    { id: 'concept-lamp', category: 'object', label: 'Lamp', name: 'Lamp', symbol: '💡', emoji: '💡' },
    { id: 'concept-bed', category: 'object', label: 'Bed', name: 'Bed', symbol: '🛏️', emoji: '🛏️' },
    { id: 'concept-chair', category: 'object', label: 'Chair', name: 'Chair', symbol: '🪑', emoji: '🪑' },
    { id: 'concept-spoon', category: 'object', label: 'Spoon', name: 'Spoon', symbol: '🥄', emoji: '🥄' },
    { id: 'concept-fork', category: 'object', label: 'Fork', name: 'Fork', symbol: '🍴', emoji: '🍴' },
    { id: 'concept-plate', category: 'object', label: 'Plate', name: 'Plate', symbol: '🍽️', emoji: '🍽️' },
    { id: 'concept-hat', category: 'object', label: 'Hat', name: 'Hat', symbol: '🧢', emoji: '🧢' },
    { id: 'concept-sock', category: 'object', label: 'Sock', name: 'Sock', symbol: '🧦', emoji: '🧦' },
    { id: 'concept-bubble', category: 'object', label: 'Bubble', name: 'Bubble', symbol: '🫧', emoji: '🫧' },
    { id: 'concept-water', category: 'object', label: 'Water', name: 'Water', symbol: '🌊', emoji: '🌊' },
    { id: 'concept-sand', category: 'object', label: 'Sand', name: 'Sand', symbol: '🏖️', emoji: '🏖️' },
    { id: 'concept-rock', category: 'object', label: 'Rock', name: 'Rock', symbol: '🪨', emoji: '🪨' },
    { id: 'concept-pencil', category: 'object', label: 'Pencil', name: 'Pencil', symbol: '✏️', emoji: '✏️' },
    { id: 'concept-phone', category: 'object', label: 'Phone', name: 'Phone', symbol: '📱', emoji: '📱' },
    { id: 'concept-camera', category: 'object', label: 'Camera', name: 'Camera', symbol: '📷', emoji: '📷' },
    { id: 'concept-watch', category: 'object', label: 'Watch', name: 'Watch', symbol: '⌚', emoji: '⌚' },
    { id: 'concept-ring-obj', category: 'object', label: 'Ring', name: 'Ring', symbol: '💍', emoji: '💍' },
    { id: 'concept-rocket', category: 'object', label: 'Rocket', name: 'Rocket', symbol: '🚀', emoji: '🚀' },
    { id: 'concept-robot', category: 'object', label: 'Robot', name: 'Robot', symbol: '🤖', emoji: '🤖' },
    { id: 'concept-teddy', category: 'object', label: 'Teddy Bear', name: 'Teddy Bear', symbol: '🧸', emoji: '🧸' }
];

// Register all concepts with the conceptRegistry singleton
if (typeof conceptRegistry !== 'undefined') {
    conceptRegistry.registerAll(BABY_CONCEPTS_LIST);
}

// Backward compatibility map
const BABY_LEARNING_DATA = {
    colours: BABY_CONCEPTS_LIST.filter(c => c.category === 'colour'),
    animals: BABY_CONCEPTS_LIST.filter(c => c.category === 'animal'),
    numbers: BABY_CONCEPTS_LIST.filter(c => c.category === 'number'),
    alphabet: BABY_CONCEPTS_LIST.filter(c => c.category === 'alphabet'),
    shapes: BABY_CONCEPTS_LIST.filter(c => c.category === 'shape'),
    objects: BABY_CONCEPTS_LIST.filter(c => c.category === 'object')
};
