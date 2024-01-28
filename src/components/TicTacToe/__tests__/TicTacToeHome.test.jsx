// __tests__/App.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TicTacToeHome from '../TicTacToeHome';

test('renders App component and allows playing the game with undo functionality', () => {
  render(<TicTacToeHome />);
  const xPlayerTurn = screen.getByText(/Next Player: X/i);

  // Play a few moves
  fireEvent.click(screen.getByText(/Go to game start/i)); // Click the initial move button
  expect(xPlayerTurn).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('button')[0]); // Make a move

  // Check if the game state is updated
  const oPlayerTurn = screen.getByText(/Next Player: O/i);
  expect(oPlayerTurn).toBeInTheDocument();

  // Undo last move
  fireEvent.click(screen.getByText(/Undo Last Move/i));

  // Check if the game state is reverted
  expect(xPlayerTurn).toBeInTheDocument();
});

test('resets the game when the "Reset Game" button is clicked', () => {
  render(<TicTacToeHome />);
  const xPlayerTurn = screen.getByText(/Next Player: X/i);

  // Play a few moves
  fireEvent.click(screen.getAllByRole('button')[0]); // Make a move
  fireEvent.click(screen.getAllByRole('button')[1]); // Make another move

  // Reset the game
  fireEvent.click(screen.getByText(/Reset Game/i));

  // Check if the game state is reset
  expect(xPlayerTurn).toBeInTheDocument();
  expect(screen.getByText(/Go to game start/i)).toBeInTheDocument();
  expect(screen.getByText(/Undo Last Move/i)).toBeDisabled();
});
