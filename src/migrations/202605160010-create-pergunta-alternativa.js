export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('Perguntas', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        enunciado: { type: Sequelize.STRING(255), allowNull: false },
        nivel_dificuldade: { type: Sequelize.INTEGER, allowNull: true },
        disciplina_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Disciplinas', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_avaliacao: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Avaliacoes', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        conteudo_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Conteudos', key: 'id' },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
    });
    await queryInterface.createTable('Alternativas', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        texto: { type: Sequelize.STRING(200), allowNull: true },
        is_correta: { type: Sequelize.BOOLEAN, allowNull: true },
        id_pergunta: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Perguntas', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        descricao: { type: Sequelize.STRING(255), allowNull: true },
    });
}
export async function down({ queryInterface }) {
    await queryInterface.dropTable('Alternativas');
    await queryInterface.dropTable('Perguntas');
}
