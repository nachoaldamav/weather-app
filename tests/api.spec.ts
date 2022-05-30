import { test, expect } from '@playwright/test'

test('[API] Get weather data', async ({ request }) => {
  const response = await request.get(
    'http://localhost:3000/api/get-weather?location=Madrid'
  )
  expect(response.ok()).toBeTruthy()
})

test('[API] Get forecast data', async ({ request }) => {
  const response = await request.get(
    'http://localhost:3000/api/get-forecast?location=Madrid'
  )
  expect(response.ok()).toBeTruthy()
})

test('[API] Get weather data with invalid location', async ({ request }) => {
  const response = await request.get(
    'http://localhost:3000/api/get-weather?location=7945165768457457984654'
  )
  expect(response.ok()).toBeFalsy()
})

test('[API] Get timezone data', async ({ request }) => {
  const response = await request.get(
    'http://localhost:3000/api/get-timezone?latlng=40.730610,-73.935242'
  )
  const data = await response.json()
  expect(data.timeZoneId).toBe('America/New_York')
})
