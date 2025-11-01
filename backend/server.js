require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});