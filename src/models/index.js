import { User } from './user.model.js';
import { Avatar } from './avatar.model.js';
import { Rank } from './rank.model.js';
import { DeckReview } from './deckReview.model.js';
import { HistoricoPontos } from './historicoPontos.model.js';
import { UserOfensiva } from './ofensiva.model.js';

let initialized = false;

export function initModels() {
  if (initialized) return;
  initialized = true;

  // Avatar - Usuário
  User.belongsTo(Avatar, { as: 'avatar', foreignKey: 'id_avatar' });
  Avatar.hasMany(User, { as: 'usuarios', foreignKey: 'id_avatar' });

  // User - Ofensiva
  User.hasOne(UserOfensiva, { as: 'ofensiva', foreignKey: 'id_user' });
  UserOfensiva.belongsTo(User, { as: 'usuario', foreignKey: 'id_user' });

}

export { User, Avatar, Rank, DeckReview, HistoricoPontos, UserOfensiva };