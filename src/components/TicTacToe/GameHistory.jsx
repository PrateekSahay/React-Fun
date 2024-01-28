// GameHistory.js
import React from 'react';

const GameHistory = ({ history, jumpTo }) => {
  const moves = history.map((step, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move === 0 ? 'Go to game start' : `Go to move #${move}`}
      </button>
    </li>
  ));

  return (
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  );
};

export default GameHistory;
