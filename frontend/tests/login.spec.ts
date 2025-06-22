import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5173'; // ajuste se sua porta for diferente

test.describe('Login', () => {
  test('Login com sucesso', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    await page.fill('input[name="usuario"]', 'teste@hotmail.com');
    await page.fill('input[name="senha"]', '123456');

    // Captura o alert de sucesso
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Login realizado com sucesso');
      await dialog.dismiss();
    });

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/home/); // ajuste conforme sua rota pós-login
  });

  test('Login com falha (senha errada)', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    await page.fill('input[name="usuario"]', 'usuario@teste.com');
    await page.fill('input[name="senha"]', 'senhaerrada');

    // Captura o alert de erro
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Incorrect email or password');
      await dialog.dismiss();
    });

    await page.click('button[type="submit"]');
    // Não precisa checar texto na tela, pois o erro é mostrado via alert
  });
});

//