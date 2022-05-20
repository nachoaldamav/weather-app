import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function BottomCard({
  children,
  cardPosition,
}: {
  children: React.ReactNode
  cardPosition: number
}) {
  const constraintsRef = useRef(null)
  const [position, setPosition] = useState(325)

  const handleDragEnd = (event: any, info: any) => {
    // Get if is near the top or bottom
    const isNearTop = info.point.y < 475 ? true : false

    console.log({ isNearTop, position: info.point.y })

    // if near top set position to 0, else position to 325
    if (isNearTop) {
      setPosition(0)
      console.log('near top, set position to', position)
    } else {
      setPosition(325)
      console.log('not near top, set position to', position)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 h-full max-h-96 w-full">
      <motion.div ref={constraintsRef} className="absolute h-full w-full" />
      <motion.div
        drag="y"
        dragElastic={0.5}
        dragConstraints={{
          bottom: 325,
          top: 0,
        }}
        onDragEnd={handleDragEnd}
        className="absolute bottom-0 left-0 z-20 h-full w-full"
        initial={{ y: 325 }}
        animate={{
          y: position,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
