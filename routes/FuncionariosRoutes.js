const express = require('express');
const funcionariosController = require('../controllers/FuncionariosController');
const router = express.Router();
// CRuD
router.get('/listar', funcionariosController.listarFuncionarios);
router.delete('/deletar/:id', funcionariosController.deletarFuncionario);
router.post('/cadastrar', funcionariosController.cadastrarFuncionario);
router.put('/atualizar/:id', funcionariosController.atualizarFuncionario); 
router.get('mostrar/:id', funcionariosController.mostrarFuncionario);

module.exports = router;

