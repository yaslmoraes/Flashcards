import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./nickname.css";
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import Config from "./public/font-awesome-4.7.0/css/font-awesome.min.css";
import musica from "./public/lofi - no copyright.mp3";

function Comecar() {
  const [message, setMessage] = useState("Testando conexão...");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [musicActive, setMusicActive] = useState(false); // Controla a exibição do player de música
  const [isPlaying, setIsPlaying] = useState(false); // Controla o estado de play/pause
  const audioRef = useRef(null);


  useEffect(() => {
    fetch("http://localhost:5000/comecar")
      .then((res) => res.json())
      .then((data) => setMessage(`Backend conectado: ${data.message}`))
      .catch((err) => setMessage("Erro ao conectar ao backend!"));
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


  const cadastrarUsuario = () => {
    if (!nome.trim()) {
      console.error("Nome não pode estar vazio!");
      return;
    }

    fetch("http://localhost:5000/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }) 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
            console.log("Usuário cadastrado com ID:", data.id);
            navigate('/questaoAtual', { state: { idUsuario: data.id } }); // Envia o ID para a página de questões
        } else {
            console.error("Erro ao cadastrar usuário:", data.error);
        }
    })
      .catch((error) => console.error("Erro ao cadastrar:", error));
  };

  return (
    <>
      <img 
        src={logo} className="nickname-logo-cachorro"
        alt="Cachorro pixelado"
      />

      {/* Ícone de Configuração */}
      <i 
      src={Config}
        id="cog" 
        className="fa fa-cog"
        onClick={() => setSidebarOpen(true)}
      ></i>

      {/* Ícone de Configuração */}
      <i 
	        id="cog" 
	        className="fa fa-cog"
	        onClick={() => setSidebarOpen(true)}
	      ></i>
      <div className="nickname-container">
        <div className="nickname-cinza_escuro">
          <div className="nickname-logo">
            <div className="nickname-logo-text">
              <img 
                src={RaioIcone} 
                className="nickname-icone-raio" 
                alt="Ícone de Raio"
              />
              <div className="nickname-flashcards-wrapper">
                <div className="nickname-flashcards">FLASHCARDS</div>
                <div className="nickname-text-shadow1">FLASHCARDS</div>
              </div>
              <span className="nickname-java">JAVA</span>
              <div className="nickname-edition-wrapper">
                <div className="nickname-edition">edition</div>
                <div className="nickname-text-shadow2">edition</div>
              </div>
              <div className="nickname">
                <form className="nickname-formulario" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="text" 
                    id="nick" 
                    name="nick" 
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <button className="nickname-botaoIniciar" onClick={cadastrarUsuario}>
                    <p className="nickname-iniciar">Iniciar</p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
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

    </>
  );
}

export default Comecar;
