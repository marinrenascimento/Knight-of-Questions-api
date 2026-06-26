import { UserOfensiva, User } from "../models/index.js";

function formatDateOnly(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

export class OfensivaController {

  static async getOfensivaByUser(req, res) {
    try {
      const id_usuario = req.authUser.id;
      const user = await User.findByPk(id_usuario);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const ofensiva = await UserOfensiva.findOne({
        where: { user_id: id_usuario }
      });

      if (!ofensiva) {
        return res.status(200).json({
          user_id: id_usuario,
          sequencia_dias: 0
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

  /**
   * POST /ofensiva/update
   *
   * Atualiza a ofensiva do usuário logado, no máximo uma vez por dia.
   */
  static async updateOfensiva(req, res) {
    try {
      const id_usuario = req.authUser.id;
      const acao = req.body?.acao ?? null;
      const hoje = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

      let ofensiva = await UserOfensiva.findOne({
        where: { user_id: id_usuario }
      });

      if (!ofensiva) {
        ofensiva = await UserOfensiva.create({
          user_id: id_usuario,
          sequencia_dias: 1,
          data_ultima_atualizacao: hoje
        });

        return res.status(201).json({
          message: "Ofensiva criada com sucesso",
          ofensiva
        });
      }

      if (acao === "zerar") {
        ofensiva.sequencia_dias = 0;
        ofensiva.data_ultima_atualizacao = hoje;
        await ofensiva.save();

        return res.status(200).json({
          message: "Ofensiva zerada com sucesso",
          ofensiva
        });
      }

      const ultimaAtualizacao = formatDateOnly(ofensiva.data_ultima_atualizacao);

      if (ultimaAtualizacao === hoje) {
        return res.status(200).json({
          message: "Ofensiva já atualizada hoje",
          ofensiva
        });
      }

      ofensiva.sequencia_dias += 1;
      ofensiva.data_ultima_atualizacao = hoje;

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