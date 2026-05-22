export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('Sessions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,

            references: {
                model: 'Users',
                key: 'id',
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },

        criado_em: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    });
}

export async function down({ queryInterface }) {
    await queryInterface.dropTable('Sessions');
}