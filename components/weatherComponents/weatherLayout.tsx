import { motion } from 'framer-motion'

export default function WeatherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
