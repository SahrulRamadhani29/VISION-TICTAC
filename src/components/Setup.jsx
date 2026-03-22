import { useState } from "react";

function Setup({ goToGame }) {
  const [level, setLevel] = useState("easy");
  const [symbol, setSymbol] = useState("X");

  return (
    <div className="container">
      <h2>Pengaturan</h2>

      <h3>Level</h3>
      <button onClick={() => setLevel("easy")}>
        Izzii Bocil
      </button>
      <button onClick={() => setLevel("hard")}>
        Izzii Dewasa 😈
      </button>

      <h3>Simbol</h3>
      <button onClick={() => setSymbol("X")}>X</button>
      <button onClick={() => setSymbol("O")}>O</button>

      <h3>Cara Bermain</h3>
      <p>✋ Arahkan tangan ke kotak</p>
      <p>☝️ Gunakan telunjuk untuk memilih</p>
      <p>⏱️ Tahan sebentar untuk konfirmasi</p>

      <button onClick={() => goToGame({ level, symbol })}>
        Mulai Game
      </button>
    </div>
  );
}

export default Setup;