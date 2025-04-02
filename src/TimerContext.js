// TimerContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [tempoRestante, setTempoRestante] = useState(300); // Tempo inicial (5 minutos)
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    // Se o tempo acabar, evita setInterval rodando indefinidamente
    if (tempoRestante <= 0) return;

    const timer = setInterval(() => {
      setTempoRestante((prevTempo) => {
        console.log("PrevTempo: ", prevTempo)
        if (prevTempo === 1) {
          console.log("Chegou a 1")
          setIsTimeUp(true);  // Marca o tempo como esgotado
          prevTempo = 300
          clearInterval(timer);
          return 0;
        }
        return prevTempo - 1;
      });
    }, 1000);
    console.log("TimerContext: ", isTimeUp)

    return () => clearInterval(timer);  // Limpa o timer quando o componente for desmontado
  }, [isTimeUp, tempoRestante]);

  return (
    <TimerContext.Provider value={{ tempoRestante, setTempoRestante, isTimeUp, setIsTimeUp }}>
      {children}
    </TimerContext.Provider>
  );
};

export function useTimer() {
    return useContext(TimerContext); // Hook para usar o contexto
  }

