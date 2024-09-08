CREATE SCHEMA api;

CREATE TABLE IF NOT EXISTS api.usuarios (
    cpf INT PRIMARY KEY UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL
)