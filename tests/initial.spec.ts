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
