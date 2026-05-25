import express from 'express';
import {
  getPontosByUser,
  addPontosByUser,
  getNivelByPontos,
  getHistoricoPontos
} from '../controllers/pontosController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, getPontosByUser);
router.post('/add', requireAuth, addPontosByUser);
router.get('/nivel', requireAuth, getNivelByPontos);
router.get('/historico', requireAuth, getHistoricoPontos);

export default router;
