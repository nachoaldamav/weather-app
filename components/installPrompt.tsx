import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const isPhone = checkDevice()
    const isInstalled = localStorage.getItem('installPrompt') || false

    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault()
      if (!isInstalled && isPhone) {
        setShow(true)
      }
      console.log('👍', 'beforeinstallprompt', event)
      // Stash the event so it can be triggered later.
      // @ts-ignore-next-line
      window.deferredPrompt = event
    })
  }, [])

  const handleClose = () => {
    setShow(false)
    localStorage.setItem('installPrompt', 'true')
  }

  async function handleInstall() {
    console.log('👍', 'butInstall-clicked')
    // @ts-ignore-next-line
    const promptEvent = window.deferredPrompt

    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log('👎', 'The deferred prompt isn`t available.')
      return
    }

    // Show the install prompt.
    promptEvent.prompt()
    // Log the result
    const result = await promptEvent.userChoice
    console.log('👍', 'userChoice', result)
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    // @ts-ignore-next-line
    window.deferredPrompt = null
    handleClose()
  }

  return (
    <>
      {show && (
        <div className="absolute top-0 left-0 z-[90] h-full w-full bg-primary bg-opacity-40">
          <div className="absolute inset-0 z-[99] mx-auto my-auto h-full w-[95%]">
            <div className="absolute bottom-0 mb-2 flex h-fit w-full flex-col items-center justify-center gap-2 rounded-xl bg-primary px-4 py-10 opacity-100">
              <h1 className="text-md mb-4 text-center font-medium">
                Consulta el tiempo donde quieras y cuando quieras
              </h1>
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <button
                  className="rounded-lg border-2 border-gray-600 bg-primary py-2 px-4 text-center font-bold text-white transition duration-150 hover:border-white"
                  onClick={() => handleInstall()}
                >
                  Instalar
                </button>
              </div>
              <button className="text-gray-300" onClick={() => handleClose()}>
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function checkDevice() {
  return window.innerWidth < 768
}
