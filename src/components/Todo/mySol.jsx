import { useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([
    {
      text: "todo1",
      completed: true,
    },
  ]);

  const [input, setInput] = useState("");

  const filteredTodo = todos?.filter((todo) => todo.completed);

  const updateTodo = (val) => {
    setTodos((prev) => [...prev, { text: val, completed: false }]);
  };

  const onComplete = (ind) => {
    const newState = [...todos];
    newState[ind].completed = !newState[ind].completed;
    setTodos(newState);
  };

  const onDelete = (ind) => {
    console.log("+++ ind", ind);
    const newState = [...todos];
    newState.splice(ind, 1);

    setTodos(newState);
  };

  console.log("+++ todos", todos);

  return (
    <div className="App">
      <input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          updateTodo(input);
        }}
      >
        Add
      </button>
      <div>
        {" "}
        Todos
        {todos?.map((x, ind) => {
          return (
            <div key={ind}>
              <span
                style={{
                  textDecoration: x.completed ? "line-through" : "none",
                }}
                onClick={() => onComplete(ind)}
                // key={ind}
              >
                {x.text}
              </span>
              <button onClick={() => onDelete(ind)}>delete</button>
            </div>
          );
        })}
      </div>
      <div>
        {" "}
        Filtered
        {filteredTodo?.map((x, ind) => {
          return (
            <div key={ind}>
              <span onClick={() => onComplete(ind)} key={ind}>
                {x.text}
              </span>
              {/* <button>delete</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
