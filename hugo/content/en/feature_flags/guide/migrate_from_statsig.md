---
title: Migrate Your Feature Flags from Statsig
description: Learn how to migrate feature flags from Statsig to Datadog.
---

This guide outlines the process for migrating your feature flagging logic from Statsig to [Datadog Feature Flags][1]. It covers conceptual mappings, SDK installation, initialization, and flag evaluation.

## Summary checklist

* Replace `@statsig/js-client` with `@datadog/openfeature-browser`.
* Swap `statsig.initialize` with `OpenFeature.setProviderAndWait`.
* Convert `checkGate` to `client.getBooleanValue`.
* Convert `getDynamicConfig` to `client.getObjectValue` or `client.getStringValue`.
* Convert `getLayer` to `client.getObjectValue` and dereference fields from the returned JSON object.
* Use `targetingKey` in the context to identify users and drive percentage-based randomization.
* Recreate your Statsig flags in Datadog.
* For server-side apps, use `@openfeature/server-sdk` and pass a per-request evaluation context instead of a single global context.

## Recreate flags in Datadog

Before you switch SDK calls in your application, recreate your Statsig gates, dynamic configs, and layers as flags in Datadog. In the Datadog UI, go to **Software Delivery** > **Feature Flags** and create flags that match your Statsig keys, variant types, and targeting rules.

## Conceptual mapping

The core concepts between Statsig and Datadog are similar, but the terminology differs slightly.

| Statsig Concept | Datadog Concept | Notes |
| :---- | :---- | :---- |
| **Feature Gate** | **Feature Flag** (Boolean) | Basic on/off toggles. |
| **Dynamic Config** | **Feature Flag** (JSON/String variants) | Flags in Datadog can return strings, JSON, or numbers, covering Statsig's Dynamic Config use cases. |
| **Layer** | **Feature Flag** (JSON variant) | Use a JSON-valued flag and read fields from the returned object, similar to dereferencing values from a Statsig layer. |
| **Experiment** | **Feature Flag** (with targeting) | A Datadog flag can be configured with percentage-based rollouts and specific targeting rules to run experiments. Connect flags to [Datadog Experiments][5] to measure impact on user outcomes. |
| **User/StatsigUser** | **Evaluation Context** | The context (attributes) passed to the SDK to evaluate flags. |

## Installation

Datadog designs its feature flagging SDKs for use with [OpenFeature][6]. This provides a vendor-neutral API while using Datadog as the underlying provider.

Remove Statsig:

{{< code-block lang="bash" >}}
npm uninstall @statsig/js-client
# or
yarn remove @statsig/js-client
{{< /code-block >}}

Install Datadog and OpenFeature:

