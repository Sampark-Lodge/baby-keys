/**
 * Baby Keys - Media Asset Manager
 * Loads locally bundled, CC-licensed media (animal sounds, object photos, background music
 * fetched from the Openverse API) via manifest files, and plays them with graceful fallback
 * to procedural synthesis / illustrated icons when an asset is absent.
 */

class BabyMediaAssets {
    constructor() {
        this.sounds = {};   // conceptId -> filename
        this.photos = {};   // conceptId -> filename
        this.music = null;  // { loop: filename, ... }
        this.soundCache = new Map();
        this.musicAudio = null;
        this.ready = this.loadManifests();
    }

    async loadManifests() {
        const load = async (path) => {
            try {
                const res = await fetch(path, { cache: 'force-cache' });
                if (!res.ok) return null;
                return await res.json();
            } catch (e) { return null; }
        };
        const [sounds, photos, music, emoji] = await Promise.all([
            load('assets/sounds/manifest.json'),
            load('assets/photos/manifest.json'),
            load('assets/music/manifest.json'),
            load('assets/emoji/manifest.json')
        ]);
        this.sounds = sounds || {};
        this.photos = photos || {};
        this.music = music;
        this.emojiFiles = emoji || [];
    }

    /**
     * Warm the browser cache with every bundled asset in the background, so each world
     * opens instantly and the app works fully offline after the first visit. Runs at low
     * priority during idle time and never blocks first paint. Silent — no visual effect.
     */
    async preloadAll() {
        await this.ready;
        const urls = [];
        (this.emojiFiles || []).forEach(f => urls.push(`assets/emoji/${f}`));
        Object.values(this.photos).forEach(f => urls.push(`assets/photos/${f}`));
        Object.values(this.sounds).forEach(f => urls.push(`assets/sounds/${f}`));
        if (this.music && this.music.loop) urls.push(`assets/music/${this.music.loop}`);

        const CONCURRENCY = 6;
        let i = 0;
        const worker = async () => {
            while (i < urls.length) {
                const url = urls[i++];
                try {
                    // Low-priority GET populates HTTP + service-worker caches.
                    await fetch(url, { cache: 'force-cache', priority: 'low' });
                } catch (e) { /* ignore individual failures */ }
            }
        };
        await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    }

    hasPhoto(id) { return !!this.photos[id]; }
    photoUrl(id) { return this.photos[id] ? `assets/photos/${this.photos[id]}` : null; }

    hasSound(id) { return !!this.sounds[id]; }

    /**
     * Plays a bundled animal sound. Returns true if a real clip was triggered,
     * false if the caller should fall back to procedural synthesis.
     */
    playSound(id, volume = 0.75) {
        if (!this.sounds[id]) return false;
        try {
            const src = `assets/sounds/${this.sounds[id]}`;
            let audio = this.soundCache.get(src);
            if (!audio) {
                audio = new Audio(src);
                audio.preload = 'auto';
                this.soundCache.set(src, audio);
            }
            const clip = audio.cloneNode();
            clip.volume = volume;
            clip.play().catch(() => {});
            return true;
        } catch (e) {
            return false;
        }
    }

    startMusic(volume = 0.25) {
        if (!this.music || !this.music.loop) return;
        try {
            if (!this.musicAudio) {
                this.musicAudio = new Audio(`assets/music/${this.music.loop}`);
                this.musicAudio.loop = true;
            }
            this.musicAudio.volume = volume;
            this.musicAudio.play().catch(() => {});
        } catch (e) {}
    }

    stopMusic() {
        if (this.musicAudio) {
            this.musicAudio.pause();
            this.musicAudio.currentTime = 0;
        }
    }
}

const mediaAssets = new BabyMediaAssets();
