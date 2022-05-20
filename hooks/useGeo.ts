import { useEffect, useState } from 'react'

export default function useGeo() {
  const [geo, setGeo] = useState<Geo | null>(null)
  const [location, setLocation] = useState<Location | any>({
    country: 'US',
    city: 'San Francisco',
    region: 'CA',
  })

  useEffect(() => {
    const headers = new Headers()
    if (typeof window !== 'undefined') {
      const geo = window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        }
      )
    }
    const country = headers.get('X-Country')
    const city = headers.get('X-City')
    const region = headers.get('X-Region')
    setLocation({ country, city, region })
  }, [])

  return { geo, location }
}

type Geo = {
  latitude: number
  longitude: number
}

type Location = {
  country: string
  city: string
  region: string
}
