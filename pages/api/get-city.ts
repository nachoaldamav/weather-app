import { NextApiRequest, NextApiResponse } from 'next'

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=3600')

  const { latlng } = req.query
  if (!latlng) {
    res.status(400).json({ error: 'Missing coordinates' })
    return
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${process.env.GOOGLE_MAPS_KEY}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.results && data.results.length > 0) {
    // Get types administrative_area_level_1
    const region = data.results[0].address_components.find(
      (component: ComponentResponse) =>
        component.types.includes('administrative_area_level_1')
    )

    const city = data.results[0].address_components.find(
      (component: ComponentResponse) =>
        component.types.includes('administrative_area_level_2')
    )

    const locality = data.results[0].address_components.find(
      (component: ComponentResponse) => component.types.includes('locality')
    )

    const country = data.results[0].address_components.find(
      (component: ComponentResponse) => component.types.includes('country')
    )

    if (!city && !locality) {
      res.status(404).json({ error: 'City not found' })
      return
    } else {
      res.status(200).json({
        city: locality?.long_name || city.long_name,
        region: region?.short_name || locality.short_name || '',
        country: country?.short_name,
      })
    }
  } else {
    res.status(200).json({ data })
  }
}

type ComponentResponse = {
  types: string[]
  short_name: string
  long_name: string
}
