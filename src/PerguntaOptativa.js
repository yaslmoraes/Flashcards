import React, { useState, useEffect, useContext } from "react";
import "./perguntaOptativa.css";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useTimer } from './TimerContext';

function PerguntaOptativa() {
  const { tempoRestante, isTimeUp } = useTimer();
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [alternativa1, setAlternativa1] = useState(null)
  const [alternativa2, setAlternativa2] = useState(null)
  const [alternativa3, setAlternativa3] = useState(null)
  const [alternativa4, setAlternativa4] = useState(null)

  const questao = location.state?.questao;
  const idUsuario = location.state?.idUsuario || localStorage.getItem("usuarioId");
  let pontosAcumulados = location.state?.pontosAcumulados || 0; // Garantindo que os pontos acumulados começam com 0

  console.log("ID do Usuário recebido:", idUsuario);

  const idQuestao = location.state?.idQuestao;
  console.log("idQuestao no PerguntaOptativa:", idQuestao);  // Certifique-se de que está sendo acessado corretamente

  useEffect(() => {
    // Fetch para obter a alternativa 1
    fetch("http://localhost:5000/alternativa1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idQuestao }),
    })
      .then((res) => res.json()) // Converter resposta para JSON
      .then((data) => {
        console.log("Dados recebidos:", data); // Verifique os dados que estão sendo retornados
        if (data.error) {
          setMensagem(data.error);
        } else {
          setAlternativa1(data); // Atualizar o estado com os dados da alternativa 1
          setMensagem(""); // Limpa a mensagem de erro caso tenha sucesso
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar alternativa:", error);
        setMensagem("Erro ao carregar a alternativa.");
      });
  }, [idQuestao]);
  
  useEffect(() => {
    // Fetch para obter a alternativa 2
    fetch("http://localhost:5000/alternativa2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idQuestao }),
    })
      .then((res) => res.json()) // Converter resposta para JSON
      .then((data) => {
        console.log("Dados recebidos:", data); // Verifique os dados que estão sendo retornados
        if (data.error) {
          setMensagem(data.error);
        } else {
          setAlternativa2(data); // Atualizar o estado com os dados da alternativa 2
          setMensagem(""); // Limpa a mensagem de erro caso tenha sucesso
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar alternativa:", error);
        setMensagem("Erro ao carregar a alternativa.");
      });
  }, [idQuestao]);
  
  useEffect(() => {
    // Fetch para obter a alternativa 3
    fetch("http://localhost:5000/alternativa3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idQuestao }),
    })
      .then((res) => res.json()) // Converter resposta para JSON
      .then((data) => {
        console.log("Dados recebidos:", data); // Verifique os dados que estão sendo retornados
        if (data.error) {
          setMensagem(data.error);
        } else {
          setAlternativa3(data); // Atualizar o estado com os dados da alternativa 3
          setMensagem(""); // Limpa a mensagem de erro caso tenha sucesso
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar alternativa:", error);
        setMensagem("Erro ao carregar a alternativa.");
      });
  }, [idQuestao]);
  
  useEffect(() => {
    // Fetch para obter a alternativa 4
    fetch("http://localhost:5000/alternativa4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idQuestao }),
    })
      .then((res) => res.json()) // Converter resposta para JSON
      .then((data) => {
        console.log("Dados recebidos:", data); // Verifique os dados que estão sendo retornados
        if (data.error) {
          setMensagem(data.error);
        } else {
          setAlternativa4(data); // Atualizar o estado com os dados da alternativa 4
          setMensagem(""); // Limpa a mensagem de erro caso tenha sucesso
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar alternativa:", error);
        setMensagem("Erro ao carregar a alternativa.");
      });
  }, [idQuestao]);

  useEffect(() => {
    if (isTimeUp) {
      alert("Tempo esgotado!");
      navigate('/'); // redireciona para a tela inicial
    }
  }, [isTimeUp, navigate]);

  // Função para enviar a resposta ao clicar em uma alternativa
  const enviarResposta = (resposta, pontosGanhos) => {
    if (!questao) {
      setMensagem("Erro: Nenhuma questão carregada!");
      return;
    }
    if (!idUsuario) {
      setMensagem("Erro: ID do usuário não encontrado!");
      return;
    }
  
    pontosAcumulados += pontosGanhos;
  
    fetch("http://localhost:5000/responderQuestaoOptativa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario,
        idQuestao: questao.id,
        respostaUsuario: resposta, // <-- usa o parâmetro aqui
        pontos: pontosAcumulados,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
          if (data.respostaCorreta) {
            setRespostaCorreta(data.respostaCorreta);
          }
        } else {
          setMensagem(data.message); // Mensagem de sucesso
          setRespostaCorreta(null); // Limpar resposta correta
          setRespostaUsuario(""); // Limpar input após o envio

          // Atraso de 10 segundos antes de redirecionar para a próxima questão
          setTimeout(() => {
            // Buscar a pontuação atual do usuário
            fetch(`http://localhost:5000/getPontuacaoUsuario/${idUsuario}`)
              .then((res) => res.json())
              .then((usuarioData) => {
                if (usuarioData.error) {
                  setMensagem(usuarioData.error);
                  return;
                }

                const pontuacaoAtual = usuarioData.pontuacao;

                // Verifica se a pontuação acumulada é maior do que a pontuação no banco de dados
                if (pontosAcumulados > pontuacaoAtual) {
                  // Atualiza a pontuação no banco de dados
                  fetch("http://localhost:5000/atualizarPontuacao", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      idUsuario,
                      novaPontuacao: pontosAcumulados,
                    }),
                  })
                    .then((res) => res.json())
                    .then((updateData) => {
                      if (updateData.error) {
                        setMensagem(updateData.error);
                      } else {
                        setMensagem(updateData.message); // Mensagem de sucesso ao atualizar
                      }
                    })
                    .catch((error) => console.error("Erro ao atualizar pontuação:", error));
                } else {
                  setMensagem("Os pontos acumulados não são maiores que a pontuação atual.");
                }
              })
              .catch((error) => console.error("Erro ao buscar pontuação do usuário:", error));

            // Redireciona para a próxima questão após o atraso
            fetch("http://localhost:5000/questaoAtual", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idUsuario, pontosAcumulados }),
            })
              .then((res) => res.json())
              .then((nextQuestao) => {
                // Redireciona para a página da próxima questão
                navigate("/questaoAtual", {
                  state: {
                    questao: nextQuestao,
                    idUsuario,
                    pontosAcumulados,
                  },
                });
              })
              .catch((error) => console.error("Erro ao buscar próxima questão:", error));
          }, 2000); // 10000ms = 10 segundos
        }
      })
      .catch((error) => console.error("Erro ao enviar resposta:", error));
      console.log(alternativa1);
  };
  return (
    <>
    <p>Tempo restante: {tempoRestante}s</p>
        <div className="perguntaOptativa-tudo">
        <div className="perguntaOptativa-logo">
          <img
            className="perguntaOptativa-icone-raio"
            src={RaioIcone}
            alt="imagem-raio"
          />
          <div className="perguntaOptativa-logo-text">
            <div className="perguntaOptativa-flashcards">FLASHCARDS</div>
          </div>
        </div>

        <div className="perguntaOptativa-resposta">
          <div className="perguntaOptativa-pergunta">
            <span className="perguntaOptativa-pergunta1">
            {questao ? questao.enunciado : "Carregando questão..."}
            </span>
          </div>
        </div>
        
        <div className="perguntaOptativa-alternativa">
        <button 
  className="perguntaOptativa-A" 
  onClick={() => enviarResposta(alternativa1?.resposta, 10)}
>
  <p id="A">{alternativa1 ? alternativa1.resposta : "Carregando alternativa..."}</p>
</button>

<button 
  className="perguntaOptativa-B" 
  onClick={() => enviarResposta(alternativa2?.resposta, 10)}
>
  <p id="B">{alternativa2 ? alternativa2.resposta : "Carregando alternativa..."}</p>
</button>

<button 
  className="perguntaOptativa-C" 
  onClick={() => enviarResposta(alternativa3?.resposta, 10)}
>
  <p id="C">{alternativa3 ? alternativa3.resposta : "Carregando alternativa..."}</p>
</button>

<button 
  className="perguntaOptativa-D" 
  onClick={() => enviarResposta(alternativa4?.resposta, 10)}
>
  <p id="D">{alternativa4 ? alternativa4.resposta : "Carregando alternativa..."}</p>
</button>
        </div>
        </div>

      {mensagem && <p>{mensagem}</p>}
      {respostaCorreta && <p id="respostaCorreta"><u>Resposta correta:</u> {respostaCorreta}</p>}
    </>
  );
}

export default PerguntaOptativa;
