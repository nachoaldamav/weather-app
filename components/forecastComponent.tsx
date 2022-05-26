import { useSettings } from '../hooks/useSettings'
import { Forecast } from '../utils/getForecast'

export default function ForecastComponent({ data }: { data?: Forecast }) {
  const { settings } = useSettings()

  function parseDate(date: string) {
    const d = new Date(date)
    return d.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: settings.timezone,
    })
  }

  function parseHour(date: number) {
    const dt = new Date(date)
    return dt.toLocaleTimeString('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: settings.timezone,
    })
  }

  return (
    <div
      className="flex h-[55%] w-full flex-col gap-2 overflow-y-auto"
      onDragStart={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onDrag={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {data?.forecast.forecastday.map((day, index) => (
        <div key={index} className="flex w-full flex-col">
          <h1 className="sticky top-0 bg-primary px-2 py-4 text-left text-xl font-semibold">
            {parseDate(day.date)}
          </h1>
          {day.hour.map((hour, index) => (
            <div
              key={index}
              className="flex w-full flex-row justify-between px-2"
            >
              <span>{parseHour(hour.time_epoch * 1000)}</span>
              <span>{hour.temp_c.toFixed(0)}°</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
