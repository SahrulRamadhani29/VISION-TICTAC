import { useState } from "react";

function Setup({ goToGame }) {
  const [level, setLevel] = useState("easy");
  const [symbol, setSymbol] = useState("X");

  const handleStart = () => {
    goToGame({ level, symbol });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Pilih Level</h2>
      <button onClick={() => setLevel("easy")}>Izzii Bocil</button>
      <button onClick={() => setLevel("hard")}>Izzii Dewasa</button>

      <h2>Pilih Simbol</h2>
      <button onClick={() => setSymbol("X")}>X</button>
      <button onClick={() => setSymbol("O")}>O</button>

      <h3>Cara Bermain:</h3>
      <p>✋ Arahkan tangan ke kotak</p>
      <p>☝️ Gunakan telunjuk untuk memilih</p>
      <p>⏱️ Tahan sebentar untuk konfirmasi</p>

      <button onClick={handleStart}>Mulai Game</button>
    </div>
  );
}

export default Setup;