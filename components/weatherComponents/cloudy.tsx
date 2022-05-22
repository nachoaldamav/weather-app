import Head from 'next/head'
import Image from 'next/image'
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
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src="/images/clouds/1.png"
            className="relative"
            style={{
              top: '125px',
              left: '20px',
            }}
            alt="cloudy-1"
            width={600}
            height={300}
            layout="responsive"
          />
        </div>
        <div
          className="absolute"
          style={{
            top: '150px',
            left: '5px',
            height: 'auto',
            width: '70%',
          }}
        >
          <Image
            src="/images/clouds/2.png"
            alt="cloudy-2"
            width={600}
            height={300}
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>
    </WeatherLayout>
  )
}
