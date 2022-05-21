import { AnimatePresence } from 'framer-motion'
import Cloudy from './weatherComponents/cloudy'
import Rain from './weatherComponents/rain'

const components = [
  {
    name: 'Despejado',
    ids: [1000],
    type: 'clear',
  },
  {
    ids: [1006, 1009, 1003],
    name: 'Nuboso',
    type: 'cloudy',
    component: <Cloudy />,
  },
  {
    ids: [1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201],
    name: 'Lluvia',
    type: 'rain',
    component: <Rain />,
  },
]

export default function Weather({ id }: { id: number }) {
  const component = components.find((c) => c.ids.includes(id))
  return <AnimatePresence>{component?.component || null}</AnimatePresence>
}
