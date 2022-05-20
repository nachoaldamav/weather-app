import WeatherLayout from './weatherLayout'

export default function Cloudy() {
  return (
    <WeatherLayout>
      <div className="relative h-full w-full">
        <img
          src="/images/clouds/1.png"
          className="relative"
          style={{
            top: '125px',
            left: '20px',
          }}
          alt="cloudy-1"
        />
        <img
          src="/images/clouds/2.png"
          className="relative"
          style={{
            marginTop: '-220px',
            marginLeft: '0px',
          }}
          alt="cloudy-2"
        />
      </div>
    </WeatherLayout>
  )
}
