import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelectLocation } from '../hooks/useSelectLocation'
import { useSettings } from '../hooks/useSettings'
import getTimezone from '../libs/timezone'
import getCity from '../utils/getCity'
import LoadingIcon from './icons/loading'
import LocationIcon from './icons/location'
import MapIcon from './icons/map'

let timer: any
const waitTime = 200

export default function SelectLocationPopUp() {
  const { config, setConfig } = useSelectLocation()
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [loadingResults, setLoadingResults] = useState(false)
  const { setSettings } = useSettings()
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any>()

  const handleChange = (e: any) => {
    setQ(e.target.value)
  }

  const handleType = (e: any) => {
    clearTimeout(timer)
    setLoadingResults(true)

    timer = setTimeout(() => {
      fetch('/api/get-cities?q=' + q)
        .then((res) => res.json())
        .then(
          (result) => {
            setResults(result)
            setLoadingResults(false)
          },
          (error) => {
            console.log(error)
            setLoadingResults(false)
          }
        )
    }, waitTime)
  }

  useEffect(() => {
    if (q.length > 2) {
      const input = document.getElementById('one-time-code')
      input?.addEventListener('keyup', handleType)
    }

    return () => {
      clearTimeout(timer)
      const input = document.getElementById('one-time-code')
      input?.removeEventListener('keyup', handleType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  async function handleSelection(data: CityData) {
    const response = await fetch(
      `/api/get-region?lat=${data.lat}&lng=${data.lng}`
    )
    const region = await response.json()
    const timezone = await getTimezone(data.lat, data.lng)
    setSettings({
      city: data.name,
      region: region.short_name,
      country: data.country,
      lat: data.lat,
      lon: data.lng,
      timezone: timezone,
    })
    setConfig({ isOpen: false })
    setQ('')
    setResults([])
  }

  async function getCurrentPosition() {
    setLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const data = await getCity(`${latitude},${longitude}`)
      const timezone = await getTimezone(
        latitude.toString(),
        longitude.toString()
      )

      setSettings({
        city: data.city,
        region: data.region,
        country: data.country,
        lat: latitude,
        lon: longitude,
        timezone: timezone,
      })
      setLoadingLocation(false)
      setConfig({ isOpen: false })
    })
  }

  return config.isOpen ? (
    <div className="absolute top-0 left-0 z-[90] h-full w-full bg-primary bg-opacity-40">
      <span
        className="absolute top-0 left-0 z-[91] flex h-full w-full cursor-pointer"
        onClick={() => setConfig({ isOpen: false })}
      />
      <div className="absolute inset-0 z-[99] mx-auto my-auto h-3/4 w-5/6">
        <div
          className="absolute flex h-full w-full flex-col items-center justify-start gap-2 rounded-xl bg-primary py-2 opacity-100"
          data-testid="select-location-popup"
        >
          <h1
            className="text-xl font-bold"
            data-testid="select-location-popup-title"
          >
            Selecciona una ciudad
          </h1>
          <div className="flex w-full flex-row items-center justify-center gap-2 px-2">
            <input
              className="w-3/4 rounded-lg border border-gray-500 bg-secondary p-2"
              type="text"
              placeholder="Busca una ciudad"
              value={q}
              id="one-time-code"
              onChange={handleChange}
              autoComplete="one-time-code"
              data-testid="select-location-popup-input"
            />
            <button
              className="w-fit rounded-lg border border-gray-500 bg-secondary p-2"
              onClick={() => getCurrentPosition()}
            >
              {loadingLocation ? <LoadingIcon /> : <LocationIcon />}
            </button>
            <Link href={'/map'}>
              <a className="w-fit rounded-lg border border-gray-500 bg-secondary p-2">
                <MapIcon />
              </a>
            </Link>
          </div>

          <div className="flex w-full flex-col items-start justify-start gap-2 overflow-y-auto px-4 pt-3 ">
            {results?.map((result: any, index: number) => (
              <button
                className="inline-flex w-full justify-between rounded-lg border-2 border-gray-600 py-2 px-2 transition hover:border-white"
                key={index}
                onClick={() => {
                  handleSelection(result)
                }}
              >
                <span>{result.name}</span>
                <span>{result.country}</span>
              </button>
            ))}
          </div>
          {q.length > 2 && loadingResults && (
            <span className="inline-flex w-full items-center justify-center">
              <LoadingIcon />
            </span>
          )}
        </div>
      </div>
    </div>
  ) : null
}

type CityData = {
  name: string
  country: string
  lat: string
  lng: string
}
