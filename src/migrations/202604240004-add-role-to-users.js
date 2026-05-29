export async function up({ queryInterface, Sequelize }) {
  await queryInterface.addColumn('Users', 'role', {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: 'visitante',
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.removeColumn('Users', 'role');
}
