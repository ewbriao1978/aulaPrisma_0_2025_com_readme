const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async listarFuncionarios(req, res) {
    try {
      const funcionarios = await prisma.funcionarios.findMany();
      res.status(200).json(funcionarios);
    } catch (error) {
      console.error('Erro ao listar funcionários:', error);
      res.status(500).json({ error: 'Erro ao listar funcionários' });
    }
  }
}