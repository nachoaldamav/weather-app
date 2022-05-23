import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSettings } from '../hooks/useSettings'
import getHours from '../utils/getHours'
import { getTimePer } from '../utils/getTimePer'

const transition = { duration: 5, ease: 'easeInOut' }

export default function Satellite() {
  const { settings } = useSettings()
  const [percentage, setPercentage] = useState(0)
  const [clipPath, setClipPath] = useState(`circle(50% at 50% 50%)`)
  const currentHour = getHours(settings.timezone)

  useEffect(() => {
    setPercentage(getTimePer(currentHour))
  }, [currentHour])

  const isNight = currentHour >= 0 && currentHour <= 6

  return (
    <div
      className="container absolute inset-0 h-full w-full"
      style={{
        filter: isNight ? 'blur(7px)' : 'blur(10px)',
        opacity: isNight ? 0.5 : 1,
        zIndex: 4,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={'100%'}
        height={'100%'}
        viewBox="0 0 600 620"
      >
        <motion.path
          d="M0,600 C400,1 199,400 600,700"
          fill="transparent"
          strokeWidth="12"
          stroke="transparent"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={transition}
        />
      </svg>
      <motion.div
        className={isNight ? 'moon' : 'sun'}
        style={
          isNight
            ? {
                opacity: calculateOpacity(percentage),
                maskImage: `url(/images/moon/1.svg)`,
                WebkitMaskImage: `url(/images/moon/1.svg)`,
                maskSize: '80%',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }
            : {
                opacity: calculateOpacity(percentage),
                clipPath: clipPath,
                background:
                  currentHour >= 18 || currentHour <= 10
                    ? 'radial-gradient(circle at bottom, #ffd700, #ffd700)'
                    : 'radial-gradient(circle at bottom, #f4f5f5, #f4f5f5)',
                boxShadow:
                  currentHour >= 18
                    ? '0px 0px 0px 0px #ffd700'
                    : '0 0 50px 0px yellow, 0 0 100px 0 white',
              }
        }
        initial={{
          offsetDistance: '0%',
          scale: isNight ? 3 : 2,
          clipPath: `circle(50% at 50% 50%)`,
        }}
        animate={{
          offsetDistance: `${percentage}%`,
          scale: isNight ? 3 : 2,
        }}
        transition={transition}
      ></motion.div>
    </div>
  )
}

function calculateClipPath(percentage: number) {
  if (percentage >= 60) {
    const innerPercentage = (40 * (percentage - 60)) / 100
    console.log(innerPercentage)
    return `circle(50% at 50% ${innerPercentage}%)`
  } else {
    return `circle(50% at 50% 50%)`
  }
}

function calculateOpacity(percentage: number) {
  if (percentage >= 82) {
    return 0
  }

  if (percentage <= 50) {
    return percentage / 50
  } else {
    return (100 - percentage) / 2
  }
}
