/**
 * Baby Keys - World Pacing
 * Stops concept cards from flipping too fast when a baby holds a key or mashes the
 * keyboard. Leading-edge throttle: the first press advances the concept immediately,
 * then further advances are ignored until the delay passes. Tactile feedback (sound,
 * sparkles) is intentionally NOT throttled, so every press still feels responsive.
 */
function babyCanAdvance(world) {
    const now = Date.now();
    let delay = world.advanceDelayMs || 2800;
    if (typeof storageManager !== 'undefined' && storageManager.settings && storageManager.settings.calmMode) {
        delay = Math.max(delay, 4000);
    }
    if (now - (world._lastAdvance || 0) < delay) return false;
    world._lastAdvance = now;
    return true;
}
