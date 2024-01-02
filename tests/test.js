import { expect, test } from '@playwright/test';

test('Index page expected to go to schedule', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'SCHEDULE' })).toBeVisible();
});
