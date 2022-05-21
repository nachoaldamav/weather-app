import { useContext } from 'react'
import { userSettingsContext } from '../context/userSettings'

export const useSettings = () => {
  const { settings, setSettings } = useContext(userSettingsContext)
  return {
    settings,
    setSettings,
  }
}
