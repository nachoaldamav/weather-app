import { test, expect, Page } from '@playwright/test'
import { delay } from './initial.spec'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/map')
})

test('Map load', async ({ page }) => {
  const map = await page.waitForSelector('[data-testid="map"]')
  await delay(1000)
  const mapElements = await map.$$('div')
  expect(mapElements.length).toBeGreaterThan(0)
})

test('Select location from controller', async ({ page }) => {
  const searchInput = await page.waitForSelector('[aria-label="Search"]')
  await searchInput.type('Valladolid')
  await delay(500)
  const suggestions = await page.waitForSelector('.suggestions')
  const suggestion = await suggestions.$$('li')
  await suggestion[0].click()
  await delay(500)
  const saveButton = await page.waitForSelector('[data-testid="save-button"]')
  await saveButton.click()

  // Wait for the page to reload
  await page.waitForNavigation({ waitUntil: 'networkidle' })
  const localStorage: any = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('weather_settings'))
  })
  expect(localStorage.city).toBe('Valladolid')
})
