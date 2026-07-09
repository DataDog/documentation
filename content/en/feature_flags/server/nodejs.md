---
title: Node.js Feature Flags
description: Set up Datadog Feature Flags for Node.js applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/dd_libraries/nodejs/"
  tag: "Documentation"
  text: "Node.js Tracing"
- link: "/tracing/"
  tag: "Documentation"
  text: "Learn about Application Performance Monitoring (APM)"
- link: "/feature_flags/guide/server_flag_evaluation_metrics/"
  tag: "Guide"
  text: "Set Up Server-Side Flag Evaluation Metrics"
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Concept"
  text: "Feature Flag Graphs"
---

## Overview

This page describes how to instrument your Node.js application with the Datadog Feature Flags SDK. The Node.js SDK integrates with [OpenFeature][2], an open standard for feature flag management, and receives flag updates through Remote Configuration in the Datadog Node.js tracer (`dd-trace`).

## Prerequisites

Before setting up the Node.js Feature Flags SDK, ensure you have:

- **Datadog Agent** version 7.55 or later with [Remote Configuration](/agent/remote_config/) enabled. See [Agent Configuration](/feature_flags/server#agent-configuration) for details.
- **Datadog [API key][3]** configured on the Agent
- **Datadog Node.js SDK** `dd-trace` version 5.80.0 or later
- **@openfeature/server-sdk** version ~1.20.0

## Installing and initializing

Feature Flagging is provided by Application Performance Monitoring (APM). To integrate APM into your application with feature flagging support, install `dd-trace` and enable the feature flagging provider. See [Tracing Node.js Applications][1] for detailed APM installation instructions.

```shell
npm install dd-trace @openfeature/server-sdk
```

Enable the provider with environment variables:

```shell
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Enable Remote Configuration in the tracer
DD_REMOTE_CONFIGURATION_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true

# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

<div class="alert alert-info">The <code>EXPERIMENTAL_</code> prefix is retained for backwards compatibility; the provider itself is stable.</div>

To configure `feature_flag.evaluations`, including the required tracer version and Agent OTLP setup, see [Set Up Server-Side Flag Evaluation Metrics][4]. For more information on available graphing, see [Feature Flag Graphs][5].

Or enable the provider in code:

```javascript
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    }
  }
});

// setProviderAndWait resolves after Remote Configuration loads, so flags
// evaluate against real configuration data instead of default values.
try {
  await OpenFeature.setProviderAndWait(tracer.openfeature);
} catch (err) {
  // If initialization fails, evaluations return default values until the
  // provider receives its first configuration. Log the error so it's visible.
  console.error('Datadog feature flag provider failed to initialize', err);
}
```

These examples use ESM modules, where `await` is available at the top level. In CommonJS, wrap top-level `await` in an async function.

Most applications also run other asynchronous startup tasks, such as opening database connections or loading configuration. Start their promises together with the provider promise and await them as a group, so total startup time stays close to the slowest task instead of the sum of all of them:

```javascript
// Start feature flag setup alongside your other startup tasks, then await them together.
const [_, db] = await Promise.all([
  // Catch here so a failed provider init does not reject the whole batch.
  // Evaluations return default values until the provider receives its config.
  OpenFeature.setProviderAndWait(tracer.openfeature).catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  }),
  connectToDatabase(), // your application's other async startup work
]);
// db is connected and the server can start; flags evaluate against real configuration, or fall back to defaults if initialization failed.
```

Blocking startup until the provider is ready, as shown above, works well for most applications. If your application must start serving requests before initialization completes, choose one of the following strategies.

### Accepting default values before initialization

When responsiveness during startup matters more than serving real values for the first few requests, you can call `setProvider` without waiting for initialization. `setProvider` is synchronous, so the client returns default values until Remote Configuration loads in the background.

```javascript
OpenFeature.setProvider(tracer.openfeature);
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

### Waiting for provider initialization

When you want the server to start listening immediately while still evaluating against real configuration data, you can defer the wait to request time. Store the initialization promise, then await it in each request handler before evaluating flags. Requests that arrive before initialization completes wait for it to finish.

```javascript
// Attach the catch once, at creation. This logs a failed initialization a
// single time and keeps the shared promise from rejecting on every request;
// evaluations return default values until the provider receives its first
// configuration.
const initializationPromise = OpenFeature.setProviderAndWait(tracer.openfeature)
  .catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  });
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Wait for initialization if necessary. The promise is already handled
  // above, so awaiting it here never throws, even if initialization failed.
  await initializationPromise;

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

## Set the evaluation context

Define who or what the flag evaluation applies to using an `EvaluationContext`. The evaluation context can include user or session information used to determine which flag variations should be returned. Call the `OpenFeature.setContext` method before evaluating flags to ensure proper targeting.

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

## Evaluate flags

After creating the `OpenFeature` client as described in the [Installing and initializing](#installing-and-initializing) section, you can start reading flag values throughout your app. Flag evaluation uses locally cached data, so no network requests occur when evaluating flags.

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed getter_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `getBooleanValue()` for flags that represent on/off or true/false conditions. Optionally set the context for specific targeting rules.

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const isNewCheckoutEnabled = await client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
    evaluationContext, // context
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
```

