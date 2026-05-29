import { AvaliacaoReview, RespostaUsuario, Alternativa } from '../models/index.js';

/**
 * Inicia uma nova sessão de avaliação (Review)
 */
export const startAvaliacao = async (req, res) => {
    try {
        const { id_avaliacao, id_user } = req.body;

        if (!id_avaliacao || !id_user) {
            return res.status(400).json({ message: 'ID da avaliação e do usuário são obrigatórios.' });
        }

        const novaReview = await AvaliacaoReview.create({
            id_avaliacao,
            id_user,
            iniciado_em: new Date()
        });

        res.status(201).json({ 
            message: "Sessão iniciada com sucesso", 
            review: novaReview 
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao iniciar avaliação', error: err.message });
    }
};

/**
 * Finaliza uma sessão de avaliação e calcula o desempenho
 */
export const finishAvaliacao = async (req, res) => {
    try {
        const { id_avaliacao_review } = req.body;

        if (!id_avaliacao_review) {
            return res.status(400).json({ message: 'ID da avaliação review não fornecido' });
        }

        const review = await AvaliacaoReview.findByPk(id_avaliacao_review);
        if (!review) {
            return res.status(404).json({ message: 'Sessão de avaliação não encontrada' });
        }

        const respostas = await RespostaUsuario.findAll({
            where: { id_avaliacao_review },
            include: [{
                model: Alternativa,
                as: 'alternativa',
                attributes: ['is_correta']
            }]
        });

        const totalRespondidas = respostas.length;
        const acertos = respostas.filter(r => r.alternativa && r.alternativa.is_correta).length;
        const notaFinal = totalRespondidas > 0 ? (acertos / totalRespondidas) * 100 : 0;

        await review.update({
            terminado_em: new Date(),
            qtd_questoes_respondidas: totalRespondidas
        });

        res.json({
            message: "Sessão finalizada com sucesso",
            id_avaliacao_review,
            terminado_em: review.terminado_em,
            qtd_questoes_respondidas: totalRespondidas,
            acertos,
            notaFinal: Math.round(notaFinal)
        });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao finalizar avaliação', error: err.message });
    }
};

/**
 * Retorna o resultado detalhado de um review específico
 */
export const getResultadoAvaliacao = async (req, res) => {
    try {
        const id_avaliacao_review = parseInt(req.params.reviewId, 10);

        const respostas = await RespostaUsuario.findAll({
            where: { id_avaliacao_review },
            include: [{
                model: Alternativa,
                as: 'alternativa',
                attributes: ['is_correta']
            }]
        });

        if (respostas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma resposta encontrada para esta avaliação' });
        }

        const acertos = respostas.filter(r => r.alternativa && r.alternativa.is_correta).length;
        const erros = respostas.length - acertos;
        const notaFinal = (acertos / respostas.length) * 100;

        res.json({
            message: "Resultado calculado com sucesso",
            acertos,
            erros,
            notaFinal: Math.round(notaFinal)
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar resultado', error: err.message });
    }
};

/**
 * Retorna as anotações feitas pelo usuário
 */
export const getAnotacoesByAvaliacao = async (req, res) => {
    try {
        const id_avaliacao_review = parseInt(req.params.reviewId, 10);

        const respostas = await RespostaUsuario.findAll({
            where: { id_avaliacao_review },
            attributes: ['id', 'anotacoes']
        });

        res.json({ anotacoes: respostas });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar anotações', error: err.message });
    }
};

/**
 * Placeholder para salvar período de review
 */
export const savePeriodoReview = async (req, res) => {
    res.status(501).json({ message: 'Funcionalidade savePeriodoReview ainda não implementada.' });
};
