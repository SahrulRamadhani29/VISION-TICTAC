import { useState, useEffect } from "react";
import { initUser, getUser } from "./store/userStore";

function Welcome({ goToSetup }) {
  const [name, setName] = useState("");
  const [stats, setStats] = useState({
    win: 0,
    lose: 0,
    draw: 0,
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setName(user.name);
      setStats(user);
    }
  }, []);

  const handleStart = () => {
    if (!name.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    const user = initUser(name);
    setStats(user);

    goToSetup();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Vision TicTac</h1>
      <p>by Ramaaa Uye</p>

      <h3>Masukkan Nama Kamu:</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama kamu..."
      />

      <h3>Statistik Kamu:</h3>
      <p>🏆 Menang: {stats.win}</p>
      <p>🤝 Seri: {stats.draw}</p>
      <p>💀 Kalah: {stats.lose}</p>

      <button onClick={handleStart}>Mulai</button>
    </div>
  );
}

export default Welcome;