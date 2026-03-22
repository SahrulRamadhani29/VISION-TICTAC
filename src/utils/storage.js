// 🔐 KEY STORAGE
const KEY = "vision_tictac_user";

// GET DATA
export const getUserData = () => {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("GET STORAGE ERROR:", e);
    return null;
  }
};

// SAVE DATA
export const saveUserData = (data) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.error("SAVE STORAGE ERROR:", e);
  }
};

// CLEAR DATA (optional debug/reset)
export const clearUserData = () => {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.error("CLEAR STORAGE ERROR:", e);
  }
};