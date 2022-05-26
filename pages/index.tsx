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

  const isDark = () => {
    if (currentPeriod === 'day') {
      return false
    } else {
      return true
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col p-4">
      <SelectLocationPopUp />
      <InstallPrompt />
      <span className="absolute top-0 left-0 z-50 inline-flex w-full items-center justify-center pt-2 text-lg text-white">
        <button
          data-testid="select-location-button"
          className={
            !isDark()
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
          !isDark()
            ? 'z-10 flex flex-col text-secondary'
            : 'z-10 flex flex-col text-white'
        }
      >
        <h2 className="mt-10 inline-flex w-full items-start justify-center text-center text-9xl font-bold">
          {(weatherData && Math.round(weatherData.current?.temp_c)) || 0}{' '}
          <span className="text-[20px]">°C</span>
        </h2>
        <h4 className="inline-flex w-full items-start justify-center text-center text-md font-semibold opacity-75">
          {weatherData?.current?.condition?.text || 'Loading...'}
        </h4>
      </div>
      <BottomCard>
        <div className="flex w-full cursor-pointer flex-row items-center justify-between rounded-lg p-4">
          <h2 className="w-1/3 text-lg font-bold">Pronóstico</h2>
          <span className="h-2 w-1/4 rounded-xl bg-white" />
          <div className="w-1/3 "></div>
        </div>
        <hr className="my-5 w-full" />
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
