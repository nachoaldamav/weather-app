import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getTimePer } from '../utils/getTimePer'

const transition = { duration: 2, ease: 'easeInOut' }

export default function Satellite() {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const currentHour = new Date().getHours()
    setPercentage(getTimePer(currentHour))
  }, [])

  console.log(percentage)

  return (
    <div className="container">
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
        className="sun"
        style={{
          background: `radial-gradient(circle at bottom, #ffd700, #ffd700)`,
          opacity: percentage > 82 ? '0%' : '100%',
        }}
        initial={{ offsetDistance: '0%', scale: 2 }}
        animate={{ offsetDistance: `${percentage}%`, scale: 2 }}
        transition={transition}
      />
    </div>
  )
}
