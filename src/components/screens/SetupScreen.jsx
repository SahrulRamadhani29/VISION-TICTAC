import { useState } from "react";

export default function SetupScreen({ goTo, setGameConfig }) {
  const [level, setLevel] = useState("easy");
  const [symbol, setSymbol] = useState("X");

  const handleStart = () => {
    const config = {
      level,
      playerSymbol: symbol,
      aiSymbol: symbol === "X" ? "O" : "X",
    };

    setGameConfig(config);
    goTo("game");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1>Setup Game ⚙️</h1>

      {/* LEVEL */}
      <div style={{ marginTop: 20 }}>
        <h3>Pilih Level</h3>
        <button onClick={() => setLevel("easy")}>
          EASY {level === "easy" && "✅"}
        </button>
        <button
          onClick={() => setLevel("hard")}
          style={{ marginLeft: 10 }}
        >
          HARD {level === "hard" && "🔥"}
        </button>
      </div>

      {/* SYMBOL */}
      <div style={{ marginTop: 20 }}>
        <h3>Pilih Simbol</h3>
        <button onClick={() => setSymbol("X")}>
          X {symbol === "X" && "✅"}
        </button>
        <button
          onClick={() => setSymbol("O")}
          style={{ marginLeft: 10 }}
        >
          O {symbol === "O" && "🔥"}
        </button>
      </div>

      {/* RULES */}
      <div style={{ marginTop: 30 }}>
        <h3>Aturan Main</h3>
        <p>Arahkan tangan ke kotak</p>
        <p>Angkat telunjuk untuk memilih</p>
      </div>

      {/* START BUTTON */}
      <button
        onClick={handleStart}
        style={{ marginTop: 30, padding: "10px 20px" }}
      >
        Mulai Game 🚀
      </button>
    </div>
  );
}