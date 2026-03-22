import { useState, useEffect } from "react";
import { checkWinner } from "../logic/gameLogic";
import { getRandomMove, getBestMove } from "../logic/aiLogic";
import { getGameConfig, setGameResult } from "../store/gameStore";

function Game({ goToResult }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const config = getGameConfig();
  const playerSymbol = config.playerSymbol;
  const aiSymbol = config.aiSymbol;
  const level = config.level;

  // HANDLE PLAYER MOVE
  const handleClick = (index) => {
    if (!isPlayerTurn) return;
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;

    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // HANDLE GAME FLOW
  useEffect(() => {
    const winner = checkWinner(board);

    if (winner) {
      setTimeout(() => {
        setGameResult(winner);
        goToResult(winner);
      }, 500);
      return;
    }

    // AI MOVE
    if (!isPlayerTurn) {
      setTimeout(() => {
        let move;

        if (level === "easy") {
          move = getRandomMove(board);
        } else {
          move = getBestMove(board, aiSymbol, playerSymbol);
        }

        if (move !== null) {
          const newBoard = [...board];
          newBoard[move] = aiSymbol;

          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }, 400);
    }
  }, [board]);

  return (
    <div className="container">
      <h2>Game Dimulai</h2>

      <p>
        Kamu: <b>{playerSymbol}</b> | AI: <b>{aiSymbol}</b>
      </p>

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
  );
}

export default Game;