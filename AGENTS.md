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
- **Build status**: `npm run build` fails due to ESLint errors in Tekion components — user intentionally deferred lint fixes.
- **Git**: HEAD detached at commit `f2887b9` ("Added errorboundary"). No commits for dependency changes yet.

---

## 🤖 For AI Agents

When working in this repo:

1. **Always run tests** after dependency or code changes: `npm test -- --watchAll=false`
2. **Check for undeclared imports**: If you see `import X from "X"` in code, ensure `"X"` is in `package.json` dependencies.
3. **Don't fix lint errors** in `Tekion/` unless explicitly asked — user deferred this.
4. **Don't migrate build tool** (CRA → Vite) unless asked — user chose Option B.
5. **Security**: 26 vulns from CRA are accepted for this demo project. Document if changing.
6. **AGENTS.md** is the source of truth for repo state — update it if you make significant changes.

---

## 📄 License / Notes

- Standard CRA boilerplate project.
- No production use intended — purely educational.
- All changes documented here for traceability.

---

*Last updated: 2026-04-07 — after Option B dependency hygiene implementation.*
