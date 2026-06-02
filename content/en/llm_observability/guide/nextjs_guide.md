---
title: Instrument a Next.js Application for LLM Observability
description: Learn how to set up Datadog LLM Observability in a Next.js application using auto-instrumentation to monitor and trace your LLM calls.
further_reading:
    - link: '/llm_observability/instrumentation/auto_instrumentation'
      tag: 'Documentation'
      text: 'Supported auto-instrumentation frameworks and libraries'
    - link: '/llm_observability/instrumentation/sdk'
      tag: 'Documentation'
      text: 'LLM Observability SDK Reference for manual instrumentation'
---

Monitor Next.js applications using [Datadog LLM Observability][1] by instrumenting your server-side LLM and agent calls.

## Prerequisites

- A [Datadog API key][3]
- Next.js 13.4+ (required for `instrumentation.ts` support)
- `dd-trace` >= 5.38.0

## Setup

### Install the SDK

```shell
npm install dd-trace
```

### Configure Next.js

Add `dd-trace` and any LLM integration packages to `serverExternalPackages` in your `next.config.ts` (or `next.config.js`). See [the list of supported libraries][2] for a list of supported libraries. This tells Next.js not to bundle these packages, which is required for auto-instrumentation to work:

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'dd-trace',
    'openai',
    // add any other auto-instrumented packages here
  ],
  experimental: {
    instrumentationHook: true, // required for Next.js versions before 15.x
  },
}

export default nextConfig
```

**Note**: For Next.js 15+, `instrumentationHook` is enabled by default and does not need to be set explicitly.

### Initialization

Either initialize the LLM Observability SDK via `NODE_OPTIONS` or, if not available, via `instrumentation.ts`.

#### Node Options initialization

Set the following `NODE_OPTIONS` to allow `dd-trace` to instrument all relevant LLM client and agentic calls from your Next.js application:

```bash
NODE_OPTIONS="--import dd-trace/initialize.mjs"
```

#### Instrumentation file initialization

**Note**: Utilizing `NODE_OPTIONS` is the preferred method for enabling auto-instrumentation for Next.js applications. Only apply `instrumentation.ts` changes when that is not available.

Create an `instrumentation.ts` file in the root of your project (at the same level as `pages/` or `app/`):

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const initializeImportName = 'dd-trace/initialize.mjs';
    await import(initializeImportName as string)
    // await import(/* webpackIgnore: true */ initializeImportName as 'dd-trace/initialize.mjs') // if using webpack instead of turbopack
  }
}
```

The `NEXT_RUNTIME === 'nodejs'` check ensures the tracer is only initialized in the Node.js server runtime, not in the Edge runtime.

### Set environment variables

Set the following environment variables before starting your Next.js application. You can add them to a `.env.local` file for local development:

```shell
DD_LLMOBS_ENABLED=1
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
DD_SITE=<YOUR_DATADOG_SITE>
DD_API_KEY=<YOUR_DATADOG_API_KEY>
```

Your Datadog site is {{< region-param key="dd_site" code="true" >}}.

**Note**: If you are using `NODE_OPTIONS`, define these environment variables at the same level as `NODE_OPTIONS`, otherwise LLM Observability will not be properly enabled.

### Start the application

```shell
npm run dev   # development
npm run build && npm run start  # production
```

After startup, the SDK automatically traces LLM calls made in server-side code to [supported Node.js frameworks][5] such as OpenAI, LangChain, Vercel AI SDK, Bedrock, Anthropic, and more.

## View traces in Datadog

After making LLM calls, view the resulting traces in the [LLM Observability Traces view][7] in Datadog. Select your ML application name from the top-left dropdown.

Each trace shows token usage, model, latency, and the full input and output for the LLM call.

## Troubleshooting

**Traces are not appearing**
- Confirm `instrumentation.ts` is in the project root (same level as `app/` or `pages/`), not inside the `app/` directory.
- Confirm `dd-trace` and your LLM provider package (for example, `openai`) are both listed under `serverExternalPackages` in `next.config.ts`.
- If using Next.js < 15, confirm `experimental.instrumentationHook: true` is set in `next.config.ts`.
- Confirm the environment variables `DD_LLMOBS_ENABLED` and `DD_API_KEY` are set when initializing the tracer before starting the server.

**Edge runtime is not supported**
The Datadog SDK requires the Node.js runtime. Ensure your Route Handlers and Server Actions that make LLM calls do not set `export const runtime = 'edge'`.

[1]: /llm_observability/
[2]: /llm_observability/instrumentation/auto_instrumentation/?tab=nodejs
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
[5]: /llm_observability/instrumentation/auto_instrumentation/?tab=nodejs
[6]: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
[7]: https://app.datadoghq.com/llm/traces
