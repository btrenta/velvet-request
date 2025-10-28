self.addEventListener('install', e => {
  e.waitUntil(caches.open('v2').then(c=>c.addAll(['./','index.html','app.js','style.css','manifest.json','icons/velvet-192.png','icons/velvet-512.png'])););
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
