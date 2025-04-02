import React from "react";
import { TimerProvider } from './TimerContext';
import TelaInicial from "./TelaInicial";
import Comecar from "./Comecar";
import Tutorial from "./Tutorial";
import Pontuacao from "./Pontuacao";
import Questao from "./Questao";
import PerguntaAberta from "./PerguntaAberta.jsx";
import PerguntaOptativa from "./PerguntaOptativa.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <TimerProvider> {/* Envolvendo a árvore de componentes com o TimerProvider */}
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/comecar" element={<Comecar />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/pontuacao" element={<Pontuacao />} />
          <Route path="/questaoAtual" element={<Questao />} />
          <Route path="/perguntaAberta" element={<PerguntaAberta />} />
          <Route path="/perguntaOptativa" element={<PerguntaOptativa />} />
        </Routes>
      </div>
    </Router>
    </TimerProvider>
  );
}

export default App;