import { useState, useEffect, useRef } from "react";
import "../../styles/game.css";
import "../../styles/board.css";
import "../../styles/cell.css";

import Board from "../Board";
import { checkWinner } from "../../utils/checkWinner";

// 👁️ TAMBAHAN (VISION)
import useCamera from "../../hooks/useCamera";
import useGesture from "../../hooks/useGesture";

import { mapToGrid } from "../../utils/mapToGrid";

export default function GameScreen({ goTo, gameConfig, setResult }) {
  console.log("GAME CONFIG:", gameConfig);

  // =========================
  // 👁️ VISION STATE
  // =========================
  const videoRef = useCamera();
  const gesture = useGesture(videoRef);

  // =========================
  // 🎮 GAME STATE
  // =========================
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("player");
  const [winner, setWinner] = useState(null);
  const [gameActive, setGameActive] = useState(true);

  const playerSymbol = gameConfig?.playerSymbol || "X";
  const aiSymbol = gameConfig?.aiSymbol || "O";

  // 🔥 HOVER STATE
  const [hoverIndex, setHoverIndex] = useState(-1);

  // 🎥 CANVAS REF
  const canvasRef = useRef(null);

  // =========================
  // 🔥 HOLD SYSTEM (FIXED)
  // =========================
  const [holdIndex, setHoldIndex] = useState(-1);
  const [holdTime, setHoldTime] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [holdStart, setHoldStart] = useState(null); // 🔥 BARU

  // =========================
  // 🎯 PLAYER MOVE (CLICK)
  // =========================
  const handleCellClick = (index) => {
    if (!gameActive) return;
    if (turn !== "player") return;
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;

    setBoard(newBoard);
    setTurn("ai");
  };

  // =========================
  // 🤖 AI MOVE (RANDOM)
  // =========================
  const aiMove = () => {
    const empty = board
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);

    if (empty.length === 0) return;

    const randomIndex =
      empty[Math.floor(Math.random() * empty.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = aiSymbol;

    setBoard(newBoard);
    setTurn("player");
  };

  // =========================
  // 🎯 HOVER DETECTION
  // =========================
  useEffect(() => {
    if (!gesture.isPointing) {
      setHoverIndex(-1);
      return;
    }

    const mirroredX = 1 - gesture.x;
    const index = mapToGrid(mirroredX, gesture.y);
    setHoverIndex(index);
  }, [gesture]);

  // =========================
  // 🔥 HOLD DETECTION (FIX TOTAL)
  // =========================
  useEffect(() => {
    if (!gesture.isPointing || hoverIndex === -1 || turn !== "player") {
      setHoldIndex(-1);
      setHoldTime(0);
      setCountdown(null);
      setHoldStart(null);
      return;
    }

    if (holdIndex !== hoverIndex) {
      setHoldIndex(hoverIndex);
      setHoldStart(Date.now());
      return;
    }

    if (holdStart) {
      const elapsed = Date.now() - holdStart;
      setHoldTime(elapsed);
    }
  }, [gesture, hoverIndex, holdIndex, turn, holdStart]);

  // =========================
  // 🔥 COUNTDOWN + EXECUTE
  // =========================
  useEffect(() => {
    if (holdTime >= 1000 && holdIndex !== -1) {
      handleCellClick(holdIndex);

      setHoldIndex(-1);
      setHoldTime(0);
      setCountdown(null);
      setHoldStart(null);
      return;
    }

    if (holdTime > 0) {
      const sec = Math.ceil((1000 - holdTime) / 333);
      setCountdown(sec);
    }
  }, [holdTime, holdIndex]);

  // =========================
  // 🔴 DRAW POINT
  // =========================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gesture.isPointing) {
      const x = (1 - gesture.x) * canvas.width;
      const y = gesture.y * canvas.height;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }, [gesture]);

  // =========================
  // 🧠 CHECK GAME STATE
  // =========================
  useEffect(() => {
    const result = checkWinner(board);

    if (result) {
      setWinner(result);
      setGameActive(false);

      setResult(result);
      setTimeout(() => goTo("result"), 1000);
      return;
    }

    if (!board.includes(null)) {
      setWinner("draw");
      setGameActive(false);

      setResult("draw");
      setTimeout(() => goTo("result"), 1000);
      return;
    }

    if (turn === "ai" && gameActive) {
      const timer = setTimeout(() => {
        aiMove();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [board, turn]);

  // =========================
  // 🔄 RESET
  // =========================
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("player");
    setWinner(null);
    setGameActive(true);
  };

  return (
    <div className="game-container">

      {/* 🎥 CAMERA */}
      <video ref={videoRef} autoPlay playsInline className="camera" />

      {/* 🔴 CANVAS */}
      <canvas
        ref={canvasRef}
        width={videoRef.current?.clientWidth || window.innerWidth}
        height={videoRef.current?.clientHeight || window.innerHeight}
        className="canvas-overlay"
      />



      <Board
      board={board}
      onClick={handleCellClick}
      hoverIndex={hoverIndex}
      holdIndex={holdIndex}      // 🔥 BARU
      countdown={countdown}      // 🔥 BARU
      />

      <div className="status">
        {winner === "draw" && <p>Draw!</p>}
        {winner === playerSymbol && <p>You Win 🎉</p>}
        {winner === aiSymbol && <p>You Lose 😈</p>}
        {!winner && (
          <p>
            {turn === "player" ? "Your Turn 👤" : "AI Thinking 🤖"}
          </p>
        )}
      </div>

      <button onClick={resetGame}>Reset</button>

      <div style={{ marginTop: 10 }}>
        <p>X: {gesture.x.toFixed(2)}</p>
        <p>Y: {gesture.y.toFixed(2)}</p>
        <p>Pointing: {gesture.isPointing ? "YES 👉" : "NO ❌"}</p>
        <p>Hover Index: {hoverIndex}</p>
      </div>

    </div>
  );
}