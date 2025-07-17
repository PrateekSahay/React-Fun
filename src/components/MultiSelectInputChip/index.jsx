import React, { useState } from "react";
import "../styles.css"; // optional

const ALL_OPTIONS = [
  "Apple",
  "Banana",
  "Mango",
  "Grapes",
  "Orange",
  "Pineapple",
];

export default function ChipInput() {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);
  const [options, setOptions] = useState(ALL_OPTIONS);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (item) => {
    setChips((prev) => [...prev, item]);
    setOptions((prev) => prev.filter((o) => o !== item));
    setInput("");
  };

  const handleRemoveChip = (item) => {
    setChips((prev) => prev.filter((c) => c !== item));
    setOptions((prev) => [...prev, item]);
  };

  return (
    <div
      style={{ width: "300px", margin: "40px auto", fontFamily: "sans-serif" }}
    >
      {/* Chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          border: "1px solid #aaa",
          padding: "8px",
          borderRadius: "4px",
        }}
        onClick={() => setShowDropdown(true)}
      >
        {chips.map((chip) => (
          <div
            key={chip}
            style={{
              padding: "4px 8px",
              background: "#e0e0e0",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {chip}
            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveChip(chip);
              }}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Input */}
        <input
          type="text"
          value={input}
          placeholder="Type to search..."
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            minWidth: "100px",
          }}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && filteredOptions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "4px 0 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
            background: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {filteredOptions.map((item) => (
            <li
              key={item}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleSelect(item);
                setShowDropdown(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
