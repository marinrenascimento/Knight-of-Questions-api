import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export class AcessoRecente extends Model {}

AcessoRecente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    tipo: {
      type: DataTypes.ENUM("deck", "prova"),
      allowNull: false
    },

    data_acesso: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: "AcessoRecente",
    tableName: "acessos_recentes",
    timestamps: false
  }
);
