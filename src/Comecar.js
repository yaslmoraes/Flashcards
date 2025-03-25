import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./comecar.css";
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";

function Comecar() {
  const [message, setMessage] = useState("Testando conexão...");

  useEffect(() => {
    fetch("http://localhost:5000/comecar")
      .then((res) => res.json())
      .then((data) => setMessage(`Backend conectado: ${data.message}`))
      .catch((err) => setMessage("Erro ao conectar ao backend!"));
  }, []);

  const navigate = useNavigate();
    const iniciar = () => {
      navigate('/questaoAtual'); 
  };

  return (
    <>
      <img src={logo} className="logo-cachorro" alt="Cachorro fofo" />
      <i className="fas fa-cog config"></i>
      <div className="container">
        <div className="cinza_escuro">
          <div className="comecar-logo">
            <div className="comecar-logo-text">
            <img src={RaioIcone} className="comecar-icone-raio" alt="Ícone de Raio" />
              <div className="comecar-flashcards-wrapper">
                <div className="comecar-flashcards">FLASHCARDS</div>
                <div className="comecar-text-shadow1">FLASHCARDS</div>
              </div>
              <span className="comecar-java">JAVA</span>
              <div className="comecar-edition-wrapper">
                <div className="comecar-edition">edition</div>
                <div className="comecar-text-shadow2">edition</div>
              </div>
              <div className="nickname">
                <form className="formulario">
                  <input 
                    type="text" 
                    id="nick" 
                    name="nick" 
                    placeholder="Digite seu nome"
                  />
                  <button className="tutorial-botao" onClick={iniciar}>
                    <p className="botao-entendi">Entendi!</p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comecar;
