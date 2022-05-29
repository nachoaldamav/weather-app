import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useSettings } from '../hooks/useSettings'

export default function TemperatureChart({ data }: { data?: any }) {
  const { settings, setSettings } = useSettings()
  const timezone = settings.timezone

  const currentHour = parseInt(
    new Date()
      .toLocaleString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: timezone || 'Europe/Madrid',
      })
      .split(':')[0]
  )

  const options = {
    chart: {
      id: 'temperature',
      stroke: {
        curve: 'smooth',
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      background: {
        color: '#f4f4f4',
      },
      fontFamily: 'Inter, sans-serif',
    },
    xaxis: {
      categories: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
      tickAmount: 8,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName: string) => 'Temperatura',
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    theme: {
      mode: 'dark',
    },
    annotations: {
      xaxis: [
        {
          x: currentHour,
          boderColor: '#FF0000',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Ahora',
            style: {
              color: '#fff',
              background: '#775DD0',
              fontSize: '12px',
            },
          },
        },
      ],
    },
  }

  const series = [
    {
      name: 'Temperatura',
      data:
        (data && data.map((hour: ForecastHour) => hour.temp_c.toFixed(0))) ||
        [],
    },
  ]

  return (
    <Chart
      // @ts-ignore-next-line
      options={options}
      series={series}
      type="area"
      width="100%"
      height={'200px'}
    />
  )
}

type ForecastHour = {
  temp_c: number
  time_epoch: number
}
