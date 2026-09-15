import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;


const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


export const initDb = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS equipamentos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        categoria VARCHAR(50) NOT NULL,
        condicao_uso VARCHAR(50) NOT NULL DEFAULT 'Bom estado',
        disponivel BOOLEAN NOT NULL DEFAULT TRUE
      );
    `;
    await pool.query(createTableQuery);

  
    const countResult = await pool.query('SELECT COUNT(*) FROM equipamentos;');
    const count = parseInt(countResult.rows[0].count, 10);

    if (count === 0) {
      const seedQuery = `
        INSERT INTO equipamentos (nome, categoria, condicao_uso, disponivel) VALUES
        ('Notebook Dell Vostro', 'Informática', 'Excelente', TRUE),
        ('Projetor Epson PowerLite', 'Audiovisual', 'Bom estado', TRUE),
        ('Kit Robótica LEGO Mindstorms', 'Robótica', 'Novo', FALSE),
        ('Notebook Lenovo ThinkPad', 'Informática', 'Marcas de uso', TRUE),
        ('Caixa de Som Portátil JBL', 'Audiovisual', 'Excelente', TRUE);
      `;
      await pool.query(seedQuery);
      console.log('Tabela inicializada com 5 equipamentos cadastrados!');
    }

    console.log('Conexão com o PostgreSQL realizada e estrutura do banco pronta!');
  } catch (error) {
    console.error(' Erro na inicialização do banco de dados:', error.message);
  }
};

export default pool;