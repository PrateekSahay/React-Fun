# AGENTS.md — React-Fun Project Context

> **Purpose**: This file helps any AI agent (or developer) quickly understand the state of this repository without prior context.

---

## 📌 Project Overview

| Property | Value |
|----------|-------|
| **Name** | React-Fun |
| **Type** | Create React App (CRA) — learning/demo repository |
| **React Version** | 18.2.0 |
| **Purpose** | Educational showcase of 20+ React components demonstrating patterns, hooks, API integration, testing, etc. |
| **Build Tool** | `react-scripts` (CRA) 5.0.1 |
| **Active Component** | `Tekion/TimerHome` (multi-timer demo) — see `src/App.js` |
| **Tests** | Jest + React Testing Library (13 tests, all passing) |

### Key Directories
- `src/components/` — 24 demo components (BridgeWeave, TicTacToe, LoginSignup, MedicalAlertDetector, etc.)
- `src/theory/` — Educational notes (React Fiber, TDD, frontend types, etc.)
- `src/components/TicTacToe/__tests__/` — Full test coverage for TicTacToe

---

## ✅ What Was Done (Dependency Hygiene — Option B)

This repo was audited and cleaned up with **Option B: Dependency Hygiene + CRA (No Build Change)**.

### 1. Critical Fixes — Added Missing Dependencies

| Package | Version | Reason |
|---------|---------|--------|
| `uuid` | ^9.0.0 | Used in `src/components/Todo/index.jsx` but was **undeclared** (would crash on clean install) |
| `lodash` | ^4.17.21 | Used via `lodash/debounce` in `src/components/FetchNameAndSearchDebounce/index.jsx` but was **undeclared** |

> **Impact**: Before this fix, `npm install` in a fresh environment would cause runtime "module not found" errors.

### 2. Dead-Weight Removal

The following packages were in `package.json` but **never imported** in `src/`:

| Removed Package | Notes |
|-----------------|-------|
| `@react-pdf/renderer` | PDF generation lib — not used anywhere |
| `exif` | EXIF parsing — last updated 2016 (10+ years abandoned) |
| `exifr` | EXIF parsing (alt) — never imported |
| `file-saver` | File downloads — never imported, stale since 2020 |

**Result**: ~57 fewer packages in node_modules, cleaner install.

### 3. Safe Package Updates

| Package | Old | New |
|---------|-----|-----|
| `chart.js` | ^4.4.1 | ^4.5.1 |
| `react-chartjs-2` | ^5.2.0 | ^5.3.1 |
| `axios` | ^1.6.5 | ^1.6.5 (already current after audit fix) |

### 4. Verification

- ✅ All 13 tests pass (`npm test -- --watchAll=false`)
- ✅ `uuid` and `lodash/debounce` load correctly
- ✅ No references to removed packages in `src/`
- ✅ Dev server starts: `npm start`
- ✅ 26 vulnerabilities remain (structural to CRA — see below)

---

## 📦 Current Dependency State

### Declared Dependencies (Final)

```
@testing-library/jest-dom@^5.17.0
@testing-library/react@^13.4.0
@testing-library/user-event@^13.5.0
axios@^1.6.5
chart.js@^4.5.1
lodash@^4.17.21
react@^18.2.0
react-chartjs-2@^5.3.1
react-dom@^18.2.0
react-router-dom@^6.21.3
react-scripts@5.0.1
react-table@^7.8.0
uuid@^9.0.0
web-vitals@^2.1.4
```

### Security Audit (as of last check)

| Severity | Count | Notes |
|----------|-------|-------|
| Critical | 0 | ✅ Fixed (form-data via `npm audit fix`) |
| High | 14 | All transitive from `react-scripts` |
| Moderate | 3 | Transitive |
| Low | 9 | Transitive |
| **Total** | **26** | All from CRA's pinned deps |

> `react-scripts@5.0.1` is the single **direct** vulnerability (high). It pulls in ~25 transitive vulns (webpack-dev-server, ws, jsdom, etc.).

### Outdated Packages (non-breaking updates available)

| Package | Current | Wanted | Latest | Notes |
|---------|---------|--------|--------|-------|
| `@types/react` | 19.1.8 | 19.2.14 | 19.2.14 | Safe minor |
| `react` | 18.2.0 | 18.3.1 | 19.2.4 | React 19 is major (breaking) |
| `react-dom` | 18.2.0 | 18.3.1 | 19.2.4 | React 19 is major |
| `react-router-dom` | 6.30.3 | 6.30.3 | 7.14.0 | Router 7 is major |
| `web-vitals` | 2.1.4 | 2.1.4 | 5.2.0 | Major 5 available |
| `@testing-library/*` | 13.x/5.x | Same | 16.x/6.x | Major updates available |

