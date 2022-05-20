import axios from 'axios'

export const rapidInstance = axios.create({
  baseURL: 'https://weatherapi-com.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY || '',
  },
})
