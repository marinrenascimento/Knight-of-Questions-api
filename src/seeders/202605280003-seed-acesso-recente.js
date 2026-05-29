export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('acessos_recentes', [
    { id: 1, user_id: 1, nome: 'Trigonometria Básica', tipo: 'deck', data_acesso: '2026-05-28 11:00:00' },
    { id: 2, user_id: 2, nome: 'Simulado Geral', tipo: 'prova', data_acesso: '2026-05-28 11:30:00' }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"acessos_recentes_id_seq"', (SELECT MAX(id) FROM "acessos_recentes"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('acessos_recentes', null, {});
}
