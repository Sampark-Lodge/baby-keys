# 🎵 Baby Keys

A fullscreen, baby-proof keyboard smash app with colorful rising bubbles, sweet music-box sounds, and interactive learning modes.

## Features

- **🔒 Fullscreen Lock** — Goes fullscreen on start, blocks dangerous shortcuts, re-enters if somehow exited
- **🫧 Colorful Bubbles** — Every key press spawns a glowing bubble showing the letter + animal emoji, rising up with sparkle particles
- **🎶 Sweet Music** — Pentatonic scale notes via Web Audio API (always sounds pleasant)
- **🗣️ Speech Synthesis** — Says the letter name aloud as bubbles form
- **🐱 Animal Emojis** — Each letter A-Z maps to an animal emoji shown in the bubble
- **💥 Bubble Pop** — Click/tap bubbles to pop them with a satisfying sound
- **🔢 Bubble Counter** — Running total of bubbles spawned

### 🎮 Three Modes
- **Free Play** — Any key creates a bubble (default)
- **ABC Mode** — Prompts A→Z in sequence with celebration confetti on completion
- **123 Mode** — Prompts 0→9 in sequence

### 🎨 Five Color Themes
- 🌈 Rainbow, 🌊 Ocean, 🍬 Candy, 🌿 Forest, ☀️ Sunshine

### 👨‍👩‍👧 Parent Dashboard
- Long-press the 🔒 icon (3 seconds) to access
- Shows: play time, total bubbles, bubbles popped, session count
- Top pressed keys chart
- Exit fullscreen & reset stats options

## How to Exit (Parent Only)
Press **ESC 3 times quickly** — your baby won't figure that out 😄

## Tech Stack
- Pure HTML/CSS/JS — no frameworks, no build step
- Web Audio API for sound synthesis
- Speech Synthesis API for letter names
- localStorage for stats persistence

## Run Locally
Just open `index.html` in a browser, or serve with:
```bash
npx http-server -c-1
```

## AdSense
Replace `ca-pub-XXXXXXXXXXXXXXXX` and `YOUR_AD_SLOT_ID` in `index.html` with your real Google AdSense publisher ID and ad slot ID.

## License
MIT
