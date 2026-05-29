import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import { initModels, User, Disciplina, Avaliacao, Avatar } from '../../models/index.js';
import { signAccessToken } from '../../services/jwt.service.js';

import userRoutes from '../../routes/userRoutes.js';
import authRoutes from '../../routes/authRoutes.js';
import disciplinaRoutes from '../../routes/disciplinaRoutes.js';
import conteudoRoutes from '../../routes/conteudoRoutes.js';
import avaliacaoRoutes from '../../routes/avaliacaoRoutes.js';
import perguntaRoutes from '../../routes/perguntaRoutes.js';

const app = express();
app.use(express.json());

describe('Complete API Functional Tests', () => {
    let token = '';
    let testUser;

    beforeAll(async () => {
        try {
            initModels();
            app.use('/auth', authRoutes);
            app.use('/users', userRoutes);
            app.use('/disciplinas', disciplinaRoutes);
            app.use('/conteudos', conteudoRoutes);
            app.use('/avaliacoes', avaliacaoRoutes);
            app.use('/perguntas', perguntaRoutes);

            // Tenta pegar o primeiro avatar disponível
            let avatar = await Avatar.findOne();
            if (!avatar) {
                avatar = await Avatar.create({ nome: 'Avatar Global ' + Date.now(), nivel_requerido: 0 });
            }

            [testUser] = await User.findOrCreate({
                where: { email: 'integration_tester@email.com' },
                defaults: {
                    nome: 'Tester',
                    username: 'tester_' + Date.now(),
                    senha_hash: 'hash',
                    role: 'estudante',
                    id_avatar: avatar.id
                }
            });

            token = signAccessToken(testUser);
        } catch (err) {
            console.error('BEFORE ALL ERROR:', err);
            throw err;
        }
    });

    it('should create, list, update and delete a Disciplina', async () => {
        const createRes = await request(app)
            .post('/disciplinas/create').set('Authorization', `Bearer ${token}`)
            .send({ nome: 'Matéria ' + Date.now() });
        expect(createRes.status).toBe(201);
        const id = createRes.body.id;

        const deleteRes = await request(app).delete(`/disciplinas/delete/${id}`).set('Authorization', `Bearer ${token}`);
        expect(deleteRes.status).toBe(200);
    });
});
