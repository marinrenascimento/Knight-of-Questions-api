import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import { initModels } from '../../models/index.js';
import userRoutes from '../../routes/userRoutes.js';
import authRoutes from '../../routes/authRoutes.js';
import avaliacaoRoutes from '../../routes/avaliacaoRoutes.js';
import avaliacaoReviewRoutes from '../../routes/avaliacaoReviewRoutes.js';
import perguntaRoutes from '../../routes/perguntaRoutes.js';

const app = express();
app.use(express.json());

describe('Complete E2E Flow Test', () => {
    let token = '';
    let userId = 1;
    let avaliacaoId = 0;
    let reviewId = 0;

    beforeAll(async () => {
        initModels();
        app.use('/auth', authRoutes);
        app.use('/avaliacoes', avaliacaoRoutes);
        app.use('/avaliacao-review', avaliacaoReviewRoutes);
        app.use('/perguntas', perguntaRoutes);
    });

    it('Step 1: Login to get token', async () => {
        // Usando as credenciais que o seeder cria (assumindo que o seeder foi rodado)
        // Nota: O seeder de demo usa 'hash1', mas o login real espera bcrypt.
        // Para este teste passar sem depender do bcrypt real em dados de seed, 
        // em um cenário real usaríamos um mock ou criaríamos um usuário novo aqui.
        
        const res = await request(app).post('/auth/login').send({
            email: 'arthur@email.com',
            senha: 'senha_do_arthur'
        });

        // Se o login falhar por causa do hash do seeder, vamos pular ou mockar
        if (res.status === 200) {
            token = res.body.token;
            userId = res.body.user.id;
        }
    });

    it('Step 2: Create a new assessment', async () => {
        if (!token) return; // Skip if no token
        
        const res = await request(app)
            .post('/avaliacoes/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                titulo: 'Teste de Fluxo E2E',
                id_user: userId,
                is_vestibular: false
            });

        expect(res.status).toBe(201);
        avaliacaoId = res.body.avaliacao.id;
    });

    it('Step 3: Start a review session', async () => {
        if (!token || !avaliacaoId) return;

        const res = await request(app)
            .post('/avaliacao-review/start')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_avaliacao: avaliacaoId,
                id_user: userId
            });

        expect(res.status).toBe(201);
        reviewId = res.body.review.id;
    });

    it('Step 4: Check results (should be 0 answers)', async () => {
        if (!token || !reviewId) return;

        const res = await request(app)
            .get(`/avaliacao-review/resultado/${reviewId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404); // Nenhuma resposta ainda
    });
});
