export async function up({ queryInterface }) {
    await queryInterface.bulkInsert('AvaliacaoReviews', [
        { 
            id: 1, 
            id_user: 1, 
            id_avaliacao: 1, 
            iniciado_em: new Date('2026-05-20T10:00:00'),
            terminado_em: new Date('2026-05-20T10:15:00'),
            qtd_questoes_respondidas: 1
        },
    ]);

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
    ]);

    const sequelize = queryInterface.sequelize;
    if (sequelize) {
        await sequelize.query(`SELECT setval('"AvaliacaoReviews_id_seq"', (SELECT MAX(id) FROM "AvaliacaoReviews"));`);
        await sequelize.query(`SELECT setval('"RespostasUsuarios_id_seq"', (SELECT MAX(id) FROM "RespostasUsuarios"));`);
    }
}

export async function down({ queryInterface }) {
    await queryInterface.bulkDelete('RespostasUsuarios', null, {});
    await queryInterface.bulkDelete('AvaliacaoReviews', null, {});
}
