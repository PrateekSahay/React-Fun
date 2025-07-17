import React, { useState } from "react";

export default function CommonHtmlElements() {
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <div>

      {/* ✅ Anchor tag */}
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Visit Example
      </a>

      {/* ✅ Span (interactive or inline text) */}
      <span
        role="button"
        tabIndex={0}
        onClick={() => alert("Span clicked")}
        aria-label="Clickable span"
      >
        Click Me
      </span>

      {/* ✅ Label + Input (Text) */}
      <label htmlFor="text-input">Enter Name</label>
      <input
        id="text-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Your name"
        aria-label="Name input"
        data-testid="text-input"
      />

      {/* ✅ Button */}
      <button
        type="button"
        onClick={() => alert("Button clicked")}
        data-testid="submit-btn"
      >
        Submit
      </button>

      {/* ✅ Checkbox */}
      <label htmlFor="accept">
        <input
          id="accept"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          aria-label="Accept terms"
          data-testid="terms-checkbox"
        />
        Accept Terms
      </label>

      {/* ✅ Radio buttons */}
      <fieldset>
        <legend>Select Option</legend>
        <label htmlFor="option1">
          <input
            type="radio"
            id="option1"
            name="options"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={(e) => setSelectedOption(e.target.value)}
            data-testid="radio-option1"
          />
          Option 1
        </label>
        <label htmlFor="option2">
          <input
            type="radio"
            id="option2"
            name="options"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={(e) => setSelectedOption(e.target.value)}
            data-testid="radio-option2"
          />
          Option 2
        </label>
      </fieldset>

      {/* ✅ Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted");
        }}
        autoComplete="off"
      >
        <input type="text" placeholder="Form input" />
        <button type="submit">Submit Form</button>
      </form>

      {/* ✅ Select dropdown */}
      <label htmlFor="select-menu">Choose an item</label>
      <select
        id="select-menu"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        data-testid="select-menu"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>

      {/* ✅ Image */}
      <img
        src="https://via.placeholder.com/150"
        alt="Sample Placeholder"
        width="150"
        height="150"
      />

      {/* ✅ List */}
      <ul>
        <li>Todo 1</li>
        <li>Todo 2</li>
      </ul>

    </div>
  );
}
