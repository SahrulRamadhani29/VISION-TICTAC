let gameState = {
  level: "easy",   // easy | hard
  playerSymbol: "X",
  aiSymbol: "O",
  result: null,
};

// set game (dari setup)
export const setGameConfig = ({ level, symbol }) => {
  gameState.level = level;
  gameState.playerSymbol = symbol;
  gameState.aiSymbol = symbol === "X" ? "O" : "X";
};

// ambil config
export const getGameConfig = () => {
  return gameState;
};

// set hasil game
export const setGameResult = (result) => {
  gameState.result = result;
};

// ambil hasil game
export const getGameResult = () => {
  return gameState.result;
};

// reset game (opsional)
export const resetGame = () => {
  gameState.result = null;
};