const express = require('express');
const cors = require('cors');
// permitir requisições de outros domínios
// (necessário para front-end e back-end em servidores diferentes)
// criar rotas
const funcRoutes = require('./routes/FuncionariosRoutes');
const app = express();
const port = 3000;
// para permitir o uso de json no body das reqs.
app.use(express.json());
app.use(cors());
app.use(funcRoutes);

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:"+port);
});
