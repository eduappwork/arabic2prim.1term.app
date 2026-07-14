const CACHE_NAME = 'arabic-grade2-v14';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/fonts/DejaVuSans.ttf',
  './assets/fonts/DejaVuSans-Bold.ttf',
  './assets/fonts/cairo-arabic-400-normal.woff2',
  './assets/fonts/cairo-latin-400-normal.woff2',
  './assets/fonts/cairo-arabic-600-normal.woff2',
  './assets/fonts/cairo-latin-600-normal.woff2',
  './assets/fonts/cairo-arabic-700-normal.woff2',
  './assets/fonts/cairo-latin-700-normal.woff2',
  './assets/fonts/cairo-arabic-800-normal.woff2',
  './assets/fonts/cairo-latin-800-normal.woff2',
  './assets/fonts/baloo-bhaijaan-2-arabic-700-normal.woff2',
  './assets/fonts/baloo-bhaijaan-2-latin-700-normal.woff2',
  './assets/fonts/baloo-bhaijaan-2-arabic-800-normal.woff2',
  './assets/fonts/baloo-bhaijaan-2-latin-800-normal.woff2',
  './assets/images/dashboard-hero.webp',
  './assets/images/opening-hero.webp',
  './assets/images/teacher.webp',
  './assets/images/unit-1.webp',
  './assets/images/unit-2.webp',
  './assets/images/unit-3.webp',
  './assets/images/u1-l1.webp',
  './assets/images/u1-l2.webp',
  './assets/images/u1-l3.webp',
  './assets/images/u1-l4.webp',
  './assets/images/u1-story.webp',
  './assets/images/u2-l1.webp',
  './assets/images/u2-l2.webp',
  './assets/images/u2-l3.webp',
  './assets/images/u2-l4.webp',
  './assets/images/u2-story.webp',
  './assets/images/u3-l1.webp',
  './assets/images/u3-l2.webp',
  './assets/images/u3-l3.webp',
  './assets/images/u3-l4.webp',
  './assets/images/u3-story.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
