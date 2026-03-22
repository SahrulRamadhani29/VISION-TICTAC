import { useEffect, useState, useRef } from "react";
import { updateStats, getUser } from "../store/userStore";
import { getGameConfig } from "../store/gameStore";

function Result({ result, goToMenu }) {
  const [user, setUser] = useState(null);
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    const { playerSymbol } = getGameConfig();

    let final = "draw";
    if (result === playerSymbol) final = "win";
    else if (result !== "draw") final = "lose";

    updateStats(final);
    setUser(getUser());
  }, [result]);

  if (!user) return null;

  const { playerSymbol } = getGameConfig();

  return (
    <div className="container">
      <h2>Hasil</h2>

      {result === playerSymbol && (
        <p>Selamat {user.name} kamu menang 🤩🔥</p>
      )}

      {result === "draw" && (
        <p>{user.name} seri 😤🔥</p>
      )}

      {result !== "draw" && result !== playerSymbol && (
        <p>Kalah dari AI 😹 coba lagi!</p>
      )}

      <button onClick={goToMenu}>Menu</button>
    </div>
  );
}

export default Result;