import { Deck } from '../models/deck.model.js';
import { Flashcard } from '../models/flashcard.model.js'; // Assumindo que este model exista
import { sequelize } from '../config/sequelize.js';

// GET /users/:id_user/decks
// getAllDecksByUser - busca todos os decks do usuário
export const getAllDecksByUser = async (req, res) => {
    try {
        const id_user = parseInt(req.params.id_user);

        const userDecks = await Deck.findAll({
            where: { id_user }
        });

        res.status(200).json(userDecks);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar os decks do usuário.", error: error.message });
    }
};

// POST /users/:id_user/decks
// createDeckAndFlashcardsUsuario - cria um deck e cria os flashcards associados
export const createDeckAndFlashcardsUsuario = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const id_user = parseInt(req.params.id_user);
        const { nome, descricao, flashcards } = req.body;

        if (!nome) {
            return res.status(400).json({ message: "O campo 'nome' é obrigatório." });
        }

        // 1. Cria o deck
        const novoDeck = await Deck.create(
            { nome, descricao: descricao || null, id_user },
            { transaction }
        );

        // 2. Se houver flashcards no payload, cria eles vinculados ao deck recém-criado
        if (flashcards && Array.isArray(flashcards) && flashcards.length > 0) {
            const flashcardsParaCriar = flashcards.map(card => ({
                ...card,
                id_deck: novoDeck.id 
            }));
            
            await Flashcard.bulkCreate(flashcardsParaCriar, { transaction });
        }

        await transaction.commit();
        res.status(201).json({ message: "Deck e flashcards criados com sucesso!", deck: novoDeck });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Erro ao criar deck e flashcards.", error: error.message });
    }
};

// PUT /users/:id_user/decks/:id
// updateInfoDeck - atualiza nome e descrição do deck
export const updateInfoDeck = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const id_user = parseInt(req.params.id_user);
        const { nome, descricao } = req.body;

        const deck = await Deck.findOne({ where: { id, id_user } });

        if (!deck) {
            return res.status(404).json({ message: "Deck não encontrado." });
        }

        // Atualiza apenas os campos enviados
        deck.nome = nome || deck.nome;
        deck.descricao = descricao !== undefined ? descricao : deck.descricao;

        await deck.save();

        res.status(200).json(deck);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o deck.", error: error.message });
    }
};

// DELETE /users/:id_user/decks/:id
// deleteDeckAndFlashcards - remove o deck e todos os flashcards vinculados em cascata
export const deleteDeckAndFlashcards = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const id = parseInt(req.params.id);
        const id_user = parseInt(req.params.id_user);

        const deck = await Deck.findOne({ where: { id, id_user } });

        if (!deck) {
            await transaction.rollback();
            return res.status(404).json({ message: "Deck não encontrado." });
        }

        // 1. Deleta os flashcards associados (caso não haja ON DELETE CASCADE no banco)
        await Flashcard.destroy({ 
            where: { id_deck: id }, 
            transaction 
        });

        // 2. Deleta o deck
        await deck.destroy({ transaction });

        await transaction.commit();
        res.status(204).send();
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Erro ao remover o deck.", error: error.message });
    }
};

// PATCH /users/:id_user/decks/:id/review
// savePeriodoReview - define o intervalo de revisão espaçada do deck em dias
export const savePeriodoReview = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const id_user = parseInt(req.params.id_user);
        const { dias_revisao } = req.body; // Quantidade de dias para o intervalo

        if (dias_revisao === undefined || dias_revisao < 0) {
            return res.status(400).json({ message: "Valor inválido para o período de revisão." });
        }

        const deck = await Deck.findOne({ where: { id, id_user } });

        if (!deck) {
            return res.status(404).json({ message: "Deck não encontrado." });
        }

        /* ATENÇÃO: O model `deck.model.js` atual não possui uma coluna para armazenar 
        o período de revisão. Para que o método abaixo funcione, será necessário 
        adicionar o campo `periodo_revisao` (ou similar) no model Deck e no PostgreSQL.
        */
        
        // deck.periodo_revisao = dias_revisao; 
        // await deck.save();

        res.status(200).json({ message: "Período de revisão atualizado (Requer ajuste no Model)", dias_revisao });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar período de revisão.", error: error.message });
    }
};