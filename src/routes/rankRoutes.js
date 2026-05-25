import express from 'express';
import { getRankings } from '../controllers/rankController.js';

import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, getRankings);

export default router;
