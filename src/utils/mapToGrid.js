export function mapToGrid(x, y) {
  // 🎯 AREA GRID (adjust ini penting)
  const gridTop = 0.1;   // 10% dari atas
  const gridBottom = 0.5; // sampai tengah layar

  const gridLeft = 0.2;
  const gridRight = 0.8;

  // kalau di luar area → ignore
  if (x < gridLeft || x > gridRight || y < gridTop || y > gridBottom) {
    return -1;
  }

  // normalisasi ke area grid
  const normalizedX = (x - gridLeft) / (gridRight - gridLeft);
  const normalizedY = (y - gridTop) / (gridBottom - gridTop);

  const col = Math.floor(normalizedX * 3);
  const row = Math.floor(normalizedY * 3);

  return row * 3 + col;
}