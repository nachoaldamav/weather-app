import { NextApiRequest, NextApiResponse } from 'next'
import { rapidInstance } from '../../libs/apiInstance'

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

  try {
    const response = await rapidInstance.get('timezone.json', {
      params: {
        q: latlng,
      },
    })

    res.status(200).json({
      timeZoneId: response.data.location.tz_id,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
