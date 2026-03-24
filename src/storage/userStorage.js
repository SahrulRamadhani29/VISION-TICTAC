export function getUser() {
  const data = localStorage.getItem("ttt-user");
  return data ? JSON.parse(data) : null;
}

export function saveUser(user) {
  localStorage.setItem("ttt-user", JSON.stringify(user));
}

export function createUser(name) {
  return {
    name,
    win: 0,
    lose: 0,
    draw: 0,
  };
}