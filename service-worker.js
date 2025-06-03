const CACHE_NAME = "valetcardchecker-cache-v1";
const urlsToCache = [
  "/valetcardchecker/",
  "/valetcardchecker/index.html",
  "/valetcardchecker/manifest.json"
  // 여기에 필요한 정적 리소스를 추가
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    )
  );
});
