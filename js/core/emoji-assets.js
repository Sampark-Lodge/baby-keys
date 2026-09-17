/**
 * Baby Keys - Emoji Asset Resolver
 * Maps emoji glyphs to bundled OpenMoji illustrated PNGs (assets/emoji/*.png, CC BY-SA 4.0).
 * Renders a crisp, consistent illustrated icon across every OS, with graceful fallback
 * to the raw emoji glyph text if the image is missing (e.g. fully offline first paint failure).
 */

class BabyEmojiAssets {
    constructor() {
        this.base = 'assets/emoji/';
    }

    /**
     * Convert an emoji grapheme to its OpenMoji filename (without extension).
     * OpenMoji drops the U+FE0F variation selector EXCEPT on keycap sequences (contain U+20E3).
     */
    codeFor(glyph) {
        const cps = [...glyph].map(c => c.codePointAt(0));
        const isKeycap = cps.includes(0x20E3);
        return cps
            .filter(cp => isKeycap ? true : cp !== 0xFE0F)
            .map(cp => cp.toString(16).toUpperCase().padStart(4, '0'))
            .join('-');
    }

    /**
     * Returns an <img> HTML string for the given emoji. Sized to 1em so it scales with
     * the surrounding font-size. Falls back to the raw glyph on load error.
     */
    img(glyph, extraClass = '') {
        if (!glyph) return '';
        const code = this.codeFor(glyph);
        const safe = glyph.replace(/'/g, '').replace(/"/g, '&quot;');
        return `<img class="emoji-img ${extraClass}" src="${this.base}${code}.png" alt="${safe}" `
            + `draggable="false" onerror="babyEmoji.onError(this, '${safe}')">`;
    }

    /**
     * Build a live icon <img> element (wrapped in a .world-emoji div) for use as a
     * runtime fallback when a photo fails to load.
     */
    fallbackImg(glyph) {
        const wrap = document.createElement('div');
        wrap.className = 'world-emoji';
        wrap.innerHTML = this.img(glyph);
        return wrap;
    }

    onError(imgEl, glyph) {
        imgEl.onerror = null;
        const span = document.createElement('span');
        span.className = 'emoji-fallback ' + (imgEl.className || '').replace('emoji-img', '').trim();
        span.textContent = glyph;
        imgEl.replaceWith(span);
    }

    /**
     * Replace every emoji grapheme in a plain string with illustrated icons.
     * Used for mixed text like linked concept badges ("🍎 Apple").
     */
    richText(str) {
        if (!str) return '';
        let out = '';
        const seg = this._segmenter || (this._segmenter = ('Segmenter' in Intl ? new Intl.Segmenter('en', { granularity: 'grapheme' }) : null));
        if (!seg) return str;
        for (const { segment } of seg.segment(str)) {
            const isEmoji = [...segment].some(ch => ch.codePointAt(0) >= 0x2190);
            out += isEmoji ? this.img(segment) : segment;
        }
        return out;
    }
}

const babyEmoji = new BabyEmojiAssets();
