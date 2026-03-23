import { useState } from "react";

function Setup({ goToGame }) {
  const [level, setLevel] = useState("easy");
  const [symbol, setSymbol] = useState("X");

  return (
    <div className="container">
      <h2>Pengaturan</h2>

      <h3>Level</h3>
      {/* Container baru untuk memastikan tombol berbaris ke bawah */}
      <div className="vertical-group">
        <button 
          className={level === "easy" ? "active" : ""} 
          onClick={() => setLevel("easy")}
        >
          Izzii Bocil
        </button>
        <button 
          className={level === "hard" ? "active" : ""} 
          onClick={() => setLevel("hard")}
        >
          Izzii Dewasa 😈
        </button>
      </div>

      <h3>Simbol</h3>
      {/* Container baru untuk memastikan tombol berbaris ke bawah */}
      <div className="vertical-group">
        <button 
          className={symbol === "X" ? "active" : ""} 
          onClick={() => setSymbol("X")}
        >
          X
        </button>
        <button 
          className={symbol === "O" ? "active" : ""} 
          onClick={() => setSymbol("O")}
        >
          O
        </button>
      </div>

      <h3>Cara Bermain</h3>
      <p>✋ Arahkan tangan ke kotak</p>
      <p>☝️ Gunakan telunjuk untuk memilih</p>
      <p>⏱️ Tahan sebentar untuk konfirmasi</p>

      <button className="btn-start" onClick={() => goToGame({ level, symbol })}>
        Mulai Game
      </button>
    </div>
  );
}

export default Setup;