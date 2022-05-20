import { useState } from 'react'
import { motion } from 'framer-motion'
import GenerateGradient from '../components/backgroundGradient'
import getCurrentPeriod from '../utils/getCurrentPeriod'
import BottomCard from '../components/bottomCard'
import LocationIcon from '../components/icons/location'
import { SelectLocationProvider } from '../context/selectLocation'
import { useSelectLocation } from '../hooks/useSelectLocation'
import SelectLocationPopUp from '../components/selectLocationPopUp'

export default function HomePage({ city, region, country }: Geo) {
  const currentPeriod = getCurrentPeriod()
  const { setConfig } = useSelectLocation()
  const [cardPosition, setCardPosition] = useState(-200)
  const [currentHour, setCurrentHour] = useState(15)
  /* const currentPeriod = getCurrentPeriod(currentHour) */

  return (
    <div className="relative flex h-full w-full flex-col p-4">
      <SelectLocationPopUp />
      <button
        className="absolute top-0 right-0 z-50 m-2 rounded border border-secondary bg-primary p-1"
        onClick={() => setConfig({ isOpen: true })}
      >
        <LocationIcon />
      </button>
      <GenerateGradient type={currentPeriod} />
      <div className="z-10 flex flex-col">
        <h1 className="text-xl font-bold">
          {city}, {region}
        </h1>
        <h2 className="mt-4 text-9xl font-bold">26º</h2>
      </div>
      <BottomCard cardPosition={cardPosition}>
        <div className="mx-auto flex h-screen w-96 max-w-xs flex-col items-center rounded-t-lg bg-primary md:max-w-sm">
          <div className="flex w-full cursor-pointer flex-row justify-between rounded-lg p-4">
            <h2 className="text-lg font-bold">Histórico</h2>
            <h3 className="text-lg font-medium">15 días</h3>
          </div>
          <hr className="my-10 w-full" />
          <input
            type="number"
            id="hour"
            defaultValue={currentHour}
            className="w-1/2 rounded-md text-black"
            max={24}
            min={0}
          />
          <button
            className="mt-4 w-1/2 rounded-lg border text-white"
            onClick={() => {
              const hour: any = document.getElementById('hour')
              setCurrentHour(parseInt(hour?.value))
            }}
          >
            Cambiar
          </button>
        </div>
      </BottomCard>
    </div>
  )
}

export const getServerSideProps = ({ query }: any) => ({
  props: query,
})

type Geo = {
  city: string
  region: string
  country: string
}
