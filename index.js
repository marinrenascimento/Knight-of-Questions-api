import express from 'express';
import 'dotenv/config';
import { sequelize } from './src/config/sequelize.js';

import userRoutes from './src/routes/userRoutes.js';
import sessaoRoutes from './src/routes/sessaoRoutes.js';
import avatarRoutes from './src/routes/avatarRoutes.js';
import { initModels } from './src/models/index.js';
import { bootstrapDb } from './src/db/bootstrap.js';
import authRoutes from './src/routes/authRoutes.js';
import conteudoRoutes from './src/routes/conteudoRoutes.js';
import avaliacaoRoutes from './src/routes/avaliacaoRoutes.js';
import avaliacaoReviewRoutes from './src/routes/avaliacaoReviewRoutes.js';
import perguntaRoutes from './src/routes/perguntaRoutes.js';
import disciplinaRoutes from './src/routes/disciplinaRoutes.js'
import flashcardRoutes from './src/routes/flashcardRoutes.js'
import ofensivaRoutes from './src/routes/ofensivaRoutes.js';
import acessosRecentesRoutes from './src/routes/acessosRecentesRoutes.js';
import rankRoutes from './src/routes/rankRoutes.js';
import deckReviewRoutes from './src/routes/deckReviewRoutes.js';
import pontosRoutes from './src/routes/pontosRoutes.js';
import deckRoutes from './src/routes/deckRoutes.js'
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerFile = require('./swagger_output.json');

initModels();
await bootstrapDb();
const app = express();
const port = Number.parseInt(process.env.PORT ?? '3000', 10);

app.use(express.json());

app.use('/users', userRoutes);
app.use('/sessao', sessaoRoutes);
app.use('/avatares', avatarRoutes);
app.use('/auth', authRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/conteudos', conteudoRoutes);
app.use('/flashcards', flashcardRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/avaliacao-review', avaliacaoReviewRoutes);
app.use('/perguntas', perguntaRoutes);
app.use('/ofensiva', ofensivaRoutes);
app.use('/acessos', acessosRecentesRoutes);
app.use('/rankings', rankRoutes);
app.use('/deck-reviews', deckReviewRoutes);
app.use('/pontos', pontosRoutes);
app.use('/deck', deckRoutes)

/**
 * Documentação do Swagger
 * 
 * GET http://localhost:3000/docs
 */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
