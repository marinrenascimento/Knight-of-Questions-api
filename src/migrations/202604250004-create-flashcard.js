export async function up({ queryInterface, Sequelize }) {
  await queryInterface.createTable('Flashcards', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    frente: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    verso: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    id_deck: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Decks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    dificuldade: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_disciplina: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Disciplinas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_conteudo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Conteudos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });
}

export async function down({ queryInterface }) {
  await queryInterface.dropTable('Flashcards');
}
