export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('AvaliacaoReviews', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_avaliacao: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Avaliacoes', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        iniciado_em: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await queryInterface.createTable('RespostasUsuarios', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        id_pergunta: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Perguntas', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_alternativa: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Alternativas', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_avaliacao_review: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'AvaliacaoReviews', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        anotacoes: { type: Sequelize.STRING(255), allowNull: true },
        data_resposta: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
}
export async function down({ queryInterface }) {
    await queryInterface.dropTable('RespostasUsuarios');
    await queryInterface.dropTable('AvaliacaoReviews');
}
