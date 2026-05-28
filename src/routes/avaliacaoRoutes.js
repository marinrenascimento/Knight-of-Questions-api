import express from 'express';
import {
    getAvaliacaoById,
    getAllAvaliacoesByUser,
    getAllAvaliacoesVestibulares,
    createAvaliacao,
    updateInfoAvaliacao,
    deleteAvaliacaoAndPerguntas
} from '../controllers/avaliacaoController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// http://localhost:3000/avaliacoes/user/:id
router.get('/user/:userId', requireAuth, requireRole('estudante'), getAllAvaliacoesByUser);

// http://localhost:3000/avaliacoes/vestibular/all
router.get('/vestibular/all', requireAuth, requireRole('estudante'), getAllAvaliacoesVestibulares);

// http://localhost:3000/avaliacoes/:id
router.get('/:id', requireAuth, requireRole('estudante'), getAvaliacaoById);

// http://localhost:3000/avaliacoes/create
router.post('/create', requireAuth, requireRole('estudante'), createAvaliacao);

// http://localhost:3000/avaliacoes/update/1
router.patch('/update/:id', requireAuth, requireRole('estudante'), updateInfoAvaliacao);

// http://localhost:3000/avaliacoes/delete/:id
router.delete('/delete/:id', requireAuth, requireRole('estudante'), deleteAvaliacaoAndPerguntas);

export default router;
