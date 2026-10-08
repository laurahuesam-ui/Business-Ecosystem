const CACHE='business-ecosystem-v23';
const ASSETS=['./','./index.html','./styles.css?v=23','./app.js?v=23','./manifest.webmanifest?v=23'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).catch(()=>{}))});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const req=event.request;event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{})}return res}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))))});
