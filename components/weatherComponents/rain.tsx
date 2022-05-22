import WeatherLayout from './weatherLayout'
import { AnimatePresence, motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'
import Head from 'next/head'

export default function Rain() {
  return (
    <WeatherLayout>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/rainy/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/rainy/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/rainy/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/icons/rainy/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/icons/rainy/favicon.ico" />
      </Head>
      <div className="relative h-full w-full">
        <span className="absolute inset-0 h-full w-full bg-black bg-opacity-40" />
        <img
          src="/images/clouds/1.png"
          className="relative opacity-75"
          style={{
            top: '50px',
            left: '20px',
          }}
          alt="rainy-1"
        />
        <img
          src="/images/clouds/2.png"
          className="relative opacity-75"
          style={{
            marginTop: '-200px',
            marginLeft: '0px',
          }}
          alt="rainy-2"
        />
        <RainParticles />
      </div>
    </WeatherLayout>
  )
}

export function RainParticles() {
  const particlesInit = async () => {
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
                width: 200,
                height: 200,
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
          retina_detect: true,
        }}
      />
    </motion.span>
  )
}
