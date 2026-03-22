// ambil data user dari localStorage
export const getUserData = () => {
  try {
    const data = localStorage.getItem("vision_user");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getUserData:", error);
    return null;
  }
};

// simpan data user ke localStorage
export const saveUserData = (data) => {
  try {
    localStorage.setItem("vision_user", JSON.stringify(data));
  } catch (error) {
    console.error("Error saveUserData:", error);
  }
};

// hapus data user (opsional)
export const clearUserData = () => {
  try {
    localStorage.removeItem("vision_user");
  } catch (error) {
    console.error("Error clearUserData:", error);
  }
};