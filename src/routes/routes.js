import { Router } from 'express';
import equipamentoService from './service.js';

const router = Router();

// GET /equipamentos - Listar todos os registros
router.get('/equipamentos', async (req, res) => {
  try {
    const equipamentos = await equipamentoService.listarTodos();
    res.status(200).json(equipamentos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar equipamentos', detalhe: error.message });
  }
});

// GET /equipamentos/:id - Buscar por identificador
router.get('/equipamentos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const equipamento = await equipamentoService.buscarPorId(id);

    if (!equipamento) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado' });
    }

    res.status(200).json(equipamento);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar equipamento', detalhe: error.message });
  }
});

// POST /equipamentos - Cadastrar equipamento
router.post('/equipamentos', async (req, res) => {
  try {
    const { nome, patrimonio, disponivel } = req.body;

    if (!nome || !patrimonio) {
      return res.status(400).json({ mensagem: 'Campos nome e patrimonio são obrigatórios' });
    }

    const novoEquipamento = await equipamentoService.cadastrar(nome, patrimonio, disponivel);
    res.status(201).json(novoEquipamento);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar equipamento', detalhe: error.message });
  }
});

// PATCH /equipamentos/:id/disponibilidade - Alterar apenas a disponibilidade
router.patch('/equipamentos/:id/disponibilidade', async (req, res) => {
  try {
    const { id } = req.params;
    const { disponivel } = req.body;

    if (typeof disponivel !== 'boolean') {
      return res.status(400).json({ mensagem: 'O campo disponivel deve ser um booleano (true/false)' });
    }

    const equipamentoAtualizado = await equipamentoService.alterarDisponibilidade(id, disponivel);

    if (!equipamentoAtualizado) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado para atualização' });
    }

    res.status(200).json(equipamentoAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao alterar disponibilidade', detalhe: error.message });
  }
});

export default router;