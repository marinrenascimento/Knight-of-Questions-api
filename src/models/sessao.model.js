import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class UserSessao extends Model { }

UserSessao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },

    data_login: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    data_logout: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },

  {
    sequelize,
    modelName: 'UserSessao',
    tableName: 'user_sessao',
    timestamps: false,
    underscored: true,
  },
);