### String flags

Use `getStringValue()` for flags that select between multiple variants or configuration strings. For example:

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const searchAlgorithm = await client.getStringValue(
  'search-algorithm', // flag key
  'basic', // default value
  evaluationContext,
);

switch (searchAlgorithm) {
  case 'basic':
      return basicSearch(query);
  case 'fuzzy':
      return fuzzySearch(query);
  case 'semantic':
      return semanticSearch(query);
  default:
      return basicSearch(query);
}
```

### Number flags

For number flags, use `getNumberValue()`. This is appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const maxItems = await client.getNumberValue(
    'max-cart-items', // flag key
    20, // default value
    evaluationContext,
);

const priceMultiplier = await client.getNumberValue(
    'pricing-multiplier', // flag key
    1.3, // default value
    evaluationContext,
);
```

### Object flags

For structured JSON data, use `getObjectValue()`. This method returns an `object`, which can represent primitives, arrays, or dictionaries. Object flags are useful for Remote Configuration scenarios where multiple properties need to be provided together.

```javascript
const defaultConfig = {
  color: '#00A3FF',
  fontSize: 14,
};

const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const config = await client.getObjectValue('ui-config', defaultConfig, evaluationContext);
```

### Flag evaluation details

When you need more than just the flag value, use the `get<Type>Details` functions. These methods return both the evaluated value and metadata explaining the evaluation:

* `getBooleanDetails() -> Promise<EvaluationDetails<boolean>>`
* `getStringDetails() -> Promise<EvaluationDetails<string>>`
* `getNumberDetails() -> Promise<EvaluationDetails<number>>`
* `getObjectDetails() -> Promise<EvaluationDetails<JsonValue>>`

For example:

```javascript
const details = await client.getStringDetails('paywall-layout', 'control', evaluationContext);

console.log(details.value);        // Evaluated value (for example: "A", "B", or "control")
console.log(details.variant);      // Variant name, if applicable
console.log(details.reason);       // Description of why this value was chosen (for example: "TARGETING_MATCH")
console.log(details.errorCode);    // The error that occurred during evaluation, if any
console.log(details.errorMessage); // A more detailed message of the error that occurred, if any
console.log(details.flagMetadata); // Additional information about the evaluation
```

## Testing

You can test against a dedicated Datadog test environment with the real `tracer.openfeature` provider, or swap it for OpenFeature's `TypedInMemoryProvider` to control flag values directly in test code. This section shows the in-memory approach, which keeps tests hermetic and offline. `TypedInMemoryProvider` ships with `@openfeature/server-sdk`, so no additional dependency is required.

When using the in-memory provider, do not call `tracer.init()` or set `tracer.openfeature` as the provider — that is the behavior being replaced.

The OpenFeature API is a singleton per Node.js process. Reset it in `afterAll` with `OpenFeature.close()` or `OpenFeature.clearProviders()` to prevent state from one test file leaking into the next.

```javascript
// flags.test.js
import { beforeAll, beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';

const flags = {
  'new-checkout-flow': {
    variants: { on: true, off: false },
    defaultVariant: 'off',
    disabled: false,
    contextEvaluator: (ctx) => (ctx.companyID === 'beta-co' ? 'on' : 'off'),
  },
};

let provider;

beforeAll(async () => {
  provider = new TypedInMemoryProvider(flags);
  await OpenFeature.setProviderAndWait(provider);
});

beforeEach(() => {
  // Reset flag state between tests to prevent cross-test pollution.
  provider.putConfiguration(flags);
});

afterAll(async () => {
  await OpenFeature.close();
});

test('beta company sees new checkout', async () => {
  const client = OpenFeature.getClient();
  const value = await client.getBooleanValue('new-checkout-flow', false, {
    targetingKey: 'user-1',
    companyID: 'beta-co',
  });
  expect(value).toBe(true);
});

test('non-beta company falls back to default', async () => {
  const client = OpenFeature.getClient();
  const details = await client.getBooleanDetails('new-checkout-flow', false, {
    targetingKey: 'user-2',
    companyID: 'acme',
  });
  expect(details.value).toBe(false);
  expect(details.variant).toBe('off');
});
```

The snippet above uses Vitest for its first-class ESM support. The same pattern works with Jest; Jest users may need `--experimental-vm-modules` if their project is ESM. The non-generic `InMemoryProvider` export is deprecated — prefer `TypedInMemoryProvider`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: https://openfeature.dev/
[3]: /account_management/api-app-keys/#api-keys
[4]: /feature_flags/guide/server_flag_evaluation_metrics/
[5]: /feature_flags/concepts/flag_graphs/
