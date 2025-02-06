import { type Locator, type Page, request } from '@playwright/test';

export class ProjectsPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly columnHeader: Locator;
  readonly cardTitle: Locator;
  readonly cardTag: Locator;

  constructor(page: Page, projectName, columnName, cardTitleText, cardTagText) {
    this.page = page;
    this.pageHeader = page.locator('h1', { hasText: projectName });
    this.columnHeader = page.locator('h2', { hasText: columnName });
    this.cardTitle = page.locator('h3', { hasText: cardTitleText });
    this.cardTag = page.locator('span', { hasText: cardTagText });
  }
}
