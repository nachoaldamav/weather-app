import { AxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { rapidInstance } from '../../libs/apiInstance'

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 's-maxage=600')
  const { location } = req.query

  if (!location) {
    res.status(400).json({ error: 'Missing city' })
    return
  }

  const options = {
    params: {
      q: location,
    },
  }

  try {
    const response = await rapidInstance.get('current.json', options)
    res.status(200).json(response.data)
  } catch (error: any) {
    console.log('Request failed with options: ', options)
    res.status(500).json({ error: error.message })
  }
}
