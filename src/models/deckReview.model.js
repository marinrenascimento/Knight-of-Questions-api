import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class DeckReview extends Model {}

DeckReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_deck: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    iniciado_em: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    terminado_em: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    qtd_flashcards_revisados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'DeckReview',
    tableName: 'DeckReviews',
    timestamps: false,
  }
);
