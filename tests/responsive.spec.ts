import { mkdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const screenshotDir = path.join(process.cwd(), "test-results", "responsive");

const viewports = [
  { name: "mobile-320x568", width: 320, height: 568 },
  { name: "mobile-360x640", width: 360, height: 640 },
  { name: "mobile-375x667", width: 375, height: 667 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 },
  { name: "landscape-667x375", width: 667, height: 375 },
  { name: "landscape-844x390", width: 844, height: 390 },
  { name: "landscape-932x430", width: 932, height: 430 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "tablet-820x1180", width: 820, height: 1180 },
  { name: "tablet-912x1368", width: 912, height: 1368 },
  { name: "tablet-1024x768", width: 1024, height: 768 },
  { name: "desktop-1280x800", width: 1280, height: 800 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
];

const localizedRoutes = [
  "/",
  "/private-testing/",
  "/race-with-us/",
  "/the-lamera/",
  "/team/",
  "/calendar/",
  "/results/",
  "/contact/",
];

const routes = [
  "/",
  ...(["en", "fr", "de"] as const).flatMap((locale) =>
    localizedRoutes.map((route) => (route === "/" ? `/${locale}/` : `/${locale}${route}`)),
  ),
];

function slug(value: string) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

test.beforeAll(() => {
  mkdirSync(screenshotDir, { recursive: true });
});

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${viewport.name} has no horizontal overflow on ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => undefined);

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth);

      await page.screenshot({
        path: path.join(screenshotDir, `${viewport.name}-${slug(route)}.png`),
        fullPage: false,
      });
    });
  }
}

for (const viewport of [
  { name: "landscape-667x375", width: 667, height: 375 },
  { name: "landscape-844x390", width: 844, height: 390 },
  { name: "landscape-932x430", width: 932, height: 430 },
]) {
  test(`mobile menu is accessible in ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/en/", { waitUntil: "domcontentloaded" });

    const trigger = page.locator('button[aria-controls="mobile-navigation-dialog"]');
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.locator("#mobile-navigation-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    const dialogDimensions = await dialog.evaluate((element) => ({
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
    }));
    expect(dialogDimensions.scrollHeight).toBeGreaterThanOrEqual(dialogDimensions.clientHeight);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await page.screenshot({
      path: path.join(screenshotDir, `${viewport.name}-menu-closed.png`),
      fullPage: false,
    });
  });
}

test("language switch preserves path, query and hash", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/en/contact/?objective=race-weekend&circuit=portimao#main", {
    waitUntil: "domcontentloaded",
  });

  await page.locator('select[aria-label="Language"]').first().selectOption("fr");
  await expect(page).toHaveURL(/\/fr\/contact\/\?objective=race-weekend&circuit=portimao#main$/);
});

test("contact form prefills request context and never simulates success without endpoint", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/contact/?objective=race-weekend&circuit=portimao", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.locator('select[name="objective"]')).toHaveValue("Race weekend");
  await expect(page.locator('input[name="circuit"]')).toHaveValue("Portimão");

  await page.locator('input[name="firstName"]').fill("Test");
  await page.locator('input[name="lastName"]').fill("Driver");
  await page.locator('input[name="email"]').fill("driver@example.com");
  await page.locator('input[name="phone"]').fill("+352 000 000");
  await page.locator('input[name="country"]').fill("Luxembourg");
  await page.locator('input[name="racingLicence"]').fill("National");
  await page.locator('textarea[name="message"]').fill("I would like to discuss this programme.");
  await page.locator('input[name="privacyConsent"]').check();
  await page.locator('button[type="submit"]').click();

  await expect(page.getByText("NEXT_PUBLIC_ENQUIRY_ENDPOINT")).toBeVisible();
  await expect(page.locator('input[name="firstName"]')).toHaveValue("Test");
});

test("reduced motion route keeps layout contained", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/de/private-testing/", { waitUntil: "domcontentloaded" });

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth);
});
