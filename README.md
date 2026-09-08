# 🛡️ Safe Env

> Type-safe environment variable validation for Node.js & TypeScript.

Stop discovering missing or invalid `.env` variables after your application has already started. **Safe Env** validates and parses environment configuration at startup while giving you inferred TypeScript types.

<p align="center">
  <a href="https://www.npmjs.com/package/@mrinal/safe-env"><img src="https://img.shields.io/npm/v/@mrinal/safe-env?style=for-the-badge&label=npm" alt="npm version" /></a>
  <a href="https://github.com/mrinal1224/Safe-Env/stargazers"><img src="https://img.shields.io/github/stars/mrinal1224/Safe-Env?style=for-the-badge" alt="GitHub stars" /></a>
  <a href="https://github.com/mrinal1224/Safe-Env/blob/main/LICENSE"><img src="https://img.shields.io/github/license/mrinal1224/Safe-Env?style=for-the-badge" alt="License" /></a>
  <a href="https://github.com/mrinal1224/Safe-Env/actions"><img src="https://img.shields.io/github/actions/workflow/status/mrinal1224/Safe-Env/ci.yml?branch=main&style=for-the-badge&label=CI" alt="CI status" /></a>
</p>

---

## 🚨 The Problem

Most Node.js applications eventually contain code like this:

```ts
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const databaseUrl = process.env.DATABASE_URL;
```

Environment variables are exposed as strings and can be missing, malformed, or inconsistent with what your application expects.

Safe Env gives you one schema for both runtime validation and TypeScript inference.

---

## ✨ Quick Start

```bash
npm install @mrinal/safe-env
```

```ts
import { createEnv, z } from "@mrinal/safe-env";

export const env = createEnv({
  PORT: z.number().default(3000),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(["development", "production"] as const),
  DEBUG: z.boolean().optional(),
});
```

The result is inferred automatically:

```ts
env.PORT        // number
env.JWT_SECRET  // string
env.NODE_ENV    // "development" | "production"
env.DEBUG       // boolean | undefined
```

---

## 🧠 How It Works

```text
process.env
    │
    ▼
Schema Definition
    │
    ▼
Parse + Validate
    │
    ├── ✅ Valid → Typed Config
    │
    └── ❌ Invalid → SafeEnvError
```

Create the configuration object once and use `env` throughout the rest of your application instead of reading `process.env` everywhere.

---

## 🔧 Validators

| Validator | Example |
| --- | --- |
| String | `z.string()` |
| Number | `z.number()` |
| Boolean | `z.boolean()` |
| Enum | `z.enum(["development", "production"] as const)` |
| Optional | `z.string().optional()` |
| Default | `z.number().default(3000)` |
| Minimum length | `z.string().min(32)` |
| Maximum length | `z.string().max(100)` |

---

## ❌ Validation Errors

Safe Env validates the complete schema and reports configuration problems together, so you can fix several variables in one run.

Example:

```text
[safe-env] environment: Invalid environment configuration:
  • [safe-env] PORT: must be a valid finite number, received "abc"
  • [safe-env] JWT_SECRET: Missing required environment variable: JWT_SECRET
```

> Do not include secret values in custom error messages or logs in production.

---

## 📦 Package Support

Safe Env is shipped as a small TypeScript library with:

- ESM support
- CommonJS support
- Generated declaration files
- Node.js `>=20`
- No runtime dependencies

---

## 🧪 Development

```bash
git clone https://github.com/mrinal1224/Safe-Env.git
cd Safe-Env
npm install
npm run typecheck
npm test
npm run build
```

For coverage:

```bash
npm run coverage
```

GitHub Actions runs typechecking, tests and the package build for pushes to `main` and pull requests.

---

## 🗺️ Roadmap

### v0.1

- [x] Runtime parsing
- [x] String / number / boolean validators
- [x] Enum validator
- [x] Optional values
- [x] Default values
- [x] String length constraints
- [x] Aggregated validation errors
- [x] Type inference
- [x] ESM + CommonJS package exports

### v0.2

- [ ] URL validator
- [ ] Email validator
- [ ] Regex validator
- [ ] Custom validators
- [ ] Transformations
- [ ] Nested configuration
- [ ] Better error metadata

### v1.0

- [ ] Stable API
- [ ] Comprehensive integration tests
- [ ] Documentation site
- [ ] Automated semantic releases
- [ ] NestJS integration

---

## 🤝 Contributing

Contributions are welcome. Please keep the public API small and predictable.

Before opening a pull request:

```bash
npm run typecheck
npm test
npm run build
```

---

## 👨‍💻 Creator

**Mrinal Bhattacharya**

Software Engineer · Educator · Open Source Builder

GitHub: [@mrinal1224](https://github.com/mrinal1224)

---

## 📄 License

MIT © 2026 Mrinal Bhattacharya
