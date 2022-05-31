import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppLayout from '../components/appLayout'
import { SelectLocationProvider } from '../context/selectLocation'
import { UserSettingsProvider } from '../context/userSettings'
import { useEffect } from 'react'
import Head from 'next/head'

async function registerPeriodicSync() {
  const registration = await navigator.serviceWorker.ready
  // Check if periodicSync is supported
  if ('periodicSync' in registration) {
    // Request permission
    const status = await navigator.permissions.query({
      // @ts-ignore-next-line
      name: 'periodic-background-sync',
    })

    if (status.state === 'granted') {
      try {
        // @ts-ignore-next-line
        await registration.periodicSync.register('get-forecast', {
          minInterval: 60 * 1000, // 5 minutes for testing purposes
        })
        console.log('[Service Worker] Periodic background sync registered!')
        askForNotificationPermission()
      } catch (e) {
        console.error(
          `[Service Worker] Periodic background sync failed:\nx${e}`
        )
      }
    } else {
      console.info('[Service Worker] Periodic background sync is not granted.')
      console.error(status)
    }
  } else {
    console.log('[Service Worker] Periodic background sync is not supported.')
  }
}

function askForNotificationPermission() {
  Notification.requestPermission((status) => {
    console.log(`[Service Worker] Notification permission status: ${status}`)
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        registration.update()
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
        }
        console.log('[Service Worker] Service worker registered!')
      })

      // Register periodic sync
      registerPeriodicSync()
    }
  }, [])

  return (
    <UserSettingsProvider>
      <SelectLocationProvider>
        <AppLayout>
          <Head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#181622" />
            <title>Weather App</title>
            <meta name="title" content="Weather App" />
            <meta
              name="description"
              content="¡Comprueba el tiempo en tu zona en tiempo real!"
            />
            <link rel="apple-touch-icon" href="/images/notification_icon.png" />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content="https://weather-app-srdrabx.vercel.app/"
            />
            <meta property="og:title" content="Weather App" />
            <meta
              property="og:description"
              content="¡Comprueba el tiempo en tu zona en tiempo real!"
            />
            <meta
              property="og:image"
              content="https://weather-app-srdrabx.vercel.app/images/og-image.jpg"
            />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta
              property="twitter:url"
              content="https://weather-app-srdrabx.vercel.app/"
            />
            <meta property="twitter:title" content="Weather App" />
            <meta
              property="twitter:description"
              content="¡Comprueba el tiempo en tu zona en tiempo real!"
            />
            <meta
              property="twitter:image"
              content="https://weather-app-srdrabx.vercel.app/images/og-image.jpg"
            />
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      </SelectLocationProvider>
    </UserSettingsProvider>
  )
}

export default MyApp
