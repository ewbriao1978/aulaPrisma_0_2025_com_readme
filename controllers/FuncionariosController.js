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
  },

  async cadastrarFuncionario(req, res) {
    try {
      const { nome, email, salario } = req.body;

      if (!nome || !email || !salario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const novoFuncionario = await prisma.funcionarios.create({
        data: {
          nome,
          email,
          salario: parseFloat(salario), 
        },
      });

      res.status(201).json(novoFuncionario);
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
    }
  } 
}