import { useSettings } from '../hooks/useSettings'
import getHours from './getHours'

const periods = [
  {
    type: 'sunrise',
    start: 6,
    end: 10,
  },
  {
    type: 'day',
    start: 10,
    end: 17,
  },
  {
    type: 'sunset',
    start: 17,
    end: 20,
  },
  {
    type: 'dusk',
    start: 20,
    end: 23,
  },
  {
    type: 'night',
    start: 0,
    end: 6,
  },
]

export default function getCurrentPeriod(timezone?: string | null) {
  if (!timezone) {
    const now = new Date()
    const hour = now.getHours()

    const currentPeriod = periods.find((p) => {
      if (hour && hour >= p.start && hour <= p.end) {
        return true
      } else {
        return false
      }
    })

    return currentPeriod?.type || 'day'
  } else {
    const hours = getHours(timezone)
    const currentPeriod = periods.find((p) => {
      if (hours && hours >= p.start && hours <= p.end) {
        return true
      } else {
        return false
      }
    })

    return currentPeriod?.type || 'day'
  }
}
