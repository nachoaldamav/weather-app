import { test, expect, Page } from '@playwright/test'
import { delay } from './initial.spec'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test('Map load', async ({ page }) => {
  await page.goto('http://localhost:3000/map')
  const map = await page.waitForSelector('[data-testid="map"]')
  await delay(1000)
  const mapElements = await map.$$('div')
  expect(mapElements.length).toBeGreaterThan(0)
})

test('Select location from controller', async ({ page }) => {
  await page.goto('http://localhost:3000/map')
  const searchInput = await page.waitForSelector('[aria-label="Search"]')
  await searchInput.type('Valladolid')
  await delay(500)
  const suggestions = await page.waitForSelector('.suggestions')
  const suggestion = await suggestions.$$('li')
  await suggestion[0].click()
  await delay(500)
  const saveButton = await page.waitForSelector('[data-testid="save-button"]')
  await saveButton.click()
})
