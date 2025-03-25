import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Questao() {
  const [questao, setQuestao] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/questaoAtual")
      .then((res) => res.json())
      .then((data) => {
        console.log("Questão recebida:", data);
        if (data && data.tipo) {
          setQuestao(data);
        } else {
          console.error("Resposta da API inválida:", data);
        }
      })
      .catch((error) => console.error("Erro ao buscar questão:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (questao) {
      console.log("Redirecionando para:", questao.tipo);
      if (questao.tipo === "aberta") {
        navigate("/perguntaAberta", { state: { questao } });
      } else if (questao.tipo === "optativa") {
        navigate("/perguntaOptativa", { state: { questao } });
      }
    }
  }, [questao, navigate]);

  return (
    <div className="questao">
      {loading ? <p>Carregando questão...</p> : <p>Redirecionando...</p>}
    </div>
  );
}

export default Questao;

function Questao() {
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
