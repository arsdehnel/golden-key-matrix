# Golden Key Matrix — Claude Context

## Project Purpose

Conference interaction microsite for "The Golden Key to Building Badass Products" — a talk by Adam Dehnel and Dorothy Toth at Open Source North 2026. Attendees interact in real-time during the presentation via a polling/mapping UI. The presenter sees live results on a shared host view.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | RedwoodSDK (rwsdk) — Vite + Cloudflare Workers + React RSC |
| Language | TypeScript (strict) |
| Package manager | pnpm |
| Styling | LESS (no Tailwind, no CSS-in-JS) |
| UI primitives | `radix-ui` umbrella package |
| Real-time state | `useSyncedState` from `rwsdk/use-synced-state` |
| Sessions | `defineDurableSession` from rwsdk (Durable Objects) |
| Lint/format | Biome for TS/JS; Prettier for LESS/CSS only |
| Tests | Vitest (plain, no vitest-pool-workers) |
| Deploy target | Cloudflare Workers |

---

## Repository Layout

```
src/
  worker.tsx              # CF Worker entry — defineApp(), DO exports
  client.tsx              # Client hydration (RSC RPC)
  document.tsx            # HTML document shell
  types.ts                # Shared types (PollAnswer)
  pages/
    home.tsx
    matrix.tsx
    osn/
      routes.ts
      index.tsx
      welcome.tsx         # Main poll page (server wrapper)
      thank-you.tsx
    dev/
      routes.ts
      osn-attendee-poll.tsx
  components/
    footer-links.tsx
    osn-welcome-client.tsx  # Client orchestrator — useSyncedState, auth gating
    views/
      attendee-poll.tsx     # Attendee 2D click + role slider
      host-register.tsx     # Presenter code validation form
      host-welcome.tsx      # Live results view + QR code
  layouts/
    standard.tsx
  middleware/
    session.ts
    headers.ts
    www-redirect.ts
  session/
    durable-object.ts     # SessionDurableObject class
    store.ts              # defineDurableSession setup
  actions/
    host-code-validation.ts  # "use server" — validates presenter code
  styles/
    global.less, variables.less, typography.less, ...
```

---

## Architecture Patterns

### Worker Entry (`src/worker.tsx`)

```ts
export default defineApp([
  wwwRedirect,
  headerMiddleware,
  sessionMiddleware,
  ...syncedStateRoutes(e => e.SYNCED_STATE_DO),
  render(Document, [
    route("/", Pages__Home),
    prefix("/osn", osnRoutes),
    route("/matrix", Pages__Matrix),
    prefix("/dev", DevRoutes),
  ]),
]);

// Both DOs must be top-level named exports here
export { SessionDurableObject, SyncedStateServer };
```

### Real-time Polling Data Flow

```
Attendee clicks/slides → AttendeePoll → recordPollAnswer callback
  → OsnWelcomeClient.setPollAnswerCoordinates (useSyncedState)
  → SyncedStateServer DO syncs to all clients
  → HostWelcome re-renders with updated PollAnswer[]
```

### Durable Objects

- **SessionDurableObject** — `src/session/durable-object.ts`, binding `SESSION_DO`
- **SyncedStateServer** — imported from `rwsdk/use-synced-state/worker`, binding `SYNCED_STATE_DO`
- Both must be top-level named exports from `src/worker.tsx`
- DO migrations in `wrangler.jsonc` are append-only after first deploy

### Session Pattern

- Cookie name: `GOLDEN_KEYS_MATRIX_SESSION`
- Session ID: UUID, anonymous (no user accounts)
- Split into `durable-object.ts` (class) + `store.ts` (defineDurableSession)

### Middleware Pattern

Plain functions placed directly in `defineApp` array:

```ts
export default function headerMiddleware(req: RequestInfo<DefaultAppContext>) { ... }
```

CSP defined as object then joined:

```ts
const cspClaims = { 'default-src': "'self'", 'script-src': "'nonce-...' ..." };
```

### LESS Conventions

- Globals: `src/styles/global.less` imports `variables.less` + `typography.less`
- Variables: `@color_blue`, `@color_mint`, etc. (underscores, not hyphens, in this project)
- No CSS Modules — plain LESS with cascade
- Site-section classes on `<body>` drive section-specific overrides

---

## Tooling

### Biome (TS/JS)

```
indentStyle: tab, indentWidth: 4, lineWidth: 130
Semicolons: always
Trailing commas: all
Arrow parens: as needed
```

Run: `pnpm biome check` / `pnpm biome format --write`

### Prettier (LESS/CSS only)

Do not run Prettier on `.ts`/`.tsx` files.

### Husky Hooks

- `pre-commit`: biome check + prettier check + vitest
- `commit-msg`: commitlint

### Commitlint

Conventional commits only (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `style:`). No custom rules beyond `@commitlint/config-conventional`.

### Release Flow

1. `pnpm semantic-release` — bumps version, updates CHANGELOG, creates GitHub release
2. `pnpm release` — `wrangler deploy --env $CLOUDFLARE_ENV`

Semantic Release needs `fetch-depth: 0` + `persist-credentials: false` in GH Actions.
No `@semantic-release/npm` (private app, no npm publish).

---

## Environments

| Name | When |
|---|---|
| `integration` | Auto-deploy on merge to main |
| `staging` | Future |
| `production` | golden-key-matrix.com (manual) |

---

## Common Gotchas

- `SyncedStateServer` import path is `rwsdk/use-synced-state/worker` (not `rwsdk/realtime`)
- `useSyncedState` client hook is `rwsdk/use-synced-state` (client-side)
- Durable Object classes must be top-level named exports in `worker.tsx` — not re-exported from a barrel
- `wrangler.jsonc` migrations are append-only; never remove old entries
- GH Actions semantic-release: must set `persist-credentials: false` on the checkout step

---

## Key Files Quick Reference

| File | Purpose |
|---|---|
| `src/worker.tsx` | App entry, middleware chain, DO exports |
| `src/components/osn-welcome-client.tsx` | Client orchestrator (useSyncedState, host auth) |
| `src/components/views/attendee-poll.tsx` | Attendee 2D click map + role slider |
| `src/components/views/host-welcome.tsx` | Presenter live results + QR |
| `src/actions/host-code-validation.ts` | Server action, validates presenter code |
| `src/styles/variables.less` | Color/space variables |
| `wrangler.jsonc` | CF Workers config, DO bindings, environments |
| `.github/workflows/` | CI/CD (release, deploy) |
