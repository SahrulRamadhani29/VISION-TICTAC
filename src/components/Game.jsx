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

  // State untuk Hold-to-Select (Tahan 1 Detik)
  const [hoveredCell, setHoveredCell] = useState(null);
  const [countdown, setCountdown] = useState(null);

  // useRef untuk menyimpan timer
  const hoverTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = playerSymbol;

    setBoard(newBoard);
    setIsPlayerTurn(false);
    
    // Reset efek hover
    setHoveredCell(null); 
    setCountdown(null);
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

  // 🔥 GESTURE SELECT (REAL-TIME DETEKSI HOVER)
  useEffect(() => {
    if (!gesture || !gesture.isPointing || !isPlayerTurn) {
      if (hoveredCell !== null) setHoveredCell(null);
      return;
    }

    let foundCell = null;
    document.querySelectorAll(".cell").forEach((cell, i) => {
      const rect = cell.getBoundingClientRect();

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

    if (foundCell !== hoveredCell) {
      setHoveredCell(foundCell);
    }
  }, [gesture, isPlayerTurn, board, hoveredCell]);

  // 🔥 TIMER 1 DETIK + HITUNG MUNDUR (3.. 2.. 1)
  useEffect(() => {
    // Bersihkan timer lama
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    if (hoveredCell !== null) {
      setCountdown(3);

      // Kurangi angka setiap 333ms biar pas 1 detik habis
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 333);

      // Eksekusi klik otomatis setelah ditahan 1 detik
      hoverTimerRef.current = setTimeout(() => {
        clearInterval(countdownIntervalRef.current);
        handleClick(hoveredCell);
      }, 1000);
    } else {
      setCountdown(null);
    }

    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [hoveredCell]);

  return (
    // 🔥 Parent container dibikin bening total
    <div style={{ position: "relative", height: "100vh", backgroundColor: "transparent" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted // 🔥 Wajib muted biar Safari/iOS gak ngebokir
        className="camera-bg"
      />

      {/* Pointer sekarang warna Biru Putih Minimalis sesuai tema */}
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

      {/* UI Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // 🔥 Grid ditaruh Tengah Atas
          paddingTop: "60px", // Kasih jarak dikit dari atas layar
          backgroundColor: "transparent", // 🔥 Benar-benar bening
          zIndex: 10,
        }}
      >
        {/* Tulisan Judul dikasih shadow biar kebaca di kamera */}
        <h2 style={{ color: "white", textShadow: "0px 2px 10px rgba(0, 0, 0, 0.8)", marginBottom: "30px" }}>Vision TicTac</h2>

        <div className="board">
          {board.map((cell, i) => (
            <div
              key={i}
              className="cell"
              style={{
                position: "relative",
                // Efek hover Biru Elegan
                backgroundColor: hoveredCell === i ? "rgba(0, 102, 255, 0.3)" : "",
                transform: hoveredCell === i ? "scale(1.05)" : "scale(1)",
                borderColor: hoveredCell === i ? "#0066ff" : "rgba(255, 255, 255, 0.8)",
                transition: "all 0.2s ease-in-out",
                // Teks X / O dikasih shadow
                color: cell ? (cell === 'X' ? "#fff" : "#fff") : "",
                textShadow: cell ? "0 0 10px rgba(0,0,0,0.8)" : ""
              }}
            >
              {cell}
              
              {/* Angka Hitung Mundur */}
              {hoveredCell === i && !cell && countdown !== null && (
                <span
                  style={{
                    position: "absolute",
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "#00ffc8", // Warna cyan terang biar kontras
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