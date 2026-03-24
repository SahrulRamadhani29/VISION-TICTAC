import Cell from "./Cell";
import "../styles/board.css";

export default function Board({ board, onClick, hoverIndex }) {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onClick(index)}
          isHover={hoverIndex === index}
        />
      ))}
    </div>
  );
}