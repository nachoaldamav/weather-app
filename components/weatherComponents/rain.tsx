import WeatherLayout from './weatherLayout'
import { AnimatePresence, motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'

export default function Rain() {
  return (
    <WeatherLayout>
      <div className="relative h-full w-full">
        <img
          src="/images/clouds/1.png"
          className="relative"
          style={{
            top: '50px',
            left: '20px',
          }}
          alt="cloudy-1"
        />
        <img
          src="/images/clouds/2.png"
          className="relative"
          style={{
            marginTop: '-200px',
            marginLeft: '0px',
          }}
          alt="cloudy-2"
        />
        <RainParticles />
      </div>
    </WeatherLayout>
  )
}

export function RainParticles() {
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
          particles: {
            number: { value: 120, density: { enable: false, value_area: 10 } },
            color: { value: '#fff' },
            shape: {
              type: 'image',
              stroke: { width: 0, color: '#000000' },
              polygon: { nb_sides: 3 },
              image: {
                src: 'https://i.imgur.com/GoIdncZ.png',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
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
          retina_detect: true,
        }}
      />
    </motion.span>
  )
}
