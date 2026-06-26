import express from 'express';
import {
    getAvaliacaoById,
    getAllAvaliacoesByUser,
    getAllAvaliacoesVestibulares,
    createAvaliacao,
    createAvaliacaoPorDisciplina,
    updateInfoAvaliacao,
    deleteAvaliacaoAndPerguntas
} from '../controllers/avaliacaoController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// http://localhost:3000/avaliacoes/user/:id
router.get('/user/:userId', requireAuth, requireRole('estudante', 'visitante'), getAllAvaliacoesByUser);

// http://localhost:3000/avaliacoes/vestibular/all
router.get('/vestibular/all', requireAuth, requireRole('estudante', 'visitante'), getAllAvaliacoesVestibulares);

// http://localhost:3000/avaliacoes/:id
router.get('/:id', requireAuth, requireRole('estudante', 'visitante'), getAvaliacaoById);

// http://localhost:3000/avaliacoes/create
router.post('/create', requireAuth, requireRole('estudante', 'visitante'), createAvaliacao);

// http://localhost:3000/avaliacoes/por-disciplina
router.post('/por-disciplina', requireAuth, requireRole('estudante', 'visitante'), createAvaliacaoPorDisciplina);

// http://localhost:3000/avaliacoes/update/1
router.patch('/update/:id', requireAuth, requireRole('estudante', 'visitante'), updateInfoAvaliacao);

// http://localhost:3000/avaliacoes/delete/:id
router.delete('/delete/:id', requireAuth, requireRole('estudante', 'visitante'), deleteAvaliacaoAndPerguntas);

export default router;
