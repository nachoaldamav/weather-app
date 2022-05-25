export default async function getForecast(city: string) {
  const response = await fetch(`/api/get-forecast?location=${city}`)
  const data: Forecast = await response.json()
  return data
}

export type Forecast = {
  location: Location
  current: Current
  forecast: {
    forecastday: ForecastDay[]
  }
}

type Location = {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

type Current = {
  temp_c: number
  is_day: number
  condition: {
    text: string
    code: number
  }
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  humidity: number
  cloud: number
  feelslike_c: number
  vis_km: number
  uv: number
  gust_kph: number
}

type ForecastDay = {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    mintemp_c: number
    avgtemp_c: number
    condition: {
      text: string
      icon: string
      code: number
    }
  }
  hour: Hour[]
}

type Hour = {
  time_epoch: number
  time: string
  temp_c: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  humidity: number
  cloud: number
  feelslike_c: number
  windchill_c: number
  heatindex_c: number
  dewpoint_c: number
  will_it_rain: number
  will_it_snow: number
  chance_of_rain: number
  chance_of_snow: number
  uv: number
}