> **Recommendation**: Safe to `npm update` for minor/patch. Major version jumps (React 19, Router 7) are optional and may require code changes.

---

## ⚠️ What Remains to Be Changed / Updated

### P0 — Critical (None Remaining)
All critical issues (undeclared deps) are fixed.

### P1 — High Priority

| Item | Status | Notes |
|------|--------|-------|
| `react-scripts` deprecated | ⚠️ Pending | CRA archived April 2022. Causes 25 transitive vulns. **Consider migrating to Vite** for long-term fix. |
| `react-table@7.8.0` unmaintained | ⚠️ Pending | Last update May 2022. README points to `@tanstack/react-table`. Used in `BridgeWeave/index.jsx`. |

---

## 📋 P1 Fix Plan — Detailed Implementation Guide

> **Baseline** (before starting):
> - Tests: 6 suites, 13 tests, all passing
> - Vulnerabilities: 63 (14 low, 15 moderate, 32 high, 2 critical)
> - Run: `npm test -- --watchAll=false` to verify baseline

---

### Task 1: Migrate react-table → @tanstack/react-table

**Scope**: Only affects `src/components/BridgeWeave/index.jsx`

#### API Changes Reference

| Aspect | react-table v7 | @tanstack/react-table v8 |
|--------|----------------|--------------------------|
| Import | `import { useTable } from "react-table"` | `import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"` |
| Columns | `[{ Header: "Name", accessor: "name" }]` | `[{ header: "Name", accessorKey: "name" }]` |
| Hook call | `useTable({ columns, data })` | `useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })` |
| Table props | `getTableProps()`, `getTableBodyProps()` | No longer needed (use regular HTML) |
| Headers | `headerGroups.map(...)` | `table.getHeaderGroups().map(...)` |
| Rows | `rows.map(...)`, `prepareRow(row)` | `table.getRowModel().rows.map(...)` |
| Cell render | `cell.render("Cell")` | `flexRender(cell.column.columnDef.cell, cell.getContext())` |

#### Implementation Steps

1. **Install new package**:
   ```bash
   npm uninstall react-table
   npm install @tanstack/react-table
   ```

2. **Update `src/components/BridgeWeave/index.jsx`**:
   - Change import statement
   - Update columns definition (Header → header, accessor → accessorKey)
   - Replace `useTable` with `useReactTable`
   - Replace table rendering logic with new API

3. **Verify**:
   ```bash
   npm test -- --watchAll=false  # Tests should still pass
   ```

4. **Optional visual test**: Temporarily update `src/App.js` to render BridgeWeave and verify table displays correctly.

---

### Task 2: Migrate CRA → Vite

**Scope**: Build system, affects entire project

#### Phase 1: Install & Configure Vite

| Step | Command / Action |
|------|------------------|
| 1.1 | `npm uninstall react-scripts` |
| 1.2 | `npm install -D vite @vitejs/plugin-react` |
| 1.3 | Create `vite.config.js` at project root |
| 1.4 | Update `package.json` scripts |

**vite.config.js** (create new file):
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Match CRA default
    open: true
  },
  build: {
    outDir: 'build'  // Match CRA output directory
  }
})
```

**package.json scripts** (update):
```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "test": "vitest run",
    "preview": "vite preview"
  }
}
```

#### Phase 2: Update HTML Entry

| Step | Action |
|------|--------|
| 2.1 | Move `public/index.html` to project root |
| 2.2 | Remove `%PUBLIC_URL%` references |
| 2.3 | Add `<script type="module" src="/src/index.js"></script>` before `</body>` |
| 2.4 | Update asset paths (favicon, manifest, logos) |

**Updated `index.html`** (at project root):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using Vite + React" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

#### Phase 3: Handle Environment Variables

| File | Change |
|------|--------|
| `src/components/ErrorBoundary/ErrorBoundary.jsx:73` | `process.env.NODE_ENV === 'development'` → `import.meta.env.DEV` |

**Before**:
```javascript
showDetails: process.env.NODE_ENV === 'development',
```

**After**:
```javascript
showDetails: import.meta.env.DEV,
```

#### Phase 4: Configure Testing (Vitest)

| Step | Action |
|------|--------|
| 4.1 | `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom` |
| 4.2 | Create `vitest.config.js` or add to `vite.config.js` |
| 4.3 | Update test files if needed (mostly compatible) |

**vitest.config.js** (create new file):
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
})
```

**package.json** (add vitest globals):
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

#### Phase 5: Handle Static Assets

