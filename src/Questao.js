import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TimerContext } from './TimerContext';

function Questao() {
  const { tempoRestante, setTempoRestante, isTimeUp, setIsTimeUp } = useContext(TimerContext);
  const [questao, setQuestao] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Tempo acabou: ", isTimeUp)
    if (isTimeUp) {
      alert("O tempo acabou!");
      // Realiza o redirecionamento ou qualquer ação quando o tempo acabar
      navigate('/pontuacao');  // Exemplo de redirecionamento após o tempo acabar
    }
  }, [isTimeUp, navigate]);

  // Obtendo idUsuario e pontosAcumulados da página anterior
  const idUsuario = location.state?.idUsuario;
  let pontosAcumulados = location.state?.pontosAcumulados || 0;  // A pontuação acumulada vem da navegação anterior

  useEffect(() => {
    // Fetch para obter a questão atual
    fetch("http://localhost:5000/questaoAtual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUsuario }) // Enviando ID do usuário
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          setQuestao(data);
          setMensagem(""); // Limpa a mensagem de erro caso tenha sucesso
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar questão:", error);
        setMensagem("Erro ao carregar a questão.");
      });
  }, [idUsuario]); // Dependência de idUsuario para refazer o fetch se necessário

  useEffect(() => {
    // Redireciona dependendo do tipo da questão
    if (questao) {
      console.log("Redirecionando para:", questao.tipo);

      // Verificando se o idQuestao está disponível
      const idQuestao = questao.id; // Obtém o idQuestao diretamente da resposta da questão

      console.log("Id da questao:", idQuestao)

      if (questao.tipo === "aberta") {
        navigate("/perguntaAberta", { state: { questao, idUsuario, pontosAcumulados } });
      } else if (questao.tipo === "optativa") {
        navigate("/perguntaOptativa", {
          state: { 
            questao, 
            idUsuario, 
            pontosAcumulados, 
            idQuestao // Passando o idQuestao corretamente
          }
        });
      }
    }
  }, [questao, idUsuario, pontosAcumulados, navigate]); // Dependências para garantir o redirecionamento correto

  return (
    <div>
      <h3>{mensagem || (questao ? questao.enunciado : "Carregando questão...")}</h3>
      <p>Tempo restante: {tempoRestante}s</p>
    </div>
  );
}

export default Questao;
