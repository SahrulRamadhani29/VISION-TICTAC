import { useState } from "react";

import WelcomeScreen from "./components/screens/WelcomeScreen";
import SetupScreen from "./components/screens/SetupScreen";
import GameScreen from "./components/screens/GameScreen";
import ResultScreen from "./components/screens/ResultScreen";

function App() {
  const [screen, setScreen] = useState("welcome");

  // nanti kita isi data global di sini
  const [user, setUser] = useState(null);
  const [gameConfig, setGameConfig] = useState(null);
  const [result, setResult] = useState(null);

  // NAVIGATION FUNCTION
  const goTo = (nextScreen) => {
    setScreen(nextScreen);
  };

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen goTo={goTo} setUser={setUser} />
      )}

      {screen === "setup" && (
        <SetupScreen goTo={goTo} setGameConfig={setGameConfig} />
      )}

      {screen === "game" && (
        <GameScreen
          goTo={goTo}
          user={user}
          gameConfig={gameConfig}
          setResult={setResult}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          goTo={goTo}
          result={result}
          user={user}
        />
      )}
    </>
  );
}

export default App;