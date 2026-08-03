---
title: Migrate Your Feature Flags from Statsig
description: Learn how to migrate feature flags from Statsig to Datadog.
---

This guide outlines the process for migrating your feature flagging logic from Statsig to [Datadog Feature Flags][1]. It covers conceptual mappings, SDK installation, initialization, and flag evaluation.

## Summary checklist

* Replace `statsig-js` with `@datadog/openfeature-browser`.
* Swap `statsig.initialize` with `OpenFeature.setProviderAndWait`.
* Convert `checkGate` to `client.getBooleanValue`.
* Convert `getConfig` to `client.getObjectValue` or `client.getStringValue`.
* Use `targetingKey` in the context to identify users.
* For server-side apps, use `@openfeature/server-sdk` and pass a per-request evaluation context instead of a single global context.

## 1. Conceptual mapping

The core concepts between Statsig and Datadog are similar, but the terminology differs slightly.

| Statsig Concept | Datadog Concept | Notes |
| :---- | :---- | :---- |
| **Feature Gate** | **Feature Flag** (Boolean) | Basic on/off toggles. |
| **Dynamic Config** | **Feature Flag** (JSON/String variants) | Flags in Datadog can return Strings, JSON, or Numbers, covering Statsig's Dynamic Config use cases. |
| **Experiment** | **Feature Flag** (w/ Targeting) | A Datadog Flag can be configured with percentage-based rollouts and specific targeting rules to run experiments. |
| **User/StatsigUser** | **Evaluation Context** | The context (attributes) passed to the SDK to evaluate flags. |

## 2. Install the SDK

Datadog designs its feature flagging SDKs for use with **OpenFeature**. This provides a vendor-neutral API while using Datadog as the underlying provider.

Remove Statsig:

{{< code-block lang="bash" >}}
npm uninstall statsig-js
# or
yarn remove statsig-js
{{< /code-block >}}

Install Datadog and OpenFeature:

{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
# or
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

**Note**: For server-side implementations, see [Server-side and dynamic context](#8-server-side-and-dynamic-context) below, or the [Datadog Server SDK documentation][2] for other languages.

## 3. Initialization

Replace the `statsig.initialize()` call with the OpenFeature provider setup. Pass the evaluation context to `setProviderAndWait` at registration time so flags are evaluated for the correct user from the start.

### Statsig (old)

{{< code-block lang="javascript" >}}
import statsig from 'statsig-js';

await statsig.initialize(
  'client-sdk-key',
  { userID: 'user-123' }
);
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// 1. Configure the Datadog Provider
const provider = new DatadogProvider({
  clientToken: '<YOUR_DATADOG_CLIENT_TOKEN>',
  applicationId: '<YOUR_DATADOG_APPLICATION_ID>',
  site: 'datadoghq.com', // or datadoghq.eu, etc.
  env: 'production',
  enableExposureLogging: true, // Replaces Statsig's automatic exposure logging
});

// 2. Set the evaluation context and register the provider together
const evaluationContext = {
  targetingKey: 'user-123', // Maps to the user ID in Datadog
  email: 'employee@company.com',
  plan: 'premium',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

## 4. Evaluating flags (checking gates)

Replace checkGate calls with OpenFeature's getBooleanValue.

### Statsig (old)

{{< code-block lang="javascript" >}}
const isEnabled = statsig.checkGate('new_homepage_design');

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

## 5. Getting configuration (dynamic configs)

If you were using `getConfig` or `getExperiment` to retrieve non-Boolean values (strings, JSON, numbers), use the appropriate typed method in OpenFeature.

### Statsig (old)

{{< code-block lang="javascript" >}}
const config = statsig.getConfig('banner_config');
const title = config.get('title', 'Welcome');
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

// Assuming your Datadog flag 'banner_config' returns a JSON object variant
const bannerConfig = client.getObjectValue('banner_config', { title: 'Welcome' });
const title = bannerConfig.title;
{{< /code-block >}}

## 6. Updating user context after login

Statsig updates user context using `updateUser`. In OpenFeature and Datadog, update the context after initialization with `OpenFeature.setContext()`, for example after a user logs in.

### Statsig (old)

{{< code-block lang="javascript" >}}
await statsig.updateUser({
  userID: 'user-456',
  email: 'employee@company.com',
  custom: { plan: 'premium' }
});
{{< /code-block >}}

### Datadog (new)

{{< code-block lang="javascript" >}}
// Update the context for all future flag evaluations
await OpenFeature.setContext({
  targetingKey: 'user-456', // Maps to the user ID in Datadog
  email: 'employee@company.com',
  plan: 'premium'
});
{{< /code-block >}}

## 7. Tracking and exposure

In Statsig, checking a gate automatically logs an exposure.

In Datadog:

1. Set `enableExposureLogging: true` in the DatadogProvider config.
2. Events are sent to Datadog RUM. You can view these in the **Feature Flags** list or the **RUM** explorer.

## 8. Server-side and dynamic context

The previous sections cover browser and client-side migration, where the evaluation context is typically static for the length of a user's session. Server-side applications use a different SDK and authenticate with a Datadog API key instead of a client token. They also typically build a new evaluation context for each incoming request.

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
const isEnabled = statsig.checkGate({ userID: req.session.userID }, 'new_homepage_design');
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

The browser SDK sets the context once with a single `OpenFeature.setContext()` call. The server SDK instead passes a new evaluation context into each flag evaluation call, since one process handles many different users.

For other server languages, see the [Datadog Server SDK documentation][2].

[1]: /feature_flags/
[2]: /feature_flags/server/
[3]: /feature_flags/server/nodejs/
