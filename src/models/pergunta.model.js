import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class Pergunta extends Model {}

Pergunta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enunciado: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nivel_dificuldade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Disciplinas',
        key: 'id',
      },
    },
    id_avaliacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Avaliacoes',
        key: 'id',
      },
    },
    conteudo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Conteudos',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Pergunta',
    tableName: 'Perguntas',
    timestamps: false,
  }
);