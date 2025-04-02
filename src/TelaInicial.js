import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./tela-inicial.css";
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import musica from "./public/lofi - no copyright.mp3";

function TelaInicial() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [musicActive, setMusicActive] = useState(false); // Controla a exibição do player de música
  const [isPlaying, setIsPlaying] = useState(false); // Controla o estado de play/pause
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/tutorial")
      .then((res) => res.json());
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Autoplay bloqueado:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event) => {
    if (audioRef.current) {
      audioRef.current.volume = event.target.value;
    }
  };

  return (
    <div className="container">
      <div className="telaInicial-cinza_escuro">
        <div className="telaInicial-logo-container">
          <img src={logo} className="telaInicial-logo-cachorro" alt="Cachorro fofo" />
          <div className="telaInicial-logo-text">
            <div className="telaInicial-flashcards-wrapper">
              <div className="telaInicial-flashcards">FLASHCARDS</div>
              <div className="telaInicial-text-shadow1">FLASHCARDS</div>
              <img src={RaioIcone} className="telaInicial-icone-raio" alt="Ícone de Raio" />
            </div>
            <span className="telaInicial-java">JAVA</span>
            <div className="telaInicial-edition-wrapper">
              <div className="telaInicial-edition">edition</div>
              <div className="telaInicial-text-shadow2">edition</div>
            </div>
          </div>
        </div>

        <i id="cog" className="fa fa-cog" onClick={() => setSidebarOpen(true)}></i>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>

        <p id="tela-inicial-som">Som</p>

        {/* Botão de Música ou Player de Música */}
        <p
          id="tela-inicial-musica"
          onClick={() => {
            setMusicActive(true);  // Aqui, ao clicar em "Música", só muda o estado para abrir o player.
            setPlayerOpen(true);   // Garantindo que o player seja aberto
            if (!isPlaying && audioRef.current) {
              audioRef.current.play().catch(err => console.log("Autoplay bloqueado:", err));
              setIsPlaying(true); // Se a música não estiver tocando, começa a tocar
            }
          }}
        >
          Música
        </p>

        {/* Se o player estiver aberto, renderiza o player */}
        {playerOpen && (
          <div className="player-container open">
            <audio ref={audioRef} src={musica} loop />
            <div className="player-controls">
              {/* Fechar player sem interromper a música */}
              <button className="close-btn" onClick={() => setPlayerOpen(false)}>×</button>
              <button className="player-button" onClick={toggleMusic}>
                {isPlaying ? "⏸️ Pausar" : "▶️ Tocar"}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={handleVolumeChange}
                defaultValue="1"
              />
            </div>
          </div>
        )}
      </div>

      <div className="telaInicial-botoes">
        <p className="telaInicial-botao" onClick={() => navigate("/comecar")}>Começar</p>
        <p className="telaInicial-botao" onClick={() => navigate("/tutorial")}>Tutorial</p>
        <p className="telaInicial-botao" onClick={() => navigate("/pontuacao")}>Pontuação</p>
      </div>
    </div>
  );
}

export default TelaInicial;
