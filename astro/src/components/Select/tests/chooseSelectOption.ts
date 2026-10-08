import type { Locator } from "@playwright/test";

/**
 * Picks an option in the custom `Select` dropdown inside `scope`, the way a
 * user would: open the menu, then click the option.
 */
export async function chooseSelectOption(
  scope: Locator,
  value: string,
): Promise<void> {
  await scope.locator(".select__button").click();
  await scope.locator(`.select__option[data-value="${value}"]`).click();
}
