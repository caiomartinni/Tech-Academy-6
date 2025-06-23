import { test, expect } from '@playwright/test';

test.describe('CRUD de Marcas', () => {
  test('Cadastrar, listar, editar e excluir marca', async ({ page }) => {
    // ⚠️ Simular login ou setar token se necessário antes:
    await page.goto('http://localhost:5173/login');
    await page.fill('input[name="usuario"]', 'teste@hotmail.com');
    await page.fill('input[name="senha"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:5173/home');

    
    await page.click('text=Cadastro Marca');
    await expect(page.locator('h1')).toHaveText('Cadastro de Marcas');

    // Criação
    const nomeMarca = 'MarcaTestE2E';
    await page.fill('input[placeholder="Nome da marca"]', nomeMarca);
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await expect(page.getByText('Marca cadastrada com sucesso!')).toBeVisible();
    await expect(page.getByText(nomeMarca)).toBeVisible();

    // Edição
    const novaMarca = 'MarcaTestEditadaE2E';
    await page.once('dialog', dialog => dialog.accept(novaMarca));
    await page.locator('tr', { hasText: nomeMarca }).getByRole('button', { name: /Editar/i }).click();
    await expect(page.getByText('Marca atualizada com sucesso!')).toBeVisible();
    await expect(page.getByText(novaMarca)).toBeVisible();

    // Exclusão
    await page.once('dialog', dialog => dialog.accept());
    await page.locator('tr', { hasText: novaMarca }).getByRole('button', { name: /Excluir/i }).click();
    await expect(page.getByText('Marca excluída com sucesso!')).toBeVisible();
    await expect(page.getByText(novaMarca)).not.toBeVisible();
  });
});
