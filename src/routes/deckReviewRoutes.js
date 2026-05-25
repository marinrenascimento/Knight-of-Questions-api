import express from 'express';
import {
  startDeckReview,
  finishDeckReview,
  getHistoricoReviewsByDeck
} from '../controllers/deckReviewController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/start', requireAuth, startDeckReview);
router.put('/finish/:id', requireAuth, finishDeckReview);
router.get('/history/:id_deck', requireAuth, getHistoricoReviewsByDeck);

export default router;
