const CACHE_NAME = 'baby-keys-v10-teaching';
const ASSETS_TO_CACHE = [
    './',
    'index.html',
    'style.css',
    'manifest.json',
    'js/app.js',
    'js/core/storage.js',
    'js/core/feedback-governor.js',
    'js/core/audio-engine.js',
    'js/core/asset-manager.js',
    'js/core/emoji-assets.js',
    'js/core/media-assets.js',
    'js/core/world-pacing.js',
    'js/core/sensory-engine.js',
    'js/core/diagnostics.js',
    'js/core/safety-engine.js',
    'js/core/session-engine.js',
    'js/core/chaos-tester.js',
    'js/core/input-layer.js',
    'js/core/interaction-engine.js',
    'js/learning/concept-registry.js',
    'js/learning/learning-data.js',
    'js/learning/activity-registry.js',
    'js/learning/activity-engine.js',
    'js/learning/progression-engine.js',
    'js/worlds/sensory-world.js',
    'js/worlds/colour-world.js',
    'js/worlds/animal-world.js',
    'js/worlds/number-world.js',
    'js/worlds/alphabet-world.js',
    'js/worlds/shape-world.js',
    'js/worlds/object-world.js',
    'js/worlds/music-world.js',
    'js/parent/parent-gate.js',
    'js/parent/parent-dashboard.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request).then((response) => {
                // Runtime-cache bundled media (emoji/sounds/photos/music) on first use,
                // so the app becomes fully playable offline after the assets are seen once.
                const url = new URL(event.request.url);
                if (response && response.ok && url.origin === self.location.origin && url.pathname.includes('/assets/')) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                }
                return response;
            }).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('index.html');
                }
            });
        })
    );
});
