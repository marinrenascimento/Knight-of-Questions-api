export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('Decks', [
    {
      id: 1,
      nome: 'Fórmulas Salva-Vidas de Física',
      descricao: 'Leis de Newton e Cinemática',
      criado_em: '2026-03-05 10:00:00',
      id_user: 3
    },
    {
      id: 2,
      nome: 'Biologia ENEM',
      descricao: 'Foco total em Citologia',
      criado_em: '2026-03-10 15:00:00',
      id_user: 4
    },
    {
      id: 3,
      nome: 'Estudo de Matemática',
      descricao: 'Flashcards de Álgebra',
      id_user: 1,
      criado_em: '2026-05-04 10:00:00'
    }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Decks_id_seq"', (SELECT MAX(id) FROM "Decks"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Decks', null, {});
}
