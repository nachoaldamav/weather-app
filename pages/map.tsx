import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useEffect, useState } from 'react'
import { useSettings } from '../hooks/useSettings'
import getTimezone from '../libs/timezone'
import LoadingIcon from '../components/icons/loading'
import { useRouter } from 'next/router'
import { useSelectLocation } from '../hooks/useSelectLocation'

type Coordinates = {
  lat: number
  lng: number
}

export default function Map({ coord }: { coord: Coordinates }) {
  const router = useRouter()
  const { setSettings } = useSettings()
  const { setConfig } = useSelectLocation()
  const [saving, setSaving] = useState(false)
  const [coordinates, setCoordinates] = useState({
    lat: coord.lat,
    lng: coord.lng,
  })

  useEffect(() => {
    let marker: any
    mapboxgl.accessToken =
      'pk.eyJ1IjoibmFjaG9hbGRhbWEiLCJhIjoiY2wzaGMwNXFhMHQ0NDNjbjAydjVzd2RrNCJ9.YdYC2ywI7RCHzkmrnppE7w'

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/nachoaldama/cksz2ysd819qw17sd7yva4j07', // style URL
      center: [coord.lng, coord.lat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    })

    map.on('click', function (e) {
      setCoordinates({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      })

      if (marker) {
        marker.remove()
      }

      // Place marker
      marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map)
    })

    const geoCoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      language: 'es',
      // eslint-disable-next-line
      // @ts-ignore
      mapboxgl: mapboxgl,
    })
    map.addControl(geoCoder, 'top-right')

    geoCoder.on('result', (e) => {
      setCoordinates({
        lat: e.result.center[1],
        lng: e.result.center[0],
      })
    })
  }, [coord])

  async function handleSubmit() {
    setConfig({ isOpen: false })
    setSaving(true)
    const response = await fetch(
      `/api/get-city?latlng=${coordinates.lat},${coordinates.lng}`
    )
    const data = await response.json()

    const timezone = await getTimezone(
      coordinates.lat.toString(),
      coordinates.lng.toString()
    )

    setSettings({
      city: data.city,
      region: data.region,
      country: data.country,
      lat: coordinates.lat,
      lon: coordinates.lng,
      timezone: timezone,
    })
    setSaving(false)
    router.push('/')
  }

  return (
    <>
      <div className="absolute bottom-0 z-[99] h-fit w-full max-w-sm px-4 py-10">
        <div className="h-full w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-center">
          <h1 className="text-left font-semibold">Selecciona un lugar</h1>
          <div
            className="my-4 flex w-full max-w-full cursor-pointer flex-row items-center justify-center gap-2 blur"
            id="coordinates"
            onClick={() => {
              const e = document.getElementById('coordinates')
              e?.classList.toggle('blur')
            }}
          >
            <h2 className="text-sm font-bold">
              {coordinates.lat?.toPrecision(6)}
            </h2>
            <h2 className="text-sm font-bold">
              {coordinates.lng?.toPrecision(6)}
            </h2>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-600 bg-primary py-2 px-4 font-bold text-white hover:border-white"
            data-testid="save-button"
            onClick={() => {
              handleSubmit()
            }}
          >
            {saving ? (
              <>
                <LoadingIcon /> Guardando...
              </>
            ) : (
              'Guardar'
            )}
          </button>
        </div>
      </div>
      <div className="z-[10] h-full w-full" id="map" data-testid="map"></div>
    </>
  )
}

export function getServerSideProps(ctx: any) {
  const { lat, lon } = ctx.query

  return {
    props: {
      coord: {
        lat: parseFloat(lat) || null,
        lng: parseFloat(lon) || null,
      },
    },
  }
}
