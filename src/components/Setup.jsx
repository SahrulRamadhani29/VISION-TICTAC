import { useState } from "react";

function Setup({ goToGame }) {
  const [level, setLevel] = useState("easy");   // easy | hard
  const [symbol, setSymbol] = useState("X");    // X | O

  const handleStart = () => {
    goToGame({ level, symbol }); // dikirim ke App.jsx → gameStore
  };

  return (
    <div className="container">
      <h2>Pengaturan Game</h2>

      {/* LEVEL */}
      <h3>Pilih Level</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setLevel("easy")}
          style={{
            background: level === "easy" ? "#111" : "#ddd",
            color: level === "easy" ? "#fff" : "#111",
          }}
        >
          Izzii Bocil
        </button>

        <button
          onClick={() => setLevel("hard")}
          style={{
            background: level === "hard" ? "#111" : "#ddd",
            color: level === "hard" ? "#fff" : "#111",
          }}
        >
          Izzii Dewasa (AI Dewa)
        </button>
      </div>

      {/* SYMBOL */}
      <h3>Pilih Simbol</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setSymbol("X")}
          style={{
            background: symbol === "X" ? "#111" : "#ddd",
            color: symbol === "X" ? "#fff" : "#111",
          }}
        >
          X
        </button>

        <button
          onClick={() => setSymbol("O")}
          style={{
            background: symbol === "O" ? "#111" : "#ddd",
            color: symbol === "O" ? "#fff" : "#111",
          }}
        >
          O
        </button>
      </div>

      {/* INFO CARA MAIN */}
      <h3>Cara Bermain</h3>
      <p>✋ Arahkan tangan ke kotak</p>
      <p>☝️ Gunakan telunjuk untuk memilih</p>
      <p>⏱️ Tahan sebentar untuk konfirmasi</p>

      {/* START */}
      <button onClick={handleStart}>
        Mulai Game
      </button>
    </div>
  );
}

export default Setup;