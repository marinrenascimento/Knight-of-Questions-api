export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('DeckReviews', [
    { id: 1, id_usuario: 1, id_deck: 1, iniciado_em: '2026-05-28 08:30:00', terminado_em: '2026-05-28 09:00:00', qtd_flashcards_revisados: 10 },
    { id: 2, id_usuario: 2, id_deck: 2, iniciado_em: '2026-05-28 10:15:00', terminado_em: null, qtd_flashcards_revisados: 5 }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"DeckReviews_id_seq"', (SELECT MAX(id) FROM "DeckReviews"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('DeckReviews', null, {});
}
