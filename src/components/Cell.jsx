import "../styles/cell.css";

export default function Cell({ value, onClick, isHover, isHolding, countdown }) {
  return (
    <div
      className={`cell ${isHover ? "hover" : ""}`}
      onClick={onClick}
      style={{ position: "relative" }}
    >
      {value}

      {/* 🔥 COUNTDOWN DI DALAM KOTAK */}
      {isHolding && countdown !== null && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "40px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {countdown}
        </div>
      )}
    </div>
  );
}