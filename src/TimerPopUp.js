import React from 'react';

function TimerPopUp({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Tempo esgotado!</h2>
        <p>Você não conseguiu responder a tempo.</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default TimerPopUp;

  