export default async function getWeather(city: string) {
  const response = await fetch(`/api/get-weather?location=${city}`)
  const data = await response.json()
  return data
}
