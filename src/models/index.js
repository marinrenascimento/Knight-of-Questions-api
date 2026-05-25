import { User } from './user.model.js';
import { Avatar } from './avatar.model.js';
<<<<<<< HEAD
import { Deck } from './deck.model.js';
import { Flashcard } from './flashcard.model.js';
import { Disciplina } from './disciplina.model.js';
import { Conteudo } from './conteudo.model.js';
=======
import { Rank } from './rank.model.js';
import { DeckReview } from './deckReview.model.js';
import { HistoricoPontos } from './historicoPontos.model.js';
>>>>>>> 0b03328d88138fdd982087c844de7da067d9d920

let initialized = false;

export function initModels() {
  if (initialized) return;
  initialized = true;

  // Avatar <-> User
  User.belongsTo(Avatar, { as: 'avatar', foreignKey: 'id_avatar' });
  Avatar.hasMany(User, { as: 'usuarios', foreignKey: 'id_avatar' });
  
  // User <-> Deck
  User.hasMany(Deck, { as: 'decks', foreignKey: 'id_user' });
  Deck.belongsTo(User, { as: 'usuario', foreignKey: 'id_user' });

  // Disciplina <-> Conteudo
  Disciplina.hasMany(Conteudo, { as: 'conteudos', foreignKey: 'disciplina_id' });
  Conteudo.belongsTo(Disciplina, { as: 'disciplina', foreignKey: 'disciplina_id' });

  // Deck <-> Flashcard
  Deck.hasMany(Flashcard, { as: 'flashcards', foreignKey: 'id_deck' });
  Flashcard.belongsTo(Deck, { as: 'deck', foreignKey: 'id_deck' });



  // Disciplina <-> Flashcard 
  Disciplina.hasMany(Flashcard, { as: 'flashcards_disciplina', foreignKey: 'id_disciplina' });
  Flashcard.belongsTo(Disciplina, { as: 'disciplina', foreignKey: 'id_disciplina' });

  // Conteudo <-> Flashcard (Opcional)
  Conteudo.hasMany(Flashcard, { as: 'flashcards_conteudo', foreignKey: 'id_conteudo' });
  Flashcard.belongsTo(Conteudo, { as: 'conteudo', foreignKey: 'id_conteudo' });

}

<<<<<<< HEAD
export { 
  User, Avatar, Disciplina, Conteudo, Deck, Flashcard
};
=======
export { User, Avatar, Rank, DeckReview, HistoricoPontos };
>>>>>>> 0b03328d88138fdd982087c844de7da067d9d920
