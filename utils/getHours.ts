export default function getHours(timezone: string) {
  const date = new Date().toLocaleString('es-ES', {
    timeZone: timezone || 'Europe/Madrid',
  })
  const hours = date.split(',')[1]?.split(' ')[1] || ''
  return parseInt(hours.split(':')[0])
}
