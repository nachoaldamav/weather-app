import { AnimatePresence } from 'framer-motion'
import Cloudy from './weatherComponents/cloudy'
import Misty from './weatherComponents/mist'
import Pellets from './weatherComponents/pellets'
import Rain from './weatherComponents/rain'
import Snow from './weatherComponents/snow'
import Storm from './weatherComponents/storm'

const components = [
  {
    name: 'blizzard',
    text: 'Ventisca',
    ids: [1117],
    component: <Snow factor={2} />,
  },
  {
    name: 'clear',
    text: 'Despejado',
    ids: [1000],
  },
  {
    name: 'drizzle',
    text: 'Llovizna',
    ids: [1072, 1150, 1153, 1168, 1171],
    component: <Rain factor={0.2} />,
  },
  {
    name: 'fog',
    text: 'Niebla',
    ids: [1030, 1135, 1147],
    component: <Misty />,
  },
  {
    name: 'heavy_rain',
    text: 'Lluvia intensa',
    ids: [1192, 1195, 1246],
    component: <Rain factor={1.5} />,
  },
  {
    name: 'moderate_rain',
    text: 'Lluvia moderada',
    ids: [1186, 1189, 1201, 1207, 1240, 1243],
    component: <Rain factor={1} />,
  },
  {
    name: 'mostly_cloudy',
    text: 'Mayormente nublado',
    ids: [1006, 1009],
    component: <Cloudy factor={1} />,
  },
  {
    name: 'partly_cloudy',
    text: 'Parcialmente nublado',
    ids: [1003],
    component: <Cloudy factor={0} />,
  },
  {
    name: 'pellets',
    text: 'Granizo',
    ids: [1237, 1261, 1264],
    component: <Pellets />,
  },
  {
    name: 'rain_thunder',
    text: 'Lluvia con tormenta',
    ids: [1273, 1279],
    component: <Storm rain={true} />,
  },
  {
    name: 'light_rain',
    text: 'Lluvia ligera',
    ids: [1063, 1180, 1198, 1183, 1069, 1204, 1249, 1252],
    component: <Rain factor={0.4} />,
  },
  {
    name: 'snow',
    text: 'Nieve',
    ids: [1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1066, 1114],
    component: <Snow factor={1} />,
  },
  {
    name: 'thunder_possible',
    text: 'Tormenta',
    ids: [1276, 1282, 1087],
    component: <Storm rain={false} />,
  },
]

export default function Weather({ id }: { id: number }) {
  const component = components.find((c) => c.ids.includes(id))
  return <AnimatePresence>{component?.component || null}</AnimatePresence>
}
