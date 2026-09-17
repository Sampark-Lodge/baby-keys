# Baby Keys 🎵

A browser-based, offline-friendly early-learning sensory playground for babies and toddlers. Tap, smash, or play — every input responds with gentle sound, illustrated icons, and colourful particle feedback.

**Live app:** https://sampark-lodge.github.io/baby-keys/

## Play worlds

- 🌈 **Sensory** — free-play cause-and-effect objects
- 🎨 **Colours** — full-screen colour morphing
- 🐶 **Animals** — illustrated animals with real animal sounds
- 🔢 **Numbers** — bouncy, tappable counting objects
- 🔤 **Alphabet** — letters, phonics, and linked pictures
- 🔺 **Shapes** — shape recognition
- 📦 **Objects** — everyday objects with real photos
- 🎹 **Music** — pick an instrument, then play it on the keyboard

## Features

- **Illustrated icons** for every concept (OpenMoji), consistent across all devices
- **Real, CC-licensed media** — animal sounds, object photos, and a lullaby (bundled locally)
- **Multi-instrument synth** — piano, guitar, drum, trumpet, violin, sax, bells, flute
- **Gentle pacing** — holding/mashing keys won't flip cards too fast
- **Feedback governor** bounds particles and audio so rapid "hulk-smashing" never overwhelms
- **Parent dashboard** (hold the 🔒) — Calm Mode, sound/voice/music toggles, play stages, stats
- **Installable PWA** — works fully offline after the first visit; all assets are preloaded and cached
- Respects `prefers-reduced-motion` and Calm Mode

## Run locally

Any static file server works:

```bash
python -m http.server 8080
# open http://localhost:8080/
```

## Asset credits

All bundled media is used under open licenses. See [`assets/CREDITS.md`](assets/CREDITS.md) and
[`assets/CREDITS.json`](assets/CREDITS.json) for per-file attribution.

- **Icons:** [OpenMoji](https://openmoji.org) — CC BY-SA 4.0
- **Sounds / photos / music:** discovered via [Openverse](https://openverse.org) — CC0, Public Domain, and CC BY

Media that isn't bundled falls back gracefully to synthesized audio and illustrated icons.