| Step | Action |
|------|--------|
| 5.1 | Keep `public/` folder - Vite serves it automatically |
| 5.2 | Verify `manifest.json` paths work correctly |
| 5.3 | Test that favicon and logos load |

---

### Testing Checkpoints

| Checkpoint | Command | Expected Result |
|------------|---------|-----------------|
| After Task 1 | `npm test -- --watchAll=false` | 13 tests pass |
| After Phase 1-2 | `npm start` | Dev server at localhost:3000 |
| After Phase 3 | Check console | No env variable errors |
| After Phase 4 | `npm test` | 13 tests pass with Vitest |
| After Phase 5 | `npm run build` | Production build succeeds |
| Final | `npm run build && npm run preview` | Production app works |

---

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Tests break | Run tests after each phase; fix incrementally |
| Build fails | Check console errors, update config |
| Assets not loading | Verify paths in index.html |
| Environment variables | Search for all `process.env` usage |

---

### Expected Outcome

| Metric | Before | After |
|--------|--------|-------|
| Vulnerabilities | 63 | Significantly reduced |
| Build tool | react-scripts (deprecated) | Vite (maintained, faster) |
| react-table | v7 (unmaintained) | @tanstack/react-table v8 (maintained) |
| Tests | 13 passing | 13 passing |
| Dev server port | 3000 | 3000 (configured) |
| Build output | `build/` | `build/` (configured) |

---

### Execution Order

1. **Task 1 first** (react-table) - Smaller scope, isolated to one file
2. **Task 2 second** (Vite) - Larger scope, affects whole project

---

### P2 — Medium Priority

| Item | Status | Notes |
|------|--------|-------|
| Build fails on lint errors | ⚠️ Known | `Tekion/Timer.jsx` and `TimerHome.jsx` have ESLint errors (unused imports, missing hook deps). User deferred fixing. Build fails with `npm run build` (CI mode). |
| Minor version updates | Optional | `npm update` for axios, chart.js, etc. is safe. |
| React 18 → 19 | Optional | Major upgrade. May need code changes for new features/deprecations. |

### P3 — Low Priority / Future

| Item | Status | Notes |
|------|--------|-------|
| Vite migration | Future | Would eliminate ~25 vulns. See "Option C" in historical notes. |
| @tanstack/react-table migration | Future | Replace `react-table` for maintained support. |
| Remove `react-scripts` | Future | Requires build tool migration. |

---

## 🧪 How to Verify

```bash
# 1. Fresh install test (critical)
rm -rf node_modules package-lock.json
npm install
# Should succeed without "module not found" errors

# 2. Tests
npm test -- --watchAll=false
# Expect: "Test Suites: 6 passed, 6 total | Tests: 13 passed, 13 total"

# 3. Dev server
npm start
# Should start at http://localhost:3000

# 4. Security audit
npm audit
# Current: 26 vulns (all from react-scripts)

# 5. Check undeclared deps are gone
grep -r "from ['\"](uuid|lodash/debounce)['\"]" src/
# Should find matches (they're now declared)
```

---

## 📝 Historical Notes

- **Initial state**: Many components commented out in `App.js`; only `Tekion/TimerHome` active.
- **Dependency audit**: Found 2 undeclared runtime dependencies (`uuid`, `lodash`), 4 unused packages, 26 vulns (1 direct from CRA).
- **Decision**: Chose **Option B** (dependency hygiene, stay on CRA) over Vite migration.
- **P1 planning**: User approved P1 fixes (Vite migration + @tanstack/react-table). Detailed plan documented in AGENTS.md.
- **Build status**: `npm run build` fails due to ESLint errors in Tekion components — user intentionally deferred lint fixes.
- **Git**: HEAD detached at commit `f2887b9` ("Added errorboundary"). No commits for dependency changes yet.

---

## 🤖 For AI Agents

When working in this repo:

1. **Always run tests** after dependency or code changes: `npm test -- --watchAll=false`
2. **Check for undeclared imports**: If you see `import X from "X"` in code, ensure `"X"` is in `package.json` dependencies.
3. **Don't fix lint errors** in `Tekion/` unless explicitly asked — user deferred this.
4. **P1 fixes are approved** — User has approved migrating to Vite and @tanstack/react-table. See "P1 Fix Plan" section for detailed implementation guide.
5. **AGENTS.md** is the source of truth for repo state — update it if you make significant changes.

---

## 📄 License / Notes

- Standard CRA boilerplate project.
- No production use intended — purely educational.
- All changes documented here for traceability.

---

*Last updated: 2026-04-10 — Added P1 Fix Plan (Vite + @tanstack/react-table migration).*
