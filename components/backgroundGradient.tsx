/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'

const gradients = [
  {
    id: 'dusk',
    colors: ['#d7b88d', '#544e66', '#0d1532'],
    opacity: 0.5,
    n_opacity: 0,
  },
  {
    id: 'sunset',
    colors: ['#f9ec97', '#cf7c49', '#461819'],
    opacity: 0.75,
    props_opacity: [1, 1, 0.9],
  },
  {
    id: 'night',
    colors: ['#020024', '#090979', '#00d4ff'],
    decoration: <Stars />,
    opacity: 0.5,
    n_opacity: 0.05,
    props_opacity: [1, 1, 1],
  },
  {
    id: 'day',
    colors: ['#90dffe', '#38a3d1'],
    opacity: 1,
  },
  {
    id: 'sunrise',
    colors: ['#ed763e', '#9f5c6e', '#333462'],
    opacity: 1,
  },
]

export default function GenerateGradient({ type }: { type: string }) {
  const gradient = gradients.find((g) => g.id === type)

  return (
    <span
      className="absolute top-0 left-0 h-full w-full md:rounded-lg"
      id="gradient"
    >
      <AnimatePresence key={gradient?.id}>
        <motion.span
          className="absolute top-0 left-0 z-[0] h-full w-full md:rounded-lg"
          animate={{
            background: `radial-gradient(circle at bottom, ${gradient?.colors.join(
              ', '
            )})`,
            opacity: gradient?.opacity || 0.5,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
          }}
        ></motion.span>
      </AnimatePresence>
      <AnimatePresence>
        <motion.span
          className="absolute top-0 left-0 z-[5] h-full w-full md:rounded-lg"
          animate={{
            background: `radial-gradient(circle at bottom, ${gradient?.colors.join(
              ', '
            )})`,
            opacity: gradient?.n_opacity || 0.3,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
          }}
        ></motion.span>
      </AnimatePresence>
      <AnimatePresence>
        <motion.span
          className="absolute top-0 left-0 z-[8] h-full w-full blur-lg md:rounded-lg"
          animate={{
            background: `radial-gradient(circle at center, ${gradient?.colors.join(
              ', '
            )})`,
            opacity: gradient?.n_opacity || 0.2,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
          }}
        ></motion.span>
      </AnimatePresence>
      <span className="absolute top-0 left-0 h-full w-full">
        <AnimatePresence key={'decoration'}>
          {gradient?.decoration}
        </AnimatePresence>
      </span>
      <img
        src="/images/fondo_1.png"
        className="absolute bottom-0 left-0 z-[7] h-96 w-full"
        style={{
          opacity: (gradient?.props_opacity && gradient?.props_opacity[0]) || 1,
        }}
        alt="fondo_1"
      />
      <img
        src="/images/fondo_2.png"
        className="absolute bottom-3 left-0 z-[6] h-96 w-full"
        style={{
          opacity:
            (gradient?.props_opacity && gradient?.props_opacity[1]) || 0.95,
        }}
        alt="fondo_2"
      />
      <img
        src="/images/fondo_3.png"
        className="absolute bottom-0 left-0 z-[4] h-96 w-full"
        style={{
          opacity: (gradient?.props_opacity && gradient?.props_opacity[2]) || 1,
        }}
        alt="fondo_3"
      />
    </span>
  )
}

function Stars() {
  const particlesInit = async () => {
    await loadFull(tsParticles)
  }

  useEffect(() => {
    return () => {
      const main = document.getElementById('stars-particles')
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
        id="stars-particles"
        className="absolute top-0 left-0 z-[3] h-full w-full"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: '#020024',
            opacity: 0.5,
          },
          detectRetina: true,
          fpsLimit: 30,
          interactivity: {
            detectsOn: 'canvas',
            events: {
              resize: true,
            },
          },
          particles: {
            color: {
              value: '#fff',
            },
            number: {
              density: {
                enable: false,
                area: 500,
              },
              limit: 0,
              value: 100,
            },
            opacity: {
              animation: {
                enable: true,
                minimumValue: 0.05,
                speed: 0.25,
                sync: false,
              },
              random: {
                enable: true,
                minimumValue: 0.05,
              },
              value: 1,
            },
            shape: {
              type: 'circle',
            },
            size: {
              random: {
                enable: true,
                minimumValue: 0.5,
              },
              value: 2,
            },
          },
        }}
      />
    </motion.span>
  )
}
