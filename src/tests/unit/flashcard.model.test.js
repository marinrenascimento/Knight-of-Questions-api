import { describe, it, expect } from 'vitest';
import { Flashcard, Deck, Disciplina, Conteudo } from '../../models/index.js';

describe('Flashcard Model', () => {
  it('deve criar um flashcard com sucesso', async () => {
    const deck = await Deck.findOne();
    const disciplina = await Disciplina.findOne();
    const conteudo = await Conteudo.findOne();

    if (!deck || !disciplina || !conteudo) return; // Skip if seeder data missing

    const flashcard = await Flashcard.create({
      frente: 'Frente Teste ' + Date.now(),
      verso: 'Verso Teste',
      dificuldade: 1,
      id_deck: deck.id,
      id_disciplina: disciplina.id,
      id_conteudo: conteudo.id
    });

    expect(flashcard).toHaveProperty('id');
    expect(flashcard.frente).toContain('Frente Teste');
  });
});
