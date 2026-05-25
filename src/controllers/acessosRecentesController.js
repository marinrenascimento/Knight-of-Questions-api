import { sequelize } from "../config/sequelize.js";
import { QueryTypes } from "sequelize";

export class AcessosRecentesController {

  static async getAllAcessosRecentesByUser(req, res) {
    try {
      const { userId } = req.params;

      const deckRecente = await sequelize.query(
        `
        SELECT 
          deck_review.*,
          deck.*
        FROM deck_review
        INNER JOIN deck ON deck.id = deck_review.deck_id
        WHERE deck_review.user_id = :userId
        ORDER BY deck_review.created_at DESC
        LIMIT 1
        `,
        {
          replacements: { userId },
          type: QueryTypes.SELECT
        }
      );

      const avaliacaoRecente = await sequelize.query(
        `
        SELECT 
          avaliacao_review.*,
          avaliacao.*
        FROM avaliacao_review
        INNER JOIN avaliacao ON avaliacao.id = avaliacao_review.avaliacao_id
        WHERE avaliacao_review.user_id = :userId
        ORDER BY avaliacao_review.created_at DESC
        LIMIT 1
        `,
        {
          replacements: { userId },
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