import { updateStats } from "../../utils/storage";

export default function ResultScreen({ goTo }) {
        useEffect(() => {
    if (!result) return;

    if (result === playerSymbol) {
        updateStats("win");
    } else if (result === aiSymbol) {
        updateStats("lose");
    } else {
        updateStats("draw");
    }
    }, []);
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>RESULT SCREEN</h1>

      <button onClick={() => goTo("welcome")}>
        Kembali ke Home
      </button>
    </div>
  );
  
}