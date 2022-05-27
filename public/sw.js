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
    const selected = data.forecast.forecastday[1].day

    const icon = conditions.find((i) =>
      i.ids.includes(selected.condition.code)
    )?.name
    const text = conditions.find((i) =>
      i.ids.includes(selected.condition.code)
    )?.text

    const iconUrl = `/images/weather/${icon}_d.svg`
    const title = `${selected.avgtemp_c.toFixed(0)}° en ${
      CURRENT_SETTINGS.city
    } mañana`
    const body = `${text} · Abre la app para mas información`

    // Send notification to the client
    await self.registration.showNotification(title, {
      body: body,
      icon: iconUrl,
      badge: iconUrl,
      tag: 'Weather App',
      silent: true,
    })
  } catch (error) {
    console.log('[Service Worker] Error fetching forecast', error)
    throw error
  }
}

const conditions = [
  {
    name: 'blizzard',
    text: 'Ventisca',
    ids: [1117],
  },
  {
    name: 'clear',
    text: 'Despejado',
    ids: [1000],
  },
  {
    name: 'drizzle',
    text: 'Llovizna',
    ids: [1072, 1150, 1153, 1168, 1171],
  },
  {
    name: 'fog',
    text: 'Niebla',
    ids: [1135, 1147],
  },
  {
    name: 'heavy_rain',
    text: 'Lluvia intensa',
    ids: [1192, 1195],
  },
  {
    name: 'moderate_rain',
    text: 'Lluvia moderada',
    ids: [1186, 1189, 1201, 1207, 1240],
  },
  {
    name: 'mostly_cloudy',
    text: 'Mayormente nublado',
    ids: [1006, 1009],
  },
  {
    name: 'partly_cloudy',
    text: 'Parcialmente nublado',
    ids: [1003],
  },
  {
    name: 'pellets',
    text: 'Granizo',
    ids: [1237, 1261, 1264],
  },
  {
    name: 'rain_thunder',
    text: 'Lluvia con tormenta',
    ids: [1273, 1279],
  },
  {
    name: 'light_rain',
    text: 'Lluvia ligera',
    ids: [1063, 1180, 1198],
  },
  {
    name: 'snow',
    text: 'Nieve',
    ids: [1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258],
  },
  {
    name: 'thunder_possible',
    text: 'Tormenta',
    ids: [1276, 1282],
  },
]
