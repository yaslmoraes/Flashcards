import React, { useEffect, useState } from "react";
import "./perguntaAberta.css";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";

function PerguntaAberta() {
  const [questao, setQuestao] = useState(null);
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(null);

  useEffect(() => {
    // 🔹 Requisição para buscar uma questão aleatória
    fetch("http://localhost:5000/questaoAtual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          setQuestao(data);
          setRespostaCorreta(null); // Reseta a resposta correta ao carregar nova questão
          setMensagem(""); // Reseta a mensagem ao carregar nova questão
        }
      })
      .catch((error) => console.error("Erro ao buscar questão:", error));
  }, []);

  const enviarResposta = () => {
    if (!questao) return;

    fetch("http://localhost:5000/questaoAtual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        respostaUsuario,
        idQuestao: questao.id,
        idUsuario: 2, // Defina o ID correto do usuário
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
          if (data.respostaCorreta) {
            setRespostaCorreta(data.respostaCorreta); // Exibe a resposta correta
          }
        } else {
          setMensagem(data.message);
          setRespostaCorreta(null); // Se acertar, não exibe resposta correta
        }
      })
      .catch((error) => console.error("Erro ao enviar resposta:", error));
  };

  return (
    <>
      <div className="logo">
        <img src={RaioIcone} className="perguntaAberta-icone-raio" alt="Ícone de Raio" />
        <span className="perguntaAberta-flashcards">FLASHCARDS</span>
      </div>

      <div className="perguntaAberta-pergunta">
        <span className="pergunta1">
          {questao ? questao.enunciado : "Carregando questão..."}
        </span>
      </div>

      <div className="perguntaAberta-resposta">
        <input
          type="text"
          placeholder="Digite a resposta"
          value={respostaUsuario}
          onChange={(e) => setRespostaUsuario(e.target.value)}
        />
        <button className="perguntaAberta-botaoEnviar" onClick={enviarResposta}>
          <p className="perguntaAberta-enviar">Enviar</p>
        </button>
      </div>

      {mensagem && <p>{mensagem}</p>}
      {respostaCorreta && <p><strong>Resposta correta:</strong> {respostaCorreta}</p>}
    </>
  );
}

export default PerguntaAberta;
