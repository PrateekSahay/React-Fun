// ✅ 1. Custom Hook (useCounter.js)
import { useState } from 'react';

export const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };
};


// ✅ 2. Testing Custom Hook (useCounter.test.js)
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('should initialize and update count', () => {
  const { result } = renderHook(() => useCounter(5));
  expect(result.current.count).toBe(5);

  act(() => result.current.increment());
  expect(result.current.count).toBe(6);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(5);
});


// ✅ 3. Component using hook (Counter.js)
import React from 'react';
import { useCounter } from './useCounter';

export const Counter = () => {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};


// ✅ 4. Testing component using userEvent (Counter.test.js)
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('should update count on button clicks', async () => {
  render(<Counter />);

  expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/Increment/i));
  expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/Decrement/i));
  expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
});


// ✅ 5. Async Component (User.js)
import React, { useEffect, useState } from 'react';

export const User = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setName(data.name));
  }, []);

  return <div>{name ? `Hello, ${name}` : 'Loading...'}</div>;
};


// ✅ 6. Testing Async Component (User.test.js)
import { render, screen, waitFor } from '@testing-library/react';
import { User } from './User';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'Prateek' })
    })
  );
});

test('should fetch and display user name', async () => {
  render(<User />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Hello, Prateek/i)).toBeInTheDocument();
  });
});


// ✅ 7. Custom Auth Hook (useAuth.js)
export const useAuth = () => {
  return { user: { name: 'Prateek' }, isAuthenticated: true };
};


// ✅ 8. Component using Auth Hook (MyComponent.js)
import { useAuth } from './useAuth';

export const MyComponent = () => {
  const { user } = useAuth();
  return <div>Hello {user.name}</div>;
};


// ✅ 9. Mocking Auth Hook in Test (MyComponent.test.js)
import { render, screen } from '@testing-library/react';
import * as AuthModule from './useAuth';
import { MyComponent } from './MyComponent';

jest.spyOn(AuthModule, 'useAuth').mockReturnValue({
  user: { name: 'Mocked User' },
  isAuthenticated: true,
});

test('shows mocked user', () => {
  render(<MyComponent />);
  expect(screen.getByText(/Mocked User/)).toBeInTheDocument();
});
