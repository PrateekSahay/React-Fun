// __tests__/Board.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Board from '../Board';

test('renders Board component with correct squares', () => {
  const squares = [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']];
  const { getAllByText } = render(<Board squares={squares} onClick={() => {}} />);
  const xSquare = getAllByText('X')[0];
  const oSquare = getAllByText('O')[0];
  expect(xSquare).toBeInTheDocument();
  expect(oSquare).toBeInTheDocument();
});
