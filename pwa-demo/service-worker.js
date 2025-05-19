self.addEventListener('install', event => {
  console.log('📦 Service Worker 설치됨');
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'icon-192.png',
        'icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});