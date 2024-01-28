// __tests__/utils.test.js
import { calculateWinner } from '../utils';

test('returns X as the winner in the first row', () => {
  const squares = [
    ['X', 'X', 'X'],
    [null, 'O', 'O'],
    [null, null, null],
  ];
  const winner = calculateWinner(squares);
  expect(winner).toBe('X');
});

test('returns O as the winner in the second column', () => {
  const squares = [
    ['X', 'O', 'O'],
    ['X', 'O', 'X'],
    [null, 'O', null],
  ];
  const winner = calculateWinner(squares);
  expect(winner).toBe('O');
});

test('returns X as the winner in the main diagonal', () => {
  const squares = [
    ['X', 'O', 'O'],
    [null, 'X', 'O'],
    [null, null, 'X'],
  ];
  const winner = calculateWinner(squares);
  expect(winner).toBe('X');
});

test('returns Draw when the game is a draw', () => {
  const squares = [
    ['X', 'O', 'X'],
    ['X', 'O', 'O'],
    ['O', 'X', 'X'],
  ];
  const winner = calculateWinner(squares);
  expect(winner).toBe('Draw');
});

test('returns null when there is no winner', () => {
  const squares = [
    ['X', 'O', null],
    [null, 'X', 'O'],
    [null, null, null],
  ];
  const winner = calculateWinner(squares);
  expect(winner).toBeNull();
});
