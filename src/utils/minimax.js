import { checkWinner } from "./checkWinner";

export function minimax(board, isMaximizing, ai, player) {
  const winner = checkWinner(board);

  if (winner === ai) return 10;
  if (winner === player) return -10;
  if (!board.includes(null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = ai;
        let score = minimax(board, false, ai, player);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = player;
        let score = minimax(board, true, ai, player);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}