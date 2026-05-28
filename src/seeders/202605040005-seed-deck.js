export async function up({ queryInterface }) {
    await queryInterface.bulkInsert('Decks', [
        { id: 1, nome: 'Estudo de Matemática', descricao: 'Flashcards de Álgebra', id_user: 1, criado_em: new Date() },
    ]);
}
export async function down({ queryInterface }) {
    await queryInterface.bulkDelete('Decks', null, {});
}
