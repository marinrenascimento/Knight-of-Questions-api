import { Avaliacao, Pergunta, Alternativa, Disciplina, Conteudo } from '../models/index.js';
import { sequelize } from '../config/sequelize.js';

export const getAvaliacaoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const avaliacao = await Avaliacao.findByPk(id);
        if (!avaliacao) return res.status(404).json({ message: 'Avaliação não encontrada' });
        const perguntas = await Pergunta.findAll({
            where: { id_avaliacao: id },
            include: [
                { model: Alternativa, as: 'alternativas' },
                { model: Disciplina, as: 'disciplina', attributes: ['id', 'nome'] },
                { model: Conteudo, as: 'conteudo', attributes: ['id', 'nome'] }
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Alternativa, as: 'alternativas' }, 'id', 'ASC']
            ]
        });
        res.json({ ...avaliacao.toJSON(), perguntas });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar avaliação', error: err.message });
    }
};

export const createAvaliacaoPorDisciplina = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { disciplina_id, conteudo_id, quantidade, id_user } = req.body;
        const limite = parseInt(quantidade, 10);

        if (!disciplina_id || !conteudo_id || !limite || limite < 1 || !id_user) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Disciplina, conteúdo, quantidade e usuário são obrigatórios.' });
        }

        const disciplina = await Disciplina.findByPk(disciplina_id, { transaction });
        const conteudo = await Conteudo.findByPk(conteudo_id, { transaction });

        if (!disciplina || !conteudo) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Disciplina ou conteúdo não encontrado.' });
        }

        const perguntas = await Pergunta.findAll({
            where: { disciplina_id, conteudo_id },
            include: [{ model: Alternativa, as: 'alternativas' }],
            order: sequelize.random(),
            limit: limite,
            transaction
        });

        if (perguntas.length === 0) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Nenhuma questão encontrada para esta disciplina e conteúdo.' });
        }

        const novaAvaliacao = await Avaliacao.create({
            titulo: `${disciplina.nome} - ${conteudo.nome}`,
            is_vestibular: false,
            id_user
        }, { transaction });

        for (const pergunta of perguntas) {
            const novaPergunta = await Pergunta.create({
                enunciado: pergunta.enunciado,
                nivel_dificuldade: pergunta.nivel_dificuldade,
                disciplina_id: pergunta.disciplina_id,
                conteudo_id: pergunta.conteudo_id,
                id_avaliacao: novaAvaliacao.id
            }, { transaction });

            for (const alternativa of pergunta.alternativas || []) {
                await Alternativa.create({
                    texto: alternativa.texto,
                    is_correta: alternativa.is_correta,
                    descricao: alternativa.descricao,
                    id_pergunta: novaPergunta.id
                }, { transaction });
            }
        }

        await transaction.commit();
        res.status(201).json({
            message: 'Prova personalizada criada com sucesso!',
            avaliacao: novaAvaliacao,
            questoes_adicionadas: perguntas.length
        });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao criar prova personalizada', error: err.message });
    }
};

export const getAllAvaliacoesByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const avaliacoes = await Avaliacao.findAll({
            where: { id_user: userId },
            include: [{
                model: Pergunta,
                as: 'perguntas',
                attributes: ['id']
            }]
        });
        res.json(avaliacoes);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar avaliações', error: err.message });
    }
};

export const getAllAvaliacoesVestibulares = async (req, res) => {
    try {
        const avaliacoes = await Avaliacao.findAll({
            where: { is_vestibular: true, id_user: null },
            include: [{
                model: Pergunta,
                as: 'perguntas',
                attributes: ['id']
            }]
        });
        res.json(avaliacoes);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar avaliações', error: err.message });
    }
};

export const createAvaliacao = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { titulo, is_vestibular, id_user, perguntas } = req.body;
        if (!titulo) {
            await transaction.rollback();
            return res.status(400).json({ message: "O título é obrigatório." });
        }

        const novaAvaliacao = await Avaliacao.create({ titulo, is_vestibular, id_user }, { transaction });

        if (perguntas && Array.isArray(perguntas)) {
            for (const p of perguntas) {
                const novaPergunta = await Pergunta.create({
                    enunciado: p.enunciado,
                    nivel_dificuldade: p.nivel_dificuldade,
                    disciplina_id: p.disciplina_id,
                    conteudo_id: p.conteudo_id,
                    id_avaliacao: novaAvaliacao.id
                }, { transaction });

                if (p.alternativas && Array.isArray(p.alternativas)) {
                    for (const alt of p.alternativas) {
                        await Alternativa.create({
                            texto: alt.texto,
                            is_correta: alt.is_correta,
                            descricao: alt.descricao,
                            id_pergunta: novaPergunta.id
                        }, { transaction });
                    }
                }
            }
        }

        await transaction.commit();
        res.status(201).json({ message: "Avaliação criada com sucesso!", avaliacao: novaAvaliacao });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao criar avaliação', error: err.message });
    }
};

export const updateInfoAvaliacao = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { titulo, is_vestibular } = req.body;
        const avaliacao = await Avaliacao.findByPk(id);
        if (!avaliacao) return res.status(404).json({ message: 'Avaliação não encontrada' });
        await avaliacao.update({ titulo, is_vestibular });
        res.json(avaliacao);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar avaliação', error: err.message });
    }
};

export const deleteAvaliacaoAndPerguntas = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const id = parseInt(req.params.id, 10);
        const avaliacao = await Avaliacao.findByPk(id, { transaction });
        if (!avaliacao) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Avaliação não encontrada' });
        }
        await Pergunta.destroy({ where: { id_avaliacao: id }, transaction });
        await avaliacao.destroy({ transaction });
        await transaction.commit();
        res.json({ message: 'Avaliação e perguntas removidas com sucesso' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao deletar', error: err.message });
    }
};
