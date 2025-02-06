import { test, expect } from '@playwright/test';
import { ProjectsPage } from './projects.pom';
import fs from 'fs';
import path from 'path';

// Define the type for the test data
interface ProjectTestData {
  scenario: string;
  project: string;
  column: string;
  card: string;
  tags: Array<string>;
}

//Read the contents of the JSON file and parse to array.
const testDataPath = path.resolve(__dirname, 'projects.parameters.json');
const rawData = fs.readFileSync(testDataPath, "utf8");
const projectTestData = JSON.parse(rawData) as ProjectTestData[];

test.beforeEach(async ({ page }) => {
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button').click();
  await expect(page.getByText('Projects')).toBeVisible();
});

projectTestData.forEach(({ scenario, project, column, card, tags }) => {
  test(`${scenario} - ${project} project ${column} column should contain ${card} 
    card with ${tags} tags`, async ({ page }) => {

    //Verify Web Application project is currently selected
    expect(page.getByRole('button', { selected: true }).getByText('Web Application'));

    const projectPage = new ProjectsPage(page, project, column, card);

    if (project === 'Mobile Application') {
      await page.getByText('Mobile Application').click();
    }

    await expect(projectPage.pageHeader).toContainText(project);
    await expect(projectPage.column).toContainText(card);
    await expect(await projectPage.getCardTags(tags)).toContainText(tags);
  })
});


