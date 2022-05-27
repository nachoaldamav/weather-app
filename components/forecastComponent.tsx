import Image from 'next/image'
import { useSettings } from '../hooks/useSettings'
import { Forecast } from '../utils/getForecast'
import { conditions } from '../utils/getIcons'

export default function ForecastComponent({ data }: { data?: Forecast }) {
  const { settings } = useSettings()
  const hours = selectHours(data)

  console.log(hours)

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

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto">
      <h3 className="text-lg font-medium">Hoy</h3>
      <div className="flex w-full flex-row justify-between gap-2 overflow-y-auto">
        {hours.map((hour, index) => (
          <HourItem key={index} data={hour} timezone={settings.timezone} />
        ))}
      </div>
      <h3 className="text-lg font-medium">Pronóstico</h3>
    </div>
  )
}

function HourItem({
  data,
  timezone,
}: {
  data: ForecastHour
  timezone: string
}) {
  function parseHour(date: number) {
    const dt = new Date(date * 1000)
    return dt.toLocaleTimeString('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: timezone || 'Europe/Madrid',
    })
  }

  const icon = conditions.find((i) => i.ids.includes(data.condition.code))?.name

  const isNight = () => {
    const epoch = new Date(data.time_epoch * 1000)
    const hour = parseInt(
      epoch
        .toLocaleTimeString('es-ES', {
          hour12: false,
          timeZone: timezone || 'Europe/Madrid',
        })
        .split(':')[0]
    )
    return hour >= 21 || hour <= 6
  }

  return (
    <div className="flex h-fit w-1/5 flex-col items-center justify-between gap-2 rounded-lg bg-secondary px-2 py-3">
      <Image
        className="h-8 w-8"
        src={`/images/weather/${icon}_${isNight() ? 'n' : 'd'}.svg`}
        alt={data.condition.text}
        layout="fixed"
        width={38}
        height={38}
      />
      <div className="text-center font-semibold">
        <h4 className="text-xs">{parseHour(data.time_epoch)}</h4>
        <h3 className="text-xl">{data.temp_c.toFixed(0)}ºC</h3>
      </div>
    </div>
  )
}

function selectHours(data: Forecast | undefined) {
  const currentEpoch = new Date().getTime() / 1000

  const hours: Array<ForecastHour> = []
  data?.forecast.forecastday[0].hour.forEach((item) => {
    const epoch = new Date(item.time_epoch).getTime() + 3600
    if (epoch > currentEpoch) {
      hours.push(item)
    }
  })
  return hours
}

type ForecastHour = {
  time_epoch: number
  temp_c: number
  condition: {
    code: number
    text: string
  }
}
