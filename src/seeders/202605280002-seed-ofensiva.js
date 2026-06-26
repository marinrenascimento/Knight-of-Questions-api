export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('user_ofensiva', [
    { id: 1, user_id: 1, sequencia_dias: 5, data_ultima_atualizacao: '2026-06-20' },
    { id: 2, user_id: 2, sequencia_dias: 12, data_ultima_atualizacao: '2026-06-19' },
    { id: 3, user_id: 3, sequencia_dias: 0, data_ultima_atualizacao: '2026-06-18' }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"user_ofensiva_id_seq"', (SELECT MAX(id) FROM "user_ofensiva"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('user_ofensiva', null, {});
}
