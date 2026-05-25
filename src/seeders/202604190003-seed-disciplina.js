export async function up({ queryInterface, Sequelize }) {
    await queryInterface.bulkInsert('Disciplinas', [
        { id: 1, nome: 'Matemática' },
        { id: 2, nome: 'História' },
        { id: 3, nome: 'Biologia' },
        { id: 4, nome: 'Física' },
        { id: 5, nome: 'Química' }
    ]);

    const sequelize = queryInterface.sequelize;
    if (sequelize) {
        await sequelize.query(`SELECT setval('"Disciplinas_id_seq"', (SELECT MAX(id) FROM "Disciplinas"));`);
    }
}

export async function down({ queryInterface }) {
    await queryInterface.bulkDelete('Disciplinas', null, {});
}