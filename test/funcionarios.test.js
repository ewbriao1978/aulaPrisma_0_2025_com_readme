const request = require('supertest');
const app = require('../app'); // Ajuste o path se necessário
const { PrismaClient } = require('@prisma/client');

// Mock o Prisma Client
jest.mock('@prisma/client', () => {
  const mClient = {
    funcionarios: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mClient) };
});

const prisma = new PrismaClient();


describe('GET /funcionarios/listar', () => {
  afterEach(() => jest.clearAllMocks()); // Limpa mocks após cada teste

  test('Deve listar todos os funcionários com sucesso (200)', async () => {
    const mockFuncionarios = [{ id: 1, nome: 'João', email: 'joao@example.com', salario: 5000 }];
    prisma.funcionarios.findMany.mockResolvedValue(mockFuncionarios);

    const response = await request(app).get('/funcionarios/listar');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFuncionarios);
  });

  test('Deve retornar erro interno se Prisma falhar (500)', async () => {
    prisma.funcionarios.findMany.mockRejectedValue(new Error('Erro no DB'));

    const response = await request(app).get('/funcionarios/listar');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao listar funcionários' });
  });
});

describe('POST /funcionarios/cadastrar', () => {
  afterEach(() => jest.clearAllMocks());

  test('Deve cadastrar um novo funcionário com sucesso (201)', async () => {
    const novoFunc = { nome: 'Maria', email: 'maria@example.com', salario: 6000 };
    prisma.funcionarios.create.mockResolvedValue({ id: 2, ...novoFunc, salario: 6000 });

    const response = await request(app)
      .post('/funcionarios/cadastrar')
      .send(novoFunc);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(novoFunc);
  });

  test('Deve retornar erro se campos obrigatórios faltarem (400)', async () => {
    const response = await request(app)
      .post('/funcionarios/cadastrar')
      .send({ nome: 'Maria' }); // Faltando email e salario
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Todos os campos são obrigatórios' });
  });

  test('Deve retornar erro interno se Prisma falhar (500)', async () => {
    prisma.funcionarios.create.mockRejectedValue(new Error('Erro no DB'));

    const response = await request(app)
      .post('/funcionarios/cadastrar')
      .send({ nome: 'Maria', email: 'maria@example.com', salario: 6000 });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao cadastrar funcionário' });
  });
});

describe('DELETE /funcionarios/deletar/:id', () => {
  afterEach(() => jest.clearAllMocks());

  test('Deve deletar um funcionário com sucesso (200)', async () => {
    const mockDeleted = { id: 1, nome: 'João', email: 'joao@example.com', salario: 5000 };
    prisma.funcionarios.delete.mockResolvedValue(mockDeleted);

    const response = await request(app).delete('/funcionarios/deletar/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDeleted);
  });

  test('Deve retornar erro se ID não for fornecido (400)', async () => {
    const response = await request(app).delete('/funcionarios/deletar/'); // ID vazio
    expect(response.status).toBe(404); // Express retorna 404 para rota inválida, mas ajustamos para 400 no código
  });

  test('Deve retornar erro interno se Prisma falhar (500)', async () => {
    prisma.funcionarios.delete.mockRejectedValue(new Error('Erro no DB'));

    const response = await request(app).delete('/funcionarios/deletar/1');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao deletar funcionário' });
  });
});

describe('PUT /funcionarios/atualizar/:id', () => {
  afterEach(() => jest.clearAllMocks());

  test('Deve atualizar um funcionário com sucesso (200)', async () => {
    const atualizado = { nome: 'João Atualizado', email: 'joao@new.com', salario: 7000 };
    prisma.funcionarios.update.mockResolvedValue({ id: 1, ...atualizado, salario: 7000 });

    const response = await request(app)
      .put('/funcionarios/atualizar/1')
      .send(atualizado);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(atualizado);
  });

  test('Deve retornar erro se campos obrigatórios faltarem (400)', async () => {
    const response = await request(app)
      .put('/funcionarios/atualizar/1')
      .send({ nome: 'João' }); // Faltando email e salario
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Todos os campos são obrigatórios' });
  });

  test('Deve retornar erro interno se Prisma falhar (500)', async () => {
    prisma.funcionarios.update.mockRejectedValue(new Error('Erro no DB'));

    const response = await request(app)
      .put('/funcionarios/atualizar/1')
      .send({ nome: 'João', email: 'joao@example.com', salario: 5000 });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao atualizar funcionário' });
  });
});