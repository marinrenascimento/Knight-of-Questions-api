export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('Avaliacoes', [
    { id: 1, titulo: 'Simulado de Matemática', id_user: 1, is_vestibular: false },
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Avaliacoes_id_seq"', (SELECT MAX(id) FROM "Avaliacoes"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Avaliacoes', null, {});
}
