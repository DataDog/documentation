import { type Page } from '@playwright/test';

export async function hideOverlays(page: Page) {
  await page.addStyleTag({
    content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
    `,
  });
}
