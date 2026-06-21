export async function up({ queryInterface }) {
  // Dados das avaliações do mockup (sem id fixo — o banco gera automaticamente)
  const avaliacoesParaCriar = [
    { titulo: 'Substantivos e Adjetivos', id_user: 1, is_vestibular: false },
    { titulo: 'Sistema Nervoso', id_user: 1, is_vestibular: false },
    { titulo: 'Primeira Guerra Mundial', id_user: 1, is_vestibular: false },
    { titulo: 'Renascimento', id_user: 1, is_vestibular: false },
    { titulo: 'Radiciação e Potenciação', id_user: 1, is_vestibular: false },
    { titulo: 'Guerra Fria', id_user: 1, is_vestibular: false },

    { titulo: 'ENEM 2015', id_user: null, is_vestibular: true },
    { titulo: 'ITA 2014', id_user: null, is_vestibular: true },
    { titulo: 'FUVEST 2016', id_user: null, is_vestibular: true },
    { titulo: 'UNICAMP 2018', id_user: null, is_vestibular: true },
    { titulo: 'ENEM 2020', id_user: null, is_vestibular: true },
  ];

  const avaliacoesInseridas = await queryInterface.bulkInsert('Avaliacoes', avaliacoesParaCriar, { returning: true });

  // Mapeia titulo -> id real gerado pelo banco (em vez de id fixo)
  const idPorTitulo = {};
  avaliacoesInseridas.forEach((row) => {
    idPorTitulo[row.titulo] = row.id;
  });

  // Mapeamento realístico de ID da Disciplina para IDs de Conteúdos válidos
  const relacaoDisciplinaConteudo = {
    1: [1, 2, 3, 4],       // Matemática
    2: [5, 6, 7, 8],       // História
    3: [9, 10, 11, 12],    // Biologia
    4: [13, 14, 15, 16],   // Física
    5: [17, 18, 19, 20],   // Química
    6: [21, 22, 23],       // Português
    7: [24, 25, 26],       // Literatura
    8: [27, 28, 29],       // Geografia
    9: [30, 31],           // Filosofia
    10: [32, 33],          // Sociologia
  };

  const disciplinasDisponiveis = Object.keys(relacaoDisciplinaConteudo).map(Number);

  // Quantidade de questões por título de avaliação
  const countMap = {
    'Substantivos e Adjetivos': 53,
    'Sistema Nervoso': 15,
    'Primeira Guerra Mundial': 27,
    'Renascimento': 231,
    'Radiciação e Potenciação': 5,
    'Guerra Fria': 38,
    'ENEM 2015': 90,
    'ITA 2014': 72,
    'FUVEST 2016': 180,
    'UNICAMP 2018': 64,
    'ENEM 2020': 90,
  };

  // Avaliações focadas em uma única disciplina (is_vestibular: false)
  const escopoFocado = {
    'Substantivos e Adjetivos': { disc: 6, conts: [21, 22, 23] },
    'Sistema Nervoso': { disc: 3, conts: [9] },
    'Primeira Guerra Mundial': { disc: 2, conts: [5] },
    'Renascimento': { disc: 2, conts: [8] },
    'Radiciação e Potenciação': { disc: 1, conts: [4] },
    'Guerra Fria': { disc: 2, conts: [5] },
  };

  const questions = [];

  for (const [titulo, count] of Object.entries(countMap)) {
    const aid = idPorTitulo[titulo];
    const eFocado = escopoFocado[titulo];

    for (let i = 1; i <= count; i++) {
      let dId;
      let cId;

      if (eFocado) {
        dId = eFocado.disc;
        const listaConts = eFocado.conts;
        cId = listaConts[(i - 1) % listaConts.length];
      } else {
        dId = disciplinasDisponiveis[(i - 1) % disciplinasDisponiveis.length];
        const listaConts = relacaoDisciplinaConteudo[dId];
        cId = listaConts[Math.floor((i - 1) / disciplinasDisponiveis.length) % listaConts.length];
      }

      questions.push({
        enunciado: `Questão ${i} da Avaliação "${titulo}" - Disciplina ID ${dId}, Conteúdo ID ${cId}`,
        nivel_dificuldade: (i % 3) + 1,
        disciplina_id: dId,
        conteudo_id: cId,
        id_avaliacao: aid,
      });
    }
  }

  const perguntasInseridas = await queryInterface.bulkInsert('Perguntas', questions, { returning: true });

  // Cria as 4 alternativas de cada pergunta, usando o id real retornado pelo banco
  const alternativas = [];
  perguntasInseridas.forEach((pergunta) => {
    alternativas.push(
      { texto: 'Alternativa A (Correta)', is_correta: true, id_pergunta: pergunta.id, descricao: 'Explicação detalhada da resposta correta.' },
      { texto: 'Alternativa B', is_correta: false, id_pergunta: pergunta.id, descricao: 'Distrator comum.' },
      { texto: 'Alternativa C', is_correta: false, id_pergunta: pergunta.id, descricao: 'Análise incorreta do enunciado.' },
      { texto: 'Alternativa D', is_correta: false, id_pergunta: pergunta.id, descricao: 'Dados não condizem com a teoria.' },
    );
  });

  await queryInterface.bulkInsert('Alternativas', alternativas);
}

export async function down({ queryInterface }) {
  // O runner deste projeto (src/db/runSeeders.js) só chama "up" — "down" não é
  // executado em nenhum fluxo atual. Mantido apenas como documentação.
}