{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
# or
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

**Note**: For React applications, also install `@openfeature/react-sdk`. See [React Feature Flags][7]. For server-side implementations, see [Server-side and dynamic context](#server-side-and-dynamic-context) below, or the [Datadog Server SDK documentation][2] for other languages.

## Initialization

You must replace the `statsig.initialize()` call with the OpenFeature provider setup. Pass the evaluation context to `setProviderAndWait` at registration time so flags are evaluated for the correct user from the start.

### Statsig (old)

{{< code-block lang="javascript" >}}
import { StatsigClient } from '@statsig/js-client';

const client = new StatsigClient('client-sdk-key', { userID: 'user-123' });
await client.initializeAsync();
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
{{< /code-block >}}

{{< code-block lang="javascript" >}}
// Configure the Datadog provider
const provider = new DatadogProvider({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'datadoghq.com', // or datadoghq.eu, etc.
  env: 'production', // Environment from which to fetch flag configurations
});

// Set the evaluation context and register the provider together
const evaluationContext = {
  targetingKey: 'user-123', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">The <code>targetingKey</code> is used as the randomization subject for percentage-based targeting. When a flag targets a percentage of subjects (for example, 50%), the <code>targetingKey</code> determines which bucket a user falls into. Users with the same <code>targetingKey</code> always receive the same variant for a given flag.</div>

For more information on creating client tokens and application IDs, see [API and Application Keys][4].

## Evaluate flags (check gates)

Replace `checkGate` calls with OpenFeature's `getBooleanValue`.

### Statsig (old)

{{< code-block lang="javascript" >}}
const isEnabled = client.checkGate('new_homepage_design');

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

// The second argument is the fallback value (default) if the flag fails to fetch
const isEnabled = client.getBooleanValue('new_homepage_design', false);

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

## Get configuration (dynamic configs)

If you were using `getDynamicConfig` or `getExperiment` to retrieve non-Boolean values (strings, JSON, numbers), use the appropriate typed method in OpenFeature.

### Statsig (old)

{{< code-block lang="javascript" >}}
const config = client.getDynamicConfig('banner_config');
const title = config.get('title', 'Welcome');
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

// Assuming your Datadog flag 'banner_config' returns a JSON object variant
const bannerConfig = client.getObjectValue('banner_config', { title: 'Welcome' });
const title = bannerConfig.title;
{{< /code-block >}}

## Map layers to JSON object flags

Statsig layers group related parameters under one evaluation. In Datadog, use a JSON-valued flag and read the fields you need from the returned object.

### Statsig (old)

{{< code-block lang="javascript" >}}
const layer = client.getLayer('user_promo_experiments');
const promoTitle = layer.get('title', 'Welcome to Statsig!');
const discount = layer.get('discount', 0.1);
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

const promoConfig = client.getObjectValue('user_promo_experiments', {
  title: 'Welcome!',
  discount: 0.1,
});
const promoTitle = promoConfig.title;
const discount = promoConfig.discount;
{{< /code-block >}}

## Update user context after login

Statsig updates user context using `updateUser`. In OpenFeature and Datadog, update the context after initialization with `OpenFeature.setContext()`, for example after a user logs in.

### Statsig (old)

{{< code-block lang="javascript" >}}
await client.updateUserAsync({
  userID: 'user-456',
  email: 'employee@company.com',
  custom: { plan: 'premium' },
});
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
// Update the context for all future flag evaluations
await OpenFeature.setContext({
  targetingKey: 'user-456', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
});
{{< /code-block >}}

## Tracking and exposure

In Statsig, checking a gate automatically logs an exposure.

In Datadog:

1. **Client SDKs**: Exposure logging is enabled by default. Exposure events are sent to Datadog RUM. You can view them in the **Feature Flags** list or the **RUM** explorer. Set `enableExposureLogging: false` in the `DatadogProvider` config if you do not need exposure tracking.

<div class="alert alert-warning">Setting <code>enableExposureLogging</code> to <code>true</code> can impact <a href="/real_user_monitoring/">RUM</a> costs, as it sends exposure events to Datadog through RUM. Exposure logging is on by default for client SDKs.</div>

2. **Server SDKs**: Exposure logging is on by default. Evaluation logging is off by default. To send evaluation metrics from server SDKs, enable OpenTelemetry metrics (for example, `DD_METRICS_OTEL_ENABLED=true`) and follow the language-specific guidance in the [Datadog Server SDK documentation][2].

## Server-side and dynamic context {#server-side-and-dynamic-context}

The previous sections cover browser and client-side migration, where the evaluation context is typically static for the length of a user's session. Server-side applications use a different SDK and authenticate with a Datadog API key instead of a client token. They also typically build a new evaluation context for each incoming request.

Configure the required environment variables before initializing the server SDK:

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
DD_ENV=<ENVIRONMENT_NAME>
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_REMOTE_CONFIG_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

See [Server-Side Feature Flags][2] for the full list of Agent and application configuration options.

Install the server-side SDK. This example uses the [Node.js Feature Flags SDK][3]:

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Register the provider through the Datadog tracer:

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init();
const { OpenFeature } = require('@openfeature/server-sdk');

await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

### Statsig (old)

{{< code-block lang="javascript" >}}
const isEnabled = client.checkGate('new_homepage_design');
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown',
  };

  const isEnabled = await client.getBooleanValue('new_homepage_design', false, evaluationContext);
  res.send(isEnabled ? 'New design' : 'Old design');
});
{{< /code-block >}}

The browser SDK uses whatever evaluation context is set for every flag evaluation. You can update that context with `OpenFeature.setContext()` when the user logs in or their attributes change. The server SDK instead passes a new evaluation context into each flag evaluation call, since one process handles many different users.

For other server languages, see the [Datadog Server SDK documentation][2].

[1]: /feature_flags/
[2]: /feature_flags/server/
[3]: /feature_flags/server/nodejs/
[4]: /account_management/api-app-keys/
[5]: /product_analytics/experimentation/
[6]: https://openfeature.dev/
[7]: /feature_flags/client/react/
