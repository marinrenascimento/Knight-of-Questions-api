export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('DeckReviews', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    id_deck: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Decks', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    iniciado_em: {
      type: Sequelize.DATE,
      allowNull: false
    },
    terminado_em: {
      type: Sequelize.DATE,
      allowNull: true
    },
    qtd_flashcards_revisados: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.dropTable('DeckReviews');
}
