import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppLayout from '../components/appLayout'
import { SelectLocationProvider } from '../context/selectLocation'
import { UserSettingsProvider } from '../context/userSettings'
import { useEffect } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
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
