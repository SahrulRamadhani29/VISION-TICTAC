import { useEffect, useState, useRef } from "react";
import { updateStats, getUser } from "../store/userStore";
import { getGameConfig } from "../store/gameStore";

function Result({ result, goToMenu }) {
  const [user, setUser] = useState(null);
  const hasUpdated = useRef(false); // 🔥 anti double update

  useEffect(() => {
    if (hasUpdated.current) return;
    hasUpdated.current = true;

    const config = getGameConfig();
    const playerSymbol = config.playerSymbol;

    let finalResult = "draw";

    if (result === playerSymbol) {
      finalResult = "win";
    } else if (result === "draw") {
      finalResult = "draw";
    } else {
      finalResult = "lose";
    }

    updateStats(finalResult);

    const data = getUser();
    setUser(data);
  }, [result]);

  if (!user) return null;

  return (
    <div className="container">
      <h2>Hasil Game</h2>

      {result === getGameConfig().playerSymbol && (
        <p className="result-text">
          Selamat {user.name} kamu menang 🤩😎🔥
        </p>
      )}

      {result === "draw" && (
        <p className="result-text">
          {user.name} Skor Seri, Gas Mainkan Lagi! 😤🔥
        </p>
      )}

      {result !== "draw" &&
        result !== getGameConfig().playerSymbol && (
          <p className="result-text">
            Yahh kalah sama AI 😹🤪 coba lagi!
          </p>
        )}

      <button onClick={goToMenu}>Kembali ke Menu</button>
    </div>
  );
}

export default Result;