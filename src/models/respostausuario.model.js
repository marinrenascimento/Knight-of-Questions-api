import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class RespostaUsuario extends Model {}

RespostaUsuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pergunta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Perguntas',
        key: 'id',
      },
    },
    id_alternativa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Alternativas',
        key: 'id',
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    id_avaliacao_review: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'AvaliacaoReviews',
        key: 'id',
      },
    },
    anotacoes: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    data_resposta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'RespostaUsuario',
    tableName: 'RespostasUsuarios',
    timestamps: false,
  }
);