import HeaderIcons from '../headerIcons'
import WeatherLayout from './weatherLayout'

export default function Misty() {
  return (
    <WeatherLayout>
      <HeaderIcons name={'fog'} />
      <div className="relative h-full w-full">
        <div className="fog-container opacity-50">
          <div className="fog-img fog-img-first"></div>
          <div className="fog-img fog-img-second"></div>
        </div>
      </div>
    </WeatherLayout>
  )
}
