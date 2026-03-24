export default function ResultScreen({ goTo }) {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>RESULT SCREEN</h1>

      <button onClick={() => goTo("welcome")}>
        Kembali ke Home
      </button>
    </div>
  );
}