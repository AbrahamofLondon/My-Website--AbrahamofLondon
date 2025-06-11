const CACHE_NAME = 'abraham-portfolio-v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/main.js',
    '/assets/images/logo.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
