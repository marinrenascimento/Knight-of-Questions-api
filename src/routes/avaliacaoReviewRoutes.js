import express from 'express';
import {
    startAvaliacao,
    finishAvaliacao,
    getResultadoAvaliacao,
    getAnotacoesByAvaliacao,
    savePeriodoReview
} from '../controllers/avaliacaoReviewController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// http://localhost:3000/avaliacao-review/start
router.post('/start', startAvaliacao);

// http://localhost:3000/avaliacao-review/finish
router.post('/finish', finishAvaliacao);

// http://localhost:3000/avaliacao-review/resultado/:reviewId
router.get('/resultado/:reviewId', getResultadoAvaliacao);

// http://localhost:3000/avaliacao-review/anotacoes/:reviewId
router.get('/anotacoes/:reviewId', getAnotacoesByAvaliacao);

// http://localhost:3000/avaliacao-review/periodo-review
router.post('/periodo-review', savePeriodoReview);

export default router;
