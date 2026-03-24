import { useState } from "react";
import "../../styles/setup.css";

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
    <div className="setup-container">
      <h1>Setup Game</h1>

      {/* LEVEL */}
      <div className="setup-group">
        <h3>Level</h3>

        <button
          className={level === "easy" ? "active" : ""}
          onClick={() => setLevel("easy")}
        >
          Easy
        </button>

        <button
          className={level === "hard" ? "active" : ""}
          onClick={() => setLevel("hard")}
        >
          Hard
        </button>
      </div>

      {/* SYMBOL */}
      <div className="setup-group">
        <h3>Select Symbol</h3>

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

        <div className="setup-group">
        <h3>🎮 How to Play</h3>

        <p style={{ margin: 0 }}>👋 Point your hand to the box</p>
        <p style={{ margin: 0 }}>☝️ Raise your index finger to select</p>
        <p style={{ margin: 0 }}>⏳ Hold 1 second to select the box (3-2-1)</p>
        </div>

      {/* START */}
      <button className="start-btn" onClick={handleStart}>
        Start Game 🚀
      </button>
    </div>
  );
}