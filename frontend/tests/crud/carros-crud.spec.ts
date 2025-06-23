import { test, expect } from '@playwright/test';

test('CRUD de carros: cadastrar, listar, editar e excluir', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="usuario"]', 'teste@hotmail.com');
  await page.fill('input[name="senha"]', '123456');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*home/);

  // 2. Acessa página de carros
  await page.click('text=Cadastro Car');
  await expect(page.getByRole('heading', { name: 'Cadastro de Veículos' })).toBeVisible();

  // 3. Preenche dados do carro
  const modeloInicial = 'E2ETestCar';
  const modeloEditado = 'E2ETestCarEditado';
  const marcaNome = 'Peugeot'; // precisa já existir
  const descricao = 'Carro de testes automáticos';
  const tipo = 'Hatch';

  // 4. Seleciona marca (Peugeot)
  await page.selectOption('select#brand', { label: marcaNome });

  // Preenche os campos
  await page.fill('input#model', modeloInicial);
  await page.fill('input#description', descricao);
  await page.fill('input#specs', 'Automático, 4 portas');
  await page.fill('input#averagePrice', '85000');
  await page.fill('input#type', tipo);
  await page.fill('input#year', '2023');

  // 5. Cadastra carro
  await page.click('button:has-text("Cadastrar Carro")');
  await expect(page.getByText('Carro cadastrado com sucesso!')).toBeVisible();
  await expect(page.getByText(modeloInicial)).toBeVisible();

  // 6. Edita o modelo
  const linha = page.locator('tr', { hasText: modeloInicial });
  await linha.getByRole('button', { name: /Editar/i }).click();
  await expect(page.locator('input#model')).toHaveValue(modeloInicial);

  await page.fill('input#model', modeloEditado);
  await page.click('button:has-text("Atualizar Carro")');
  await expect(page.getByText('Carro atualizado com sucesso!')).toBeVisible();
  await expect(page.getByText(modeloEditado)).toBeVisible();

  // 7. Exclui o carro
  page.once('dialog', dialog => dialog.accept()); // Simula o confirm()
  const linhaEditada = page.locator('tr', { hasText: modeloEditado });
  await linhaEditada.getByRole('button', { name: /Excluir/i }).click();
  await expect(page.getByText('Carro excluído com sucesso!')).toBeVisible();
  await expect(page.getByText(modeloEditado)).not.toBeVisible();
});
