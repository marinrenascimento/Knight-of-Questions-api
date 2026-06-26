export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('user_ofensiva', {
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
    sequencia_dias: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    data_ultima_atualizacao: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.dropTable('user_ofensiva');
}
