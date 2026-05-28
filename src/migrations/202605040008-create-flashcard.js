export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('Flashcards', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        frente: { type: Sequelize.STRING(255), allowNull: false },
        verso: { type: Sequelize.STRING(255), allowNull: false },
        id_deck: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 
            references: { model: 'Decks', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        dificuldade: { type: Sequelize.INTEGER, allowNull: true },
        id_disciplina: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 
            references: { model: 'Disciplinas', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_conteudo: { 
            type: Sequelize.INTEGER, 
            allowNull: true, 
            references: { model: 'Conteudos', key: 'id' },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
    });
}
export async function down({ queryInterface }) {
    await queryInterface.dropTable('Flashcards');
}
