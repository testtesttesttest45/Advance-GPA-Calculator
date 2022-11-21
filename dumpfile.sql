--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-21 16:22:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "GpaCalculatorDB";
--
-- TOC entry 3385 (class 1262 OID 16600)
-- Name: GpaCalculatorDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "GpaCalculatorDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Singapore.1252';


ALTER DATABASE "GpaCalculatorDB" OWNER TO postgres;

\connect "GpaCalculatorDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 214 (class 1259 OID 16601)
-- Name: grades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grades (
    grade_id integer NOT NULL,
    module character varying(255) NOT NULL,
    grade character varying NOT NULL
);


ALTER TABLE public.grades OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16606)
-- Name: grades_grade_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grades_grade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grades_grade_id_seq OWNER TO postgres;

--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 215
-- Name: grades_grade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grades_grade_id_seq OWNED BY public.grades.grade_id;


--
-- TOC entry 216 (class 1259 OID 16607)
-- Name: modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules (
    module_id integer NOT NULL,
    module character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    credits integer NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.modules OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16612)
-- Name: modules_module_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modules_module_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modules_module_id_seq OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 217
-- Name: modules_module_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modules_module_id_seq OWNED BY public.modules.module_id;


--
-- TOC entry 218 (class 1259 OID 16613)
-- Name: planner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planner (
    planner_id integer NOT NULL,
    fk_userid integer NOT NULL,
    current_gpa numeric(3,2) NOT NULL,
    target_gpa numeric(3,2) NOT NULL,
    current_credits integer NOT NULL,
    future_credits integer NOT NULL,
    created_on character varying NOT NULL,
    is_fulfilled boolean DEFAULT false
);


ALTER TABLE public.planner OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16619)
-- Name: planner2; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planner2 (
    planner_id integer NOT NULL,
    current_gpa character varying,
    target_gpa character varying,
    current_credits character varying,
    future_credits character varying,
    is_fulfilled boolean DEFAULT false,
    fk_userid integer,
    created_on character varying
);


ALTER TABLE public.planner2 OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16625)
-- Name: planner2_planner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planner2_planner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planner2_planner_id_seq OWNER TO postgres;

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 220
-- Name: planner2_planner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planner2_planner_id_seq OWNED BY public.planner2.planner_id;


--
-- TOC entry 221 (class 1259 OID 16626)
-- Name: planner_planner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planner_planner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planner_planner_id_seq OWNER TO postgres;

--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 221
-- Name: planner_planner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planner_planner_id_seq OWNED BY public.planner.planner_id;


--
-- TOC entry 222 (class 1259 OID 16627)
-- Name: results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.results (
    result_id integer NOT NULL,
    fk_userid integer,
    gpa character varying NOT NULL,
    key character varying NOT NULL,
    created_on character varying,
    data character varying NOT NULL,
    expire_on character varying
);


ALTER TABLE public.results OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16632)
-- Name: results_result_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.results_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.results_result_id_seq OWNER TO postgres;

--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 223
-- Name: results_result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.results_result_id_seq OWNED BY public.results.result_id;


