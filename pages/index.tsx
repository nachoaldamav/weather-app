import { useEffect, useState } from 'react'
import GenerateGradient from '../components/backgroundGradient'
import getCurrentPeriod from '../utils/getCurrentPeriod'
import BottomCard from '../components/bottomCard'
import LocationIcon from '../components/icons/location'
import { useSelectLocation } from '../hooks/useSelectLocation'
import SelectLocationPopUp from '../components/selectLocationPopUp'
import Weather from '../components/weather'
import { useSettings } from '../hooks/useSettings'
import Satellite from '../components/satellite'
import Chevron from '../components/icons/chevron'

export default function HomePage({ city, region, country }: Geo) {
  const { config, setConfig } = useSelectLocation()
  const { settings, setSettings } = useSettings()
  const currentPeriod = getCurrentPeriod(settings.timezone || null)
  const [weatherData, setWeatherData] = useState<weatherData>()
  /* const currentPeriod = getCurrentPeriod(currentHour) */

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
      const response = await fetch(`/api/get-weather?location=${settings.city}`)
      const data = await response.json()
      setWeatherData(data)
    }
    fetchData()
  }, [settings])

  const isDark = () => {
    if (currentPeriod === 'night') {
      return true
    } else if (currentPeriod === 'sunset') {
      return true
    } else if (currentPeriod === 'dusk') {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col p-4">
      <SelectLocationPopUp />
      <span className="absolute top-0 left-0 z-50 inline-flex w-full items-center justify-center pt-2 text-lg text-white">
        <button
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
      </div>
      <BottomCard>
        <div className="mx-auto flex h-screen w-96 max-w-xs flex-col items-center rounded-t-lg bg-primary md:max-w-sm">
          <div className="flex w-full cursor-pointer flex-row items-center justify-between rounded-lg p-4">
            <h2 className="w-1/3 text-lg font-bold">Histórico</h2>
            <span className="h-2 w-1/4 rounded-xl bg-white" />
            <h3 className="w-1/3 text-right text-lg font-medium">15 días</h3>
          </div>
          <hr className="my-10 w-full" />
        </div>
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
