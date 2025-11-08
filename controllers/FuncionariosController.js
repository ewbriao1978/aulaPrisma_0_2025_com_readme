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

  async mostrarFuncionario(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID do funcionário é obrigatório' });
      }
      
      const funcionario = await prisma.funcionarios.findUnique({
        where: { id: parseInt(id) },
      }); 
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      res.status(200).json(funcionario);
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      res.status(500).json({ error: 'Erro ao buscar funcionário' });
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
  },
  
  async deletarFuncionario(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID do funcionário é obrigatório' });
      }

      const funcionario = await prisma.funcionarios.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json(funcionario);
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      res.status(500).json({ error: 'Erro ao deletar funcionário' });
    }
  },

  async atualizarFuncionario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, salario } = req.body;

      if (!id || !nome || !email || !salario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const funcionarioAtualizado = await prisma.funcionarios.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          email,
          salario: parseFloat(salario),
        },
      });

      res.status(200).json(funcionarioAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      res.status(500).json({ error: 'Erro ao atualizar funcionário' });
    }
  }
}