
import { UserSessao } from '../models/sessao.model.js';

/**
 * POST http://localhost:3000/sessao/start
 *
 * Inicia uma nova sessão
 */
const startSessao = async (req, res) => {
    try {

        const { user_id } = req.body || {};

        if (!user_id) {
            return res.status(400).json({
                message: "Usuário não informado"
            });
        }

        const novaSessao = await UserSessao.create({
            user_id,
            data_login: new Date(),
            data_logout: null
        });

        return res.status(201).json(novaSessao);

    } catch (error) {

        return res.status(500).json({
            message: "Erro ao iniciar sessão",
            details: error.message
        });

    }
};

/**
 * PUT http://localhost:3000/sessao/end/:id
 *
 * Finaliza uma sessão
 */
const endSessao = async (req, res) => {
    try {

        const id = req.params.id ? parseInt(req.params.id) : null;

        if (!id) {
            return res.status(400).json({
                message: "ID da sessão não informado"
            });
        }

        const sessao = await UserSessao.findByPk(id);

        if (!sessao) {
            return res.status(404).json({
                message: "Sessão não encontrada"
            });
        }

        const data_logout = new Date();

        await sessao.update({
            data_logout
        });

        return res.json(sessao);

    } catch (error) {

        return res.status(500).json({
            message: "Erro ao finalizar sessão",
            details: error.message
        });

    }
};


/*
 * GET http://localhost:3000/sessao/tempo/:user_id

 * Calcula o tempo total de sessões de um usuário
 */
const getTempoTotalSessoes = async (req, res) => {
    try {

        const user_id = req.params.user_id
            ? parseInt(req.params.user_id)
            : null;

        if (!user_id) {
            return res.status(400).json({
                message: "Usuário não informado"
            });
        }

        const sessoesDoUsuario = await UserSessao.findAll({
            where: {
                user_id
            }
        });

        let totalMinutos = 0;

        for (let i = 0; i < sessoesDoUsuario.length; i++) {
            const sessao = sessoesDoUsuario[i];
            if (sessao.data_logout && sessao.data_login) {
                const diff = new Date(sessao.data_logout) - new Date(sessao.data_login);
                totalMinutos += diff / 1000 / 60;
            }
        }

        return res.json({
            total_minutos: totalMinutos
        });

    } catch (error) {

        return res.status(500).json({
            message: "Erro ao calcular tempo total",
            details: error.message
        });

    }
};

export default {
    startSessao,
    endSessao,
    getTempoTotalSessoes
};