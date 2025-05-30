import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTimer } from './TimerContext';

function Questao() {
  const { tempoRestante, isTimeUp, startTimer } = useTimer();
  const [questao, setQuestao] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Começa o timer apenas na primeira vez que Questao for montado
  useEffect(() => {
    startTimer();
  }, []);

  // Se o tempo acabar, redireciona para a tela inicial (ou onde preferir)
  useEffect(() => {
    if (isTimeUp) {
      alert("O tempo acabou!");
      navigate('/');  // redireciona para tela inicial
    }
  }, [isTimeUp, navigate]);

  const idUsuario = location.state?.idUsuario;
  let pontosAcumulados = location.state?.pontosAcumulados || 0;

  useEffect(() => {
    fetch("http://localhost:5000/questaoAtual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUsuario })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          setQuestao(data);
          setMensagem("");
        }
      })
      .catch(() => {
        setMensagem("Erro ao carregar a questão.");
      });
  }, [idUsuario]);

  useEffect(() => {
    if (questao) {
      const idQuestao = questao.id;

      if (questao.tipo === "aberta") {
        navigate("/perguntaAberta", { state: { questao, idUsuario, pontosAcumulados } });
      } else if (questao.tipo === "optativa") {
        navigate("/perguntaOptativa", {
          state: {
            questao,
            idUsuario,
            pontosAcumulados,
            idQuestao
          }
        });
      }
    }
  }, [questao, idUsuario, pontosAcumulados, navigate]);

  return (
    <div>
      <h3>{mensagem || (questao ? questao.enunciado : "Carregando questão...")}</h3>
      <p>Tempo restante: {tempoRestante}s</p>
    </div>
  );
}

export default Questao;
