// __tests__/GameHistory.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameHistory from '../GameHistory';

test('renders GameHistory component with correct number of moves', () => {
  const history = [
    { squares: [['X', 'O', null], ['O', 'X', 'O'], ['X', 'O', 'X']] },
    { squares: [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']] },
  ];
  const { getAllByRole } = render(<GameHistory history={history} jumpTo={() => {}} />);
  const buttons = getAllByRole('button');
  expect(buttons).toHaveLength(history.length);
});

test('calls jumpTo function when move button is clicked', () => {
  const jumpTo = jest.fn();
  const history = [
    { squares: [['X', 'O', null], ['O', 'X', 'O'], ['X', 'O', 'X']] },
    { squares: [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']] },
  ];
  const { getByText } = render(<GameHistory history={history} jumpTo={jumpTo} />);
  const button = getByText('Go to move #1');
  fireEvent.click(button);
  expect(jumpTo).toHaveBeenCalledWith(1);
});
