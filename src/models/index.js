import { User } from './user.model.js';
import { Avatar } from './avatar.model.js';
import { Rank } from './rank.model.js';
import { DeckReview } from './deckReview.model.js';
import { HistoricoPontos } from './historicoPontos.model.js';
import { Disciplina } from './disciplina.model.js';
import { Conteudo } from './conteudo.model.js';
import { Deck } from './deck.model.js';
import { Flashcard } from './flashcard.model.js';
import { Avaliacao } from './avaliacao.model.js';
import { Pergunta } from './pergunta.model.js';
import { Alternativa } from './alternativa.model.js';
import { AvaliacaoReview } from './avaiacaoreview.model.js';
import { RespostaUsuario } from './respostausuario.model.js';

let initialized = false;

export function initModels() {
  if (initialized) return;
  initialized = true;

  // Avatar - Usuário
  User.belongsTo(Avatar, { as: 'avatar', foreignKey: 'id_avatar' });
  Avatar.hasMany(User, { as: 'usuarios', foreignKey: 'id_avatar' });
  // User - Deck
  User.hasMany(Deck, { as: 'decks', foreignKey: 'id_user' });
  Deck.belongsTo(User, { as: 'usuario', foreignKey: 'id_user' });

  // Disciplina - Conteudo
  Disciplina.hasMany(Conteudo, { as: 'conteudos', foreignKey: 'disciplina_id' });
  Conteudo.belongsTo(Disciplina, { as: 'disciplina', foreignKey: 'disciplina_id' });

  // Deck - Flashcard
  Deck.hasMany(Flashcard, { as: 'flashcards', foreignKey: 'id_deck' });
  Flashcard.belongsTo(Deck, { as: 'deck', foreignKey: 'id_deck' });

  // Avaliacao - Pergunta
  Avaliacao.hasMany(Pergunta, { as: 'perguntas', foreignKey: 'id_avaliacao' });
  Pergunta.belongsTo(Avaliacao, { as: 'avaliacao', foreignKey: 'id_avaliacao' });

  // Disciplina - Pergunta
  Disciplina.hasMany(Pergunta, { as: 'perguntas', foreignKey: 'disciplina_id' });
  Pergunta.belongsTo(Disciplina, { as: 'disciplina', foreignKey: 'disciplina_id' });

  // Conteudo - Pergunta
  Conteudo.hasMany(Pergunta, { as: 'perguntas', foreignKey: 'conteudo_id' });
  Pergunta.belongsTo(Conteudo, { as: 'conteudo', foreignKey: 'conteudo_id' });

  // Pergunta - Alternativa
  Pergunta.hasMany(Alternativa, { as: 'alternativas', foreignKey: 'id_pergunta' });
  Alternativa.belongsTo(Pergunta, { as: 'pergunta', foreignKey: 'id_pergunta' });

  // User - AvaliacaoReview
  User.hasMany(AvaliacaoReview, { as: 'reviews', foreignKey: 'id_user' });
  AvaliacaoReview.belongsTo(User, { as: 'usuario', foreignKey: 'id_user' });

  // Avaliacao - AvaliacaoReview
  Avaliacao.hasMany(AvaliacaoReview, { as: 'reviews', foreignKey: 'id_avaliacao' });
  AvaliacaoReview.belongsTo(Avaliacao, { as: 'avaliacao', foreignKey: 'id_avaliacao' });

  // AvaliacaoReview - RespostaUsuario
  AvaliacaoReview.hasMany(RespostaUsuario, { as: 'respostas', foreignKey: 'id_avaliacao_review' });
  RespostaUsuario.belongsTo(AvaliacaoReview, { as: 'review', foreignKey: 'id_avaliacao_review' });

  // User - RespostaUsuario
  User.hasMany(RespostaUsuario, { as: 'respostas', foreignKey: 'id_user' });
  RespostaUsuario.belongsTo(User, { as: 'usuario', foreignKey: 'id_user' });

  // Pergunta - RespostaUsuario
  Pergunta.hasMany(RespostaUsuario, { as: 'respostas', foreignKey: 'id_pergunta' });
  RespostaUsuario.belongsTo(Pergunta, { as: 'pergunta', foreignKey: 'id_pergunta' });

  // Alternativa - RespostaUsuario
  Alternativa.hasMany(RespostaUsuario, { as: 'respostas', foreignKey: 'id_alternativa' });
  RespostaUsuario.belongsTo(Alternativa, { as: 'alternativa', foreignKey: 'id_alternativa' });
}

export { 
  User, 
  Avatar, 
  Disciplina, 
  Conteudo, 
  Deck, 
  Flashcard, 
  Avaliacao, 
  Pergunta, 
  Alternativa, 
  AvaliacaoReview, 
  RespostaUsuario,
  Rank,
  DeckReview,
  HistoricoPontos,

};