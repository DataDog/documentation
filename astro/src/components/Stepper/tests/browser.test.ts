import { test, expect } from "@playwright/test";

// The accordion stepper is the first one on the test page.
const accordion = ".stepper--collapsed";

test.describe("Stepper component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/stepper");
  });

  test("hydrates and becomes visible", async ({ page }) => {
    const stepper = page.locator(`${accordion}[data-hydrated="true"]`).first();
    await expect(stepper).toBeVisible();
    await expect(stepper).toHaveClass(/stepper--initialized/);
  });

  test("shows only the first step body initially", async ({ page }) => {
    const stepper = page.locator(`${accordion}[data-hydrated="true"]`).first();
    const steps = stepper.locator(".stepper__step");
    await expect(steps.first()).toHaveClass(/stepper__step--active/);
    await expect(steps.nth(0).locator(".stepper__step-content")).toBeVisible();
    await expect(steps.nth(1).locator(".stepper__step-content")).toBeHidden();
  });

  test("Next advances the active step and completes the previous", async ({
    page,
  }) => {
    const stepper = page.locator(`${accordion}[data-hydrated="true"]`).first();
    const steps = stepper.locator(".stepper__step");

    await steps.nth(0).locator(".stepper__next-btn").click();

    await expect(steps.nth(1)).toHaveClass(/stepper__step--active/);
    await expect(steps.nth(0)).toHaveClass(/stepper__step--completed/);
    await expect(steps.nth(1).locator(".stepper__step-content")).toBeVisible();
  });

  test("clicking a step title jumps to that step", async ({ page }) => {
    const stepper = page.locator(`${accordion}[data-hydrated="true"]`).first();
    const steps = stepper.locator(".stepper__step");

    await steps.nth(2).locator(".stepper__step-title").click();
    await expect(steps.nth(2)).toHaveClass(/stepper__step--active/);
  });

  test("expand all reveals every step body", async ({ page }) => {
    const stepper = page.locator(`${accordion}[data-hydrated="true"]`).first();

    await stepper.locator(".stepper__show-all-btn").click();
    await expect(stepper).toHaveClass(/stepper--all-expanded/);

    const contents = stepper.locator(".stepper__step-content");
    const count = await contents.count();
    for (let i = 0; i < count; i++) {
      await expect(contents.nth(i)).toBeVisible();
    }
  });

  test("finishing shows the finished message and reset control", async ({
    page,
  }) => {
    const stepper = page.locator(`${accordion}[data-hydrated="true"]`).first();
    const steps = stepper.locator(".stepper__step");

    await steps.nth(0).locator(".stepper__next-btn").click();
    await steps.nth(1).locator(".stepper__next-btn").click();
    await steps.nth(2).locator(".stepper__finish-btn").click();

    await expect(stepper.locator(".stepper__finished")).toBeVisible();
    await expect(stepper.locator(".stepper__reset-btn")).toBeVisible();

    await stepper.locator(".stepper__reset-btn").click();
    await expect(steps.nth(0)).toHaveClass(/stepper__step--active/);
    await expect(stepper.locator(".stepper__finished")).toBeHidden();
  });
});
