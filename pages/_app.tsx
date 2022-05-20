import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppLayout from '../components/appLayout'
import { SelectLocationProvider } from '../context/selectLocation'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SelectLocationProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SelectLocationProvider>
  )
}

export default MyApp
