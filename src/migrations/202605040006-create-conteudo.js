export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('Conteudos', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nome: { type: Sequelize.STRING(200), allowNull: false },
        disciplina_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Disciplinas', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
    });
}
export async function down({ queryInterface }) {
    await queryInterface.dropTable('Conteudos');
}
