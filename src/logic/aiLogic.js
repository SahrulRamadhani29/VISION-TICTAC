// 🟢 Izzii Bocil (random)
export const getRandomMove = (board) => {
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter(v => v !== null);

  if (empty.length === 0) return null;

  return empty[Math.floor(Math.random() * empty.length)];
};


// 🔴 IZII DEWASA (AI DEWA - MINIMAX)
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


// 🧠 MINIMAX CORE
const minimax = (board, depth, isMaximizing, aiSymbol, playerSymbol) => {
  const winner = checkWinner(board);

  if (winner === aiSymbol) return 10 - depth;
  if (winner === playerSymbol) return depth - 10;
  if (winner === "draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = aiSymbol;

        const score = minimax(newBoard, depth + 1, false, aiSymbol, playerSymbol);
        best = Math.max(best, score);
      }
    }

    return best;
  } else {
    let best = Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = playerSymbol;

        const score = minimax(newBoard, depth + 1, true, aiSymbol, playerSymbol);
        best = Math.min(best, score);
      }
    }

    return best;
  }
};


// 🔍 cek winner (dipakai minimax)
const checkWinner = (board) => {
  const patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let [a, b, c] of patterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) return "draw";

  return null;
};