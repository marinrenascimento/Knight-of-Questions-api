export async function up({ queryInterface }) {
    await queryInterface.bulkInsert('Avaliacoes', [
        { id: 1, titulo: 'Simulado de Matemática', id_user: 1, is_vestibular: false },
    ]);
    const sequelize = queryInterface.sequelize;
    if (sequelize) {
        await sequelize.query(`SELECT setval('"Avaliacoes_id_seq"', (SELECT MAX(id) FROM "Avaliacoes"));`);
    }
}
export async function down({ queryInterface }) {
    await queryInterface.bulkDelete('Avaliacoes', null, {});
}
