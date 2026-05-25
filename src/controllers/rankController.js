import { User } from '../models/index.js';
import { sanitizeUser } from '../utils/userUtils.js';

/**
 * GET /rankings
 * 
 * Busca todos os usuários ordenados por pontos e marca a posição do usuário autenticado
 */
export const getRankings = async (req, res) => {
  try {
    const users = await User.findAll({ order: [['pontos', 'DESC']] });

    const rankings = [];
    let currentUserPosition = null;

    for (let i = 0; i < users.length; i++) {
      const sanitizedUser = sanitizeUser(users[i]);
      const position = i + 1;

      const rankingEntry = {
        ...sanitizedUser,
        position,
        isCurrentUser: false
      };

      if (req.authUser && req.authUser.id === sanitizedUser.id) {
        rankingEntry.isCurrentUser = true;
        currentUserPosition = position;
      }

      rankings.push(rankingEntry);
    }

    res.json({
      rankings,
      currentUserPosition
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar o ranking', details: err.message });
  }
};
