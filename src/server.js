
        import express from 'express';
import dotenv from 'dotenv';
import { initDb } from './db.js';
import equipmentRoutes from './routes/equipmentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', equipmentRoutes);


app.use((err, req, res, next) => {
  console.error('Erro interno retornado:', err);
  res.status(500).json({
    error: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
  });
});


initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
    console.log(`🔗 Teste de status: http://localhost:${PORT}/api/health`);
  });
});