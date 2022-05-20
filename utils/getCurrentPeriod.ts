const periods = [
  {
    type: 'sunrise',
    start: 6,
    end: 10,
  },
  {
    type: 'day',
    start: 10,
    end: 19,
  },
  {
    type: 'sunset',
    start: 19,
    end: 24,
  },
  {
    type: 'night',
    start: 0,
    end: 6,
  },
]

export default function getCurrentPeriod(hour: number) {
  /* const now = new Date()
  const hour = now.getHours() */

  const currentPeriod = periods.find((p) => {
    if (hour >= p.start && hour <= p.end) {
      return true
    } else {
      return false
    }
  })

  return currentPeriod?.type || 'day'
}

enum Period {
  sunrise,
  day,
  sunset,
  night,
}
