/*
✅ HTML Element Best Practices for Machine Coding

<label>
  - htmlFor="input-id" // Connects label to input for accessibility

<input>
  - id, type, value, onChange
  - aria-label or placeholder // For accessibility
  - data-testid="todo-input" // For testing

<button>
  - type="button" or "submit"
  - onClick handler
  - aria-label (if no visible text)
  - data-testid="add-btn"

<ul> / <ol>
  - Use with <li> elements // Semantic list structure

<form>
  - onSubmit handler
  - autoComplete="off" (optional)

<img>
  - alt="Description" // Required for accessibility

<span> (or non-semantic elements with interaction)
  - role="button" / "checkbox" / etc.
  - aria-pressed, aria-checked, aria-label (if interactive)

Interactive custom elements
  - tabIndex={0} // Makes focusable
  - role + aria-* // Required for accessibility

All elements (for testing)
  - data-testid="element-name" // Use with React Testing Library
*/


