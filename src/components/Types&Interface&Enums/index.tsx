// App.tsx (React + TypeScript — interface vs type demo)

import React from "react";

//
// ✅ INTERFACE: Best for object shapes like props and state
// Use when: defining props, allowing extension, or when declaration merging might be useful
//
interface ButtonProps {
  label: string;
  onClick: ClickHandler; // Refers to a type alias below
}

//
// ✅ INTERFACE EXTENSION: Easily extend other interfaces
//
interface IconButtonProps extends ButtonProps {
  icon: string;
}

//
// ✅ TYPE: Best for function signatures, union types, utility types
// Use when: defining reusable function types
//
type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

//
// ✅ TYPE UNION: Only `type` can define union types
// Use when: a value can be one of many predefined options
//
type Status = "idle" | "loading" | "success" | "error";

//
// ✅ TYPE + UTILITY: `Partial<T>` makes all fields optional
// Use when: updating parts of an object (e.g., PATCH APIs)
//
interface User {
  id: number;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>; // { id?: number; name?: string; email?: string }

//
// ✅ Component using `interface` for props
//
const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

//
// ✅ Component using extended `interface`
//
const IconButton: React.FC<IconButtonProps> = ({ label, icon, onClick }) => (
  <button onClick={onClick}>
    <span>{icon}</span> {label}
  </button>
);

//
// ✅ Main component demonstrating all use cases
//
export default function App() {
  // Using the function type alias
  const handleClick: ClickHandler = (e) => {
    console.log("Button clicked!", e);
  };

  // Using a union type
  const currentStatus: Status = "success";

  // Using a utility type — Partial<User>
  const updateUser: UserUpdate = {
    name: "Updated Name", // Other fields like email/id are optional
  };

  return (
    <div>
      <h2>Status: {currentStatus}</h2>

      <Button label="Click Me" onClick={handleClick} />

      <IconButton label="Save" icon="💾" onClick={handleClick} />

      <h3>Updated User:</h3>
      <pre>{JSON.stringify(updateUser, null, 2)}</pre>
    </div>
  );
}

