import { useEffect } from "react";
import { updateStats } from "../../utils/storage";

export default function ResultScreen({ goTo, result, user }) {

  useEffect(() => {
    if (!result || !user) return;

    if (result === user.playerSymbol) {
      updateStats("win");
    } else if (result === user.aiSymbol) {
      updateStats("lose");
    } else {
      updateStats("draw");
    }
  }, [result, user]);

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>RESULT SCREEN</h1>

      <button onClick={() => goTo("welcome")}>
        Kembali ke Home
      </button>
    </div>
  );
}