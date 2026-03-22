import { getUserData, saveUserData } from "../utils/storage";

// 🔹 INIT / CREATE USER
export const initUser = (name) => {
  const existing = getUserData();

  // kalau nama sama → pakai data lama
  if (existing && existing.name === name) {
    return existing;
  }

  // user baru
  const newUser = {
    name,
    win: 0,
    lose: 0,
    draw: 0,
  };

  saveUserData(newUser);
  return newUser;
};


// 🔹 GET USER
export const getUser = () => {
  return getUserData();
};


// 🔹 UPDATE STATISTIK (ANTI BUG)
export const updateStats = (result) => {
  const user = getUserData();
  if (!user) return;

  // cloning biar aman
  const updated = { ...user };

  if (result === "win") updated.win += 1;
  else if (result === "lose") updated.lose += 1;
  else if (result === "draw") updated.draw += 1;

  saveUserData(updated);
};