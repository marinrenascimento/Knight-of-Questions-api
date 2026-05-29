export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('Disciplinas', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.dropTable('Disciplinas');
}
