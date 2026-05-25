import { UserOfensiva, User } from "../models/index.js";

export class OfensivaController {

  /**
   * GET /ofensiva
   * 
   * Busca a ofensiva atual do usuário logado
   */
  static async getOfensivaByUser(req, res) {
    try {
      const id_usuario = req.authUser.id;
      const user = await User.findByPk(id_usuario);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const ofensiva = await UserOfensiva.findOne({
        where: { id_user: id_usuario }
      });

      if (!ofensiva) {
        return res.status(200).json({
          id_user: id_usuario,
          sequencia_dias: 0
        });
      }

      return res.status(200).json({
        id_user: ofensiva.id_user,
        sequencia_dias: ofensiva.sequencia_dias
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar ofensiva",
        error: error.message
      });
    }
  }

  /**
   * POST /ofensiva/update
   * 
   * Atualiza a ofensiva do usuário logado
   */
  static async updateOfensiva(req, res) {
    try {
      const id_usuario = req.authUser.id;
      const acao = req.body?.acao ?? null;

      let ofensiva = await UserOfensiva.findOne({
        where: { id_user: id_usuario }
      });

      if (!ofensiva) {
        ofensiva = await UserOfensiva.create({
          id_user: id_usuario,
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
