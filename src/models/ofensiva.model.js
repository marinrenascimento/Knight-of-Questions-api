import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export class UserOfensiva extends Model { }

UserOfensiva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    sequencia_dias: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  },
  {
    sequelize,
    modelName: "UserOfensiva",
    tableName: "user_ofensiva",
    timestamps: false
  }
);