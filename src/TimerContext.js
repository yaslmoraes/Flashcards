// TimerContext.js
import React, { createContext, useState, useRef, useContext } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [tempoRestante, setTempoRestante] = useState(300); // 5 minutos
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return; // Evita múltiplos timers
  
    timerRef.current = setInterval(() => {
      setTempoRestante((prevTempo) => {
        console.log(`⏱️ Tempo restante: ${prevTempo - 1}s`);
  
        if (prevTempo <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsTimeUp(true);
          return 0;
        }
        return prevTempo - 1;
      });
    }, 1000);
  };  

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTempoRestante(300); // Reinicia os 5 minutos
    setIsTimeUp(false);
  };

  return (
    <TimerContext.Provider value={{
      tempoRestante,
      isTimeUp,
      startTimer,
      stopTimer,
      resetTimer
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export function useTimer() {
  return useContext(TimerContext);
}
