import express from 'express';
import {
    getAllDecksByUser,
    createDeckAndFlashcardsUsuario,
    updateInfoDeck,
    deleteDeckAndFlashcards
} from '../controllers/deckController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota: GET /deck/user/:id_user
router.get('/user/:id_user', requireAuth, getAllDecksByUser);

// Rota: POST /deck/create/:id_user
router.post('/create/:id_user', requireAuth, createDeckAndFlashcardsUsuario);

// Rota: PUT /deck/update/:id_user/:id
router.put('/update/:id_user/:id', requireAuth, updateInfoDeck);

// Rota: DELETE /deck/delete/:id_user/:id
router.delete('/delete/:id_user/:id', requireAuth, deleteDeckAndFlashcards);

export default router;