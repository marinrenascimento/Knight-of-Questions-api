export async function up({ queryInterface, Sequelize }) {
  // Inserindo mais perguntas de exemplo
  await queryInterface.bulkInsert('Perguntas', [
    { id: 1, enunciado: 'Quanto é 5x5?', nivel_dificuldade: 1, disciplina_id: 1, id_avaliacao: 1, conteudo_id: 1 },
    { id: 2, enunciado: 'Qual o resultado de 10 + 15?', nivel_dificuldade: 1, disciplina_id: 1, id_avaliacao: 1, conteudo_id: 1 },
    { id: 3, enunciado: 'Quem descobriu o Brasil?', nivel_dificuldade: 1, disciplina_id: 2, id_avaliacao: 1, conteudo_id: 3 },
  ], { ignoreDuplicates: true });

  // Inserindo alternativas para as perguntas acima
  await queryInterface.bulkInsert('Alternativas', [
    // Alternativas para Pergunta 1 (Matemática)
    { id: 1, texto: '25', is_correta: true, id_pergunta: 1, descricao: 'Cinco vezes cinco é vinte e cinco.' },
    { id: 2, texto: '20', is_correta: false, id_pergunta: 1, descricao: 'Valor incorreto.' },
    { id: 3, texto: '30', is_correta: false, id_pergunta: 1, descricao: 'Valor incorreto.' },
    { id: 4, texto: '15', is_correta: false, id_pergunta: 1, descricao: 'Valor incorreto.' },

    // Alternativas para Pergunta 2 (Matemática)
    { id: 5, texto: '25', is_correta: true, id_pergunta: 2, descricao: 'Soma correta.' },
    { id: 6, texto: '35', is_correta: false, id_pergunta: 2, descricao: 'Soma errada.' },
    { id: 7, texto: '20', is_correta: false, id_pergunta: 2, descricao: 'Soma errada.' },

    // Alternativas para Pergunta 3 (História)
    { id: 8, texto: 'Pedro Álvares Cabral', is_correta: true, id_pergunta: 3, descricao: 'Líder da expedição de 1500.' },
    { id: 9, texto: 'Dom Pedro I', is_correta: false, id_pergunta: 3, descricao: 'Proclamou a independência.' },
    { id: 10, texto: 'Cristóvão Colombo', is_correta: false, id_pergunta: 3, descricao: 'Chegou às Américas, mas não ao Brasil.' },
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Perguntas_id_seq"', (SELECT MAX(id) FROM "Perguntas"));`);
  await queryInterface.sequelize.query(`SELECT setval('"Alternativas_id_seq"', (SELECT MAX(id) FROM "Alternativas"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Alternativas', null, {});
  await queryInterface.bulkDelete('Perguntas', null, {});
}
