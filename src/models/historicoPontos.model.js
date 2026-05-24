import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class HistoricoPontos extends Model {}

HistoricoPontos.init(
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
    acao: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pontos_ganhos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    criado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'HistoricoPontos',
    tableName: 'HistoricoPontos',
    timestamps: false,
  }
);
