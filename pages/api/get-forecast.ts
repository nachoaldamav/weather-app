import { NextApiRequest, NextApiResponse } from 'next'
import { rapidInstance } from '../../libs/apiInstance'

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 'max-age=60, public')
  const { location } = req.query

  if (!location) {
    res.status(400).json({ error: 'Missing city' })
    return
  }

  const options = {
    params: {
      q: location,
      days: 3,
    },
  }

  try {
    const response = await rapidInstance.get('forecast.json', options)
    res.status(200).json(response.data)
  } catch (error) {
    console.log('Request failed with options: ', options)
    res.status(500).json({ error })
  }
}
