import { useContext } from 'react'
import { SelectLocationContext } from '../context/selectLocation'

export const useSelectLocation = () => {
  const { config, setConfig } = useContext(SelectLocationContext)
  return {
    config,
    setConfig,
  }
}
