---
title: Node.js Application Agentic Instrumentation
---

**Note**: The Datadog Node.js SDK **only** supports Node.js runtimes. If the user's application is in another Javascript runtime, do **not** use this instruction set.

## Frameworks

If the user is instrumenting an application with one of the following frameworks, follow that guide _instead_ of following the instructions at and below [Instrumentation](#instrumentation).

| Framework | Instructions |
|----------|-------------|
| Next.js | [Next.js Instrumentation Guide](/llm_observability/guide/nextjs_guide.md) |

## Instrumentation

1. Install the latest `ddtrace` package.

Check the package manager the repo or project already uses and use that to install the dependencies. Verify via lockfiles.

```bash
npm install dd-trace # npm
pnpm add dd-trace # pnpm
yarn add dd-trace # yarn
```

2. Add in Datadog loader hooks

This is **mandatory**.

Datadog loader hooks are used to automatically patch ESM and Typescript import statements to instrument supported frameworks. Set `NODE_OPTIONS="--import dd-trace/register.js"` as early as possible, ideally as part of the startup command. This should be available for the Node.js process when it spawns, so setting it after load time is **not** acceptable.

Here is an example with the package.json:

```json
{
  "scripts": {
    "start": "NODE_OPTIONS=\"--import dd-trace/register.js\" node app.js"
  }
}
```

Although this value can be set in a `Dockerfile`, bootstrap script, etc., as long as that infrastructure _already_ exists in the code and is _before_ the Node.js application process starts.

3. Initialize the LLM Observability package

Initialize the LLM Observability SDK via `ddtrace.auto`. This **needs** to be done as the first import in the application's entrypoint, aside from any environment variable or configuration-loading imports.

**Note**: do not add in extraneous comments.

```typescript
// do NOT add this unless it is already there. this is an example of environment loading before importing the SDK
import 'dotenv/config'; // this might load DD_ environment variables

import 'dd-trace/init'; // CRUCIAL: this initializes the LLM Observability SDK and instrumentations

// ... remaining application logic
```
