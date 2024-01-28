// Board.js
import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => (
  squares.map((row, rowIndex) => (
    <div key={rowIndex} className="board-row">
      {row.map((_, colIndex) => (
        <Square
          key={colIndex}
          value={squares[rowIndex][colIndex]}
          onClick={() => onClick(rowIndex, colIndex)}
          disabled={squares[rowIndex][colIndex]}
        />
      ))}
    </div>
  ))
);

export default Board;
