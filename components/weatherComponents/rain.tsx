import WeatherLayout from './weatherLayout'
import { AnimatePresence, motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Rain() {
  return (
    <WeatherLayout>
      <div className="relative h-full w-full">
        <span className="absolute inset-0 h-full w-full bg-black bg-opacity-40" />
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src="/images/clouds/1.png"
            className="relative"
            style={{
              top: '125px',
              left: '20px',
            }}
            alt="cloudy-1"
            width={600}
            height={300}
            layout="responsive"
          />
        </div>
        <div
          className="absolute"
          style={{
            top: '150px',
            left: '5px',
            height: 'auto',
            width: '70%',
          }}
        >
          <Image
            src="/images/clouds/2.png"
            alt="cloudy-2"
            width={600}
            height={300}
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <RainParticles />
      </div>
    </WeatherLayout>
  )
}

export function RainParticles() {
  const particlesInit = async () => {
    await loadFull(tsParticles)
  }

  useEffect(() => {
    return () => {
      const main = document.getElementById('rain-particles')
      if (main) {
        main.remove()
      }
    }
  }, [])

  return (
    <motion.span
      className="absolute top-0 left-0 h-full w-full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <Particles
        id="rain-particles"
        className="absolute top-0 left-0 z-[3] h-full w-full"
        init={particlesInit}
        options={{
          fullScreen: false,
          particles: {
            number: { value: 50, density: { enable: false, value_area: 10 } },
            color: { value: '#fff' },
            shape: {
              type: 'image',
              stroke: { width: 0, color: '#000000' },
              polygon: { nb_sides: 3 },
              image: {
                src: 'https://i.imgur.com/GoIdncZ.png',
                width: 400,
                height: 400,
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: { enable: false, speed: 1, opacity_min: 0.5, sync: false },
            },
            size: {
              value: 2.5,
              random: true,
              anim: {
                enable: false,
                speed: 5,
                size_min: 0.1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 50,
              direction: 'bottom',
              random: true,
              straight: true,
              out_mode: 'out',
              bounce: false,
            },
          },
          fpsLimit: 60,
          retina_detect: true,
        }}
      />
    </motion.span>
  )
}
