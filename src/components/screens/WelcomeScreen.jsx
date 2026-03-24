import { useState, useEffect } from "react";
import { getUser, saveUser, createUser } from "../../storage/userStorage";
import "../../styles/setup.css"; // 🔥 pakai style yang sama biar konsisten

export default function WelcomeScreen({ goTo, setUser }) {
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);

  // =========================
  // 🔥 LOAD USER SAAT MASUK
  // =========================
  useEffect(() => {
    const existingUser = getUser();
    if (existingUser) {
      setUserData(existingUser);
      setName(existingUser.name);
      setUser(existingUser);
    }
  }, []);

  // =========================
  // 🚀 HANDLE START
  // =========================
  const handleStart = () => {
    if (!name.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    let user;

    if (userData) {
      user = {
        ...userData,
        name: name,
      };
      saveUser(user);
    } else {
      user = createUser(name);
      saveUser(user);
    }

    setUser(user);
    goTo("setup");
  };

  return (
    <div className="setup-container">
    <h1>
    Vision-Tictac <br />
    <span style={{ fontSize: "20px", fontWeight: "400" }}>
        By Ramaaa Uye
    </span>
    </h1>   

      {/* INPUT */}
      <input
        type="text"
        placeholder="Masukkan nama..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          width: "200px",
          textAlign: "center",
          fontSize: "16px",
        }}
      />

      {/* STATISTIK */}
      {userData && (
        <div className="setup-group">
          <h3>Statistik</h3>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            padding: "10px",
            borderRadius: "10px"
          }}>
            <p>Menang: {userData.win}</p>
            <p>Kalah: {userData.lose}</p>
            <p>Seri: {userData.draw}</p>
          </div>
        </div>
      )}

      {/* BUTTON */}
      <button className="start-btn" onClick={handleStart}>
        Lanjut 🚀
      </button>
    </div>
  );
}