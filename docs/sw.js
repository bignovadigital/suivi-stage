/* Service worker : met l'appli en cache pour qu'elle s'ouvre sans réseau.
   Changer VERSION à chaque modification d'un fichier de l'appli. */
var VERSION = "stage-v15";
var SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest?v=3",
  "./icons/icon-192.png?v=3",
  "./icons/icon-512.png?v=3",
  "./icons/icon-maskable-512.png?v=3",
  "./icons/apple-touch-icon.png?v=3",
  "./icons/favicon-32.png?v=3",
  "./assets/fond.jpg"
];
var FONTS = "stage-fonts";

self.addEventListener("install", function(ev){
  ev.waitUntil(caches.open(VERSION).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(ev){
  ev.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== VERSION && k !== FONTS; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(ev){
  var req = ev.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  // Polices Google : servies depuis le cache, mises à jour en arrière-plan.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"){
    ev.respondWith(caches.open(FONTS).then(function(c){
      return c.match(req).then(function(hit){
        var net = fetch(req).then(function(res){ if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(function(){ return hit; });
        return hit || net;
      });
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // Page : réseau d'abord pour recevoir les mises à jour, cache si hors ligne.
  if (req.mode === "navigate"){
    ev.respondWith(fetch(req).then(function(res){
      if (res.ok){ var copy = res.clone(); caches.open(VERSION).then(function(c){ c.put("./index.html", copy); }); }
      return res;
    }).catch(function(){ return caches.match("./index.html"); }));
    return;
  }
  ev.respondWith(caches.match(req).then(function(hit){ return hit || fetch(req); }));
});
