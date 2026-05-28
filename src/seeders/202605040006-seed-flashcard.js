export async function up({ queryInterface }) {
    await queryInterface.bulkInsert('Flashcards', [
        { id: 1, frente: '2 + 2?', verso: '4', id_deck: 1, dificuldade: 1, id_disciplina: 1, id_conteudo: 1 },
        { id: 2, frente: 'Capital da França?', verso: 'Paris', id_deck: 1, dificuldade: 1, id_disciplina: 2, id_conteudo: 4 },
        { id: 3, frente: 'O que é DNA?', verso: 'Ácido desoxirribonucleico', id_deck: 1, dificuldade: 2, id_disciplina: 3, id_conteudo: 6 },
    ]);
    const sequelize = queryInterface.sequelize;
    if (sequelize) {
        await sequelize.query(`SELECT setval('"Flashcards_id_seq"', (SELECT MAX(id) FROM "Flashcards"));`);
    }
}
export async function down({ queryInterface }) {
    await queryInterface.bulkDelete('Flashcards', null, {});
}
