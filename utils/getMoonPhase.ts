export default function getMoonPhase(year: number, month: number, day: number) {
  let c = 0
  let e = 0
  let jd: any = 0
  let b: MoonPhase = 0

  if (month < 3) {
    year--
    month += 12
  }

  ++month

  c = 365.25 * year

  e = 30.6 * month

  jd = c + e + day - 694039.09 //jd is total days elapsed

  jd /= 29.5305882 //divide by the moon cycle

  b = parseInt(jd) //int(jd) -> b, take integer part of jd

  jd -= b //subtract integer part to leave fractional part of original jd

  b = Math.round(jd * 8) //scale fraction from 0-8 and round

  if (b >= 8) {
    b = 0 //0 and 8 are the same so turn 8 into 0
  }

  return b
}

export enum MoonPhase {
  NewMoon = 0,
  WaxingCrescentMoon = 1,
  QuarterMoon = 2,
  WaxingGibbousMoon = 3,
  FullMoon = 4,
  WaningGibbousMoon = 5,
  LastQuarterMoon = 6,
  WaningCrescentMoon = 7,
}
