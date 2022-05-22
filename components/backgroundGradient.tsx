import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'
import getRelativeClientRect from '../utils/getRelativeClientRect'

const gradients = [
  {
    id: 'dusk',
    colors: ['#d7b88d', '#544e66', '#0d1532'],
    opacity: 0.5,
  },
  {
    id: 'sunset',
    colors: ['#f9ec97', '#cf7c49', '#461819'],
    opacity: 0.75,
  },
  {
    id: 'night',
    colors: ['#020024', '#090979', '#00d4ff'],
    decoration: <Stars />,
    opacity: 0.5,
    n_opacity: 0.05,
  },
  {
    id: 'day',
    colors: ['#b7eaff', '#94dfff'],
    opacity: 1,
  },
  {
    id: 'sunrise',
    colors: ['#e7e7cc', '#4d92b4', '#0f3d60'],
    opacity: 1,
  },
]

export default function GenerateGradient({ type }: { type: string }) {
  const gradient = gradients.find((g) => g.id === type)

  console.log(type)

  useEffect(() => {
    const gradientElement = document.getElementById('gradient')
    if (gradientElement) {
      const data = getRelativeClientRect(gradientElement)
      console.log(data)
    }
  }, [])

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
          className="absolute top-0 left-0 z-[7] h-full w-full md:rounded-lg"
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
        className="absolute bottom-0 left-0 z-[6] h-96 w-full opacity-100"
      />
      <img
        src="/images/fondo_2.png"
        className="absolute bottom-3 left-0 z-[5] h-96 w-full opacity-75"
      />
      <img
        src="/images/fondo_3.png"
        className="absolute bottom-0 left-0 z-[5] h-96 w-full opacity-40"
      />
    </span>
  )
}

function Stars() {
  const particlesInit = async (main: any) => {
    console.log(main)

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(tsParticles)
  }
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
        id="tsparticles"
        className="absolute top-0 left-0 h-full w-full"
        init={particlesInit}
        options={{
          background: {
            color: '#020024',
            opacity: 0.5,
          },
          detectRetina: false,
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
                enable: true,
                area: 1080,
              },
              limit: 0,
              value: 400,
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
