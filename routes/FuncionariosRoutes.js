const express = require('express');
const funcionariosController = require('../controllers/FuncionariosController');
const router = express.Router();
// cRud
router.get('/listar', funcionariosController.listarFuncionarios);

router.post('/cadastrar', funcionariosController.cadastrarFuncionario);


module.exports = router;

