const express = require('express');
const cors = require('cors');
const db = require('./db/connection.js');
const userRoutes = require('../server/routes/user');
const sugestaoRoutes = require('../server/routes/sugestao');
const sinaisRoutes = require('../server/routes/sinais');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

app.use('/api/users', userRoutes);
app.use('/api/sugestao', sugestaoRoutes);
app.use('/api/sinais', sinaisRoutes);   

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
