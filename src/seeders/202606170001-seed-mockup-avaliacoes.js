export async function up({ queryInterface, Sequelize }) {
  // Inserindo avaliações do mockup
  await queryInterface.bulkInsert('Avaliacoes', [
    { id: 2, titulo: 'Substantivos e Adjetivos', id_user: 1, is_vestibular: false },
    { id: 3, titulo: 'Sistema Nervoso', id_user: 1, is_vestibular: false },
    { id: 4, titulo: 'Primeira Guerra Mundial', id_user: 1, is_vestibular: false },
    { id: 5, titulo: 'Renascimento', id_user: 1, is_vestibular: false },
    { id: 6, titulo: 'Radiciação e Potenciação', id_user: 1, is_vestibular: false },
    { id: 7, titulo: 'Guerra Fria', id_user: 1, is_vestibular: false },

    { id: 8, titulo: 'ENEM 2015', id_user: null, is_vestibular: true },
    { id: 9, titulo: 'ITA 2014', id_user: null, is_vestibular: true },
    { id: 10, titulo: 'FUVEST 2016', id_user: null, is_vestibular: true },
    { id: 11, titulo: 'UNICAMP 2018', id_user: null, is_vestibular: true },
    { id: 12, titulo: 'ENEM 2020', id_user: null, is_vestibular: true },
  ], { ignoreDuplicates: true });

  await queryInterface.bulkUpdate('Avaliacoes', { titulo: 'ENEM 2015' }, { id: 8 });
  await queryInterface.bulkUpdate('Avaliacoes', { titulo: 'ITA 2014' }, { id: 9 });
  await queryInterface.bulkUpdate('Avaliacoes', { titulo: 'FUVEST 2016' }, { id: 10 });

  // Inserindo perguntas fictícias para bater com a quantidade de questões do mockup
  const questions = [];
  const alternativas = [];
  let questionId = 100;
  let alternativaId = 1000;

  const countMap = {
    2: 53,
    3: 15,
    4: 27,
    5: 231,
    6: 5,
    7: 38,
    8: 90,
    9: 72,
    10: 180,
    11: 64,
    12: 90
  };

  const metaMap = {
    2: { disciplina_id: 1, conteudo_id: 6 },
    3: { disciplina_id: 3, conteudo_id: 3 },
    4: { disciplina_id: 2, conteudo_id: 2 },
    5: { disciplina_id: 2, conteudo_id: 8 },
    6: { disciplina_id: 1, conteudo_id: 7 },
    7: { disciplina_id: 2, conteudo_id: 2 },
    8: { disciplina_id: 1, conteudo_id: 1 },
    9: { disciplina_id: 4, conteudo_id: 4 },
    10: { disciplina_id: 1, conteudo_id: 6 },
    11: { disciplina_id: 3, conteudo_id: 10 },
    12: { disciplina_id: 5, conteudo_id: 5 }
  };

  for (const [avaliacaoId, count] of Object.entries(countMap)) {
    const aid = parseInt(avaliacaoId, 10);
    const meta = metaMap[aid] || { disciplina_id: 1, conteudo_id: 1 };
    for (let i = 1; i <= count; i++) {
      questions.push({
        id: questionId++,
        enunciado: `Pergunta Exemplo ${i} da Avaliação ${aid}`,
        nivel_dificuldade: 1,
        disciplina_id: meta.disciplina_id,
        conteudo_id: meta.conteudo_id,
        id_avaliacao: aid
      });
      const idPergunta = questionId - 1;
      alternativas.push(
        { id: alternativaId++, texto: 'Alternativa correta', is_correta: true, id_pergunta: idPergunta, descricao: 'Resposta correta para a pergunta de exemplo.' },
        { id: alternativaId++, texto: 'Alternativa A', is_correta: false, id_pergunta: idPergunta, descricao: 'Resposta incorreta.' },
        { id: alternativaId++, texto: 'Alternativa B', is_correta: false, id_pergunta: idPergunta, descricao: 'Resposta incorreta.' },
        { id: alternativaId++, texto: 'Alternativa C', is_correta: false, id_pergunta: idPergunta, descricao: 'Resposta incorreta.' }
      );
    }
  }

  await queryInterface.bulkInsert('Perguntas', questions, { ignoreDuplicates: true });
  await queryInterface.bulkInsert('Alternativas', alternativas, { ignoreDuplicates: true });

  // Atualizando os sequenciadores
  await queryInterface.sequelize.query(`SELECT setval('"Avaliacoes_id_seq"', (SELECT MAX(id) FROM "Avaliacoes"));`);
  await queryInterface.sequelize.query(`SELECT setval('"Perguntas_id_seq"', (SELECT MAX(id) FROM "Perguntas"));`);
  await queryInterface.sequelize.query(`SELECT setval('"Alternativas_id_seq"', (SELECT MAX(id) FROM "Alternativas"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Alternativas', { id: { [Sequelize.Op.gte]: 1000 } }, {});
  await queryInterface.bulkDelete('Perguntas', { id: { [Sequelize.Op.gte]: 100 } }, {});
  await queryInterface.bulkDelete('Avaliacoes', { id: { [Sequelize.Op.in]: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] } }, {});
}
