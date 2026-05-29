export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('Ranks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: true
    },
    imagem_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    pontos_minimos: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.dropTable('Ranks');
}
