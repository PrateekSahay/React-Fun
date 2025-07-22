// SearchComponent.tdd.js

import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

/* 
  🧪 STEP 1 — RED: Write the failing test (no component exists yet)
  Goal: Type in an input, click a button, see user result from mock API
*/

test('🔴 should search and display GitHub user data', async () => {
  // Mock the fetch API globally
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          items: [{ id: 1, login: 'mockuser' }],
        }),
    } as Response)
  );

  // 🔴 Component doesn't exist yet — this will fail!
  render(<SearchComponent />);

  await userEvent.type(screen.getByPlaceholderText(/search github/i), 'mock');
  await userEvent.click(screen.getByRole('button', { name: /search/i }));

  await waitFor(() =>
    expect(screen.getByText(/mockuser/i)).toBeInTheDocument()
  );
});

/*
  ✅ STEP 2 — GREEN: Write the minimum code to pass the test
  Create <SearchComponent> with:
    - Input field
    - Button to trigger search
    - Fetch call and result display
*/

export const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: number; login: string }[]>([]);

  const handleSearch = async () => {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await res.json();
    setResults(data.items || []);
  };

  return (
    <div>
      <input
        placeholder="Search GitHub"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
};

/*
  🔁 STEP 3 — REFACTOR: Improve maintainability (Optional)
  - Add loading state
  - Show message on empty result
  - Move fetch logic to a custom hook for separation of concerns (later step)

  For now, test passes ✅, functionality works — job done!
*/

/*
🧠 WHY THIS WORKS
-----------------
✔️ Test-first ensures focused development — you only write what's necessary.
✔️ userEvent simulates real user behavior (keyboard/mouse).
✔️ waitFor handles async updates after `await`-based fetch calls.
✔️ getBy* queries are semantic and maintainable.
*/
