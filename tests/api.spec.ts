import { test, expect, Page } from '@playwright/test'

test('[API] Get weather data', async ({ page }) => {
  await page.goto('http://localhost:3000/api/get-weather?location=Madrid')
  expect(page.url()).toBe(
    'http://localhost:3000/api/get-weather?location=Madrid'
  )
})

test('[API] Get forecast data', async ({ page }) => {
  await page.goto('http://localhost:3000/api/get-forecast?location=Madrid')
  expect(page.url()).toBe(
    'http://localhost:3000/api/get-forecast?location=Madrid'
  )
})
