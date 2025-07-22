// 🔵 ----------------------------
// ENUM vs CONST OBJECT in TypeScript
// ----------------------------

// ✅ ENUM — A special TypeScript feature used to define a set of named constants.
export enum StatusEnum {
    Idle = "IDLE",
    Loading = "LOADING",
    Success = "SUCCESS",
    Error = "ERROR"
  }
  
  // ❌ Enums are not tree-shakable.
  // 🔍 Even if you only use StatusEnum.Success, the full enum remains in the final JS bundle.
  
  // 🔵 Example usage:
  const currentStatusEnum: StatusEnum = StatusEnum.Success;
  console.log("Enum Status:", currentStatusEnum);
  
  
  // ✅ CONST OBJECT — A tree-shakable and lightweight alternative to enums.
  export const StatusConst = {
    Idle: "IDLE",
    Loading: "LOADING",
    Success: "SUCCESS",
    Error: "ERROR"
  } as const;
  
  // ✅ TypeScript infers literal types due to `as const`
  // 🔍 You can also extract a union type from this object like so:
  type StatusConstType = typeof StatusConst[keyof typeof StatusConst];
  
  // 🔵 Example usage:
  const currentStatusConst: StatusConstType = StatusConst.Success;
  console.log("Const Object Status:", currentStatusConst);
  
  
  // 📊 ----------------------------
  // COMPARISON SUMMARY
  // ----------------------------
  
  /*
  | Feature                    | enum                      | const object (with as const)      |
  |---------------------------|---------------------------|-----------------------------------|
  | Tree-shakable             | ❌ No                      | ✅ Yes (if unused keys)           |
  | Output size               | ❌ Larger (IIFE generated) | ✅ Smaller                        |
  | Runtime presence          | ✅ Present at runtime      | ✅ Present only if used           |
  | Type extraction           | ✅ Built-in                | ✅ Via `typeof` and `keyof`       |
  | Readability               | ✅ Clear intention         | ✅ Still clear + flexible         |
  | Extendable at runtime     | ❌ No                      | ✅ Yes (you can mutate if needed) |
  | Recommended for frontend  | ❌ No (usually)            | ✅ Yes (tree-shakable, smaller)   |
  */
  
  
  // ✅ When to use WHAT?
  
  /*
  Use `const object` when:
  - You want better bundle optimization (tree-shaking)
  - You're building modern frontend apps (React, Vite, Next.js, etc.)
  - You want to extract union types (with typeof + keyof)
  - You want full flexibility in JS/TS
  
  Use `enum` when:
  - You want stricter enum semantics (e.g., numeric enums)
  - You don't care about bundle size (e.g., server-side apps)
  - You're working in legacy TypeScript projects or codebases
  
  NOTE: For most modern frontend use cases — `const object + as const` is preferred.
  */
  
  