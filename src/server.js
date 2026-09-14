import pool from './db.js';

import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js'; // Ajuste o caminho conforme o local do seu arquivo de rotas

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

