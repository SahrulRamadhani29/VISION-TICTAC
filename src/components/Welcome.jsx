import { useState, useEffect } from "react";
import { initUser, getUser } from "../store/userStore";

function Welcome({ goToSetup }) {
  const [name, setName] = useState("");
  const [stats, setStats] = useState({ win: 0, lose: 0, draw: 0 });

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
    <div className="container">
      <h1>Vision TicTac</h1>
      <p>by Ramaaa Uye</p>

      <h3>Masukkan Nama</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama kamu..."
      />

      <h3>Statistik</h3>
      <p>🏆 Menang: {stats.win} | 💀 Kalah: {stats.lose} | 🤝 Seri: {stats.draw}</p>

      <button onClick={handleStart}>Mulai</button>
    </div>
  );
}

export default Welcome;