export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('Avatars', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: Sequelize.STRING(200), allowNull: false, unique: true },
    imagem_url: { type: Sequelize.STRING(255), allowNull: true },
    nivel_requerido: { type: Sequelize.INTEGER, allowNull: false },
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.dropTable('Avatars');
}
