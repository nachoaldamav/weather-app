export default async function getTimezone(lat: string, lng: string) {
  const response = await fetch(`/api/get-timezone?lat=${lat}&lng=${lng}`)
  const data = await response.json()

  return data.timeZoneId
}
