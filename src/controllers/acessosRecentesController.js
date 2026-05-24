// Dados temporários para teste

let acessosRecentes = [
  {
    id: 1,
    user_id: 1,
    nome: "Deck de HTTP",
    tipo: "deck",
    data_acesso: "2026-05-23"
  },
  {
    id: 2,
    user_id: 1,
    nome: "Prova de Redes",
    tipo: "prova",
    data_acesso: "2026-05-24"
  }
];

export class AcessosRecentesController {

  // Lista os últimos decks e avaliações acessados pelo usuário
  static getAllAcessosRecentesByUser(req, res) {

    const { userId } = req.params;

    const acessos = acessosRecentes
      .filter(acesso => acesso.user_id == userId)
      .sort((a, b) => new Date(b.data_acesso) - new Date(a.data_acesso));

    return res.status(200).json(acessos);

  }

  // Registra um acesso recente ao abrir um deck ou prova
  static createAcessoRecente(req, res) {

    const { userId } = req.params;
    const { nome, tipo } = req.body;

    if (!nome || !tipo) {
      return res.status(400).json({
        message: "Nome e tipo são obrigatórios"
      });
    }

    if (tipo !== "deck" && tipo !== "prova") {
      return res.status(400).json({
        message: "Tipo inválido. Use 'deck' ou 'prova'."
      });
    }

    const novoAcesso = {
      id: acessosRecentes.length + 1,
      user_id: Number(userId),
      nome,
      tipo,
      data_acesso: new Date().toISOString().slice(0, 10)
    };

    acessosRecentes.push(novoAcesso);

    return res.status(201).json({
      message: "Acesso recente registrado com sucesso",
      acesso: novoAcesso
    });

  }

}