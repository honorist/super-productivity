// Angular service-worker kill-switch ("safety worker").
// Served in place of ngsw-worker.js so every client that ever installed the
// PWA service worker unregisters it, drops its caches and reloads fresh from
// the network. Keeps a self-hosted instance from ever serving stale chunks.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      await self.registration.unregister();
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith('ngsw:'))
          .map((name) => caches.delete(name)),
      );
      const windowClients = await self.clients.matchAll({ type: 'window' });
      windowClients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
