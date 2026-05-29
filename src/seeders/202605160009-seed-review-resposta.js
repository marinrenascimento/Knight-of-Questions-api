export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('AvaliacaoReviews', [
    { 
      id: 1, 
      id_user: 1, 
      id_avaliacao: 1, 
      iniciado_em: new Date('2026-05-20T10:00:00'),
      terminado_em: new Date('2026-05-20T10:15:00'),
      qtd_questoes_respondidas: 1
    },
  ], { ignoreDuplicates: true });

  await queryInterface.bulkInsert('RespostasUsuarios', [
    { 
      id: 1, 
      id_pergunta: 1, 
      id_alternativa: 1, 
      id_user: 1, 
      id_avaliacao_review: 1, 
      anotacoes: 'Acertei de primeira!', 
      data_resposta: new Date('2026-05-20T10:05:00') 
    },
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"AvaliacaoReviews_id_seq"', (SELECT MAX(id) FROM "AvaliacaoReviews"));`);
  await queryInterface.sequelize.query(`SELECT setval('"RespostasUsuarios_id_seq"', (SELECT MAX(id) FROM "RespostasUsuarios"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('RespostasUsuarios', null, {});
  await queryInterface.bulkDelete('AvaliacaoReviews', null, {});
}
