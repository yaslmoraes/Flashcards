const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 5000;


// Rotas para cada página
app.get("/", (req, res) => {
    try {
        res.json({ message: "API tela-inicial funcionando!" });  
    } catch (error) {
        console.error("Erro ao comparar a senha:", error);
        return res.status(500).send("Erro no servidor.");
    }
});

app.get("/comecar", (req, res) => {
    res.json({ message: "API comecar funcionando!" });
});

app.get("/tutorial", (req, res) => {
    res.json({ message: "API tutorial funcionando!" });
});

// Rota para mostrar a página e as tres maiores pontuações
app.get("/pontuacao", (req, res) => {
    db.query("SELECT nome, pontuacao FROM usuarios ORDER BY pontuacao DESC LIMIT 3", (err, results) => {
        if (err) {
            console.error("Erro ao buscar pontuações:", err);
            return res.status(500).send("Erro no servidor");
        }
        res.json(results);
    });
});

app.get("/perguntaAberta", (req, res) => {
    res.json({ message: "API perguntaAberta funcionando!" });
});

app.get("/perguntaOptativa", (req, res) => {
    res.json({ message: "API perguntaOptativa funcionando!" });
});

app.get("/questaoAtual", (req, res) => {
    res.json({ message: "API questao funcionando!" });
});


// Rota para cadastrar o usuário
app.post("/cadastrar", (req, res) => {
    const { nome } = req.body;

    // Verificar se todos os campos foram preenchidos
    if (!nome) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Verificar se o nome já existe no banco de dados
    db.query("SELECT * FROM usuarios WHERE nome = ?", [nome], (err, results) => {
        if (err) {
            console.error("Erro ao verificar nome:", err);
            return res.status(500).json({ error: "Erro no servidor." });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Nome já cadastrado." });
        }

            // Inserir o usuário no banco de dados
            db.query("INSERT INTO usuarios (nome) VALUES (?)", [nome], (err, result) => {
                if (err) {
                    console.error("Erro ao cadastrar usuário:", err);
                    return res.status(500).json({ error: "Erro no servidor." });
                }

                res.status(201).json({ message: "Usuário cadastrado com sucesso!" }); 
            });
        });
    });

// Rota para mostrar questão
app.post("/questaoAtual", (req, res) => {
    const { respostaUsuario, idQuestao, idUsuario } = req.body;

    // Se não houver parâmetros, retorna uma questão aleatória
    if (!respostaUsuario && !idQuestao && !idUsuario) {
        return db.query(
            "SELECT id, enunciado FROM questoes ORDER BY RAND() LIMIT 1;",
            (err, results) => {
                if (err) {
                    console.error("Erro ao buscar questão:", err);
                    return res.status(500).send("Erro no servidor");
                }

                if (results.length === 0) {
                    return res.status(404).json({ error: "Nenhuma questão encontrada." });
                }

                res.json(results[0]); // Retorna uma única questão
            }
        );
    }

    // Valida se os parâmetros foram enviados para a resposta do usuário
    if (!idQuestao || !idUsuario || respostaUsuario === undefined) {
        return res.status(400).json({ error: "Parâmetros ausentes." });
    }

    // Busca a resposta correta da questão
    db.query(
        "SELECT resposta FROM respostas WHERE id_questao = ?",
        [idQuestao],
        (err, answerResults) => {
            if (err) {
                console.error("Erro ao buscar resposta:", err);
                return res.status(500).send("Erro no servidor");
            }

            if (answerResults.length === 0) {
                return res.status(404).json({ error: "Respostas não encontradas para esta questão." });
            }

            const respostaCorreta = answerResults[0].resposta;

            // Se a resposta estiver errada mostra mensagem e resposta correta
            if (respostaUsuario !== respostaCorreta) {
                return res.status(400).json({
                    error: "Resposta incorreta.",
                    respostaCorreta: respostaCorreta,
                });
            }

            // Se a resposta estiver correta, adiciona 10 pontos ao usuário
            db.query(
                "UPDATE usuarios SET pontuacao = pontuacao + 10 WHERE id = ?",
                [idUsuario],
                (err) => {
                    if (err) {
                        console.error("Erro ao atualizar a pontuação:", err);
                        return res.status(500).send("Erro no servidor");
                    }

                    res.json({ message: "Resposta Correta! Pontuação atualizada." });
                }
            );
        }
    );
});



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;

