import { type Locator, type Page } from '@playwright/test';

export class ProjectsPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly column: Locator;
  readonly card: Locator;

  constructor(page: Page, projectName: string, columnName: string, cardTitleText: string) {
    this.page = page;
    this.pageHeader = page.locator('h1', { hasText: projectName });
    this.column = page.locator('div', { hasText: columnName }).first();
    this.card = page.locator('div', { hasText: cardTitleText }).first();
  }

  async getCardTags(cardTagText: Array<string>) {
    return this.card.locator('div', { hasText: cardTagText[0] });
  }
}
