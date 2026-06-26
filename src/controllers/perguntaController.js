import { Pergunta, Alternativa, RespostaUsuario, User } from '../models/index.js';
import { sequelize } from '../config/sequelize.js';
import { Op } from 'sequelize';

export const getPerguntasByAvaliacao = async (req, res) => {
    try {
        const id_avaliacao = parseInt(req.params.avaliacaoId, 10);
        const perguntas = await Pergunta.findAll({ 
            where: { id_avaliacao },
            include: [{ model: Alternativa, as: 'alternativas' }]
        });
        if (!perguntas || perguntas.length === 0) return res.status(404).json({ message: 'Nenhuma pergunta encontrada' });
        res.json(perguntas);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar perguntas', error: err.message });
    }
};

export const getPerguntasByFiltro = async (req, res) => {
    try {
        const { disciplina_id, conteudo_id, dificuldade } = req.body;
        const perguntas = await Pergunta.findAll({
            where: {
                ...(disciplina_id && { disciplina_id }),
                ...(conteudo_id && { conteudo_id }),
                ...(dificuldade && { nivel_dificuldade: dificuldade })
            }
        });
        res.json(perguntas);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao filtrar perguntas', error: err.message });
    }
};

export const createPergunta = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { enunciado, nivel_dificuldade, disciplina_id, conteudo_id, id_avaliacao, alternativas } = req.body;
        const pergunta = await Pergunta.create({
            enunciado, nivel_dificuldade, disciplina_id, conteudo_id, id_avaliacao
        }, { transaction });

        if (Array.isArray(alternativas)) {
            for (const alternativa of alternativas) {
                if (!alternativa.texto) continue;
                await Alternativa.create({
                    texto: alternativa.texto,
                    is_correta: !!alternativa.is_correta,
                    descricao: alternativa.descricao,
                    id_pergunta: pergunta.id
                }, { transaction });
            }
        }

        const perguntaCompleta = await Pergunta.findByPk(pergunta.id, {
            include: [{ model: Alternativa, as: 'alternativas' }],
            transaction
        });
        await transaction.commit();
        res.status(201).json(perguntaCompleta);
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao criar pergunta', error: err.message });
    }
};

export const updatePergunta = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const id = parseInt(req.params.id, 10);
        const { enunciado, nivel_dificuldade, disciplina_id, conteudo_id, alternativas } = req.body;
        const pergunta = await Pergunta.findByPk(id, { transaction });
        if (!pergunta) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Pergunta não encontrada' });
        }

        await pergunta.update({ enunciado, nivel_dificuldade, disciplina_id, conteudo_id }, { transaction });

        if (Array.isArray(alternativas)) {
            const idsRecebidos = alternativas.filter((alt) => alt.id).map((alt) => alt.id);
            await Alternativa.destroy({
                where: {
                    id_pergunta: id,
                    ...(idsRecebidos.length > 0 && { id: { [Op.notIn]: idsRecebidos } })
                },
                transaction
            });

            for (const alternativa of alternativas) {
                if (!alternativa.texto) continue;
                if (alternativa.id) {
                    await Alternativa.update({
                        texto: alternativa.texto,
                        is_correta: !!alternativa.is_correta,
                        descricao: alternativa.descricao
                    }, {
                        where: { id: alternativa.id, id_pergunta: id },
                        transaction
                    });
                } else {
                    await Alternativa.create({
                        texto: alternativa.texto,
                        is_correta: !!alternativa.is_correta,
                        descricao: alternativa.descricao,
                        id_pergunta: id
                    }, { transaction });
                }
            }
        }

        const perguntaCompleta = await Pergunta.findByPk(id, {
            include: [{ model: Alternativa, as: 'alternativas' }],
            transaction
        });
        await transaction.commit();
        res.json(perguntaCompleta);
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao atualizar pergunta', error: err.message });
    }
};

export const deletePergunta = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const id = parseInt(req.params.id, 10);
        const pergunta = await Pergunta.findByPk(id, { transaction });
        if (!pergunta) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Pergunta não encontrada' });
        }
        await RespostaUsuario.destroy({ where: { id_pergunta: id }, transaction });
        await Alternativa.destroy({ where: { id_pergunta: id }, transaction });
        await pergunta.destroy({ transaction });
        await transaction.commit();
        res.json({ message: 'Pergunta e dependências removidas com sucesso' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao deletar pergunta', error: err.message });
    }
};

export const getAllPerguntas = async (req, res) => {
    try {
        const perguntas = await Pergunta.findAll();
        res.json(perguntas);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar perguntas', error: err.message });
    }
};

export const responderPergunta = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id_pergunta, id_alternativa, anotacoes, id_user, id_avaliacao_review } = req.body;
        if (!id_pergunta || !id_alternativa || !id_user) {
            return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
        }

        const resposta = await RespostaUsuario.create({
            id_pergunta, id_alternativa, anotacoes, id_user, id_avaliacao_review,
            data_resposta: new Date()
        }, { transaction });

        const alternativa = await Alternativa.findByPk(id_alternativa, { transaction });
        let acertou = false;
        let pontosGanhos = 0;

        if (alternativa && alternativa.is_correta) {
            acertou = true;
            pontosGanhos = 10;
            const user = await User.findByPk(id_user, { transaction });
            if (user) await user.update({ pontos: user.pontos + pontosGanhos }, { transaction });
        }

        await transaction.commit();
        res.json({ message: 'Resposta registrada!', detalhes: { acertou, pontos_adquiridos: pontosGanhos } });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao salvar resposta', error: err.message });
    }
};

export const createAlternativa = async (req, res) => {
    try {
        const { texto, is_correta, id_pergunta, descricao } = req.body;
        if (!texto || !id_pergunta) return res.status(400).json({ message: 'Texto e id_pergunta são obrigatórios.' });
        const novaAlternativa = await Alternativa.create({ texto, is_correta: !!is_correta, id_pergunta, descricao });
        res.status(201).json({ message: 'Alternativa criada!', alternativa: novaAlternativa });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar alternativa', error: err.message });
    }
};

export const updateAlternativa = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { texto, is_correta, descricao } = req.body;
        const alternativa = await Alternativa.findByPk(id);
        if (!alternativa) return res.status(404).json({ message: 'Alternativa não encontrada.' });
        await alternativa.update({ texto, is_correta, descricao });
        res.json({ message: 'Alternativa atualizada!', alternativa });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar alternativa', error: err.message });
    }
};

export const deleteAlternativa = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const id = parseInt(req.params.id, 10);
        const alternativa = await Alternativa.findByPk(id, { transaction });
        if (!alternativa) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Alternativa não encontrada.' });
        }
        await RespostaUsuario.destroy({ where: { id_alternativa: id }, transaction });
        await alternativa.destroy({ transaction });
        await transaction.commit();
        res.json({ message: 'Alternativa removida!' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao deletar alternativa', error: err.message });
    }
};
