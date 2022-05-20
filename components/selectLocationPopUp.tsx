import { useSelectLocation } from '../hooks/useSelectLocation'

export default function SelectLocationPopUp() {
  const { config, setConfig } = useSelectLocation()

  return config.isOpen ? (
    <div className="absolute top-0 left-0 z-[90] h-full w-full bg-primary bg-opacity-40">
      <span
        className="absolute top-0 left-0 z-[91] flex h-full w-full cursor-pointer"
        onClick={() => setConfig({ isOpen: false })}
      />
      <div className="absolute inset-0 z-[99] mx-auto my-auto h-3/4 w-5/6">
        <div className="absolute flex h-full w-full items-start justify-center rounded-xl bg-primary py-4 opacity-100">
          <h1 className="text-xl font-bold">Selecciona una ciudad</h1>
        </div>
      </div>
    </div>
  ) : null
}
