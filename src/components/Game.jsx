import { useState, useEffect } from "react";
import { checkWinner } from "../logic/gameLogic";
import { getRandomMove, getBestMove } from "../logic/aiLogic";
import { getGameConfig, setGameResult } from "../store/gameStore";
import useCamera from "../hooks/useCamera";
import useGesture from "../hooks/useGesture";

function Game({ goToResult }) {
  const videoRef = useCamera();
  const gesture = useGesture(videoRef);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const { playerSymbol, aiSymbol, level } = getGameConfig();

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = playerSymbol;

    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // 🔥 AI + WIN CHECK
  useEffect(() => {
    const winner = checkWinner(board);

    if (winner) {
      setTimeout(() => {
        setGameResult(winner);
        goToResult(winner);
      }, 500);
      return;
    }

    if (!isPlayerTurn) {
      setTimeout(() => {
        const move =
          level === "easy"
            ? getRandomMove(board)
            : getBestMove(board, aiSymbol, playerSymbol);

        if (move !== null) {
          const newBoard = [...board];
          newBoard[move] = aiSymbol;
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }, 400);
    }
  }, [board]);

  // 🔥 GESTURE SELECT (SAFE)
  useEffect(() => {
    if (!gesture || !gesture.isPointing || !isPlayerTurn) return;

    document.querySelectorAll(".cell").forEach((cell, i) => {
      const rect = cell.getBoundingClientRect();

      if (
        gesture.x >= rect.left &&
        gesture.x <= rect.right &&
        gesture.y >= rect.top &&
        gesture.y <= rect.bottom &&
        !board[i]
      ) {
        handleClick(i);
      }
    });
  }, [gesture?.isPointing]);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)", // 🔥 mirror biar natural
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "brightness(0.6)",
        }}
      >
        <h2 style={{ color: "white" }}>Vision TicTac</h2>

        <div className="board">
          {board.map((cell, i) => (
            <div
              key={i}
              className="cell"
              onClick={() => handleClick(i)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;