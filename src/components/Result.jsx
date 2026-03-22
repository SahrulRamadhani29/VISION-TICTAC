import { useEffect, useState } from "react";
import { updateStats, getUser } from "./store/userStore";

function Result({ result, goToMenu }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let finalResult = result;

    if (result === "X") finalResult = "win";
    if (result === "O") finalResult = "lose";

    updateStats(finalResult);

    const data = getUser();
    setUser(data);
  }, [result]);

  if (!user) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Hasil Game</h2>

      {result === "X" && (
        <p>Selamat {user.name} kamu menang 🤩😎🔥</p>
      )}

      {result === "O" && (
        <p>Yahh kalah sama AI 😹🤪 coba lagi!</p>
      )}

      {result === "draw" && (
        <p>{user.name} Skor Seri, Gas Mainkan Lagi! 😤🔥</p>
      )}

      <button onClick={goToMenu}>Kembali ke Menu</button>
    </div>
  );
}

export default Result;