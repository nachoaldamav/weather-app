importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
)

const CACHE_NAME = 'offline'
const OFFLINE_URL = '/offline'

self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install')

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      // Setting {cache: 'reload'} in the new request will ensure that the response
      // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
    })()
  )

  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate')
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable()
      }
    })()
  )

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim()
})

self.addEventListener('fetch', function (event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            return preloadResponse
          }

          const networkResponse = await fetch(event.request)
          return networkResponse
        } catch (error) {
          console.log(
            '[Service Worker] Fetch failed; returning offline page instead.',
            error
          )

          const cache = await caches.open(CACHE_NAME)
          const cachedResponse = await cache.match(OFFLINE_URL)
          return cachedResponse
        }
      })()
    )
  }
})

self.addEventListener('message', async function (event) {
  // Get local storate data
  console.log('[Service Worker] Message received from ' + event.source.id)
  if (event.data.type === 'SETTINGS_CHANGED') {
    await localforage.setItem('settings', event.data.settings)
    const CURRENT_SETTINGS = await localforage.getItem('settings')
    console.log('[Service Worker] Settings changed', CURRENT_SETTINGS)
  }
})

// Listen the periodic background sync events to update the cached resources.
self.addEventListener('periodicsync', async (event) => {
  console.log('[Service Worker] Periodic sync triggered')
  if (event.tag === 'get-forecast') {
    console.log('[Service Worker] Fetching forecast')
    event.waitUntil(getForecast())
  }
})

async function getForecast() {
  const CURRENT_SETTINGS = await localforage.getItem('settings')
  const url = `/api/get-forecast?location=${CURRENT_SETTINGS.city}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log('[Service Worker] Forecast fetched', data)
    return data
  } catch (error) {
    console.log('[Service Worker] Error fetching forecast', error)
    throw error
  }
}
