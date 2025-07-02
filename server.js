const express = require('express');
// criar rotas
const funcRoutes = require('./routes/FuncionariosRoutes');
const app = express();
const port = 3000;
// para permitir o uso de json no body das reqs.
app.use(express.json());
app.use(funcRoutes);

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:"+port);
});
z