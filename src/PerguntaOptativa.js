import React, { useState, useEffect } from "react";
import "./perguntaOptativa.css";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import { useLocation } from "react-router-dom";

function PerguntaOptativa() {
  const location = useLocation();
  const { questao } = location.state || {}; // Acessando a questão passada pela navegação
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(null);

  const enviarResposta = () => {
    if (!questao) return;

    fetch("http://localhost:5000/perguntaOptativa", {
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
        <img src={RaioIcone} className="perguntaOptativa-icone-raio" alt="Ícone de Raio" />
        <span className="perguntaOptativa-flashcards">FLASHCARDS</span>
      </div>

      <div className="perguntaOptativa-pergunta">
        <span className="pergunta1">
          {questao ? questao.enunciado : "Carregando questão..."}
        </span>
      </div>

      <div className="perguntaOptativa-resposta">
        <input
          type="text"
          placeholder="Digite a resposta"
          value={respostaUsuario}
          onChange={(e) => setRespostaUsuario(e.target.value)}
        />
        <button className="perguntaOptativa-botaoEnviar" onClick={enviarResposta}>
          <p className="perguntaOptativa-enviar">Enviar</p>
        </button>
      </div>

      {mensagem && <p>{mensagem}</p>}
      {respostaCorreta && <p><strong>Resposta correta:</strong> {respostaCorreta}</p>}
    </>
  );
}

export default PerguntaOptativa;
