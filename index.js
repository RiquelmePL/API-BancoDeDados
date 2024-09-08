import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './swagger.js';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "postgres",
    password: "mortadela1",
});

const app = express();
app.use(express.json());

swaggerSetup(app);

function validarUsuario(usuario) {
    const { cpf, nome, data_nascimento } = usuario;

    // Validar CPF como inteiro, nome como string e data no formato yyyy-mm-dd
    if (
        Number.isInteger(cpf) &&
        typeof nome === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)
    ) {
        return true;
    }
    return false;
}

app.get("/usuarios", (req, res) => {
    pool.query("SELECT * FROM api.usuarios", (error, result) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.get("/usuarios/cpf", (req, res) => {
    const { cpf } = req.query; 

    if (Number.isInteger(parseInt(cpf)) == false) {
        return res.status(400).json({ error: "CPF inválido" });
    }

    pool.query("SELECT * FROM api.usuarios WHERE cpf = $1", [parseInt(cpf)], (error, result) => {
        if (error) {
            res.status(500).send(error);
        } else {
            if (result.rowCount === 0) {
                res.status(404).json({ message: "Usuário não encontrado" });
            } else {
                res.status(200).json(result.rows[0]);
            }
        }
    });
});

app.post("/usuarios", (req, res) => {
    const body = req.body;

    if (!validarUsuario(body)) {
        return res.status(400).json({ error: "Formato de usuário inválido" });
    }

    pool.query("INSERT INTO api.usuarios (cpf, nome, data_nascimento) VALUES ($1, $2, $3)", [body.cpf, body.nome, body.data_nascimento], (error, result) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).end();
        }
    });
});

app.listen(8080, () => { console.log("Server listening on port 8080") });
