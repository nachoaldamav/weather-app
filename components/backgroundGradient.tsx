import { AnimatePresence, motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'

const gradients = [
  {
    id: 'sunset',
    colors: ['#fcb045', '#fd1d1d', '#833ab4'],
    opacity: 0.5,
  },
  {
    id: 'night',
    colors: ['#020024', '#090979', '#00d4ff'],
    decoration: <Stars />,
    opacity: 0.5,
  },
  {
    id: 'day',
    colors: ['#b7eaff', '#94dfff'],
    opacity: 0.75,
  },
  {
    id: 'sunrise',
    colors: ['#757abf', '#8583be', '#eab0d1'],
    opacity: 0.5,
  },
]

export default function GenerateGradient({ type }: { type: string }) {
  const gradient = gradients.find((g) => g.id === type)
  return (
    <span className="absolute top-0 left-0 z-[5] h-full w-full md:rounded-lg">
      <AnimatePresence>
        <motion.span
          className="absolute top-0 left-0 z-[5] h-full w-full md:rounded-lg"
          animate={{
            background: `linear-gradient(to bottom, ${gradient?.colors.join(
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
      <span className="absolute top-0 left-0 h-full w-full">
        <AnimatePresence>{gradient?.decoration}</AnimatePresence>
      </span>
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
