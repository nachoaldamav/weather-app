import { test, expect, Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000')
})

test('Basic test', async ({ page }) => {
  // Get select location button
  const selectLocationButton = await page.waitForSelector(
    '[data-testid="select-location-button"]'
  )
  await selectLocationButton.click()
  await delay(200)
  // Chech if popup is visible
  const popup = await page.waitForSelector(
    '[data-testid="select-location-popup"]'
  )
  const popUptitle = await popup.waitForSelector(
    '[data-testid="select-location-popup-title"]'
  )

  expect(await popUptitle.evaluate((e) => e.textContent)).toBe(
    'Selecciona una ciudad'
  )
})

test('Select city from search', async ({ page }) => {
  // Get select location button
  const selectLocationButton = await page.waitForSelector(
    '[data-testid="select-location-button"]'
  )
  await selectLocationButton.click()
  await delay(200)
  // Chech if popup is visible
  const popup = await page.waitForSelector(
    '[data-testid="select-location-popup"]'
  )
  const searchInput = await popup.waitForSelector(
    '[data-testid="select-location-popup-input"]'
  )
  await searchInput.type('Barcelona')
  await delay(200)
  const searchResult = await popup.waitForSelector(
    '[data-testid="select-location-popup-results"]'
  )
  await popup.waitForSelector('[data-testid="select-location-popup-result"]')
  const results = await searchResult.$$('button')
  await results[1].click()
  await delay(1000)
  await checkLocationInLocalStorage(page, 'Barcelona')
})

test('Emulate location', async ({ browser }) => {
  const context = await browser.newContext({
    geolocation: {
      latitude: 40.73061,
      longitude: -73.935242,
    },
  })
  await context.grantPermissions(['geolocation'])
  const page = await context.newPage()

  await page.goto('http://localhost:3000')
  await delay(500)

  const selectLocationButton = await page.waitForSelector(
    '[data-testid="select-location-button"]'
  )
  await selectLocationButton.click()

  const popup = await page.waitForSelector(
    '[data-testid="select-location-popup"]'
  )

  const locationButton = await popup.waitForSelector(
    '[data-testid="select-location-popup-current-position"]'
  )
  await locationButton.click()

  // Wait for location to be updated
  await delay(500)

  await checkLocationInLocalStorage(page, 'Queens County')
})

test('Check middlewate location', async ({ page }) => {
  // Check local storage
  await delay(1000)
  await checkLocationInLocalStorage(page, 'Madrid')
})

async function checkLocationInLocalStorage(page: Page, title: string) {
  const localStorage: any = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('weather_settings'))
  })
  expect(localStorage.city).toBe(title)
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
