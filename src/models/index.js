import { User } from './user.model.js';
import { Avatar } from './avatar.model.js';
import { Rank } from './rank.model.js';
import { DeckReview } from './deckReview.model.js';
import { HistoricoPontos } from './historicoPontos.model.js';

let initialized = false;

export function initModels() {
  if (initialized) return;
  initialized = true;

  // Avatar - Usuário
  User.belongsTo(Avatar, { as: 'avatar', foreignKey: 'id_avatar' });
  Avatar.hasMany(User, { as: 'usuarios', foreignKey: 'id_avatar' });
}

export { User, Avatar, Rank, DeckReview, HistoricoPontos };