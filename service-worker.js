const CACHE_NAME = "rd-service-worker";
const urlsToCache = [
  "/",
  "index.html",
  "img/logord.png",
  "img/bg.jpg",
  "img/banner.jpg",
  "img/bunting.jpg",
  "img/phcanvas.jpg",
  "img/signage.jpg",
  "img/signboard.jpg",
  "img/sticker.jpg",
  "fonts/DeepShadow.ttf",
  "fonts/DESIGNER.otf",
  "css/styles.css",
  "css/tailwindcss/tailwind.min.css",
  "css/swiper.css",
  "js/swiper.js",
];

// Install service worker and cache the static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event listener to intercept network requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // If the request is found in the cache, return it
      }
      return fetch(event.request); // Otherwise, fetch from the network
    })
  );
});
