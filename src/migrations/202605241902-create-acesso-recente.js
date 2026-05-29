export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('acessos_recentes', {
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
    nome: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    tipo: {
      type: Sequelize.ENUM('deck', 'prova'),
      allowNull: false,
    },
    data_acesso: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.dropTable('acessos_recentes');
  // Em Postgres, pode ser necessário remover o tipo ENUM explicitamente se desejar uma limpeza total
  // await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_acessos_recentes_tipo";');
}
