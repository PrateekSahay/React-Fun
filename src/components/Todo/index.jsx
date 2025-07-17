import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";

function TodoList({ todos, onComplete, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span
            role="button"
            tabIndex={0}
            aria-pressed={todo.completed}
            onClick={() => onComplete(todo.id)}
            onKeyDown={(e) => e.key === "Enter" && onComplete(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete todo: ${todo.text}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: uuid(),
      text: "Learn React",
      completed: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // all | completed | active

  const updateTodo = (text) => {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: uuid(), text: text.trim(), completed: false },
    ]);
    setInput("");
  };

  const onComplete = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const onDelete = (id) => {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <main className="App">
      <h1>Accessible Todo App</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTodo(input);
        }}
      >
        <label htmlFor="todo-input">New Todo</label>
        <input
          id="todo-input"
          type="text"
          placeholder="Add a todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <section aria-label="Filters" className="filters">
        <h2>Filter Todos</h2>
        <button
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          aria-pressed={filter === "completed"}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("active")}
          aria-pressed={filter === "active"}
        >
          Active
        </button>
      </section>

      <section aria-label="Todo List">
        <h2>Todos</h2>
        <TodoList
          todos={filteredTodos}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      </section>
    </main>
  );
}
