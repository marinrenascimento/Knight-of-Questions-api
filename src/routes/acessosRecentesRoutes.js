import express from 'express';
import { AcessosRecentesController } from "../controllers/acessosRecentesController.js";
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:userId', requireAuth, AcessosRecentesController.getAllAcessosRecentesByUser);

router.post('/:userId', requireAuth, AcessosRecentesController.createAcessoRecente);

export default router;