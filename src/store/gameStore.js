// 🔥 GLOBAL GAME STATE (SIMPLE & STABLE)

let gameState = {
  level: "easy",       // easy | hard
  playerSymbol: "X",   // X / O
  aiSymbol: "O",
  result: null,        // "X" | "O" | "draw"
};


// 🔹 SET CONFIG (DARI SETUP)
export const setGameConfig = ({ level, symbol }) => {
  gameState.level = level;
  gameState.playerSymbol = symbol;
  gameState.aiSymbol = symbol === "X" ? "O" : "X";
};


// 🔹 GET CONFIG
export const getGameConfig = () => {
  return {
    level: gameState.level,
    playerSymbol: gameState.playerSymbol,
    aiSymbol: gameState.aiSymbol,
  };
};


// 🔹 SET RESULT
export const setGameResult = (result) => {
  gameState.result = result;
};


// 🔹 GET RESULT (optional)
export const getGameResult = () => {
  return gameState.result;
};


// 🔹 RESET GAME (dipakai saat ulang)
export const resetGame = () => {
  gameState.result = null;
};