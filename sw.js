const CACHE_NAME = 'eismacherei-v3';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/assets/css/styles.css',
        '/assets/js/main.js'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => {
        return caches.match(event.request)
          .then(response => response || caches.match('/offline.html'));
      })
  );
});
