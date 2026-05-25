import express from 'express';
import { 
    getAllDecksByUser, 
    createDeckAndFlashcardsUsuario, 
    updateInfoDeck, 
    deleteDeckAndFlashcards, 
    savePeriodoReview 
} from '../controllers/deckController.js';

const router = express.Router(); 

// Rota: GET /deck/user/:id_user
router.get('/user/:id_user', getAllDecksByUser);

// Rota: POST /deck/create/:id_user
router.post('/create/:id_user', createDeckAndFlashcardsUsuario);

// Rota: PUT /deck/update/:id_user/:id
router.put('/update/:id_user/:id', updateInfoDeck);

// Rota: PATCH /deck/review/:id_user/:id
router.patch('/review/:id_user/:id', savePeriodoReview);

// Rota: DELETE /deck/delete/:id_user/:id
router.delete('/delete/:id_user/:id', deleteDeckAndFlashcards);

export default router;