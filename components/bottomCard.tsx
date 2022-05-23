import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function BottomCard({
  children,
}: {
  children: React.ReactNode
}) {
  const constraintsRef = useRef(null)
  const [position, setPosition] = useState(325)

  const handleDragEnd = (event: any, info: any) => {
    // Get if is near the top or bottom
    const isNearTop = info.point.y < 475 ? true : false

    if (isNearTop) {
      setPosition(0)
    } else {
      setPosition(325)
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
