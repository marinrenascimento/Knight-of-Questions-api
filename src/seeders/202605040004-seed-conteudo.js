export async function up({ queryInterface }) {
    await queryInterface.bulkInsert('Conteudos', [
        // Matemática (disciplina_id: 1)
        { id: 1, nome: 'Álgebra', disciplina_id: 1 },
        { id: 2, nome: 'Geometria', disciplina_id: 1 },
        { id: 3, nome: 'Trigonometria', disciplina_id: 1 },
        
        // História (disciplina_id: 2)
        { id: 4, nome: 'Revolução Francesa', disciplina_id: 2 },
        { id: 5, nome: 'Brasil Colônia', disciplina_id: 2 },
        
        // Biologia (disciplina_id: 3)
        { id: 6, nome: 'Genética', disciplina_id: 3 },
        { id: 7, nome: 'Ecologia', disciplina_id: 3 },
    ]);
    const sequelize = queryInterface.sequelize;
    if (sequelize) {
        await sequelize.query(`SELECT setval('"Conteudos_id_seq"', (SELECT MAX(id) FROM "Conteudos"));`);
    }
}
export async function down({ queryInterface }) {
    await queryInterface.bulkDelete('Conteudos', null, {});
}
