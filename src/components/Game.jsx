import React, { useState, useEffect, useRef } from 'react';
import useCamera from '../hooks/useCamera'; // Asumsi hook kamera lo standar
import useGesture from '../hooks/useGesture'; // Asumsi hook gesture lo standar
// Import CSS khusus Game (Gue sediain di bawah kalau belum ada)
import '../styles/game.css'; 

function Game({ level, symbol, goToResult }) {
  const videoRef = useRef(null);
  
  // 🔥 Jalankan kamera
  useCamera(videoRef);
  
  // 🔥 Jalankan deteksi gesture
  const gesture = useGesture(videoRef);
  
  // State Papan Game
  const [board, setBoard] = useState(Array(9).fill(null));

  // Logika Klik (Gue kasih dasar dulu, fokus fix kamera)
  const handleCellClick = (index) => {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = symbol; // Pemain jalan
    setBoard(newBoard);
    // Logika AI dll dimatikan dulu biar fokus fix tampilan
  };

  return (
    /* Container Utama Game: Harus RELATIVE, FULLSCREEN, & TRANSPARENT */
    <div className="game-screen-container">
      
      {/* 1. LAPISAN BELAKANG: Video Kamera */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="camera-video-feed"
      />

      {/* 2. LAPISAN TENGAH: UI Game (Grid TicTac) */}
      <div className="game-ui-overlay">
        <h1 className="game-title">Vision TicTac</h1>
        <p className="game-info">Level: {level} | Kamu: {symbol}</p>
        
        <div className="tic-tac-toe-board">
          {board.map((cell, index) => (
            <div 
              key={index} 
              className="game-cell" 
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>

      {/* 3. LAPISAN TERDEPAN: Pointer Jari (Gesture) */}
      {gesture && gesture.isPointing && (
        <div 
          className="gesture-pointer-finger" 
          style={{ 
            left: `${gesture.x}px`, 
            top: `${gesture.y}px` 
          }}
        />
      )}
    </div>
  );
}

export default Game;