export default async function getCity(latlng: string) {
  const response = await fetch(`/api/get-city?latlng=${latlng}`)
  const data: GetCityResponse = await response.json()

  return data
}

type GetCityResponse = {
  city: string
  region: string
  country: string
}
