import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Avaliacao, User, Avatar } from '../../models/index.js';
import { sequelize } from '../../config/sequelize.js';

describe('Avaliacao Model', () => {
  it('deve criar uma avaliação associada a um usuário', async () => {
    // Busca um usuário existente do seeder
    const user = await User.findOne();
    
    const avaliacao = await Avaliacao.create({
      titulo: 'Simulado Unit Test ' + Date.now(),
      id_user: user ? user.id : null,
      is_vestibular: true
    });

    expect(avaliacao).toHaveProperty('id');
    expect(avaliacao.titulo).toContain('Simulado Unit Test');
  });
});
