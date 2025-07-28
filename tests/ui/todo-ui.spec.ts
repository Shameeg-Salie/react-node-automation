import { test, expect } from '@playwright/test';


test.describe('Todo UI Automation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.getByPlaceholder('Username').fill('user');
        await page.getByPlaceholder('Password').fill('pass');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Todo List')).toBeVisible();
    });

    test('Add a todo item', async ({ page }) => {
        await page.getByPlaceholder('New item').fill('Buy bread');
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.getByText('Buy bread')).toBeVisible();
    });

    test('Edit a todo item', async ({ page }) => {
        await page.getByPlaceholder('New item').fill('Wash car');
        await page.getByRole('button', { name: 'Add' }).click();

        await page.getByRole('button', { name: 'Edit' }).last().click();
        const textbox = page.getByRole('textbox').last()
        await textbox.waitFor({ state: 'visible' });
        await textbox.fill('Wash car updated');
        await page.getByRole('button', { name: 'Save' }).click();

        await expect(page.getByText('Wash car updated')).toBeVisible();
    });

    test('Delete a todo item', async ({ page }) => {
        await page.getByPlaceholder('New item').fill('Delete this');
        await page.getByRole('button', { name: 'Add' }).click();

        const item = page.getByText('Delete this');
        await item.locator('..').getByRole('button', { name: 'Delete' }).click();
        await expect(item).not.toBeVisible();
    });
});
