import express from 'express';
import { listarAcessos } from '../controllers/acessosRecentesController.js';

const router = express.Router();

router.get('/', listarAcessos);

export default router;