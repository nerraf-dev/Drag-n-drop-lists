self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('your-cache-name').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles/style.css',
        '/styles/dragula.css',
        '/scripts/main.js',
        '/scripts/admin.js',
        '/scripts/puzzle.js',
        '/scripts/utils.js',
        '/images/icon-192x192.png',
        '/images/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});