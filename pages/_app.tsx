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
        console.log('Periodic background sync registered!')
      } catch (e) {
        console.error(`Periodic background sync failed:\nx${e}`)
      }
    } else {
      console.info('Periodic background sync is not granted.')
      console.error(status)
    }
  } else {
    console.log('Periodic background sync is not supported.')
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')

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
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      </SelectLocationProvider>
    </UserSettingsProvider>
  )
}

export default MyApp
