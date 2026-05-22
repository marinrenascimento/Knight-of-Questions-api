import express from 'express';
import sessaoController from '../controllers/sessaoController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/start', sessaoController.startSessao);
router.put('/end/:id', sessaoController.endSessao);
router.get('/tempo/:user_id', sessaoController.getTempoTotalSessoes);

export default router;