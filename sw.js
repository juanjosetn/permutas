/*
 * sw.js — «Service worker»: un pequeño programa que el navegador guarda junto a la app.
 * LECCIÓN: guarda una copia de ESTE cascarón (la página, los íconos y la configuración)
 * para que la app abra aunque no haya internet y muestre «Sin conexión» en vez de un
 * error del navegador. La app de verdad (Apps Script) no se guarda: necesita internet.
 * Estrategia «primero la red»: si hay conexión, siempre trae lo más nuevo; si no, usa la copia.
 * Al cambiar estos archivos, sube el número de VERSION para que todos reciban la copia nueva.
 */
const VERSION = 'permuta-pwa-v1';
const ARCHIVOS = ['./', './index.html', './config.js', './manifest.webmanifest',
  './iconos/icono-192.png', './iconos/icono-512.png', './iconos/apple-touch-icon.png', './iconos/favicon.svg', './iconos/favicon-32.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((llaves) => Promise.all(llaves.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Solo lo propio de este sitio; lo de Google (la app) pasa directo a internet.
  const u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== self.location.origin) return;
  // La prueba de conexión de index.html («sinCopia») nunca se responde con la copia guardada.
  if (u.searchParams.has('sinCopia')) return;
  e.respondWith(
    fetch(req).then((resp) => {
      if (resp && resp.ok) { const copia = resp.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); }
      return resp;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
