import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export class Session extends Model { }

Session.init(
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

    criado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize,
    modelName: 'Session',
    tableName: 'Sessions',
    timestamps: false,
    underscored: false,
  },
);