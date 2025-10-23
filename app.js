const express = require('express');
const app = express();
app.use(express.json()); // Para parsear JSON no body
app.use('/funcionarios', require('./routes/FuncionariosRoutes.js')); // Assumindo que routes.js está em root
module.exports = app;