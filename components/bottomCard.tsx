import React, { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

const INITIAL_VALUE = 550

export default function BottomCard({
  children,
}: {
  children: React.ReactNode
}) {
  const constraintsRef = useRef(null)
  const y = useMotionValue(625)
  const width = useTransform(y, [INITIAL_VALUE, 0], ['85%', '95%'])
  const [position, setPosition] = useState(INITIAL_VALUE)

  const handleDragEnd = (event: any, info: any) => {
    // Get if is near the top or bottom
    const isNearTop = info.point.y < 475 ? true : false

    if (isNearTop) {
      setPosition(0)
    } else {
      setPosition(INITIAL_VALUE)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 h-3/4 w-full">
      <motion.div ref={constraintsRef} className="absolute h-full w-full" />
      <motion.div
        drag="y"
        dragElastic={0}
        dragConstraints={{
          bottom: INITIAL_VALUE,
          top: 0,
        }}
        onDragEnd={handleDragEnd}
        className="absolute bottom-0 left-0 z-20 h-full w-full"
        initial={{ y: INITIAL_VALUE }}
        style={{
          y,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <motion.div
          className="mx-auto flex h-screen max-w-full flex-col items-center rounded-t-lg bg-primary"
          style={{
            width: width,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
