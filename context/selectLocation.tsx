import { createContext, ReactChild, useEffect, useState } from 'react'

export const SelectLocationContext = createContext({
  config: {
    isOpen: false,
  },
  setConfig: (e: any) => {},
})

export const SelectLocationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [config, setConfig] = useState({
    isOpen: false,
  })

  useEffect(() => {
    const handleClick = (e: any) => {
      if (
        e.target.className ===
        'fixed inset-0 z-[99] flex h-full w-full items-center justify-center bg-primary opacity-100'
      ) {
        setConfig({ isOpen: false })
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <SelectLocationContext.Provider value={{ config, setConfig }}>
      {children}
    </SelectLocationContext.Provider>
  )
}
