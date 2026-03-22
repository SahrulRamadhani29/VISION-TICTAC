import { useState } from "react";

import Welcome from "../components/Welcome";
import Setup from "../components/Setup";
import Game from "../components/Game";
import Result from "../components/Result";

import { setGameConfig, getGameResult } from "../store/gameStore";

function App() {
  const [page, setPage] = useState("welcome");
  const [result, setResult] = useState(null);

  // pindah ke game + set config
  const handleStartGame = (config) => {
    setGameConfig(config);
    setPage("game");
  };

  // selesai game → ke result
  const handleGameEnd = (res) => {
    setResult(res);
    setPage("result");
  };

  return (
    <>
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
          goToMenu={() => setPage("welcome")}
        />
      )}
    </>
  );
}

export default App;