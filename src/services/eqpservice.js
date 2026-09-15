import pool from '../db.js';

class EquipmentService {
  // Listar todos os equipamentos
  async getAll() {
    const query = 'SELECT * FROM equipamentos ORDER BY id ASC;';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Buscar equipamento por ID
  async getById(id) {
    const query = 'SELECT * FROM equipamentos WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  // Cadastrar novo equipamento
  async create({ nome, categoria, condicao_uso, disponivel }) {
    const query = `
      INSERT INTO equipamentos (nome, categoria, condicao_uso, disponivel)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const isAvailable = disponivel !== undefined ? disponivel : true;
    const condicao = condicao_uso || 'Bom estado';

    const { rows } = await pool.query(query, [nome, categoria, condicao, isAvailable]);
    return rows[0];
  }

  // Alterar apenas a disponibilidade do equipamento
  async updateAvailability(id, disponivel) {
    const query = `
      UPDATE equipamentos
      SET disponivel = $1
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [disponivel, id]);
    return rows[0] || null;
  }
}

export default new EquipmentService();