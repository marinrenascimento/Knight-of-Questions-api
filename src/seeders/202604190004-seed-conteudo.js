export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('Conteudos', [
    { id: 1, nome: 'Trigonometria Básica', disciplina_id: 1 },
    { id: 2, nome: 'Segunda Guerra Mundial', disciplina_id: 2 },
    { id: 3, nome: 'Citologia', disciplina_id: 3 },
    { id: 4, nome: 'Leis de Newton', disciplina_id: 4 },
    { id: 5, nome: 'Estequiometria', disciplina_id: 5 },
    { id: 6, nome: 'Álgebra', disciplina_id: 1 },
    { id: 7, nome: 'Geometria', disciplina_id: 1 },
    { id: 8, nome: 'Revolução Francesa', disciplina_id: 2 },
    { id: 9, nome: 'Brasil Colônia', disciplina_id: 2 },
    { id: 10, nome: 'Genética', disciplina_id: 3 },
    { id: 11, nome: 'Ecologia', disciplina_id: 3 }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Conteudos_id_seq"', (SELECT MAX(id) FROM "Conteudos"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Conteudos', null, {});
}
