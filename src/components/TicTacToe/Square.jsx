// Square.js
import React from 'react';

const Square = ({ value, onClick, disabled }) => (
  <button className="square" onClick={onClick} disabled={disabled}>
    {value}
  </button>
);

export default Square;