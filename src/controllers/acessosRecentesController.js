import { sequelize } from "../config/sequelize.js";
import { QueryTypes } from "sequelize";

export class AcessosRecentesController {

  /**
   * GET http://localhost:3000/acessos-recentes/:userId
   * 
   * Busca os acessos recentes de um usuário
   */
  static async getAllAcessosRecentesByUser(req, res) {
    try {
      const { id, userId } = req.params;
      const actualUserId = id || userId;

      const deckRecente = await sequelize.query(
        `
        SELECT 
          dr.*,
          d.nome as deck_nome,
          d.descricao as deck_descricao
        FROM "DeckReviews" dr
        INNER JOIN "Decks" d ON d.id = dr.id_deck
        WHERE dr.id_usuario = :userId
        ORDER BY dr.iniciado_em DESC
        LIMIT 1
        `,
        {
          replacements: { userId: actualUserId },
          type: QueryTypes.SELECT
        }
      );

      const avaliacaoRecente = await sequelize.query(
        `
        SELECT 
          ar.*,
          a.titulo as avaliacao_titulo,
          a.is_vestibular
        FROM "AvaliacaoReviews" ar
        INNER JOIN "Avaliacoes" a ON a.id = ar.id_avaliacao
        WHERE ar.id_user = :userId
        ORDER BY ar.iniciado_em DESC
        LIMIT 1
        `,
        {
          replacements: { userId: actualUserId },
          type: QueryTypes.SELECT
        }
      );

      return res.status(200).json({
        avaliacao_recente: avaliacaoRecente[0] || null,
        deck_recente: deckRecente[0] || null
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar acessos recentes",
        error: error.message
      });
    }
  }

}
