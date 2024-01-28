// __tests__/Square.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from '../Square';

test('renders Square component with correct value', () => {
  const { getByText } = render(<Square value="X" onClick={() => {}} />);
  const squareElement = getByText('X');
  expect(squareElement).toBeInTheDocument();
});

test('calls onClick function when Square is clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Square value="O" onClick={handleClick} />);
  const squareElement = getByText('O');
  fireEvent.click(squareElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
