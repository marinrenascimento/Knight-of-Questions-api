export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('user_sessao', {
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
    data_login: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    data_logout: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.dropTable('user_sessao');
}
