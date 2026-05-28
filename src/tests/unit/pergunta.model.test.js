import { describe, it, expect } from 'vitest';
import { Pergunta, Avaliacao, Disciplina } from '../../models/index.js';

describe('Pergunta Model', () => {
  it('deve criar uma pergunta com sucesso', async () => {
    const avaliacao = await Avaliacao.findOne() || await Avaliacao.create({ titulo: 'Base' });
    const disciplina = await Disciplina.findOne() || await Disciplina.create({ nome: 'Base' });

    const pergunta = await Pergunta.create({
      enunciado: 'Questão Teste Unit ' + Date.now(),
      nivel_dificuldade: 1,
      disciplina_id: disciplina.id,
      id_avaliacao: avaliacao.id
    });

    expect(pergunta).toHaveProperty('id');
    expect(pergunta.enunciado).toContain('Questão Teste Unit');
  });
});
