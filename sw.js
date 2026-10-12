const C='scanner-v3';
const LIBS=['https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{
 for(const u of ['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']){try{await c.put(u,await fetch(new Request(u,{cache:'reload'})))}catch(_){}}
 for(const u of LIBS){try{await c.add(u)}catch(_){}}}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const page=r.mode==='navigate'||r.url.endsWith('index.html');
 if(page){e.respondWith(fetch(r,{cache:'no-cache'}).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n})))});
