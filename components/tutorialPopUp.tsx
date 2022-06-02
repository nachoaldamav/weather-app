import Image from 'next/image'
import { useEffect, useState } from 'react'
import Chevron from './icons/chevron'
import LoadingIcon from './icons/loading'

export default function Tutorial() {
  const [showTutorial, setShowTutorial] = useState(true)

  useEffect(() => {
    const weatherTutorialPopup = localStorage.getItem('weather_tutorial_popup')

    if (weatherTutorialPopup === null || weatherTutorialPopup === 'false') {
      setShowTutorial(false)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('weather_tutorial_popup', 'true')
    setShowTutorial(true)
  }

  return !showTutorial ? (
    <div className="absolute inset-0 h-full w-full">
      <span
        className="absolute inset-0 z-[60] h-full w-full cursor-pointer bg-black bg-opacity-50"
        onClick={() => handleClose()}
      />
      <div className="absolute inset-0 z-[99] mx-auto my-auto h-5/6 w-5/6">
        <div className="absolute flex h-full w-full flex-col items-center justify-start gap-2 rounded-xl bg-primary py-2 opacity-100">
          <Steps handleClose={handleClose} />
        </div>
      </div>
    </div>
  ) : null
}

function Steps({ handleClose }: any) {
  const [currentStep, setCurrentStep] = useState(0)
  const [notififications, setNotifications] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleNotifications() {
    setLoading(true)

    Notification.requestPermission((status) => {
      if (status === 'granted') {
        setNotifications(true)
      }
    }).catch((e) => {
      console.error(e)
    })

    setLoading(false)
  }

  const steps = [
    {
      text: (
        <>
          <p className="mb-6 text-center text-xl font-bold">¡Bienvenido!</p>
          <p className="text-sm">
            Weather App es una aplicación que te permite ver el tiempo actual en
            cualquier ciudad del mundo.
          </p>
        </>
      ),
    },
    {
      text: (
        <>
          <p className="mb-6 text-center text-xl font-bold">¿Cómo funciona?</p>
          <p className="mb-2 text-sm">
            Para seleccionar una ciudad, haz click en la parte superior de la
            pantalla.
          </p>
          <div className="flex flex-row items-center justify-center">
            <Image
              src="https://i.gyazo.com/fdc1b10e77ada34d8a40459f755fcdb9.gif"
              alt="Seleccionar una ciudad"
              width={140}
              height={300}
            />
          </div>
        </>
      ),
    },
    {
      text: (
        <>
          <p className="mb-2 text-xl font-semibold">¡Ya casi está!</p>
          <p className="mb-4 text-sm">
            Ahora podrás ver el tiempo actual, la previsión de los 2 días
            siguientes y más cosas como las fases lunares, fondo dinámico basado
            en la hora actual o notificaciones fuera de la app.
          </p>
          <button
            className="inline-flex w-fit items-center justify-center rounded-lg border-2 border-gray-600 bg-transparent py-2 px-4 text-xs font-bold text-white transition duration-150 hover:border-white"
            onClick={async () => {
              await handleNotifications()
            }}
          >
            {loading && <LoadingIcon />}
            {!loading && notififications
              ? 'Notificaciones activadas'
              : 'Activar notificaciones'}
          </button>
          <p className="mt-2 text-xs">
            <span className="text-red-600">*</span> Solo se enviarán
            notificaciones si usas la app muchas veces e instalas la PWA.
          </p>
        </>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <div className="flex h-full w-full flex-row items-center justify-center py-4">
      <button
        className="inline-flex w-1/4 justify-start  font-bold text-white"
        onClick={() => handlePrev()}
      >
        <Chevron rotation={90} />
      </button>
      <p className="mx-2 w-full text-center">{steps[currentStep].text}</p>
      <button
        className="inline-flex w-1/4 justify-end pr-2 font-bold text-white"
        onClick={() => handleNext()}
      >
        <Chevron rotation={-90} />
      </button>
    </div>
  )
}
