const CACHE_NAME = "valetcardchecker-cache-v1";
const urlsToCache = [
  "/valetcardchecker/",
  "/valetcardchecker/index.html",
  "/valetcardchecker/manifest.json",
  "/valetcardchecker/service-worker.js",
  "/valetcardchecker/icons/icon-192.png",
  "/valetcardchecker/icons/icon-512.png",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  // 여기에 필요한 정적 리소스를 추가하세요
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // 오프라인 대체 페이지가 있다면 여기에 추가
        return caches.match('/valetcardchecker/index.html');
      });
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});
