import { describe, it, expect, beforeAll } from 'vitest';
import { initModels, User, Avatar, Disciplina, Conteudo, Deck, Flashcard, Avaliacao, Pergunta, Alternativa, AvaliacaoReview, RespostaUsuario } from '../../models/index.js';

describe('Model Associations', () => {
    beforeAll(() => {
        initModels();
    });

    it('should have all models defined', () => {
        expect(User).toBeDefined();
        expect(Avatar).toBeDefined();
        expect(Disciplina).toBeDefined();
        expect(Conteudo).toBeDefined();
        expect(Deck).toBeDefined();
        expect(Flashcard).toBeDefined();
        expect(Avaliacao).toBeDefined();
        expect(Pergunta).toBeDefined();
        expect(Alternativa).toBeDefined();
        expect(AvaliacaoReview).toBeDefined();
        expect(RespostaUsuario).toBeDefined();
    });

    it('should have correct associations for User', () => {
        expect(User.associations.avatar).toBeDefined();
        expect(User.associations.decks).toBeDefined();
        expect(User.associations.reviews).toBeDefined();
        expect(User.associations.respostas).toBeDefined();
    });

    it('should have correct associations for Avaliacao', () => {
        expect(Avaliacao.associations.perguntas).toBeDefined();
        expect(Avaliacao.associations.reviews).toBeDefined();
    });

    it('should have correct associations for Pergunta', () => {
        expect(Pergunta.associations.disciplina).toBeDefined();
        expect(Pergunta.associations.avaliacao).toBeDefined();
        expect(Pergunta.associations.conteudo).toBeDefined();
        expect(Pergunta.associations.alternativas).toBeDefined();
        expect(Pergunta.associations.respostas).toBeDefined();
    });

    it('should have correct associations for AvaliacaoReview', () => {
        expect(AvaliacaoReview.associations.usuario).toBeDefined();
        expect(AvaliacaoReview.associations.avaliacao).toBeDefined();
        expect(AvaliacaoReview.associations.respostas).toBeDefined();
    });

    it('should have correct associations for RespostaUsuario', () => {
        expect(RespostaUsuario.associations.review).toBeDefined();
        expect(RespostaUsuario.associations.usuario).toBeDefined();
        expect(RespostaUsuario.associations.pergunta).toBeDefined();
        expect(RespostaUsuario.associations.alternativa).toBeDefined();
    });
});
