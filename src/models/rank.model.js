import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class Rank extends Model {}

Rank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    imagem_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pontos_minimos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Rank',
    tableName: 'Ranks',
    timestamps: false,
  }
);
