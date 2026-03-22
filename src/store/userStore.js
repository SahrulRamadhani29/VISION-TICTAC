import { getUserData, saveUserData } from "../utils/storage";

// init user (buat / ambil data lama)
export const initUser = (name) => {
  const existing = getUserData();

  if (existing && existing.name === name) {
    return existing;
  }

  const newUser = {
    name,
    win: 0,
    lose: 0,
    draw: 0,
  };

  saveUserData(newUser);
  return newUser;
};

// update statistik
export const updateStats = (result) => {
  const user = getUserData();
  if (!user) return;

  if (result === "win") user.win++;
  if (result === "lose") user.lose++;
  if (result === "draw") user.draw++;

  saveUserData(user);
};

// ambil user
export const getUser = () => {
  return getUserData();
};