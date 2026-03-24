export function mapToGrid(x, y) {
  // 🔥 SESUAIKAN DENGAN UI BARU (BOARD DI ATAS)
  const gridTop = 0.17;    // lebih turun sedikit
  const gridBottom = 0.57; // lebih luas ke bawah

  const gridLeft = 0.1;
  const gridRight = 0.9;

  // luar area
  if (x < gridLeft || x > gridRight || y < gridTop || y > gridBottom) {
    return -1;
  }

  const normalizedX = (x - gridLeft) / (gridRight - gridLeft);
  const normalizedY = (y - gridTop) / (gridBottom - gridTop);

  const col = Math.floor(normalizedX * 3);
  const row = Math.floor(normalizedY * 3);

  return row * 3 + col;
}