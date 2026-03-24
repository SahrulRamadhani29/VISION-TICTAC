import { useState, useEffect } from "react";
import { getUser, saveUser, createUser } from "../../storage/userStorage";

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

    // 🔥 JIKA SUDAH ADA USER → UPDATE NAMA (opsional fix kecil)
    if (userData) {
      user = {
        ...userData,
        name: name, // update nama jika diubah
      };
      saveUser(user);
    } 
    // 🔥 JIKA BELUM ADA → BUAT USER BARU
    else {
      user = createUser(name);
      saveUser(user);
    }

    setUser(user);
    goTo("setup");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>Welcome 👋</h1>

      <input
        type="text"
        placeholder="Masukkan nama..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, fontSize: 16 }}
      />

      {/* 🔥 TAMPILKAN STATISTIK */}
      {userData && (
        <div style={{ marginTop: 20 }}>
          <p>Menang: {userData.win}</p>
          <p>Kalah: {userData.lose}</p>
          <p>Seri: {userData.draw}</p>
        </div>
      )}

      <button
        onClick={handleStart}
        style={{ marginTop: 20 }}
      >
        Lanjut
      </button>
    </div>
  );
}