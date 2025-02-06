import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button').click();
  await expect(page.getByText('Projects')).toBeVisible();

  await page.context().storageState({ path: authFile });
});