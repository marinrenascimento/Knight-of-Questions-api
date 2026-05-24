 import { UserOfensiva } from "../models/ofensiva.model.js";

export class OfensivaController {

  // Busca a ofensiva atual do usuário
  static async getOfensivaByUser(req, res) {
    try {
      const { userId } = req.params;

      const ofensiva = await UserOfensiva.findOne({
        where: { user_id: userId }
      });

      if (!ofensiva) {
        return res.status(404).json({
          message: "Ofensiva não encontrada"
        });
      }

      return res.status(200).json({
        user_id: ofensiva.user_id,
        sequencia_dias: ofensiva.sequencia_dias
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar ofensiva",
        error: error.message
      });
    }
  }

  // Atualiza a ofensiva do usuário
  static async updateOfensiva(req, res) {
    try {
      const { userId } = req.params;
      const { acao } = req.body;

      let ofensiva = await UserOfensiva.findOne({
        where: { user_id: userId }
      });

      if (!ofensiva) {
        ofensiva = await UserOfensiva.create({
          user_id: userId,
          sequencia_dias: 1
        });

        return res.status(201).json({
          message: "Ofensiva criada com sucesso",
          ofensiva
        });
      }

      if (acao === "zerar") {
        ofensiva.sequencia_dias = 0;
      } else {
        ofensiva.sequencia_dias += 1;
      }

      await ofensiva.save();

      return res.status(200).json({
        message: "Ofensiva atualizada com sucesso",
        ofensiva
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar ofensiva",
        error: error.message
      });
    }
  }
}
