import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class AvaliacaoReview extends Model {}

AvaliacaoReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    id_avaliacao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Avaliacoes',
        key: 'id',
      },
    },
    iniciado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    terminado_em: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    qtd_questoes_respondidas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'AvaliacaoReview',
    tableName: 'AvaliacaoReviews',
    timestamps: false,
  }
);