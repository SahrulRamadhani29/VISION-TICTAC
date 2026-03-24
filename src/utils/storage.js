export const saveUser = (user) => {
  localStorage.setItem("tictactoe_user", JSON.stringify(user));
};

export const getUser = () => {
  const data = localStorage.getItem("tictactoe_user");
  return data ? JSON.parse(data) : null;
};

export const updateStats = (result) => {
  const user = getUser();
  if (!user) return;

  if (result === "win") user.win++;
  if (result === "lose") user.lose++;
  if (result === "draw") user.draw++;

  saveUser(user);
};