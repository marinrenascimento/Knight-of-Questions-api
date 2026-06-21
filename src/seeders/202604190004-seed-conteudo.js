export async function up({ queryInterface, Sequelize }) {
  await queryInterface.bulkInsert('Conteudos', [
    // 1. Matemática
    { id: 1, nome: 'Trigonometria Básica', disciplina_id: 1 },
    { id: 2, nome: 'Álgebra Linear', disciplina_id: 1 },
    { id: 3, nome: 'Geometria Analítica', disciplina_id: 1 },
    { id: 4, nome: 'Funções de 1º e 2º Grau', disciplina_id: 1 },

    // 2. História
    { id: 5, nome: 'Segunda Guerra Mundial', disciplina_id: 2 },
    { id: 6, nome: 'Revolução Francesa', disciplina_id: 2 },
    { id: 7, nome: 'Brasil Colônia', disciplina_id: 2 },
    { id: 8, nome: 'Antiguidade Clássica (Grécia e Roma)', disciplina_id: 2 },

    // 3. Biologia
    { id: 9, nome: 'Citologia', disciplina_id: 3 },
    { id: 10, nome: 'Genética Mendeliana', disciplina_id: 3 },
    { id: 11, nome: 'Ecologia e Ecossistemas', disciplina_id: 3 },
    { id: 12, nome: 'Evolução e Seleção Natural', disciplina_id: 3 },

    // 4. Física
    { id: 13, nome: 'Leis de Newton', disciplina_id: 4 },
    { id: 14, nome: 'Termodinâmica', disciplina_id: 4 },
    { id: 15, nome: 'Óptica Geométrica', disciplina_id: 4 },
    { id: 16, nome: 'Eletromagnetismo', disciplina_id: 4 },

    // 5. Química
    { id: 17, nome: 'Estequiometria', disciplina_id: 5 },
    { id: 18, nome: 'Tabela Periódica e Ligações Químicas', disciplina_id: 5 },
    { id: 19, nome: 'Química Orgânica (Cadeias Carbônicas)', disciplina_id: 5 },
    { id: 20, nome: 'Termoquímica', disciplina_id: 5 },

    // 6. Língua Portuguesa
    { id: 21, nome: 'Sintaxe do Período Simples e Composto', disciplina_id: 6 },
    { id: 22, nome: 'Concordância Nominal e Verbal', disciplina_id: 6 },
    { id: 23, nome: 'Morfologia (Classes de Palavras)', disciplina_id: 6 },

    // 7. Literatura
    { id: 24, nome: 'Romantismo no Brasil', disciplina_id: 7 },
    { id: 25, nome: 'Modernismo e a Semana de Arte Moderna', disciplina_id: 7 },
    { id: 26, nome: 'Barroco e Arcadismo', disciplina_id: 7 },

    // 8. Geografia
    { id: 27, nome: 'Geopolítica Mundial Contemporânea', disciplina_id: 8 },
    { id: 28, nome: 'Cartografia e Fusos Horários', disciplina_id: 8 },
    { id: 29, nome: 'Climatólogo e Biomas Brasileiros', disciplina_id: 8 },

    // 9. Filosofia
    { id: 30, nome: 'Filosofia Antiga (Sócrates, Platão e Aristóteles)', disciplina_id: 9 },
    { id: 31, nome: 'Contratualismo (Hobbes, Locke e Rousseau)', disciplina_id: 9 },

    // 10. Sociologia
    { id: 32, nome: 'Clássicos da Sociologia (Marx, Durkheim e Weber)', disciplina_id: 10 },
    { id: 33, nome: 'Cultura, Identidade e Diversidade', disciplina_id: 10 },

    // 11. Língua Inglesa
    { id: 34, nome: 'Verb Tenses (Present, Past and Future Perfect)', disciplina_id: 11 },
    { id: 35, nome: 'Reading Comprehension and Vocabulary', disciplina_id: 11 },

    // 12. Língua Espanhola
    { id: 36, nome: 'Heterosemánticos (Falsos Amigos)', disciplina_id: 12 },
    { id: 37, nome: 'Uso de Muy y Mucho', disciplina_id: 12 },

    // 13. Artes
    { id: 38, nome: 'História da Arte: Do Renascimento à Arte Pop', disciplina_id: 13 },
    { id: 39, nome: 'Vanguardas Europeias', disciplina_id: 13 },

    // 14. Educação Física
    { id: 40, nome: 'Fisiologia do Exercício e Saúde', disciplina_id: 14 },
    { id: 41, nome: 'História e Regras dos Esportes Coletivos', disciplina_id: 14 },

    // 15. Redação
    { id: 42, nome: 'Estrutura do Texto Dissertativo-Argumentativo', disciplina_id: 15 },
    { id: 43, nome: 'Coesão e Coerência Textual', disciplina_id: 15 },

    // 16. Programação e Algoritmos
    { id: 44, nome: 'Estruturas de Dados (Listas, Filas e Árvores)', disciplina_id: 16 },
    { id: 45, nome: 'Programação Orientada a Objetos', disciplina_id: 16 },

    // 17. Cálculo Diferencial e Integral
    { id: 46, nome: 'Limites e Continuidade', disciplina_id: 17 },
    { id: 47, nome: 'Derivadas e Regra da Cadeia', disciplina_id: 17 },
    { id: 48, nome: 'Integrais Definidas e Indefinidas', disciplina_id: 17 },

    // 18. Estatística
    { id: 49, nome: 'Probabilidade e Análise Combinatória', disciplina_id: 18 },
    { id: 50, nome: 'Medidas de Tendência Central (Média, Mediana, Moda)', disciplina_id: 18 },

    // 19. Metodologia Científica
    { id: 51, nome: 'Normas ABNT e Estrutura de Projetos', disciplina_id: 19 },

    // 20. Administração e Empreendedorismo
    { id: 52, nome: 'Planejamento Estratégico e Matriz SWOT', disciplina_id: 20 }
  ], { ignoreDuplicates: true });

  await queryInterface.sequelize.query(`SELECT setval('"Conteudos_id_seq"', (SELECT MAX(id) FROM "Conteudos"));`);
}

export async function down({ queryInterface, Sequelize }) {
  await queryInterface.bulkDelete('Conteudos', null, {});
}