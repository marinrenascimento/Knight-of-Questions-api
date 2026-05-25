export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('user_ofensiva', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        sequencia_dias: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
}
