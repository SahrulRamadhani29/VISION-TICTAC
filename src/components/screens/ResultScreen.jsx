import { useEffect, useRef } from "react";
import useCamera from "../../hooks/useCamera";
import { updateStats, getUser } from "../../storage/userStorage";

export default function ResultScreen({ goTo, result, gameConfig, user, setUser }) {
  const videoRef = useCamera();

  const player = gameConfig?.playerSymbol;
  const ai = gameConfig?.aiSymbol;
  const name = user?.name || "Player";

  // 🔥 GUARD BIAR GAK DOUBLE (STRICT MODE FIX)
  const hasUpdated = useRef(false);

  let message = "";

  // =========================
  // 🎯 CUSTOM MESSAGE
  // =========================
  if (result === player) {
    message = `Selamat ${name} Kamu Menang 🤩😎`;
  } else if (result === ai) {
    message = `Jirrrr Cupu Banget ${name} Kalah Sama AI 😹`;
  } else {
    message = `Tcih ${name}, Masa lawan AI Seri 😤`;
  }

  // =========================
  // 💾 UPDATE STATS + SYNC STATE (FINAL FIX)
  // =========================
  useEffect(() => {
    if (!result || hasUpdated.current) return;

    hasUpdated.current = true; // 🔥 cegah double increment

    // 🔥 UPDATE STORAGE
    if (result === player) updateStats("win");
    else if (result === ai) updateStats("lose");
    else updateStats("draw");

    // 🔥 SYNC KE STATE
    const updatedUser = getUser();
    if (updatedUser && setUser) {
      setUser(updatedUser);
    }
  }, [result]);

  return (
    <div className="game-container">

      {/* 🎥 CAMERA FULL */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera"
      />

      {/* 🔥 RESULT TEXT */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "32px",
          fontWeight: "bold",
          zIndex: 2,
          padding: "0 16px",
        }}
      >
        {message}
      </div>

      {/* 🔘 BUTTON */}
      <button
        onClick={() => goTo("welcome")}
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 24px",
          fontSize: 18,
          zIndex: 2,
        }}
      >
        Kembali ke Menu
      </button>

    </div>
  );
}