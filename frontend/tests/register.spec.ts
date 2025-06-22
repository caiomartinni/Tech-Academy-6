import { test, expect } from '@playwright/test';


test.describe('Cadastro de usuário', () => {
  test('Cadastro com sucesso', async ({ page }) => {
    await page.goto("http://localhost:5173/CriarConta");

    await page.getByPlaceholder('Nome de Usuário').fill('Usuário de Teste');
    await page.getByPlaceholder('Email').fill('teste@playwright.com');
    await page.getByPlaceholder('CPF').fill('76615729075');
    await page.fill('input[name="senha"]', 'Senha@123');
    await page.fill('input[name="confirmarSenha"]', 'Senha@123');
    
    await page.getByRole('button', { name: 'Criar Conta' }).click();

    await expect(page).toHaveURL("http://localhost:5173/login");
  });

  test('Cadastro com falha (CPF inválido)', async ({ page }) => {
    await page.goto("http://localhost:5173/CriarConta");

    await page.getByPlaceholder('Nome de Usuário').fill('Usuário com CPF Inválido');
    await page.getByPlaceholder('Email').fill('email@invalido.com');
    await page.getByPlaceholder('CPF').fill('11111111111');
    await page.fill('input[name="senha"]', 'Senha@123');
    await page.fill('input[name="confirmarSenha"]', 'Senha@123');

    await page.getByRole('button', { name: 'Criar Conta' }).click();

    await expect(page.getByText(/cpf inválido/i)).toBeVisible();
  });

  test('Cadastro com falha (senhas diferentes)', async ({ page }) => {
    await page.goto("http://localhost:5173/CriarConta");

    await page.getByPlaceholder('Nome de Usuário').fill('Usuário com Senha Diferente');
    await page.getByPlaceholder('Email').fill('email@teste.com');
    await page.getByPlaceholder('CPF').fill('76615729075');
    await page.fill('input[name="senha"]', 'Senha@123');
    await page.fill('input[name="confirmarSenha"]', 'OutraSenha@123');

    await page.getByRole('button', { name: 'Criar Conta' }).click();

    await expect(page.getByText(/senhas não coincidem/i)).toBeVisible();
  });
});
