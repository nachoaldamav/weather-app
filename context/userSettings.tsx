import { createContext, useEffect, useState } from 'react'

export const userSettingsContext = createContext({
  settings: {
    city: '',
    region: '',
    country: '',
    lat: 0,
    lon: 0,
    timezone: '',
    simulate: false,
  },
  setSettings: (e: any) => {},
})

export const UserSettingsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [settings, setSettings] = useState({
    city: '',
    region: '',
    country: '',
    lat: 0,
    lon: 0,
    timezone: '',
    simulate: false,
  })

  useEffect(() => {
    const localSettings = JSON.parse(
      localStorage.getItem('weather_settings') || '{}'
    )
    if (localSettings.city) {
      setSettings(localSettings)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('weather_settings', JSON.stringify(settings))
    navigator.serviceWorker.controller?.postMessage({
      type: 'SETTINGS_CHANGED',
      settings,
    })
  }, [settings])

  return (
    <userSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </userSettingsContext.Provider>
  )
}
