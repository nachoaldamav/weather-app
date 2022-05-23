export default async function getTimezone(lat: string, lng: string) {
  const latlng = `${lat},${lng}`
  const response = await fetch(`/api/get-timezone?latlng=${latlng}`)
  const data = await response.json()

  return data.timeZoneId
}
