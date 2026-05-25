import { User, HistoricoPontos } from '../models/index.js';

const TABELA_PONTOS = {
  'cards': 2,
  'questoes': 3,
  'jogos': 1
};

const getRankPorNivel = (nivel) => {
  if (nivel >= 18) return 'Diamante';
  if (nivel >= 15) return 'Esmeralda';
  if (nivel >= 12) return 'Rubi';
  if (nivel >= 9) return 'Ametista';
  if (nivel >= 6) return 'Ouro';
  if (nivel >= 3) return 'Prata';
  return 'Bronze';
};

const getRecompensaPorNivel = (nivel) => {
  const recompensas = {
    0: 'Cavaleiro',
    1: 'Goblin (só de tanga)',
    2: 'Rei',
    3: 'Mago',
    4: 'Fada',
    5: 'Esqueleto',
    6: 'Elfo',
    7: 'Armadura nova para o cavaleiro',
    8: 'Roupa nova para o goblin',
    9: 'Roupa nova para o rei',
    10: 'Roupa nova para o mago',
    11: 'Roupa nova para a fada',
    12: 'Manto novo para o esqueleto',
    13: 'Roupa nova para o elfo',
    14: 'Espada para o cavaleiro',
    15: 'Cetro novo para o rei',
    16: 'Mago novo cajado',
    17: 'Novas asas para a fada',
    18: 'Livro de feitiços para o esqueleto',
    19: 'Arco e flecha para o elfo',
    20: 'Fundo personalizado (sol e nuvens)'
  };

  if (nivel > 20) return 'Todas as recompensas base desbloqueadas';

  return recompensas[nivel] || 'Nenhuma recompensa mapeada';
};

/**
 * GET /pontos
 * 
 * Retorna o total de pontos acumulados pelo usuário e informações de nível
 */
export const getPontosByUser = async (req, res) => {
  try {
    const id_usuario = req.authUser.id;
    const user = await User.findByPk(id_usuario);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      pontos: user.pontos,
      nivel: user.nivel,
      rank: getRankPorNivel(user.nivel)
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pontos', details: err.message });
  }
};

/**
 * POST /pontos/add
 * 
 * Soma pontos ao usuário conforme a ação realizada
 */
export const addPontosByUser = async (req, res) => {
  try {
    const id_usuario = req.authUser.id;
    const { acao, quantidade } = req.body ?? {};

    if (!acao) {
      return res.status(400).json({ message: 'Ação é obrigatória.' });
    }

    if (!TABELA_PONTOS[acao]) {
      return res.status(400).json({
        message: 'Ação inválida. As ações permitidas são: cards, questoes, jogos.'
      });
    }

    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({ message: 'Quantidade inválida.' });
    }

    const pontosGanhos = TABELA_PONTOS[acao] * quantidade;

    const historico = await HistoricoPontos.create({
      id_usuario,
      acao,
      pontos_ganhos: pontosGanhos
    });

    const user = await User.findByPk(id_usuario);
    user.pontos += pontosGanhos;

    const nivelCalculado = Math.floor(user.pontos / 1000);
    let subiuDeNivel = false;
    let novaRecompensa = null;

    if (nivelCalculado > user.nivel) {
      user.nivel = nivelCalculado;
      subiuDeNivel = true;
      novaRecompensa = getRecompensaPorNivel(user.nivel);
    }

    await user.save();

    res.status(200).json({
      message: 'Pontos adicionados com sucesso.',
      pontos_ganhos: pontosGanhos,
      pontos_totais: user.pontos,
      subiu_de_nivel: subiuDeNivel,
      nivel_atual: user.nivel,
      nova_recompensa: novaRecompensa,
      rank_atual: getRankPorNivel(user.nivel),
      historico_id: historico.id
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar pontos', details: err.message });
  }
};

/**
 * GET /pontos/nivel
 * 
 * Retorna o nível atual com base nos pontos e a recompensa do nível
 */
export const getNivelByPontos = async (req, res) => {
  try {
    const id_usuario = req.authUser.id;
    const user = await User.findByPk(id_usuario);

    const pontosRestantesProximoNivel = 1000 - (user.pontos % 1000);

    res.json({
      nivel_atual: user.nivel,
      pontos_totais: user.pontos,
      pontos_para_proximo_nivel: pontosRestantesProximoNivel,
      rank: getRankPorNivel(user.nivel),
      recompensa_atual: getRecompensaPorNivel(user.nivel),
      proxima_recompensa: getRecompensaPorNivel(user.nivel + 1)
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar nível', details: err.message });
  }
};

/**
 * GET /pontos/historico
 * 
 * Busca o histórico de pontos ganhos pelo usuário
 */
export const getHistoricoPontos = async (req, res) => {
  try {
    const id_usuario = req.authUser.id;

    const historico = await HistoricoPontos.findAll({
      where: { id_usuario },
      order: [['criado_em', 'DESC']]
    });

    res.json(historico);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico de pontos', details: err.message });
  }
};
