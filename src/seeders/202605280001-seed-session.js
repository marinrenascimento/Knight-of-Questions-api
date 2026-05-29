export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('user_sessao', [
    { id: 1, user_id: 1, data_login: '2026-05-28 08:00:00', data_logout: '2026-05-28 09:00:00' },
    { id: 2, user_id: 2, data_login: '2026-05-28 10:00:00', data_logout: null }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"user_sessao_id_seq"', (SELECT MAX(id) FROM "user_sessao"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('user_sessao', null, {});
}
