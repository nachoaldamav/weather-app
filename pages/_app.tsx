import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppLayout from '../components/appLayout'
import { SelectLocationProvider } from '../context/selectLocation'
import { UserSettingsProvider } from '../context/userSettings'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserSettingsProvider>
      <SelectLocationProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SelectLocationProvider>
    </UserSettingsProvider>
  )
}

export default MyApp
