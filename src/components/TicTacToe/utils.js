// utils.js
export const calculateWinner = (squares) => {
    const BOARD_SIZE = squares.length;
  
    for (let i = 0; i < BOARD_SIZE; i++) {
      // Check rows
      if (squares[i][0] && squares[i].every((val) => val === squares[i][0])) {
        return squares[i][0];
      }
      // Check columns
      if (squares[0][i] && squares.every((row) => row[i] === squares[0][i])) {
        return squares[0][i];
      }
    }
    // Check diagonals
    if (squares[0][0] && squares.every((row, index) => row[index] === squares[0][0])) {
      return squares[0][0];
    }
    if (squares[0][BOARD_SIZE - 1] && squares.every((row, index) => row[BOARD_SIZE - 1 - index] === squares[0][BOARD_SIZE - 1])) {
      return squares[0][BOARD_SIZE - 1];
    }
    // Check for a draw
    if (squares.every((row) => row.every((val) => val))) {
      return 'Draw';
    }
    return null;
  };
  