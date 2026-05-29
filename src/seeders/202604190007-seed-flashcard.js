export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('Flashcards', [
    { 
      id: 1, 
      frente: 'Qual a fórmula da Segunda Lei de Newton (Princípio Fundamental da Dinâmica)?', 
      verso: 'F = m . a', 
      id_deck: 1, 
      dificuldade: 1, 
      id_disciplina: 4, 
      id_conteudo: 4 
    },
    { 
      id: 2, 
      frente: 'O que diz a Terceira Lei de Newton?', 
      verso: 'Para toda ação, há uma reação de mesma intensidade, mesma direção e sentido oposto.', 
      id_deck: 1, 
      dificuldade: 2, 
      id_disciplina: 4, 
      id_conteudo: 4 
    },
    { 
      id: 3, 
      frente: 'Qual a principal função da Mitocôndria?', 
      verso: 'Respiração celular e produção de energia (ATP).', 
      id_deck: 2, 
      dificuldade: 1, 
      id_disciplina: 3, 
      id_conteudo: 3 
    },
    { 
      id: 4, 
      frente: 'O que são os Ribossomos?', 
      verso: 'Organelas responsáveis pela síntese de proteínas.', 
      id_deck: 2, 
      dificuldade: 2, 
      id_disciplina: 3, 
      id_conteudo: 3 
    },
    { 
      id: 5, 
      frente: 'Quanto é 2 + 2?', 
      verso: '4', 
      id_deck: 3, 
      dificuldade: 1, 
      id_disciplina: 1, 
      id_conteudo: 6 
    },
    { 
      id: 6, 
      frente: 'Qual a capital da França?', 
      verso: 'Paris', 
      id_deck: 3, 
      dificuldade: 1, 
      id_disciplina: 2, 
      id_conteudo: 8 
    },
    { 
      id: 7, 
      frente: 'O que significa a sigla DNA?', 
      verso: 'Ácido Desoxirribonucleico', 
      id_deck: 3, 
      dificuldade: 2, 
      id_disciplina: 3, 
      id_conteudo: 10 
    }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Flashcards_id_seq"', (SELECT MAX(id) FROM "Flashcards"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Flashcards', null, {});
}
