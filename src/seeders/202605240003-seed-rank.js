export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('Ranks', [
    { id: 1, nome: 'Bronze', imagem_url: 'https://exemplo.com/ranks/bronze.png', pontos_minimos: 0 },
    { id: 2, nome: 'Prata', imagem_url: 'https://exemplo.com/ranks/prata.png', pontos_minimos: 100 },
    { id: 3, nome: 'Ouro', imagem_url: 'https://exemplo.com/ranks/ouro.png', pontos_minimos: 200 },
    { id: 4, nome: 'Platina', imagem_url: 'https://exemplo.com/ranks/platina.png', pontos_minimos: 300 },
    { id: 5, nome: 'Paládio', imagem_url: 'https://exemplo.com/ranks/paladio.png', pontos_minimos: 400 },
    { id: 6, nome: 'Irídio', imagem_url: 'https://exemplo.com/ranks/iridio.png', pontos_minimos: 500 },
    { id: 7, nome: 'Ródio', imagem_url: 'https://exemplo.com/ranks/rodio.png', pontos_minimos: 600 },
    { id: 8, nome: 'Diamante', imagem_url: 'https://exemplo.com/ranks/diamante.png', pontos_minimos: 700 },
    { id: 9, nome: 'Rubi', imagem_url: 'https://exemplo.com/ranks/rubi.png', pontos_minimos: 800 },
    { id: 10, nome: 'Esmeralda', imagem_url: 'https://exemplo.com/ranks/esmeralda.png', pontos_minimos: 900 },
    { id: 11, nome: 'Diamante Branco', imagem_url: 'https://exemplo.com/ranks/diamante_branco.png', pontos_minimos: 1000 },
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Ranks_id_seq"', (SELECT MAX(id) FROM "Ranks"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Ranks', null, {});
}
