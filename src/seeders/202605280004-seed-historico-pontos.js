export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('HistoricoPontos', [
    { id: 1, id_usuario: 1, acao: 'Completou Deck', pontos_ganhos: 50, criado_em: '2026-05-28 09:00:00' },
    { id: 2, id_usuario: 2, acao: 'Login Diário', pontos_ganhos: 10, criado_em: '2026-05-28 10:00:00' }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"HistoricoPontos_id_seq"', (SELECT MAX(id) FROM "HistoricoPontos"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('HistoricoPontos', null, {});
}
