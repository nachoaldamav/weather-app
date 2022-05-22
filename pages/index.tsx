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

export default function HomePage({ city, region, country }: Geo) {
  const { setConfig } = useSelectLocation()
  const { settings, setSettings } = useSettings()
  const currentPeriod = getCurrentPeriod(settings.timezone || null)
  const [currentHour, setCurrentHour] = useState(15)
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

  return (
    <div className="relative flex h-full w-full flex-col p-4">
      <SelectLocationPopUp />
      <button
        className="absolute top-0 right-0 z-50 m-2 rounded border border-secondary bg-primary p-1"
        onClick={() => setConfig({ isOpen: true })}
      >
        <LocationIcon />
      </button>
      <Satellite />
      <GenerateGradient type={currentPeriod} />
      <Weather id={1180} />

      <div className="z-10 flex flex-col">
        <h1 className="text-xl font-bold">
          {settings.city}, {settings.region}
        </h1>
        <h2 className="mt-4 inline-flex items-start text-9xl font-bold">
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
          <input
            type="number"
            id="hour"
            defaultValue={currentHour}
            className="w-1/2 rounded-md text-black"
            max={24}
            min={0}
          />
          <button
            className="mt-4 w-1/2 rounded-lg border text-white"
            onClick={() => {
              const hour: any = document.getElementById('hour')
              setCurrentHour(parseInt(hour?.value))
            }}
          >
            Cambiar
          </button>
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
