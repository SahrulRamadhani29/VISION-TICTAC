import "../styles/cell.css";

export default function Cell({ value, onClick, isHover }) {
  return (
    <div
      className={`cell ${isHover ? "hover" : ""}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}