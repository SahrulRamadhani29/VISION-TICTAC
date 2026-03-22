// 🟢 AI Bocil (random)
export const getRandomMove = (board) => {
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter(v => v !== null);

  if (empty.length === 0) return null;

  return empty[Math.floor(Math.random() * empty.length)];
};


// 🔴 AI DEWA (MINIMAX - TIDAK TERKALAHKAN)
export const getBestMove = (board, aiSymbol, playerSymbol) => {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = aiSymbol;

      const score = minimax(newBoard, 0, false, aiSymbol, playerSymbol);

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
};


// 🔥 MINIMAX CORE (OPTIMAL)
const minimax = (board, depth, isMaximizing, ai, player) => {
  const result = checkWinner(board);

  if (result === ai) return 10 - depth;
  if (result === player) return depth - 10;
  if (result === "draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = ai;

        const score = minimax(newBoard, depth + 1, false, ai, player);
        best = Math.max(best, score);
      }
    }

    return best;
  } else {
    let best = Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = player;

        const score = minimax(newBoard, depth + 1, true, ai, player);
        best = Math.min(best, score);
      }
    }

    return best;
  }
};


// 🔍 CHECK WINNER (dipakai minimax)
const checkWinner = (board) => {
  const patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let [a, b, c] of patterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) return "draw";

  return null;
};