import { useState } from "react";
import { checkWinner } from "../logic/gameLogic";

function Game({ goToResult }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const handleClick = (index) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isX ? "X" : "O";

    setBoard(newBoard);
    setIsX(!isX);

    const result = checkWinner(newBoard);

    if (result) {
      setTimeout(() => {
        goToResult(result);
      }, 500);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Game Dimulai</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "80px",
              height: "80px",
              background: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;