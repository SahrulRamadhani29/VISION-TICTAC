import { useState } from "react";

import Welcome from "./components/Welcome";
import Setup from "./components/Setup";
import Game from "./components/Game";
import Result from "./components/Result";

import { setGameConfig } from "./store/gameStore";

function App() {
  const [page, setPage] = useState("welcome");
  const [result, setResult] = useState(null);

  // 🔹 START GAME (dari Setup)
  const handleStartGame = (config) => {
    setGameConfig(config);
    setResult(null);
    setPage("game");
  };

  // 🔹 GAME SELESAI
  const handleGameEnd = (res) => {
    setResult(res);
    setPage("result");
  };

  // 🔹 KEMBALI KE MENU
  const handleBackToMenu = () => {
    setResult(null);
    setPage("welcome");
  };

  return (
    <div>
      {page === "welcome" && (
        <Welcome goToSetup={() => setPage("setup")} />
      )}

      {page === "setup" && (
        <Setup goToGame={handleStartGame} />
      )}

      {page === "game" && (
        <Game goToResult={handleGameEnd} />
      )}

      {page === "result" && (
        <Result
          result={result}
          goToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;