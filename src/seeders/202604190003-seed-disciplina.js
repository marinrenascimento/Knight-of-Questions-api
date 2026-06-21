export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('Disciplinas', [
    { id: 1, nome: 'Matemática' },
    { id: 2, nome: 'História' },
    { id: 3, nome: 'Biologia' },
    { id: 4, nome: 'Física' },
    { id: 5, nome: 'Química' },
    { id: 6, nome: 'Língua Portuguesa' },
    { id: 7, nome: 'Literatura' },
    { id: 8, nome: 'Geografia' },
    { id: 9, nome: 'Filosofia' },
    { id: 10, nome: 'Sociologia' },
    { id: 11, nome: 'Língua Inglesa' },
    { id: 12, nome: 'Língua Espanhola' },
    { id: 13, nome: 'Artes' },
    { id: 14, nome: 'Educação Física' },
    { id: 15, nome: 'Redação' },
    { id: 16, nome: 'Programação e Algoritmos' },
    { id: 17, nome: 'Cálculo Diferencial e Integral' },
    { id: 18, nome: 'Estatística' },
    { id: 19, nome: 'Metodologia Científica' },
    { id: 20, nome: 'Administração e Empreendedorismo' }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Disciplinas_id_seq"', (SELECT MAX(id) FROM "Disciplinas"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Disciplinas', null, {});
}