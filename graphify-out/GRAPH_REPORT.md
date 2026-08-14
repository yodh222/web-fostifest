# Graph Report - .  (2026-08-14)

## Corpus Check
- Corpus is ~3,401 words - fits in a single context window. You may not need a graph.

## Summary
- 199 nodes · 235 edges · 20 communities (17 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Dependencies
- Dev Dependencies
- Compiler Options
- TRPC API
- NPM Scripts
- React TRPC Client
- TS Config Ref
- Auth UI
- Database and Auth
- DB Schema
- Package Info
- Project Overview
- Auth Client
- ESLint Config
- DB Script

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 21 edges
2. `scripts` - 15 edges
3. `include` - 7 edges
4. `auth` - 6 edges
5. `env` - 5 edges
6. `createTRPCContext()` - 5 edges
7. `AppRouter` - 4 edges
8. `createQueryClient()` - 4 edges
9. `TRPCReactProvider()` - 4 edges
10. `lib` - 4 edges

## Surprising Connections (you probably didn't know these)
- `createContext` --calls--> `createTRPCContext()`  [EXTRACTED]
  src/trpc/server.ts → src/server/api/trpc.ts
- `createContext()` --calls--> `createTRPCContext()`  [EXTRACTED]
  src/app/api/trpc/[trpc]/route.ts → src/server/api/trpc.ts
- `Home()` --calls--> `getSession`  [EXTRACTED]
  src/app/page.tsx → src/server/better-auth/server.ts
- `getQueryClient()` --calls--> `createQueryClient()`  [EXTRACTED]
  src/trpc/react.tsx → src/trpc/query-client.ts

## Import Cycles
- None detected.

## Communities (20 total, 3 thin omitted)

### Community 0 - "App Dependencies"
Cohesion: 0.06
Nodes (31): @auth/drizzle-adapter, better-auth, drizzle-orm, dependencies, @auth/drizzle-adapter, better-auth, drizzle-orm, next (+23 more)

### Community 1 - "Dev Dependencies"
Cohesion: 0.06
Nodes (31): drizzle-kit, eslint, eslint-config-next, @eslint/eslintrc, eslint-plugin-drizzle, devDependencies, drizzle-kit, eslint (+23 more)

### Community 2 - "Compiler Options"
Cohesion: 0.08
Nodes (24): dom, dom.iterable, ES2022, compilerOptions, allowJs, baseUrl, checkJs, esModuleInterop (+16 more)

### Community 3 - "TRPC API"
Cohesion: 0.16
Nodes (17): createContext(), handler(), AppRouter, createCaller, postRouter, createCallerFactory, createTRPCContext(), createTRPCRouter (+9 more)

### Community 4 - "NPM Scripts"
Cohesion: 0.13
Nodes (15): scripts, build, check, db:generate, db:migrate, db:push, db:studio, dev (+7 more)

### Community 5 - "React TRPC Client"
Cohesion: 0.24
Nodes (8): geist, metadata, createQueryClient(), getBaseUrl(), getQueryClient(), RouterInputs, RouterOutputs, TRPCReactProvider()

### Community 6 - "TS Config Ref"
Cohesion: 0.18
Nodes (10): **/*.cjs, generated, **/*.js, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+2 more)

### Community 7 - "Auth UI"
Cohesion: 0.31
Nodes (6): { GET, POST }, LatestPost(), Home(), auth, getSession, api

### Community 8 - "Database and Auth"
Cohesion: 0.31
Nodes (5): config, env, Session, db, globalForDb

### Community 9 - "DB Schema"
Cohesion: 0.22
Nodes (8): account, accountRelations, createTable, session, sessionRelations, user, userRelations, verification

### Community 10 - "Package Info"
Cohesion: 0.25
Nodes (7): ct3aMetadata, initVersion, name, packageManager, private, type, version

### Community 11 - "Project Overview"
Cohesion: 0.67
Nodes (3): FOSTIFEST 26 Website, Next.JS, UKM FOSTI UMS

## Knowledge Gaps
- **107 isolated node(s):** `compat`, `config`, `name`, `version`, `private` (+102 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `App Dependencies` to `Package Info`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Info`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts` to `Package Info`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `compat`, `config`, `name` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._