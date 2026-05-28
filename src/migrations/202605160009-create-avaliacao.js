export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('Avaliacoes', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        titulo: { type: Sequelize.STRING(200), allowNull: false },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'Users', key: 'id' },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        is_vestibular: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    });
}
export async function down({ queryInterface }) {
    await queryInterface.dropTable('Avaliacoes');
}
