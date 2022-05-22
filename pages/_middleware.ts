import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country || 'ES'
  const city = geo?.city || 'Madrid'
  const region = geo?.region || 'CYL'
  const lat = geo?.latitude || 40.416775
  const lon = geo?.longitude || -3.70379

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('lat', lat.toString())
  url.searchParams.set('lon', lon.toString())

  return NextResponse.rewrite(url)
}
