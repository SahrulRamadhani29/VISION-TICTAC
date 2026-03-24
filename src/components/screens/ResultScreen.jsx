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
  message = `Not bad ${name}, you beat the AI 😏🔥`;
} else if (result === ai) {
  message = `Nahhh ${name}, losing to AI is crazy 💀😹`;
} else {
  message = `${name}... you couldn't even win? 😤`;
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
            left: "50%",
            transform: "translateX(-50%)",

            background: "rgba(0,0,0,0.2)", // 🔥 20% hitam
            backdropFilter: "blur(6px)",   // 🔥 glass effect

            padding: "10px 16px",
            borderRadius: "12px",

            color: "white",
            fontSize: "20px", // 🔥 LEBIH KECIL
            fontWeight: "600",

            zIndex: 3,
            maxWidth: "90%",
            textAlign: "center",
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
        Back to Menu
      </button>

    </div>
  );
}