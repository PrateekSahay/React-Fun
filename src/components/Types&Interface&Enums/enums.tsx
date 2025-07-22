// App.tsx — Enum vs Type (React + TypeScript)

import React from "react";

//
// ===========================
// 🎯 What is an enum?
// ===========================
// An enum (enumeration) is a TypeScript feature that allows you to define
// a named set of constant values — either numeric or string-based.
// It compiles to a real JavaScript object (has runtime value).
//

// ✅ STRING ENUM (Preferred)
enum StatusEnum {
  Idle = "IDLE",
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR"
}

// ✅ NUMERIC ENUM (Auto-incremented numbers)
enum RoleEnum {
  Admin,  // 0
  User,   // 1
  Guest   // 2
}

//
// ===========================
// 🔁 What is a union type?
// ===========================
// A type alias using union (`|`) is a lightweight way to define a set of allowed values.
// It does NOT exist at runtime — purely for compile-time checking.
//

// ✅ Equivalent to StatusEnum but using string union
type StatusType = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";

// ✅ Equivalent to RoleEnum
type RoleType = "ADMIN" | "USER" | "GUEST";

//
// ===========================
// 📌 Function using enum
// ===========================
function printStatusEnum(status: StatusEnum) {
  if (status === StatusEnum.Success) {
    console.log("✅ Task succeeded using enum");
  }
}

//
// 📌 Function using type union
//
function printStatusType(status: StatusType) {
  if (status === "SUCCESS") {
    console.log("✅ Task succeeded using type");
  }
}

//
// ===========================
// 📋 Comparison Summary
// ===========================
//
// ✅ ENUM
// - Exists at runtime (compiled JS object)
// - Useful when you need to log/access values at runtime
// - Slightly larger bundle size
// - Reverse mapping possible with numeric enums
//
// ✅ TYPE (union)
// - Compile-time only (no runtime output)
// - Tree-shakable, minimal code
// - Easier to extend (`"A" | "B" | "C"`)
// - Preferred in frontend apps like React
//

//
// ===========================
// ✅ React Component Demo
// ===========================
export default function App() {
  // ✅ Using enum
  const currentEnumStatus: StatusEnum = StatusEnum.Loading;

  // ✅ Using type
  const currentTypeStatus: StatusType = "LOADING";

  // ✅ Using numeric enum
  const userRoleEnum: RoleEnum = RoleEnum.Admin; // 0

  // ✅ Using type alias
  const userRoleType: RoleType = "ADMIN";

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h2>🔍 Enum vs Type (React + TypeScript)</h2>

      <h3>Enum Status: {currentEnumStatus}</h3>
      <h3>Type Status: {currentTypeStatus}</h3>

      <h3>Enum Role (numeric): {userRoleEnum}</h3>
      <h3>Type Role (string): {userRoleType}</h3>

      <button onClick={() => printStatusEnum(currentEnumStatus)}>Check Enum</button>
      <button onClick={() => printStatusType(currentTypeStatus)}>Check Type</button>

      <hr />

      <h4>📌 When to use what?</h4>
      <ul>
        <li>✅ Use <strong>enum</strong> when you need runtime values or readable constants</li>
        <li>✅ Use <strong>type</strong> (unions) when you want lightweight, tree-shakable code</li>
      </ul>

      <h4>🧪 Bonus: Hover over each variable to see intellisense differences</h4>
    </div>
  );
}
