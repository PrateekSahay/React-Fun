import React, { useState, useEffect } from "react";

export default function CountryCapitalGame({ data }) {
  const pairs = Object.entries(data); // [['Germany', 'Berlin'], ['Azerbaijan', 'Baku']]
  const [buttons, setButtons] = useState([]);
  const [selected, setSelected] = useState([]); // Tracks selected buttons: [{ label, type }]
  const [wrongPair, setWrongPair] = useState([]); // To reset previous wrong selection

  // Shuffle and prepare buttons
  useEffect(() => {
    const countries = pairs.map(([country]) => ({
      label: country,
      type: "country",
    }));
    const capitals = pairs.map(([, capital]) => ({
      label: capital,
      type: "capital",
    }));
    const allButtons = [...countries, ...capitals];

    // Fisher-Yates Shuffle
    for (let i = allButtons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allButtons[i], allButtons[j]] = [allButtons[j], allButtons[i]];
    }

    setButtons(allButtons.map((btn) => ({ ...btn, status: "default" })));
  }, [data]);

  const handleClick = (btn, idx) => {
    if (buttons[idx].status !== "default") return;

    const newButtons = [...buttons];

    // ✅ Always reset previous wrong pair before any new selection
    if (wrongPair.length) {
      for (let i of wrongPair) {
        if (newButtons[i]) newButtons[i].status = "default";
      }
      setWrongPair([]);
    }

    newButtons[idx].status = "selected";
    setButtons(newButtons);

    const newSelected = [...selected, { ...btn, idx }];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const isCorrect =
        (data[first.label] === second.label &&
          first.type === "country" &&
          second.type === "capital") ||
        (data[second.label] === first.label &&
          second.type === "country" &&
          first.type === "capital");

      if (isCorrect) {
        const updated = [...newButtons];
        updated[first.idx] = null;
        updated[second.idx] = null;
        setButtons(updated);
      } else {
        newButtons[first.idx].status = "wrong";
        newButtons[second.idx].status = "wrong";
        setButtons(newButtons);
        setWrongPair([first.idx, second.idx]);
      }

      setSelected([]);
    }
  };

  const isGameOver = buttons.every((b) => b === null);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Match Countries with Capitals</h2>
      {isGameOver ? (
        <h3>🎉 Congratulations! All matched!</h3>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {buttons.map((btn, idx) =>
            btn ? (
              <button
                key={idx}
                onClick={() => handleClick(btn, idx)}
                style={{
                  padding: "10px 16px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor:
                    btn.status === "selected"
                      ? "#0000ff"
                      : btn.status === "wrong"
                      ? "#ff0000"
                      : "#e0e0e0",
                  color: btn.status === "default" ? "#000" : "#fff",
                  border: "none",
                  borderRadius: "4px",
                  minWidth: "100px",
                }}
              >
                {btn.label}
              </button>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}


<CountryCapitalGame data={data} />
  const data = {
    Germany: "Berlin",
    Azerbaijan: "Baku",
    India: "New Delhi",
    Japan: "Tokyo",
  };