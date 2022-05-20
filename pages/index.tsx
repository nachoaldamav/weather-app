import { useState } from 'react'
import { motion } from 'framer-motion'
import GenerateGradient from '../components/backgroundGradient'
import getCurrentPeriod from '../utils/getCurrentPeriod'

export default function HomePage({ city, region, country }: Geo) {
  const [cardPosition, setCardPosition] = useState(-200)
  /* const currentPeriod = getCurrentPeriod() */
  const [currentHour, setCurrentHour] = useState(15)
  const currentPeriod = getCurrentPeriod(currentHour)

  return (
    <div className="relative flex h-full w-full flex-col p-4">
      <GenerateGradient type={currentPeriod} />
      <div className="z-10 flex flex-col">
        <h1 className="text-xl font-bold">
          {city}, {region}
        </h1>
        <h2 className="mt-4 text-9xl font-bold">26º</h2>
      </div>
      <motion.div
        className="fixed bottom-0 left-0 z-20 h-64 w-full"
        initial={{
          bottom: -200,
        }}
        animate={{
          bottom: cardPosition,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <div className="mx-auto flex h-full w-[25%] flex-col items-center rounded-t-lg bg-primary">
          <div
            className="flex w-full cursor-pointer flex-row justify-between rounded-lg p-4"
            onClick={() => setCardPosition(cardPosition === 0 ? -200 : 0)}
          >
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
      </motion.div>
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
