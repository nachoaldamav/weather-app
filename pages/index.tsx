import { useEffect, useState } from 'react'
import GenerateGradient from '../components/backgroundGradient'
import getCurrentPeriod from '../utils/getCurrentPeriod'
import BottomCard from '../components/bottomCard'
import { useSelectLocation } from '../hooks/useSelectLocation'
import SelectLocationPopUp from '../components/selectLocationPopUp'
import Weather from '../components/weather'
import { useSettings } from '../hooks/useSettings'
import Satellite from '../components/satellite'
import Chevron from '../components/icons/chevron'
import InstallPrompt from '../components/installPrompt'
import getWeather from '../utils/getWeather'
import getForecast, { Forecast } from '../utils/getForecast'
import ForecastComponent from '../components/forecastComponent'
import { conditions } from '../utils/getIcons'
import Head from 'next/head'

export default function HomePage({ city, region, country }: Geo) {
  const { config, setConfig } = useSelectLocation()
  const { settings, setSettings } = useSettings()
  const currentPeriod = getCurrentPeriod(settings.timezone || null)
  const [weatherData, setWeatherData] = useState<weatherData>()
  const [forecastData, setForecastData] = useState<Forecast>()

  useEffect(() => {
    if (settings.city === '') {
      setSettings({
        city,
        region,
        country,
      })
    }
  }, [city, region, country, setSettings, settings])

  useEffect(() => {
    async function fetchData() {
      const weather = await getWeather(settings.city)
      setWeatherData(weather)
      const forecast = await getForecast(settings.city)
      setForecastData(forecast)
    }
    if (settings.city !== '') {
      fetchData()
    }
  }, [settings])

  const isDark = currentPeriod === 'day' ? false : true

  const isNight = currentPeriod === 'night' ? true : false

  const weatherText = conditions.find((i) =>
    i.ids.includes(weatherData?.current.condition.code || 1000)
  )

  return (
    <div className="relative flex h-full w-full flex-col p-4" id="main">
      <Head>
        <title>
          {weatherData?.location.name
            ? 'El tiempo en ' + weatherData?.location.name
            : 'Weather App'}
        </title>
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href={`/images/weather/${weatherText?.name || 'clear'}_${
            isNight ? 'n' : 'd'
          }.svg`}
        />
      </Head>
      <SelectLocationPopUp />
      <InstallPrompt />
      <span className="absolute top-0 left-0 z-50 inline-flex w-full items-center justify-center pt-2 text-lg text-white">
        <button
          data-testid="select-location-button"
          className={
            !isDark
              ? 'inline-flex h-full w-fit items-center justify-center font-bold text-secondary'
              : 'inline-flex h-full w-fit items-center justify-center font-bold text-white'
          }
          onClick={() => setConfig({ isOpen: true })}
        >
          {settings.city}, {settings.country}
          <Chevron rotation={config.isOpen ? 180 : 0} />
        </button>
      </span>
      <Satellite />
      <GenerateGradient type={currentPeriod} />
      <Weather id={weatherData?.current?.condition?.code || 1000} />

      <div
        className={
          !isDark
            ? 'z-10 flex flex-col text-secondary'
            : 'z-10 flex flex-col text-white'
        }
      >
        <h2 className="relative mt-10 inline-flex w-full items-start justify-center text-center text-9xl font-bold">
          {(weatherData && Math.round(weatherData.current?.temp_c)) || 0}
          <span className="text-2xl font-bold">°</span>
        </h2>
        <h4 className="text-md inline-flex w-full items-start justify-center text-center font-semibold">
          {weatherText?.text || 'Loading...'}
        </h4>
      </div>
      <BottomCard>
        <ForecastComponent data={forecastData} />
      </BottomCard>
    </div>
  )
}

export const getServerSideProps = ({ query }: any) => ({
  props: query,
})

type Geo = {
  city: string
  region: string
  country: string
}

type weatherData = {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
  }
}
