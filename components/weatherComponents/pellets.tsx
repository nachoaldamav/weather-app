import WeatherLayout from './weatherLayout'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Pellets() {
  return (
    <WeatherLayout>
      <div className="relative h-full w-full">
        <span className="absolute inset-0 h-full w-full bg-white bg-opacity-40" />
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
            number: {
              value: 100,
              density: {
                enable: false,
                value_area: 700,
              },
            },
            color: {
              value: '#fff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: 'img/github.svg',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 2,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 500,
              color: '#ffffff',
              opacity: 0.4,
              width: 2,
            },
            move: {
              enable: true,
              speed: 15,
              direction: 'bottom',
              random: false,
              straight: true,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 0.5,
                },
              },
              bubble: {
                distance: 400,
                size: 4,
                duration: 0.3,
                opacity: 1,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          fpsLimit: 60,
          retina_detect: true,
        }}
      />
    </motion.span>
  )
}
