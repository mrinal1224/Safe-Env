# 🛡️ Safe Env

> Type-safe environment variable validation for Node.js & TypeScript.

Stop discovering missing or invalid `.env` variables after your application has already started. **Safe Env** is designed to validate, parse, and type your environment configuration at startup.

<p align="center">
  <a href="https://www.npmjs.com/package/safe-env"><img src="https://img.shields.io/npm/v/safe-env?style=for-the-badge&label=npm" alt="npm version" /></a>
  <a href="https://github.com/mrinal1224/Safe-Env/stargazers"><img src="https://img.shields.io/github/stars/mrinal1224/Safe-Env?style=for-the-badge" alt="GitHub stars" /></a>
  <a href="https://github.com/mrinal1224/Safe-Env/blob/main/LICENSE"><img src="https://img.shields.io/github/license/mrinal1224/Safe-Env?style=for-the-badge" alt="License" /></a>
</p>

---

## 🚨 The Problem

Most Node.js applications eventually contain code like this:

```ts
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const databaseUrl = process.env.DATABASE_URL;
```

It works, until it doesn't.

- Environment variables are always read as strings.
- Required variables can be missing.
- Invalid values are discovered at runtime.
- There is no schema describing the application's configuration.
- Your editor cannot reliably tell you what type a value has.

A production application should **fail fast on invalid configuration**, before it starts serving traffic.

That's the problem Safe Env is built to solve.

---

## ✨ What Safe Env Aims to Provide

Define your configuration once and get validation + type inference from the same schema.

```ts
import { createEnv, z } from "safe-env";

export const env = createEnv({
  PORT: z.number().default(3000),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(["development", "production"]),
  DEBUG: z.boolean().optional(),
});
```

The resulting object is typed from the schema:

```ts
env.PORT        // number
env.JWT_SECRET  // string
env.NODE_ENV    // "development" | "production"
env.DEBUG       // boolean | undefined
```

The goal is simple:

> **Invalid configuration should stop your application before invalid state reaches production.**

---

## 🧠 How It Works

```text
process.env
    │
    ▼
Schema Definition
    │
    ▼
Parse & Validate
    │
    ├── ✅ Valid → Typed Config
    │
    └── ❌ Invalid → SafeEnvError
```

Safe Env sits at the application boundary. Instead of scattering `process.env.*` throughout the codebase, you create one trusted configuration object and consume that object everywhere else.

---

## 📦 Installation

```bash
npm install safe-env
```

or:

```bash
pnpm add safe-env
```

or:

```bash
yarn add safe-env
```

---

## 🚀 Basic Usage

```ts
import { createEnv, z } from "safe-env";

const env = createEnv({
  PORT: z.number().default(3000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
});

console.log(env.PORT);
```

A required value that is missing should produce a clear startup error instead of an ambiguous runtime failure.

Example:

```text
SafeEnvError

Configuration validation failed

JWT_SECRET
  ✖ Required environment variable is missing
  Expected: string (minimum length: 32)
```

---

## 🔧 Validators

The initial API is intentionally small and focused.

| Validator | Example |
| --- | --- |
| String | `z.string()` |
| Number | `z.number()` |
| Boolean | `z.boolean()` |
| Enum | `z.enum(["development", "production"])` |
| Optional | `z.string().optional()` |
| Default | `z.number().default(3000)` |
| Minimum length | `z.string().min(32)` |
| Maximum length | `z.string().max(100)` |

More validators can be added later without changing the core mental model.

---

## 🎯 Design Goals

### 1. TypeScript First

The schema should drive TypeScript inference, so developers get useful types without writing duplicate interfaces.

### 2. Fail Fast

Configuration errors should be reported during application startup rather than several minutes later when a feature happens to access the missing variable.

### 3. Small API Surface

The package should be easy to learn. A developer should understand the core API in a few minutes.

### 4. Excellent Developer Experience

Validation errors should answer three questions immediately:

1. Which variable is wrong?
2. What did Safe Env receive?
3. What was expected?

### 5. Runtime Safety + Compile-Time Types

TypeScript alone cannot validate values coming from the process environment at runtime. Safe Env is designed to bridge that gap.

---

## 🗺️ Roadmap

### v0.1 — Core

- [x] Package foundation
- [x] TypeScript build setup
- [ ] `createEnv()`
- [ ] String validator
- [ ] Number validator
- [ ] Boolean validator
- [ ] Enum validator
- [ ] Optional values
- [ ] Default values
- [ ] Type inference
- [ ] Structured validation errors

### v0.2 — More Validation

- [ ] URL validator
- [ ] Email validator
- [ ] Regex validator
- [ ] Custom validators
- [ ] Transformations
- [ ] Nested configuration

### v1.0 — Production Ready

- [ ] Comprehensive test suite
- [ ] High test coverage
- [ ] ESM + CommonJS verification
- [ ] Automated releases with GitHub Actions
- [ ] Documentation site
- [ ] NestJS integration
- [ ] Stable public API

---

## 🏗️ Project Structure

```text
Safe-Env/
├── src/
│   ├── createEnv.ts
│   ├── parser.ts
│   ├── types.ts
│   ├── errors.ts
│   └── validators/
│       ├── base.ts
│       ├── string.ts
│       ├── number.ts
│       ├── boolean.ts
│       └── enum.ts
│
├── tests/
├── examples/
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

---

## 🧪 Development

Clone the repository:

```bash
git clone https://github.com/mrinal1224/Safe-Env.git
cd Safe-Env
```

Install dependencies:

```bash
npm install
```

Run the type checker:

```bash
npm run typecheck
```

Run tests:

```bash
npm test
```

Build the package:

```bash
npm run build
```

---

## 🤝 Contributing

Contributions are welcome.

Before opening a pull request:

```bash
npm run typecheck
npm test
npm run build
```

Please keep changes focused and preserve the package's small, predictable API.

---

## 👨‍💻 Creator

**Mrinal Bhattacharya**

Software Engineer · Educator · Open Source Builder

GitHub: [@mrinal1224](https://github.com/mrinal1224)

Safe Env is part of an ongoing effort to build small, useful developer tools and learn deeply by shipping them.

---

## 📄 License

MIT © 2026 Mrinal Bhattacharya
