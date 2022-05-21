import { NextApiRequest, NextApiResponse } from 'next'

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=3600')

  const { lat, lng } = req.query
  if (!lat || !lng) {
    res.status(400).json({ error: 'Missing coordinates' })
    return
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_KEY}`
  )
  const data = await response.json()

  if (data.results && data.results.length > 0) {
    // Get types administrative_area_level_1
    const city = data.results[0].address_components.find(
      (component: ComponentResponse) =>
        component.types.includes('administrative_area_level_1')
    )

    if (!city) {
      res.status(404).json({ error: 'City not found' })
      return
    } else {
      res.status(200).json(city)
    }
  } else {
    res.status(200).json({ data })
  }
}

type CityData = {
  country: string
  name: string
  lat: string
  lng: string
}

type ComponentResponse = {
  types: string[]
  short_name: string
  long_name: string
}
