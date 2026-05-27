import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class Flashcard extends Model { }

Flashcard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    frente: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    verso: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_deck: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'deck',
        key: 'id',
      },
    },
    dificuldade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Disciplinas',
        key: 'id',
      },
    },
    id_conteudo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conteudos',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Flashcard',
    tableName: 'Flashcards',
    timestamps: false,
  }
);