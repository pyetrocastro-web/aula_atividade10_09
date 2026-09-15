import { Router } from 'express';
import equipmentService from '../services/eqpservice.js';

const router = Router();


router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor ativo e operacional!' });
});


router.get('/equipamentos', async (req, res, next) => {
  try {
    const equipamentos = await equipmentService.getAll();
    res.status(200).json(equipamentos);
  } catch (error) {
    next(error);
  }
});


router.get('/equipamentos/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const equipamento = await equipmentService.getById(id);

    if (!equipamento) {
      return res.status(404).json({ error: 'Equipamento não encontrado.' });
    }

    res.status(200).json(equipamento);
  } catch (error) {
    next(error);
  }
});


router.post('/equipamentos', async (req, res, next) => {
  try {
    const { nome, categoria, condicao_uso, disponivel } = req.body;

    if (!nome || !categoria) {
      return res.status(400).json({
        error: 'Requisição inválida. Os campos "nome" e "categoria" são obrigatórios.',
      });
    }

    const novoEquipamento = await equipmentService.create({
      nome,
      categoria,
      condicao_uso,
      disponivel,
    });

    res.status(201).json(novoEquipamento);
  } catch (error) {
    next(error);
  }
});


router.patch('/equipamentos/:id/disponibilidade', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { disponivel } = req.body;

    if (typeof disponivel !== 'boolean') {
      return res.status(400).json({
        error: 'O campo "disponivel" é obrigatório e deve ser um valor booleano (true/false).',
      });
    }

    const equipamentoAtualizado = await equipmentService.updateAvailability(id, disponivel);

    if (!equipamentoAtualizado) {
      return res.status(404).json({ error: 'Equipamento não encontrado para atualização.' });
    }

    res.status(200).json(equipamentoAtualizado);
  } catch (error) {
    next(error);
  }
});

export default router;