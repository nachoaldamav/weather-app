import { useState } from 'react'
import { motion } from 'framer-motion'
import GenerateGradient from '../components/backgroundGradient'
import getCurrentPeriod from '../utils/getCurrentPeriod'

export default function HomePage() {
  const [cardPosition, setCardPosition] = useState(-200)
  const currentPeriod = getCurrentPeriod()

  console.log(currentPeriod)

  return (
    <div className="relative flex h-full w-full flex-col p-4">
      <GenerateGradient type={currentPeriod} />
      <div className="z-10 flex flex-col">
        <h1 className="text-xl font-bold">Valladolid</h1>
        <h2 className="mt-4 text-9xl font-bold">26º</h2>
      </div>
      <motion.div
        className="absolute left-0 z-20 h-64 w-full"
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
        <div className="mx-auto h-full w-[90%] rounded-t-lg bg-primary">
          <div
            className="flex cursor-pointer flex-row justify-between rounded-lg p-4"
            onClick={() => setCardPosition(cardPosition === 0 ? -200 : 0)}
          >
            <h2 className="text-lg font-bold">Histórico</h2>
            <h3 className="text-lg font-medium">15 días</h3>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
