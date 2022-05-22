import Head from 'next/head'
import WeatherLayout from './weatherLayout'

export default function Cloudy() {
  return (
    <WeatherLayout>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/cloudy/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/cloudy/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/cloudy/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/icons/cloudy/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/icons/cloudy/favicon.ico" />
      </Head>
      <div className="relative h-full w-full opacity-75">
        <img
          src="/images/clouds/1.png"
          className="relative"
          style={{
            top: '125px',
            left: '20px',
          }}
          alt="cloudy-1"
        />
        <img
          src="/images/clouds/2.png"
          className="relative"
          style={{
            marginTop: '-220px',
            marginLeft: '0px',
          }}
          alt="cloudy-2"
        />
      </div>
    </WeatherLayout>
  )
}
