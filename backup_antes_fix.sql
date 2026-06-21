--
-- PostgreSQL database dump
--

\restrict VjIoOqbumwJVhC76vh7eH5kH9ga9NvTCaIbuHxPuiuRmwdKhtoNFIAznZIZtQwV

-- Dumped from database version 18.3 (Ubuntu 18.3-1)
-- Dumped by pg_dump version 18.3 (Ubuntu 18.3-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Alternativas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Alternativas" (
    id integer NOT NULL,
    texto character varying(200),
    is_correta boolean,
    id_pergunta integer NOT NULL,
    descricao character varying(255)
);


ALTER TABLE public."Alternativas" OWNER TO postgres;

--
-- Name: Alternativas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Alternativas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Alternativas_id_seq" OWNER TO postgres;

--
-- Name: Alternativas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Alternativas_id_seq" OWNED BY public."Alternativas".id;


--
-- Name: Perguntas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Perguntas" (
    id integer NOT NULL,
    enunciado character varying(255) NOT NULL,
    nivel_dificuldade integer,
    disciplina_id integer NOT NULL,
    id_avaliacao integer NOT NULL,
    conteudo_id integer
);


ALTER TABLE public."Perguntas" OWNER TO postgres;

--
-- Name: Perguntas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Perguntas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Perguntas_id_seq" OWNER TO postgres;

--
-- Name: Perguntas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Perguntas_id_seq" OWNED BY public."Perguntas".id;


--
-- Name: Alternativas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Alternativas" ALTER COLUMN id SET DEFAULT nextval('public."Alternativas_id_seq"'::regclass);


--
-- Name: Perguntas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Perguntas" ALTER COLUMN id SET DEFAULT nextval('public."Perguntas_id_seq"'::regclass);


--
-- Data for Name: Alternativas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Alternativas" (id, texto, is_correta, id_pergunta, descricao) FROM stdin;
1	25	t	1	Cinco vezes cinco é vinte e cinco.
2	20	f	1	Valor incorreto.
3	30	f	1	Valor incorreto.
4	15	f	1	Valor incorreto.
5	25	t	2	Soma correta.
6	35	f	2	Soma errada.
7	20	f	2	Soma errada.
8	Pedro Álvares Cabral	t	3	Líder da expedição de 1500.
9	Dom Pedro I	f	3	Proclamou a independência.
10	Cristóvão Colombo	f	3	Chegou às Américas, mas não ao Brasil.
15	Monet	f	818	\N
16	Van Gogh	t	818	\N
17	Da Vinci	f	818	\N
18	Da Vinci	f	819	\N
19	Monet	f	819	\N
20	Van Gogh	t	819	\N
\.


--
-- Data for Name: Perguntas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Perguntas" (id, enunciado, nivel_dificuldade, disciplina_id, id_avaliacao, conteudo_id) FROM stdin;
1	Quanto é 5x5?	1	1	1	1
2	Qual o resultado de 10 + 15?	1	1	1	1
3	Quem descobriu o Brasil?	1	2	1	3
811	Questão Teste Unit 1781980259505	1	1	1	\N
818	Quem pintou Noite Estrelada?	1	2	13	8
819	Quem pintou Noite Estrelada?	1	2	14	8
\.


--
-- Name: Alternativas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Alternativas_id_seq"', 20, true);


--
-- Name: Perguntas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Perguntas_id_seq"', 819, true);


--
-- Name: Alternativas Alternativas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Alternativas"
    ADD CONSTRAINT "Alternativas_pkey" PRIMARY KEY (id);


--
-- Name: Perguntas Perguntas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Perguntas"
    ADD CONSTRAINT "Perguntas_pkey" PRIMARY KEY (id);


--
-- Name: Alternativas Alternativas_id_pergunta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Alternativas"
    ADD CONSTRAINT "Alternativas_id_pergunta_fkey" FOREIGN KEY (id_pergunta) REFERENCES public."Perguntas"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Perguntas Perguntas_conteudo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Perguntas"
    ADD CONSTRAINT "Perguntas_conteudo_id_fkey" FOREIGN KEY (conteudo_id) REFERENCES public."Conteudos"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Perguntas Perguntas_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Perguntas"
    ADD CONSTRAINT "Perguntas_disciplina_id_fkey" FOREIGN KEY (disciplina_id) REFERENCES public."Disciplinas"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Perguntas Perguntas_id_avaliacao_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Perguntas"
    ADD CONSTRAINT "Perguntas_id_avaliacao_fkey" FOREIGN KEY (id_avaliacao) REFERENCES public."Avaliacoes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict VjIoOqbumwJVhC76vh7eH5kH9ga9NvTCaIbuHxPuiuRmwdKhtoNFIAznZIZtQwV

