import { User, DeckReview } from '../models/index.js';

/**
 * POST /deck-reviews/start
 * 
 * Inicia uma revisão de um deck
 */
export const startDeckReview = async (req, res) => {
  try {
    const { id_deck } = req.body;
    const id_usuario = req.authUser.id;

    if (!id_deck) {
      return res.status(400).json({ message: 'O id_deck é obrigatório.' });
    }

    const review = await DeckReview.create({
      id_deck,
      id_usuario,
      iniciado_em: new Date(),
    });

    res.status(201).json({
      message: 'Revisão iniciada com sucesso.',
      review
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao iniciar revisão do deck', details: err.message });
  }
};

/**
 * PUT /deck-reviews/finish/:id
 * 
 * Finaliza a revisão, calcula o tempo gasto e atribui os pontos ao usuário
 */
export const finishDeckReview = async (req, res) => {
  try {
    const id_review = req.params.id;
    const { qtd_flashcards_revisados } = req.body;
    const id_usuario = req.authUser.id;

    if (qtd_flashcards_revisados === undefined) {
      return res.status(400).json({ message: 'A quantidade de flashcards revisados é obrigatória.' });
    }

    const review = await DeckReview.findByPk(id_review);

    if (!review) {
      return res.status(404).json({ message: 'Revisão não encontrada.' });
    }

    // Apenas o dono da revisão ou um admin pode finalizá-la
    if (review.id_usuario !== id_usuario && req.authUser.role !== 'admin') {
      return res.status(403).json({ message: 'Sem permissão para finalizar esta revisão.' });
    }

    if (review.terminado_em) {
      return res.status(400).json({ message: 'Esta revisão já foi finalizada.' });
    }

    review.terminado_em = new Date();
    review.qtd_flashcards_revisados = qtd_flashcards_revisados;
    await review.save();

    // Lógica de pontuação (ex: 5 pontos por flashcard revisado)
    const pontosGanhos = qtd_flashcards_revisados * 5; 
    const user = await User.findByPk(id_usuario);
    if (user) {
      user.pontos += pontosGanhos;
      await user.save();
    }

    res.json({
      message: 'Revisão finalizada com sucesso.',
      pontos_ganhos: pontosGanhos,
      review
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao finalizar revisão do deck', details: err.message });
  }
};

/**
 * GET /deck-reviews/history/:id_deck
 * 
 * Retorna o histórico de revisões de um deck específico para o usuário logado
 */
export const getHistoricoReviewsByDeck = async (req, res) => {
  try {
    const { id_deck } = req.params;
    const id_usuario = req.authUser.id;

    const reviews = await DeckReview.findAll({
      where: {
        id_deck,
        id_usuario
      },
      order: [['iniciado_em', 'DESC']]
    });

    const historico = reviews.map(rev => {
      let tempo_gasto_segundos = null;
      
      if (rev.iniciado_em && rev.terminado_em) {
        const diffTempo = new Date(rev.terminado_em) - new Date(rev.iniciado_em);
        tempo_gasto_segundos = Math.floor(diffTempo / 1000); // Converte de milissegundos para segundos
      }

      return {
        id: rev.id,
        iniciado_em: rev.iniciado_em,
        terminado_em: rev.terminado_em,
        tempo_gasto_segundos,
        qtd_flashcards_revisados: rev.qtd_flashcards_revisados
      };
    });

    res.json(historico);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico de revisões', details: err.message });
  }
};
