import { useEffect, useState, useRef } from "react";
import { updateStats, getUser } from "../store/userStore";
import { getGameConfig } from "../store/gameStore";
import useCamera from "../hooks/useCamera";

function Result({ result, goToMenu }) {
  const [user, setUser] = useState(null);
  const once = useRef(false);
  const videoRef = useCamera(); // 🔥 Nyalakan kamera di background

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    const { playerSymbol } = getGameConfig();

    let final = "draw";
    if (result === playerSymbol) final = "win";
    else if (result !== "draw") final = "lose";

    updateStats(final);
    setUser(getUser());
  }, [result]);

  if (!user) return null;

  const { playerSymbol } = getGameConfig();

  return (
    <div className="result-wrapper">
      {/* Background Kamera Full Jernih Tanpa Blur */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-bg-result"
      />

      {/* Overlay Teks di Atas Layar, Tanpa BG Card */}
      <div className="result-overlay-text-only">
          <h2 className="result-title-clean">Hasil</h2>

          {/* 🔥 Kata-kata KEMBALI KE ORIGINAL lu bang! */}
          <div className="result-original-message">
            {result === playerSymbol && (
              <p>Selamat {user.name} kamu menang 🤩🔥</p>
            )}

            {result === "draw" && (
              <p>{user.name} seri 😤🔥</p>
            )}

            {result !== "draw" && result !== playerSymbol && (
              <p>Kalah dari AI 😹 coba lagi!</p>
            )}
          </div>

          <button className="btn-menu-back" onClick={goToMenu}>
            Menu
          </button>
      </div>
    </div>
  );
}

export default Result;