--
-- TOC entry 224 (class 1259 OID 16633)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    private boolean DEFAULT false,
    plans_fulfilled integer DEFAULT 0
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16640)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3198 (class 2604 OID 16641)
-- Name: grades grade_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades ALTER COLUMN grade_id SET DEFAULT nextval('public.grades_grade_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 16642)
-- Name: modules module_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules ALTER COLUMN module_id SET DEFAULT nextval('public.modules_module_id_seq'::regclass);


--
-- TOC entry 3200 (class 2604 OID 16643)
-- Name: planner planner_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner ALTER COLUMN planner_id SET DEFAULT nextval('public.planner_planner_id_seq'::regclass);


--
-- TOC entry 3202 (class 2604 OID 16644)
-- Name: planner2 planner_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner2 ALTER COLUMN planner_id SET DEFAULT nextval('public.planner2_planner_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 16645)
-- Name: results result_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.results ALTER COLUMN result_id SET DEFAULT nextval('public.results_result_id_seq'::regclass);


--
-- TOC entry 3205 (class 2604 OID 16646)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3368 (class 0 OID 16601)
-- Dependencies: 214
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grades (grade_id, module, grade) VALUES (2, 'FOC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (3, 'FOP', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (4, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (5, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (6, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (7, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (8, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (9, 'AC', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (10, 'SIP', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (11, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (12, 'AC', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (13, 'SIP', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (14, 'ADES', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (15, 'ECG', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (16, 'FOC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (17, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (18, 'B1', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (19, 'DENG', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (20, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (21, 'B1', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (22, 'DENG', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (23, 'ISDT', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (24, 'B1', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (25, 'DENG', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (26, 'ISDT', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (27, 'HKKB H', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (28, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (29, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (30, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (31, 'DENG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (32, 'LJ', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (33, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (34, 'HKKB H', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (35, 'DENG', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (36, 'SIP', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (37, 'AC', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (38, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (39, 'FOC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (40, 'FOP', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (41, 'FOP', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (42, 'DENG', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (43, 'ISDT', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (44, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (45, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (46, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (47, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (48, 'SIP', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (49, 'ISDT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (50, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (51, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (52, 'FOP', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (53, 'DENG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (54, 'DEUI', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (55, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (56, 'DEUI', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (57, 'AC', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (58, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (59, 'DEUI', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (60, 'AC', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (61, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (62, 'FOC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (63, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (64, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (65, 'B1', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (66, 'HKKB H', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (67, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (68, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (69, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (70, 'FOC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (71, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (72, 'DEUI', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (73, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (74, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (75, 'LJ', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (76, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (77, 'JAD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (78, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (79, 'JAD', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (80, 'JAD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (81, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (82, 'FOC', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (83, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (84, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (85, 'JAD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (86, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (87, 'B1', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (88, 'SEP', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (89, 'SEP', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (90, 'SEP', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (91, 'SEP', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (92, 'SEP', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (93, 'DEUI', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (94, 'DEUI', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (95, 'DEUI', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (96, 'BED', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (97, 'BED', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (98, 'NAT', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (99, 'FED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (100, 'BED', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (101, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (102, 'ADES', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (103, 'ADES', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (104, 'DEUI', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (105, 'ADES', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (106, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (107, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (108, 'MAD', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (109, 'DEUI', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (110, 'HKKB H', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (111, 'NAT', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (112, 'NAT', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (113, 'MAD', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (114, 'FED', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (115, 'NAT', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (116, 'FED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (117, 'JAD', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (118, 'BED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (119, 'FED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (120, 'FOC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (121, 'FOP', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (122, 'FED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (123, 'FED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (124, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (125, 'CAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (126, 'DEUI', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (127, 'DSAL', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (128, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (129, 'ESDE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (130, 'DENG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (131, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (132, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (133, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (134, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (135, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (136, 'FED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (137, 'FED', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (138, 'JAD', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (139, 'DSAL', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (140, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (141, 'SIP', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (142, 'CAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (143, 'DENG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (144, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (145, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (146, 'FED', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (147, 'FOC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (148, 'ESDE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (149, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (150, 'AC', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (151, 'BED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (152, 'FED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (153, 'FOC', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (154, 'NAT', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (155, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (156, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (157, 'EL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (158, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (159, 'INIS', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (160, 'ISDT', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (161, 'JAD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (162, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (163, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (164, 'ESDE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (165, 'NAT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (166, 'NAT', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (167, 'NAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (168, 'NAT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (169, 'NAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (170, 'HKKB H', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (171, 'HKKB H', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (172, 'LJ', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (173, 'NAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (174, 'LJ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (175, 'LoL', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (176, 'FED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (177, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (178, 'LoL', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (179, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (180, 'LoL', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (181, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (182, 'MAD', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (183, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (184, 'MAD', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (185, 'ECG2', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (186, 'ESDE', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (187, 'ECG2', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (188, 'ESDE', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (189, 'LoL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (190, 'LoL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (191, 'HKKB H', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (192, 'HKKB H', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (193, 'FED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (194, 'ESM', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (195, 'EL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (196, 'AC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (197, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (198, 'INIS', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (199, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (200, 'INIS', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (201, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (202, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (203, 'JAD', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (204, 'FED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (205, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (206, 'HKKB H', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (207, 'HKKB H', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (208, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (209, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (210, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (211, 'FED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (212, 'BED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (213, 'LJ', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (214, 'DENG', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (215, 'LoL', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (216, 'LoL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (217, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (218, 'LJ', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (219, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (220, 'DSAL', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (221, 'JAD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (222, 'LoL', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (223, 'DEUI', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (224, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (225, 'DEUI', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (226, 'DEUI', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (227, 'DENG', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (228, 'DSAL', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (229, 'HKKB H', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (230, 'HKKB H', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (231, 'DEUI', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (232, 'JAD', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (233, 'ECG2', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (234, 'BED', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (235, 'ADES', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (236, 'MAD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (237, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (238, 'EL', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (239, 'Math', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (240, 'DEUI', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (241, 'JAD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (242, 'SISO', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (243, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (244, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (245, 'BED', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (246, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (247, 'CAT', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (248, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (249, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (250, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (251, 'CAT', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (252, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (253, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (254, 'Math', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (255, 'EL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (256, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (257, 'AC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (258, 'BED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (259, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (260, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (261, 'AC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (262, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (263, 'AC', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (264, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (265, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (266, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (267, 'LJ', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (268, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (269, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (270, 'BED', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (271, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (272, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (273, 'DEUI', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (274, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (275, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (276, 'BED', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (277, 'AC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (278, 'NAT', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (279, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (280, 'BED', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (281, 'AC', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (282, 'AC', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (283, 'AC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (284, 'CPE', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (285, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (286, 'CPF', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (287, 'B1', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (288, 'CAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (289, 'FED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (290, 'FOC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (291, 'BED', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (292, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (293, 'AC', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (294, 'JAD', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (295, 'AC', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (296, 'INIS', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (297, 'HKKB H', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (298, 'HKKB H', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (299, 'JAD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (300, 'LoL', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (301, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (302, 'CAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (303, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (304, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (305, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (306, 'BED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (307, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (308, 'BED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (309, 'MAD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (310, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (311, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (312, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (313, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (314, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (315, 'CAT', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (316, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (317, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (318, 'BED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (319, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (320, 'BED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (321, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (322, 'BED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (323, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (324, 'BED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (325, 'FOP', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (326, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (327, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (328, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (329, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (330, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (331, 'HKKB H', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (332, 'ESDE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (333, 'JAD', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (334, 'JAD', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (335, 'JAD', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (336, 'ADES', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (337, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (338, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (339, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (340, 'CAT', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (341, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (342, 'CAT', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (343, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (344, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (345, 'LoL', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (346, 'BED', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (347, 'LoL', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (348, 'AC', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (349, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (350, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (351, 'JAD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (352, 'DENG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (353, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (354, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (355, 'BED', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (356, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (357, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (358, 'B1', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (359, 'ESM', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (360, 'JAD', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (361, 'JAD', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (362, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (363, 'AC', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (364, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (365, 'AC', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (366, 'AC', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (367, 'HKKB H', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (368, 'DSAL', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (369, 'DSAL', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (370, 'DEUI', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (371, 'B1', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (372, 'FOC', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (373, 'BED', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (374, 'BED', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (375, 'DEUI', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (376, 'DEUI', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (377, 'NAT', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (378, 'CAT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (379, 'CAT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (380, 'CPF', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (381, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (382, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (383, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (384, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (385, 'CPE', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (386, 'CPE', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (387, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (388, 'CPF', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (389, 'CPF', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (390, 'CAT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (391, 'CPF', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (392, 'CPF', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (393, 'SEP', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (394, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (395, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (396, 'CAT', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (397, 'CAT', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (398, 'CAT', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (399, 'CAT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (400, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (401, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (402, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (403, 'AC', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (404, 'AC', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (405, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (406, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (407, 'food', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (408, 'food', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (409, 'LJ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (410, 'LJ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (411, 'HKKB H', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (412, 'CAT', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (413, 'food', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (414, 'food', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (415, 'food', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (416, 'SISO', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (417, 'ECG2', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (418, 'food', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (419, 'DENG', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (420, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (421, 'aaa', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (422, 'HKKB H', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (423, 'aadd', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (424, 'aadd', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (425, 'ECG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (426, 'aaabc', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (427, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (428, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (429, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (430, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (431, 'CAT', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (432, 'ades', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (433, 'FOP', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (434, 'FED', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (435, 'MAD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (436, 'JAD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (437, 'HKKB H', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (438, 'CPF', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (439, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (440, 'DSAL', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (441, 'ESDE', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (442, 'AC', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (443, 'DSAL', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (444, 'FOC', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (445, 'FOP', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (446, 'ADES', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (447, 'ECG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (448, 'JAD', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (449, 'B1', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (450, 'ECG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (451, 'ECG2', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (452, 'ECG2', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (453, 'ESDE', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (454, 'AD2', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (455, 'aaa X7', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (456, 'aaa X1 ', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (457, 'aaa X1 ', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (458, 'AA', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (459, 'aaa X7', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (460, 'aaa X1 ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (461, 'AA', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (462, 'CPE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (463, 'CPF', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (464, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (465, 'HKKB H', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (466, 'aaa X2 ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (467, 'ADOG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (468, 'ESDE', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (469, 'ECG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (470, 'ECG', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (471, 'ECG2', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (472, 'ECG2', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (473, 'ECG2', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (474, 'ECG2', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (475, 'ECG2', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (476, 'ECG', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (477, 'ECG2', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (478, 'food', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (479, 'ECG2', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (480, 'aaa X2 ', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (481, 'ESDE', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (482, 'ESM', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (483, 'HKKB H', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (484, 'B1', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (485, 'HKKB H', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (486, 'B1', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (487, 'aaa X2 ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (488, 'aaa X3 ', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (489, 'AA', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (490, 'aaa X2 ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (491, 'aaa X3 ', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (492, 'AA', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (493, 'aaa X7', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (494, 'aaa X7', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (495, 'aaa X7', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (496, '45', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (497, 'ESDE', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (498, 'LJ', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (499, 'food', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (500, 'aaa X4 ', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (501, 'JAD', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (502, 'JAD', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (503, 'aaadss', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (504, 'aaadss', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (505, 'ADOG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (506, 'ISDT', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (507, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (508, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (509, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (510, 'AS', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (511, 'aaa X2 ', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (512, 'ADOG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (513, 'food', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (514, 'food', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (515, 'food', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (516, 'DENG', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (517, 'food', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (518, 'aaa X2 ', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (519, 'aaa X2 ', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (520, 'aaa X5', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (521, 'aaa X1 ', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (522, 'aaa X7', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (523, 'aaadss', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (524, 'AA', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (525, 'food', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (526, '243', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (527, 'LJ', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (528, 'aaa X ', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (529, 'CPF', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (530, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (531, 'AA', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (532, 'ECG2', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (533, 'B1', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (534, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (535, 'AD2', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (536, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (537, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (538, 'B1', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (539, 'AA', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (540, 'aaa X ', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (541, 'aa', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (542, 'FOC', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (543, 'B1', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (544, 'FOC', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (545, 'B1', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (546, 'DSAL', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (547, 'Z2', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (548, 'ADES', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (549, 'B1', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (550, 'AD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (551, 'DEUI', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (552, 'Z3', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (553, 'DEUI', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (554, 'Z3', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (555, 'ADES', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (556, 'ADES', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (557, 'aaadss', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (558, 'aaadss', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (559, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (560, 'BED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (561, 'BED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (562, 'SIP', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (563, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (564, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (565, 'aaadss', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (566, 'AD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (567, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (568, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (569, 'aaadss', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (570, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (571, 'aaa X ', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (572, 'aaadss', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (573, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (574, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (575, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (576, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (577, 'DENG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (578, 'MAD', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (579, 'ADOG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (580, 'ADOG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (581, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (582, 'TestModule200', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (583, 'DENG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (584, 'CPE', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (585, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (586, 'ADOG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (587, 'ASS', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (588, 'AS', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (589, 'ASS', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (590, 'ASS', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (591, 'FOC', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (592, 'ESDE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (593, 'aah', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (594, 'ADOG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (595, 'ASS', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (596, 'ESDE', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (597, 'AD2', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (598, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (599, 'AD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (600, 'CPE', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (601, 'ADOG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (602, 'D', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (603, 'ADOG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (604, 'CK', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (605, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (606, 'Y Project', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (607, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (608, 'CAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (609, 'ECG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (610, 'DSAL', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (611, 'ADOG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (612, 'AS', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (613, 'aaax 2', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (614, 'CK', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (615, 'ADOG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (616, 'DSAL', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (617, 'HKKB H', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (618, 'INIS', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (619, 'MAD', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (620, 'ECG', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (621, 'BED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (622, 'ECG2', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (623, 'B2', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (624, 'aaaax 3', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (625, 'ECG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (626, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (627, 'aaax 1', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (628, 'AD2', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (629, 'aaax 2', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (630, 'CAT', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (631, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (632, 'INIS', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (633, 'SEP', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (634, 'SIP', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (635, 'AD2', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (636, 'DENG', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (637, 'ADES', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (638, 'CK', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (639, 'ADES', '0');
INSERT INTO public.grades (grade_id, module, grade) VALUES (640, 'aaaa5', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (641, 'aaaax 3', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (642, 'aaaax 3', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (643, 'aaaa5', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (644, 'aaax 1', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (645, 'ESDE', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (646, 'DEUI', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (647, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (648, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (649, 'SEP', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (650, 'DEUI', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (651, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (652, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (653, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (654, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (655, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (656, 'ESDE', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (657, 'AS', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (658, 'Z3', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (659, 'DEUI', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (660, 'DEUI', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (661, 'DENG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (662, 'SIP', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (663, 'ECG', '1.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (664, 'DEUI', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (665, 'AD', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (666, 'aaaax 3', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (667, 'BED', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (668, 'ISDT', '2');
INSERT INTO public.grades (grade_id, module, grade) VALUES (669, 'ADOG', '1');
INSERT INTO public.grades (grade_id, module, grade) VALUES (670, 'JAD', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (671, 'Y Project', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (672, 'Z3', '0.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (673, 'AD', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (674, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (706, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (707, 'ASS', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (708, 'ECG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (709, 'AS', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (710, 'DENG', '2.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (711, 'ADES', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (712, 'DENG', '3');
INSERT INTO public.grades (grade_id, module, grade) VALUES (713, 'ADES', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (714, 'aaax 2', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (715, 'ESM', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (716, 'ADOG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (717, 'BED', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (718, 'HKKB H', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (719, 'aaaax 3', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (720, 'Planet', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (721, 'DENG', '3.5');
INSERT INTO public.grades (grade_id, module, grade) VALUES (722, 'ECG', '4');
INSERT INTO public.grades (grade_id, module, grade) VALUES (723, 'ADES', '4');


--
-- TOC entry 3370 (class 0 OID 16607)
-- Dependencies: 216
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (207, 'aaax 1', 'axis 1', 3, 'lorem ipsums 1');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (208, 'aaax 2', 'axis 2', 4, 'lorem ipsums 2');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (165, 'AS', 'Alpha Shark', 9, 'hungry shark world');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (209, 'aaaax 3', 'axis 3', 7, 'lorem ipsums 3');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (210, 'CK', 'Cooking', 50, 'In this lesson, we hired a Masterchief to teach you how to cook like a pro!');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (212, 'DNT', 'Design and Technology', 8, 'Children develop a range of designing skills and technology skills for example, using media to design their project and a saw to cut items.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (164, 'ADOG', 'Alpha Dog', 5, 'Nasus who let the dogs out?!');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (168, 'Z', 'Project Z', 99, 'Working on a new Z');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (215, 'EL', 'English', 8, 'The language of England, widely used in many varieties throughout the world.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (18, 'B1', 'Beta2', 102, 'beta bird bird');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (216, 'Planet', 'Planet Moon', 6, 'In this module, we hired Mr Musk who teaches us the fundamentals to go Moon.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (213, 'itt', 'information', 7, 'gmor');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (1, 'ADES', 'Application Development Studio', 6, 'Full stack web development.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (4, 'FOC', 'Fundamentals of Computing', 6, 'Covers a foundational understanding of computer hardware, software, operating systems.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (172, 'Y Project', 'Axis Y ', 3, 'Project Y');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (173, 'Z3', 'Project Z v3', 99, 'Project Z versioN 3');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (104, 'M', 'Math', 14, 'Mathematics');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (91, 'AD', 'Alpha Donkey', 9, 'Donkey lala Land');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (110, 'AD2', 'Alpha Dragon', 8, 'Dragon city kingdoms');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (117, 'TOP', 'Technology', 3, 'technology stuff');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (178, 'ASS', 'Alpha Shark', 7, 'Megalodon');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (2, 'FOP', 'Fundamentals of Programming', 5, 'Most basics of Programs.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (3, 'DENG', 'Data Engineering', 5, 'Analyze data.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (11, 'ISDT', 'Immersive Simulation Development Techniques', 5, 'What the module?');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (12, 'ECG', 'Education and Career Guidance', 1, '1 hour a week lesson to learn how to move on after graduate.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (13, 'CAT', 'Critical & Analytical Thinking', 4, 'Work hard, play hard.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (15, 'NAT', 'Narrative Thinking', 2, 'Teaches you how to think and talk.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (16, 'SIP', 'Sustainable Innovation Project', 3, 'Teaches you how to be innovative.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (17, 'HKKB H', 'Herokuku Bird Hostings', 2, 'Heroku 20 is upgraded to Heroku 22,');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (19, 'CPF', 'Central Provident Fund', 3, 'Manage funds when retire.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (21, 'DEUI', 'Design for User Interaction', 5, 'Learn to design properly.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (22, 'SEP', 'Software Engineering Project', 5, 'Doom.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (24, 'JAD', 'J2EE Application Development', 5, 'Learn some Java Programming.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (25, 'ESDE', 'Enterprise Systems Development', 5, 'Understand web app security architecture as well as cloud computing.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (26, 'ECG2', 'Education & Career Guidance 2', 5, 'Continuation of Education and Career Guidance.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (27, 'CPE', 'Communicating for Professional Effectiveness', 3, 'Learn to talk properly.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (29, 'INIS', 'Introduction to Immersive Simulation', 6, 'The start of the Immersive track.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (30, 'MAD', 'Mobile Application Development', 6, 'Learn how to make apps on mobile.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (31, 'BED', 'Back-End Web Development', 6, 'Server-side fundamentals.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (32, 'FED', 'Front-End Web Development', 5, 'Client-side fundamentals.');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (34, 'ESM', 'Enviroment & System Management', 3, 'What is going on with the oceans and atmosphere today?');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (35, 'DSAL', 'Data Structures & Algorithm', 4, 'The hardest elective you can find. ');
INSERT INTO public.modules (module_id, module, title, credits, description) VALUES (38, 'food', 'chicken wings', 5, 'Texas Chicken, 4 Fingers Crispy Chicken, Kentucky Fried Chickens from Colonel Sanders.');


--
-- TOC entry 3372 (class 0 OID 16613)
-- Dependencies: 218
-- Data for Name: planner; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (38, 218, 3.50, 3.51, 5, 6, '4 August 2022, 11:08:11 PM', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (1, 261, 3.50, 2.60, 6, 70, '4 August 2022, 3:26:13 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (39, 218, 4.00, 1.00, 13, 14, '5 August 2022, 3:49:19 PM', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (40, 218, 3.00, 2.00, 5, 6, '5 August 2022, 3:53:54 PM', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (72, 218, 3.79, 3.85, 12, 17, '13 August 2022, 3:04:38 PM', false);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (9, 218, 0.00, 1.00, 5, 7, '4 August 2022, 6:43:00 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (10, 218, 1.00, 2.00, 5, 6, '4 August 2022, 6:48:35 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (11, 218, 3.71, 3.80, 12, 14, '4 August 2022, 6:49:07 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (12, 218, 0.00, 1.00, 5, 7, '4 August 2022, 6:50:27 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (13, 218, 0.50, 1.00, 6, 1, '4 August 2022, 6:52:27 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (15, 218, 0.50, 1.00, 5, 6, '4 August 2022, 6:54:01 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (17, 262, 4.00, 4.00, 5, 9, '4 August 2022, 6:56:32 pm', false);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (18, 218, 1.00, 1.20, 5, 6, '4 August 2022, 6:57:24 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (20, 263, 3.50, 4.00, 5, 10, '4 August 2022, 6:58:35 pm', false);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (21, 264, 3.44, 3.99, 8, 10, '4 August 2022, 7:00:23 pm', false);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (22, 265, 3.00, 3.50, 6, 10, '4 August 2022, 7:02:53 pm', false);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (19, 218, 1.50, 2.00, 7, 11, '4 August 2022, 6:58:16 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (23, 218, 0.50, 1.00, 3, 4, '4 August 2022, 7:36:31 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (24, 218, 2.50, 2.00, 6, 4, '4 August 2022, 7:40:48 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (25, 218, 1.50, 2.00, 5, 3, '4 August 2022, 7:41:42 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (26, 218, 3.50, 3.60, 5, 11, '4 August 2022, 7:42:13 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (27, 218, 1.00, 2.00, 6, 3, '4 August 2022, 7:46:53 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (29, 218, 1.00, 2.10, 5, 4, '4 August 2022, 7:50:45 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (28, 218, 2.00, 2.10, 7, 9, '4 August 2022, 7:47:23 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (30, 218, 1.00, 2.00, 8, 3, '4 August 2022, 7:52:34 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (31, 218, 0.00, 3.60, 5, 6, '4 August 2022, 7:54:24 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (32, 218, 0.00, 1.00, 5, 6, '4 August 2022, 7:55:23 pm', true);
INSERT INTO public.planner (planner_id, fk_userid, current_gpa, target_gpa, current_credits, future_credits, created_on, is_fulfilled) VALUES (33, 218, 2.50, 3.00, 4, 3, '4 August 2022, 8:01:21 pm', true);


--
-- TOC entry 3373 (class 0 OID 16619)
-- Dependencies: 219
-- Data for Name: planner2; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planner2 (planner_id, current_gpa, target_gpa, current_credits, future_credits, is_fulfilled, fk_userid, created_on) VALUES (35, '2.73', '3', '61', '70', false, 259, '4 August 2022, 2:23:22 pm');
INSERT INTO public.planner2 (planner_id, current_gpa, target_gpa, current_credits, future_credits, is_fulfilled, fk_userid, created_on) VALUES (36, '4.00', '4', '15', '20', true, 218, '4 August 2022, 2:27:22 pm');
INSERT INTO public.planner2 (planner_id, current_gpa, target_gpa, current_credits, future_credits, is_fulfilled, fk_userid, created_on) VALUES (37, '1.71', '2.00', '56', '57', false, 261, '4 August 2022, 3:04:41 pm');


--
-- TOC entry 3376 (class 0 OID 16627)
-- Dependencies: 222
-- Data for Name: results; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (338, NULL, '2.97', 'cE-w5IzTeW0kIHeyVCnXf', '27 July 2022, 8:13:01 pm', '[{"name":"ADES","credit":6,"grade":2.5},{"name":"B1","credit":100,"grade":3}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (339, NULL, '3.50', 'Iiq_dI_Xk9lESFJgCA4iU', '27 July 2022, 8:20:12 pm', '[{"name":"AD","credit":9,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (340, 225, '3.95', 'betabird', '27 July 2022, 8:30:16 pm', '[{"name":"DEUI","credit":5,"grade":3},{"name":"Z3","credit":99,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (341, 225, '3.95', 'J0xmdptWGjEMjNf_mYqoF', '27 July 2022, 8:31:34 pm', '[{"name":"DEUI","credit":5,"grade":3},{"name":"Z3","credit":99,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (342, 225, '1.50', 'covidtom0', '27 July 2022, 8:43:13 pm', '[{"name":"ADES","credit":6,"grade":1.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (353, NULL, '3.50', '2PoSd5KBwPMoBNCtMVf3j', '29 July 2022, 12:03:55 pm', '[{"name":"aaadss","credit":1,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (360, 240, '4.00', 'NyhUdAoKoE6fQER3QyjfS', '30 July 2022, 2:30:39 pm', '[{"name":"AD","credit":9,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (362, NULL, '3.00', 'CgdLgpbqiwhZvQVAus7OJ', '30 July 2022, 3:56:30 pm', '[{"name":"DENG","credit":5,"grade":3}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (364, NULL, '3.00', 'eWlU5Rifv8HT93xpPcrBv', '30 July 2022, 4:29:09 pm', '[{"name":"DENG","credit":5,"grade":3}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (361, NULL, '3.00', 'VtyDrQFBDxpWGnCIrw-pw', '30 July 2022, 3:56:08 pm', '[{"name":"DENG","credit":5,"grade":3}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (365, NULL, '2.00', 'rnZEsMyqZPCiHAPOCwTPF', '30 July 2022, 5:19:24 pm', '[{"name":"aaa X ","credit":6,"grade":2}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (368, 230, '3.84', 'abc1230', '31 July 2022, 22:24:46', '[{"name":"ADES","credit":6,"grade":4},{"name":"DENG","credit":5,"grade":4},{"name":"DEUI","credit":5,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (375, NULL, '4.00', 'we1IGq12_idaUh3oqeR3h', '1 August 2022, 5:15:40 PM', '[{"name":"AS","credit":9,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (417, 218, '3.50', 'covidtom', '5 August 2022, 11:30:50 am', '[{"name":"DEUI","credit":5,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (385, 243, '4.00', 'johnsonFirst', '2 August 2022, 9:55:43 AM', '[{"name":"CK","credit":50,"grade":4},{"name":"DENG","credit":5,"grade":4},{"name":"Y Project","credit":3,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (389, 252, '0.00', 'hopeless1', '2 August 2022, 10:48:46 AM', '[{"name":"ADOG","credit":5,"grade":0}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (391, 252, '0.36', 'hopeless2', '2 August 2022, 1:39:25 PM', '[{"name":"AS","credit":9,"grade":1},{"name":"aaax 2","credit":4,"grade":3.5},{"name":"CK","credit":50,"grade":0},{"name":"ADOG","credit":5,"grade":0},{"name":"DSAL","credit":4,"grade":0},{"name":"HKKB H","credit":2,"grade":0},{"name":"INIS","credit":6,"grade":1}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (392, 253, '3.81', 'ace0', '2 August 2022, 1:45:52 pm', '[{"name":"MAD","credit":6,"grade":4},{"name":"ECG","credit":1,"grade":0.5},{"name":"BED","credit":6,"grade":4},{"name":"ECG2","credit":5,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (398, 243, '4.00', 'covidvirus1', '2 August 2022, 3:54:06 PM', '[{"name":"AD2","credit":8,"grade":4},{"name":"aaax 2","credit":4,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (399, 243, '4.00', 'carljohnson', '2 August 2022, 3:54:50 PM', '[{"name":"CAT","credit":4,"grade":4},{"name":"ADES","credit":6,"grade":4},{"name":"INIS","credit":6,"grade":4},{"name":"SEP","credit":5,"grade":4},{"name":"SIP","credit":3,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (400, 17, '2.50', 'jacky4Hi', '2 August 2022, 6:11:47 PM', '[{"name":"AD2","credit":8,"grade":2.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (406, 256, '3.31', '6ocAwKWL6dcUsYWFu8kuP', '2 August 2022, 10:12:32 pm', '[{"name":"aaax 1","credit":3,"grade":3},{"name":"ESDE","credit":5,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (407, 218, '2.50', 'gW0bhQGu7jN7O3dscevrZ', '3 August 2022, 8:39:48 am', '[{"name":"DEUI","credit":5,"grade":2.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (411, 242, '4.00', 'Pl5UbXExHVsPTIaiT4dJn', '4 August 2022, 00:13:12', '[{"name":"ADES","credit":6,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (412, 242, '3.58', 'FUkKpZ2_KoCkdPY4ynVD7', '4 August 2022, 00:15:29', '[{"name":"ADES","credit":6,"grade":4},{"name":"DEUI","credit":5,"grade":3.5},{"name":"ESDE","credit":5,"grade":4},{"name":"AS","credit":9,"grade":4},{"name":"Z3","credit":99,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (415, 218, '4.00', 'bQT3pGSYc62H8h3Tm3uct', '4 August 2022, 8:46:28 PM', '[{"name":"DENG","credit":5,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (420, 218, '3.20', 'no', '5 August 2022, 3:39:44 PM', '[{"name":"AD","credit":9,"grade":3},{"name":"ADES","credit":6,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (453, 304, '3.33', 'Si91z3H_6abeLmopVLzNS', '11 August 2022, 6:49:04 pm', '[{"name":"ADES","credit":6,"grade":4},{"name":"ASS","credit":7,"grade":2.5},{"name":"ECG","credit":1,"grade":3.5},{"name":"AS","credit":9,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (454, NULL, '3.05', 'xnfa-QIRduLdPUkTptlq_', '12 August 2022, 2:15:28 PM', '[{"name":"DENG","credit":5,"grade":2.5},{"name":"ADES","credit":6,"grade":3.5}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (455, 218, '3.55', 'ijire', '12 August 2022, 2:19:46 PM', '[{"name":"DENG","credit":5,"grade":3},{"name":"ADES","credit":6,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (457, 218, '4.00', 'qJF64zNDXk1FMKUyz_qwt', '13 August 2022, 10:19:46 AM', '[{"name":"aaax 2","credit":4,"grade":4},{"name":"ESM","credit":3,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (458, 218, '4.00', 'yhnqPGneVZ-q_bft-c8nX', '13 August 2022, 10:21:00 AM', '[{"name":"ADOG","credit":5,"grade":4},{"name":"BED","credit":6,"grade":4},{"name":"HKKB H","credit":2,"grade":4},{"name":"aaaax 3","credit":7,"grade":4},{"name":"Planet","credit":6,"grade":4}]', 'Never Expires anymore');
INSERT INTO public.results (result_id, fk_userid, gpa, key, created_on, data, expire_on) VALUES (459, 218, '3.79', 'loveADES', '13 August 2022, 3:04:19 PM', '[{"name":"DENG","credit":5,"grade":3.5},{"name":"ECG","credit":1,"grade":4},{"name":"ADES","credit":6,"grade":4}]', 'Never Expires anymore');


--
-- TOC entry 3378 (class 0 OID 16633)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (5, 'js', 'passs', 'js@yahoo.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (6, 'john', '1234', 'john@yahoo.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (9, 'cb', 'password', 'g4@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (20, 'tommy5', 'password', 'tommy5@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (21, 'tommy6', 'password', 'tommy6@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (22, 'tommy7', 'password', 'tommy7@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (23, 'tommy8', 'password', 'tommy8@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (24, 'tommy9', 'password', 'tommy9@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (25, 'tom3', 'password', 'tom3@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (26, 'tom5', 'password', 'tom5@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (27, 't5', 'p', 't5@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (29, 't3', 'password', 't3@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (36, 't4', 'password', 't4@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (38, 't6', 'password', 't6@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (42, 'jas', 'password', 'jas@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (43, 'rob', 'password', 'rob@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (47, 'fck', 'password', 'fck@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (55, 're', 'password', 'r3r3@ffwef', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (56, 'doggy', 'password', 'doggy@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (57, 'doggy2', 'password', 'doggy2@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (58, 'waleoeh', 'password', 'walaoeh@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (59, 'harold', 'password', 'harold@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (60, 'harold0', 'password', 'harold0', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (61, 'you', 'password', 'defehb@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (64, 'cbkia', 'password', 'cbkia@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (67, 'ewww', 'password', 'ewww@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (68, 'hostsite', 'password', 'hostsite@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (150, 'beef6', '$2a$10$BBouo1Co89v9QNFB8NOnSeayjlMo/9WuTqmJyrnY5n1qZnpT/I/cq', 'beef6@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (69, 'jstest
', 'password', 'test@gmail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (70, 'Tom', 'password', 'tom@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (71, 'jeremiah', 'password', 'jeremiah@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (73, 'jerald', 'password', 'jerald@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (74, 'pop', 'password', 'pop@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (75, 'pop2', 'password', 'pop2@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (76, 'pop3', '$2a$10$/bttn65tYKWk7zknXtdjQOcRIr61XULsxLernSu.IQE5NMJjTt9HW', 'pop3@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (77, 'testing123', 'password', 'testing123@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (79, 'tomato', '$2a$10$JbEOyBuNvY3JLn0PaKwqRe9FvXOYQNREVRylZKGGg8OxdJuzMQADS', 'tomato@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (80, 'tomato2', 'password', 'tomato2@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (81, 'tomato3', '$2a$10$uGVBzjNCcxijkJtH2xfgoODm0PVAho1HFsvzMa4WdhljQB2dS1Gq.', 'tomato3@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (82, 'tomato4', '$2a$10$yPkawwpV7WBwNDE2/YhiFu8gFckDO3.Po.rK4G3.4ToiJfx6m84fC', 'tomato4@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (83, 'tomato5', '$2a$10$tGqVWHQGyIBXvxalbtdq8.6140lhXJmR0Rw6sN8hFPydl9JgWk1R2', 'tomato5@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (85, 'tomato6', 'password', 'tomato6@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (86, 'anita', 'password', 'anita@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (88, 'tomato7', '$2a$10$lMUEcRW.lfAbwTyir.y7z.wDDRphVfpsVARc7XUmAbM1crlAxmIvW', 'tomato7@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (89, 'anita2', '$2a$10$nIdUfnnCuAWnGe/L/rMk/.vUz0jQwFwn3xsnheKFO.vHaNfFrKCyS', 'anita2@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (90, 'NotAccount', 'Password', 'notacc', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (91, 'user999', 'plkio', 'poli@tem.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (92, 'this', '123455', 'this@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (93, 'chicken', 'password', 'chicken@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (94, 'finaltest1@email.com', 'password', 'finaltest1@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (95, 'STVSC', 'password', 'stvsc@gmail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (96, 'matthew', '12345', 'matthew@gmail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (104, 'pork', 'password', 'pork@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (105, 'pork2', 'password', 'pork2@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (108, 'pork3', 'password', 'pork3@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (15, 'qwl', '$10$K.0HwpsoPDGaB/atFBmmXOGTw4ceeg33.WrxJx/FeC9.gCyYvIbs6', 'qwl@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (119, 'edfe', 'fefe', 'ewgwrgrw', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (121, 'pork5', 'password', 'pork5@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (123, 'pork6', 'password', 'pork6@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (135, 'pork7', 'password', 'pork7@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (136, 'pork8', 'password', 'pork8@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (137, 'pork9', 'password', 'pork9@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (138, 'beef', 'password', 'beef@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (139, 'beef0', 'password', 'beef0@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (141, 'beef1', 'password', 'beef1@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (145, 'beef3', '$2a$10$Tgk.oZuIUPix6oZeAzKJv.olDewdVl7eGH3igRSnCWQP0jrvsK9fW', 'beef3@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (146, 'beef4', '$2a$10$TrgeiFSNcMtD4wSd4LouC.gHA6LrWhcl/qRNKABoBbTAJqmPFgPc.', 'beef4@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (148, 'beef5', '$2a$10$nxT5wi/lCdlbq2yKJYs1guCP1/YkVGK3WQX./RZrXIskLzMhdU8WS', 'beef5@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (152, 'beef7', '$2a$10$G4PVY/2pmaf6TnlPlzdFXOp9UWVnDzJinfNYQGB2Q5Jzs73qJjB.q', 'beef7@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (153, 'beef8', '$2a$10$oM8hVX7ZVIvBurSEOa64WOYfqtRzy2GR7uQQoJZW5EhgocN4YRwD2', 'beef8@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (157, 'beef9', '$2a$10$ZiDqYuDKPjy1CwUABVF5YuceKDTT9LvWuLK5qF8WH.qxen2tN2YYq', 'beef9@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (173, 'beef10', '$2a$10$41GFKA1.q7gVZ/6yoMbSf.LZW3fs3oCSYEVAOjFeiA53VdksTUBXa', 'beef10@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (174, 'beef11', '$2a$10$I.OkP6u06RmfKfVltn4FmucG8BLMFvgvLYD3af15rNOoV2Pdh71nS', 'beef11@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (175, 'beef12', '$2a$10$GC5xja.2gtY6LXjRSs28VODJb7WVc29sXDnlvRD61t60YstDPNYmO', 'beef12@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (178, 'beef13', '$2a$10$N1eoRIg8YpRXtn/yM/9iVu3xhy1EiSK1vNZWSCJcP3wkIj/voY9Sa', 'beef13@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (179, 'beef14', '$2a$10$jp86xWgWfiNG8Fj5K4zbOeqVf/zMNWptbHlzxmu8ll6CAhPWjr2Hq', 'beef14@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (180, 'beef15', '$2a$10$/hohK3EBJZ5DjwF13bxSHOI3jz3KZTa3Is8om3dHVNeiPgBSpieoe', 'beef15@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (182, 'beef16', '$2a$10$wFgXT0/uOjTekpqVBSUxa.IGUM4Ik1dyBm52QR4ZD34BqVj7PXEba', 'beef16@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (185, 'beef17', '$2a$10$JibrsmwQbgWsM8TAm/UlvecmzJwHXLJSADbw33n4UPhnNem.Iigky', 'beef17@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (187, 'beef18', '$2a$10$3mnZ3BY12nZfmN8397IP/OlYxCNvlyuKBY.2Uwzo42EMZgEEy1W2W', 'beef18@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (189, 'js99', '$2a$10$ffDWUnwHN6h.R7VZZ.RE7e4EYKmjuACy/ueT.QL2MbZ6aYkoRjFma', 'jiashun99@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (17, 'jacky4', '$2a$10$wFgXT0/uOjTekpqVBSUxa.IGUM4Ik1dyBm52QR4ZD34BqVj7PXEba', 'jacky4@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (190, 'aajaj', '$2a$10$YBJQyz6hAaWU3WCcClx1CulR66XYo/E4OplofioBTBMS1pzGtRx5y', 'ajaj@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (191, 'auserloggedin', '$2a$10$zp8oUaqucCnlJvgd9xoyguazXuADdvD9k6TIHUUHLc5BkeRP2zT3.', 'whatdotheydo@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (192, 'ausersignsup', '$2a$10$8T1BCarjAlMgAxWAD8BobuaqVzG5J2j9Us8aamK21MvekJDBH2BaK', 'whatsistheiremail@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (193, 'Ca9', '$2a$10$MPS7sr.GsBilyl5p8UyqHOCfEeGCaYUMz/MXXwJpBqD1wf9DOAoWS', 'ca9@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (194, 'ca9_2', '$2a$10$OtAZp5dnfGvSEqh8gD.u2ep2dIix4Wh8eU4kMT/us5e0eJmuk2dlu', 'barko@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (195, 'sufaa', '$2a$10$99gE.QMDzsZyq2dittZw7e4QpNEBDJ4w/363DNcCiSqhgw332dBM6', 'sufaa@sufaamail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (196, 'apipi', '$2a$10$GcuEjV.UWVzE/EpwdzSVfeseCOb6BMNyJJbRR1ImANlrPYJoGEw5m', 'pipi@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (197, 'username900', '$2a$10$sk8Tv7BR2kxk/ib/G78h7u6WyTUEWkrJ9u//O2TsXWPQ9chys0VZ2', 'email200@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (198, 'github', '$2a$10$wBNes58Mp3SIeKlYRKT5q.FcIcVvs9KJlWhwrhFWRk4JfaZeLYYTm', 'github@git.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (199, 'mssql', '$2a$10$.ER511sfnD.XTx/i6EKPeuioy0NCFcyGAyg.TrFzAyWc.MSfb.iza', 'mssql@yumail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (200, 'lacrimosa', '$2a$10$BV0n0/d5XtwhboDn4HJGDe9cP2UWdQKpKi.gp3X4yL6drZ.kvzBPC', 'weeping@angels.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (201, 'joeb', '$2a$10$C.TajovyQV1YXuRyrP4xOeVWzpW6RUppT.8gtkF8k1nLTCZLeZNsm', 'jobe@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (203, 'joeba', '$2a$10$uN07dtsE94mWNvcEucPe2eYJxPaGA/c1ihrPl8EBhsu1oeG.GVKLq', 'jobea@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (204, 'testuser9029', '$2a$10$/BDeXVi9bPmD97PMQ8KxRe3fnLj5p5GtNt4G89ZdW1dgwGIO9W66W', '910@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (205, 'reactjs', '$2a$10$8T02nHM62mClMe6QHPVcfuAYM0/ovkW97zFOufDrVIZy74VVsh9sa', 'meta@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (206, 'testusername010', '$2a$10$JT/JYQ3f5QLsNW9l7ElBm.PvTHOaJlojtJfVKi26BmN03w3AMogIm', 'testukraine@email.ru', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (207, 'tchaik', '$2a$10$UPstRVmMD4s3dMD0NNKHgOf1RC1PZPwPDbMxSI6zANxezDgauJd22', 'pyotr@ovsky.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (209, 'tchaik', '$2a$10$PnXitp6qp/UVabSYUEQBS.m/ef.ZTHyiseT7.DV7vjEHapMYvKYzi', 'pyotril@ovsky.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (211, 'tchaik', '$2a$10$dnG0ZQyUzzEScS3V4/iXGuRRjAxwtF1ZA/PRPOcNgL5LsExCj9LLO', 'pyotril@ovdsky.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (213, 'moneybag', '$2a$10$OM/ybNkpvm9b2nUWu7JeG.XmmJik/O2IRB4mjnJJSV6ycDwluzjYq', 'money@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (214, 'password', '$2a$10$U/vrq9oY2NA4klVWINLkfeP2rgfKoNhxUvXTLO4vc3AX/WkdlIoCG', 'username@gmail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (215, 'Hungary', '$2a$10$TiTEAhgJG/siAT8zzMkIuOllpIhdPCYQgKFkK.79tF6RcJh59yfeC', 'budapest@eumail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (216, 'polypal', '$2a$10$YDDr4TZ/Db7XBS9/.YadD.utkhTsmuKbvj1k39osaAuL4o/6zRYDO', 'polypal@hud.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (217, 'polol', '$2a$10$.wVCT2oNnWs.Xzve.6PtxO.JYmz3RNmv4XkQCyjir/tlxR9Gr.LMS', 'polol@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (219, 'testing999', '$2a$10$qkJzgBfZmdF9w3NsFlBg5etEmMuXaEGME7CAYEGyt1oDoNBLnyCqK', 'localhost@3302.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (224, 'locomoto', '$2a$10$Y6ykghfdTcwpbV3FGNnwb.j0GOUaEC8pPrAF2bNR7GnU9646d5Eda', 'localhost@3002.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (237, 'js1', '$2a$10$GQTxcVqjK6iOi4bp7K0EH.94r1/bwxD92RJ1y7qIapPNE4PwfYIU.', 'js1@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (238, 'github', '$2a$10$7P7Vo3IlkmeR5mtFmuJkyOZ5RWduCuNJl/UjbLnYSUVGyPTDzQI/i', 'git@hub.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (247, 'testuser999', '$2a$10$k1BJ8ZVBMS3qiiMdi4cx7.ScyPYewYEVgSZpLN1H0xM8J1SIU8T62', 'testuser@999.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (239, 'swal', '$2a$10$Z9u0tLcweJIpIOgak12CMOd6Vc.BZmvQa4JPxeZ5uo86RGDP/N5pK', 'swa@blu.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (240, 'andante', '$2a$10$b4NGeH0ruMzpDE2fMPpx3.dCnp9TMsVY/qT/uEsNp91mFP4.dlq5i', 'moderate@slow.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (252, 'hopeless', '$2a$10$qSnlXNWuhIhYA7TS05zmReOeraEY4AfBH1f1K/pFpfdRu0ijiYhQK', 'hopeless@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (241, '100vi', '$2a$10$ZWolbQz9sSu2bu1epNrCQu01NsIFpYVVKUj5n1Vn5Di5CfLQIUdnq', '100vi@mail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (212, 'adios777', '$2a$10$u3v0rGOT/aZ3wK57wRvyI.YtwSzgMndPklHtwMkdjtO2vLMNEzQuG', 'adios@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (226, 'confimpassword', '$2a$10$Db9T0yHw8jjP2g93BAv4l.fWAnsp1XXF.NL5GW6eN5Mrcq4Itf6Ce', 'confirm123@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (227, 'password', '$2a$10$NkkP2kMJvDRJ5IpKHPf4J.NAP8lVA6Kd5n6mqPKJi95KsEQpua8yG', 'password123@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (228, 'hellopanda', '$2a$10$i4Qm5UF5L.zngF7mQLJg8uvnmhwk.1kq7ReSsRLrY0cLYK6X7FJyu', 'hellopanda@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (229, 'weilin777', '$2a$10$5i2Fnxk8cBjI12Ikko0IkOOPj9SEfoHZUQc1eV8ThSxfK7kU/2O02', 'weilin888@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (234, 'abcd', '$2a$10$atSYsyvlZ7LEgkoXBYgbd.QxzRh5d3zsIo2nkxwdg18me83RXTLhq', 'abcd@efg.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (244, 'testuser', '$2a$10$MFwlnxzp36nDNfL4ptXbbOfswyoaPIl46i7/4d1UzCvBzis0bJG/O', 'test@user.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (248, 'qq', '$2a$10$9diGJxHedDqda37O6AUxM.WAFmXvl6u.Y8IhFGzWMWzsWE5d5eH2G', 'qq@m', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (235, 'JokingInput2', '$2a$10$9GnbU78a0Jp1FDU/pbKAtuW2Ef9rZYkGV/IDLQZ5aXSAqBQRQsgA2', 'mai@l.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (236, 'pipope', '$2a$10$LahYsmPk/VTh3szdK3gO9e2pOvS13a6gCrin8uDcJAa6pZxJJVqIy', 'pipo@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (225, 'betaBirds', '$2a$10$ZO2Ujvki3v2Cgn6nIbj9/ea1rDqjFLgOVmIWuO0IYOZva.6V./VCm', 'beta@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (230, 'adios123', '$2a$10$Fv22derYFY/27FNz9u9UGuQ4Guh7RkqGQAIu9w0.gLhRZgtNWA5v6', 'adios123@gmail.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (242, 'jstest@gmail.com', '$2a$10$3feYXx36Z9U7wZ0J1L.p5OQ6y/475CQVrwtY5IAl8K7faIPEOSHeu', 'jstest@gmail.com', true, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (245, 'antodvor', '$2a$10$l16cPbCu/HTPfJS2I.hD4e1qiEBMysbYdHWP5NzOxOTFr1gV706wO', 'antodvor@ak.cz', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (246, 'ducktail', '$2a$10$.jQj13/aghf25eiPjLGVjO2GPxP9qt9FuT9MHICi4J2Dt7H9FgVJq', 'ducktail@emai', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (249, 'police', '$2a$10$A36asFPQrIOvaAJHSvdKu.fFQeDgAbrENM3w8YMclVSduLsb0zD/W', 'pol@ice.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (250, 'lieder_isch_carupt', '$2a$10$/wbigZAfiu1Su0zZD.Qyne5MqEjUwmpyf/oczIzCdXaCwzVe0Vi8e', 'lieder_isch_carupt@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (251, 'fecku', '$2a$10$wwVXrrr7y0lYSII2At9P.OA/T874ttV9hwcU7uYZQcTi/LWS3LwjW', 'fecku@m', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (218, 'CovidTom', '$2a$10$rfH6XHjkK0MUT/uKPsG9PeMYtzf9n82Hq03ONMU0nFYhmQ8unUvge', 'covidtom@email.com', true, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (253, 'ace', '$2a$10$e6Z5uTz3Eco1aeP1WcLccuYyaZs1s8wSsF/Wpuui0S3CVfLzrbUKa', 'ace@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (243, 'CarlJohnson', '$2a$10$VsMVtxEk1C1FX32t/vYQzubqfwcz.0truQWU2g43i4mLXbTztnJwi', 'johnson@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (254, 'abcd', '$2a$10$.KTm3nb/qPoAECi5umdBt.ZobwSn/C3wbH5Qr2QbDdQNonoP2NkHi', 'abcd@e', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (255, 'abcdefg', '$2a$10$u5dASjT2LJYdrpICnZoJTuihXtTnW2J7nm2.hLhft3DawduCoFS56', 'abcdefg@a', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (256, 'ray', '$2a$10$y7jRTjvwppyFAwlNMKEbROQeSyWE6DikzfHrbT5yxULLudhHw.gW.', 'ray@ray', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (257, 'lolcat', '$2a$10$EzLADx55kjBQeCfZXo7LLugF.5ZGAHNXiPTzM6GLMsUa7q6zPjxrK', 'lolcat@em', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (258, 'yestuser200', '$2a$10$OaMdrWnkpUeq3AMH3V07du2NTEnHbduHSovMrdFTUKNKmry33SY1q', 'testuser@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (259, 'username', '$2a$10$H9k4LJWzCzNopqvwznRJiOrOaPwPqUWCN32ybpQcsl44wkF49cwQu', 'email@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (261, 'usern@me', '$2a$10$v8vt7VkArR3Flt/poSuxmeZaccz.enR4Dpl0Hd5D6Ga7UNSqTfi.q', 'email@email.co', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (262, 'testuser9281', '$2a$10$haDeTp4.lSV5AWUkemChwuP4WTY7H9NJ4XD9hZ6oMkKvTVg0N8qV.', '9281@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (263, 'useruser', '$2a$10$HafxwbuCmAFGeJUFUMVdZ.DOEoMcsp2V31SqahstJoF.PgAUzRWl6', 'user@user.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (264, 'sudo', '$2a$10$WmtaoFDF4hBcq/2xqkHteurkKG6WZ2kpRcrPokzOaPkDC.afPnPee', 'sudo@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (265, 'europe', '$2a$10$2G.LNl.SxWb2OAltnlorMOqRqIzJ9n6pwGIlot6bkIm1a.SttqrjS', 'euro@pe.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (266, 'tester45', '$2a$10$I7E/GZiPZThNH06Hh3P5NO7s8swOV55HFlovYwku3CHmMU2KyK1ki', 'tester45@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (267, 'tester46', '$2a$10$doBSH1u9dtaqiaAbqI6il.ofxDCMnCGDzM13TNXJUhhLw5ze60Pei', 'tester46@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (268, 'tester47', '$2a$10$EpIfeB7eDie7dr5kuCDobe8jORrTbLmANqyrpQSaRJ7XvgTQMoTz6', 'tester47@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (271, 'tester48', '$2a$10$FeFl.q/g2yCGWjK.tuCszuQtXmVBGVriOrDqtgGzkkOwx6e35NJPS', 'tester48@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (273, 'lll', '$2a$10$45LOUPWl7nMxUt9Elrt3y.i7PpVU5obw/BtvZtVnBPkLt5TWJ7nae', 'covid@email.com', false, 0);
INSERT INTO public.users (user_id, username, password, email, private, plans_fulfilled) VALUES (304, 'covidtom2', '$2a$10$JjDVAENuC052JdmTY3c.X.tNS/rK/itvOAAOe7LqK4RPMynnRal9K', 'covidtom2@email.com', false, 0);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 215
-- Name: grades_grade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grades_grade_id_seq', 723, true);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 217
-- Name: modules_module_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modules_module_id_seq', 218, true);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 220
-- Name: planner2_planner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planner2_planner_id_seq', 38, true);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 221
-- Name: planner_planner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planner_planner_id_seq', 72, true);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 223
-- Name: results_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.results_result_id_seq', 459, true);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 304, true);


--
-- TOC entry 3223 (class 2606 OID 16648)
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email) INCLUDE (email);


--
-- TOC entry 3209 (class 2606 OID 16650)
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (grade_id);


--
-- TOC entry 3211 (class 2606 OID 16652)
-- Name: modules modules_module_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_module_key UNIQUE (module);


--
-- TOC entry 3213 (class 2606 OID 16654)
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (module_id);


--
-- TOC entry 3217 (class 2606 OID 16656)
-- Name: planner2 planner2_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner2
    ADD CONSTRAINT planner2_pkey PRIMARY KEY (planner_id);


--
-- TOC entry 3215 (class 2606 OID 16658)
-- Name: planner planner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planner
    ADD CONSTRAINT planner_pkey PRIMARY KEY (planner_id);


--
-- TOC entry 3219 (class 2606 OID 16660)
-- Name: results results_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_key UNIQUE (key);


--
-- TOC entry 3221 (class 2606 OID 16662)
-- Name: results results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_pkey PRIMARY KEY (result_id);


--
-- TOC entry 3225 (class 2606 OID 16664)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


-- Completed on 2022-11-21 16:22:57

--
-- PostgreSQL database dump complete
--

