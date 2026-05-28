import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class Conteudo extends Model {}

Conteudo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Disciplinas',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Conteudo',
    tableName: 'Conteudos',
    timestamps: false,
  }
);