import express from 'express';
import { OfensivaController } from "../controllers/ofensivaController.js";
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, OfensivaController.getOfensivaByUser);
router.post('/update', requireAuth, OfensivaController.updateOfensiva);

export default router;
