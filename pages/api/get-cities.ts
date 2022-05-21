import { NextApiRequest, NextApiResponse } from 'next'
import cities from '../../utils/cities.json'

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=3600')

  const { q } = req.query
  if (!q) {
    res.status(400).json({ error: 'Missing city' })
    return
  }

  // Find similar cities
  const similarCities = cities.filter((city) =>
    city.name.toLowerCase().includes(q.toLowerCase())
  )

  // Order by similarity
  const orderedCities = similarCities.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  )

  if (!orderedCities) {
    res.status(404).json({ error: 'City not found' })
    return
  } else {
    res.status(200).json(orderedCities)
  }
}

type CityData = {
  country: string
  name: string
  lat: string
  lng: string
}
