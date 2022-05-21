export function getTimePer(hour: number) {
  const isNight = hour >= 0 && hour <= 6
  if (isNight) {
    const per = (hour / 6) * 100
    return per
  } else {
    const per = (hour / 24) * 100
    return per
  }
}
