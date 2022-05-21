import { useEffect, useState } from 'react'
import { useSelectLocation } from '../hooks/useSelectLocation'
import { useSettings } from '../hooks/useSettings'
import getTimezone from '../libs/timezone'

export default function SelectLocationPopUp() {
  const { config, setConfig } = useSelectLocation()
  const { settings, setSettings } = useSettings()
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any>()

  const handleChange = (e: any) => {
    setQ(e.target.value)
  }

  useEffect(() => {
    if (q.length > 2) {
      fetch('/api/get-cities?q=' + q)
        .then((res) => res.json())
        .then(
          (result) => {
            setResults(result)
          },
          (error) => {
            console.log(error)
          }
        )
    }
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

  return config.isOpen ? (
    <div className="absolute top-0 left-0 z-[90] h-full w-full bg-primary bg-opacity-40">
      <span
        className="absolute top-0 left-0 z-[91] flex h-full w-full cursor-pointer"
        onClick={() => setConfig({ isOpen: false })}
      />
      <div className="absolute inset-0 z-[99] mx-auto my-auto h-3/4 w-5/6">
        <div className="absolute flex h-full w-full flex-col items-center justify-start rounded-xl bg-primary py-2 opacity-100">
          <h1 className="text-xl font-bold">Selecciona una ciudad</h1>
          <input
            className="w-3/4 rounded-lg border border-gray-500 bg-secondary p-2"
            type="text"
            placeholder="Busca una ciudad"
            value={q}
            onChange={handleChange}
          />
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
