import { useState, useEffect, useRef } from "react";
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

  // 🔥 STATE BARU: Untuk Fitur Hold-to-Select (Tahan 1 Detik)
  const [hoveredCell, setHoveredCell] = useState(null);
  const [countdown, setCountdown] = useState(null);

  // useRef dipakai buat nyimpan memori waktu biar gak bentrok
  const hoverTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = playerSymbol;

    setBoard(newBoard);
    setIsPlayerTurn(false);
    
    // Reset efek hover setelah berhasil milih
    setHoveredCell(null); 
    setCountdown(null);
  };

  // 🔥 AI + WIN CHECK (Tetap Sama)
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

  // 🔥 DETEKSI HOVER GESTURE (Hanya mantau, TIDAK langsung klik)
  useEffect(() => {
    if (!gesture || !gesture.isPointing || !isPlayerTurn) {
      if (hoveredCell !== null) setHoveredCell(null);
      return;
    }

    let foundCell = null;
    document.querySelectorAll(".cell").forEach((cell, i) => {
      const rect = cell.getBoundingClientRect();
      // Tabrakan kursor & kotak
      if (
        gesture.x >= rect.left &&
        gesture.x <= rect.right &&
        gesture.y >= rect.top &&
        gesture.y <= rect.bottom &&
        !board[i]
      ) {
        foundCell = i;
      }
    });

    // Update state HANYA JIKA kotak yang ditunjuk berubah
    if (foundCell !== hoveredCell) {
      setHoveredCell(foundCell);
    }
  }, [gesture, isPlayerTurn, board, hoveredCell]);

  // 🔥 TIMER 1 DETIK + HITUNG MUNDUR (3.. 2.. 1)
  useEffect(() => {
    // Bersihkan timer kalau jari pindah kotak / keluar jalur (Batal klik)
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    if (hoveredCell !== null) {
      setCountdown(3); // Mulai dari angka 3

      // Kurangi angka setiap 333ms biar pas 1 detik habis
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 333);

      // 💥 BOOM! Eksekusi klik otomatis SETELAH ditahan 1000ms (1 detik)
      hoverTimerRef.current = setTimeout(() => {
        clearInterval(countdownIntervalRef.current);
        handleClick(hoveredCell);
      }, 1000);
    } else {
      setCountdown(null);
    }

    // Cleanup memori pas komponen re-render
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [hoveredCell]);

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
          transform: "scaleX(-1)", // Mirror kamera
        }}
      />

      {/* Pointer Titik Hijau (Sekarang dibikin lebih smooth geraknya) */}
      {gesture?.isPointing && (
        <div
          className="pointer"
          style={{
            left: `${gesture.x}px`,
            top: `${gesture.y}px`,
            transition: "left 0.1s ease-out, top 0.1s ease-out", 
          }}
        />
      )}

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
        <h2 style={{ color: "white", textShadow: "0px 2px 4px #000" }}>Vision TicTac</h2>

        <div className="board">
          {board.map((cell, i) => (
            <div
              key={i}
              className="cell"
              // onClick={() => handleClick(i)} -> Tetap ada buat backup kalau mau diklik manual pakai mouse
              onClick={() => handleClick(i)} 
              style={{
                position: "relative",
                // 🔥 EFEK VISUAL: Kotak nyala neon pas disorot telunjuk
                backgroundColor: hoveredCell === i ? "rgba(0, 255, 200, 0.4)" : "",
                transform: hoveredCell === i ? "scale(1.05)" : "scale(1)",
                borderColor: hoveredCell === i ? "#00ffc8" : "rgba(255, 255, 255, 0.4)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {cell}
              
              {/* 🔥 MUNCUL ANGKA HITUNG MUNDUR (3, 2, 1) DI TENGAH KOTAK */}
              {hoveredCell === i && !cell && countdown !== null && (
                <span
                  style={{
                    position: "absolute",
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "#00ffc8",
                    textShadow: "0 0 10px rgba(0,0,0,0.8)",
                  }}
                >
                  {countdown}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;