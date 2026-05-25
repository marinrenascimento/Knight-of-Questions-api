import express from 'express';
import 'dotenv/config';
import userRoutes from './src/routes/userRoutes.js';
import sessaoRoutes from './src/routes/sessaoRoutes.js';
import avatarRoutes from './src/routes/avatarRoutes.js';
import { initModels } from './src/models/index.js';
import { bootstrapDb } from './src/db/bootstrap.js';
import authRoutes from './src/routes/authRoutes.js';
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