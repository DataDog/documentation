---
title: Browser Rules-Based Evaluation
description: Use DatadogCoreProvider for advanced browser setups with application-managed configuration and optional tracking hooks.
further_reading:
- link: "/feature_flags/client/javascript/"
  tag: "Documentation"
  text: "JavaScript Feature Flags"
- link: "/feature_flags/concepts/evaluation_context/"
  tag: "Documentation"
  text: "Evaluation Context"
- link: "/feature_flags/concepts/distribution_channels/"
  tag: "Documentation"
  text: "Distribution Channels"
---

## Overview

**Use `DatadogProvider` for most browser applications.** It manages configuration fetching, context updates, and built-in telemetry. Follow [JavaScript Feature Flags][1] for that setup.

`DatadogCoreProvider` is an advanced, OpenFeature-compatible provider that evaluates configurations supplied by your application. It does not fetch or poll configuration, install tracking hooks, or send telemetry. With rules-based configuration, it evaluates targeting rules locally when the OpenFeature context changes, without fetching new assignments.

## When to use this approach

Choose `DatadogCoreProvider` when your application needs one or more of these capabilities:

- Evaluate targeting rules for changing contexts without a configuration request for each context change.
- Supply configuration through an application-controlled delivery path, such as a server-rendered bootstrap payload.
- Control configuration refreshes and compose only the tracking integrations the application needs.

Your application owns configuration availability, freshness, and the tracking life cycle.

## Prerequisites

- Install `@datadog/openfeature-browser` 2.0.0 or later, `@openfeature/web-sdk`, and `@openfeature/core`, following the [JavaScript installation instructions][2]. The examples use npm package imports.
- To fetch rules from Datadog, provide a [client token][3], environment name, and Datadog site.
- Distribute only browser-appropriate flags to the **Client** [distribution channel][4].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags are not supported for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

<div class="alert alert-warning">Configuration delivered to a browser is inspectable, including any targeting rules and values it contains. Keep sensitive configuration and authorization decisions on the server. Client-side feature flags are not an access-control mechanism.</div>

## Getting started: load rules once, evaluate across changing contexts

For browser applications that change evaluation context repeatedly during a session, use `fetchRulesConfiguration()` with `DatadogCoreProvider`. Load the rules once, then reuse the provider and configuration for subsequent evaluations and context changes.

Feature Flags billing counts [Monthly Flag Configuration Requests (MFCR)][7], not local evaluations. The initial rules fetch and later refreshes contribute to usage. Changing context with the loaded rules does not generate additional configuration requests.

### Fetch rules and initialize

Import `DatadogCoreProvider` and `fetchRulesConfiguration` from `@datadog/openfeature-browser/rules-based`. Fetch the rules and validate the result before supplying it to the provider:

```javascript
import {
  DatadogCoreProvider,
  fetchRulesConfiguration,
} from '@datadog/openfeature-browser/rules-based';
import { OpenFeature } from '@openfeature/web-sdk';

const configurationOptions = {
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
};

async function loadRulesConfiguration() {
  const configuration = await fetchRulesConfiguration(configurationOptions);
  if (!configuration.rules) {
    throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
  }
  return configuration;
}

const configuration = await loadRulesConfiguration();
const provider = new DatadogCoreProvider();
provider.setConfiguration(configuration);

const domain = 'browser-flags';
await OpenFeature.setProviderAndWait(domain, provider, {
  targetingKey: 'user-123',
  plan: 'free',
});

const client = OpenFeature.getClient(domain);
const enabled = client.getBooleanValue('checkout_new', false);
```

The fetch helper makes the configuration request. Registering the provider and evaluating the flag do not fetch configuration. The helper also accepts a `fetch` implementation and an abort `signal` for application-controlled transport.

Catch initialization errors in your application's startup flow and decide whether to retry or continue with default behavior. Do not assume the provider is ready if `setProviderAndWait()` rejects.

### Change the evaluation context

Use the same domain when updating context:

{{< code-block lang="javascript" >}}
await OpenFeature.setContext(domain, {
  targetingKey: 'user-456',
  plan: 'premium',
});

const enabledForUpdatedContext = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

The rules configuration remains in memory and is evaluated against the new context. Do not call `loadRulesConfiguration()` again for each context change. No configuration request is made. Optional tracking hooks can still send telemetry for evaluations.

Use [flat context attributes][5] and supply the attributes needed for targeting explicitly. `DatadogCoreProvider` does not automatically copy user attributes from RUM.

## Refresh configuration

The provider does not poll for flag changes. Choose when the application refreshes configuration, then replace it before subsequent evaluations:

{{< code-block lang="javascript" >}}
const nextConfiguration = await loadRulesConfiguration();
provider.setConfiguration(nextConfiguration);
{{< /code-block >}}

In this example, a fetch or parsing failure prevents replacement, so the previous configuration remains installed. Handle the error and retry according to the application's freshness requirements. Changes made in Datadog do not reach this provider until the application supplies updated configuration.

## Optional: supply portable configuration

Instead of calling the fetch helper in the browser, your application can deliver a portable configuration string. Use `configurationToString()` in the configuration-producing integration and `configurationFromString()` in the browser. For rules-based configuration, import these helpers from `/rules-based`.

Replace the `loadRulesConfiguration()` call in the initialization example with:

{{< code-block lang="javascript" >}}
import { configurationFromString } from '@datadog/openfeature-browser/rules-based';

const configuration = configurationFromString('<RULES_CONFIGURATION_WIRE>');
if (!configuration.rules) {
  throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
}
{{< /code-block >}}

The placeholder represents a portable string produced by `configurationToString()`, not the raw binary response from the rules endpoint. Use the framework's safe serialization mechanism when embedding configuration in HTML. Parsing and supplying the string do not make a configuration request.

### Precomputed configurations

Precomputed configuration contains assignments for a specific context, not rules that can be reevaluated for different contexts. If you supply it to `DatadogCoreProvider`, pass the context returned by `getPrecomputedContext(configuration)` to `setProviderAndWait()`. A mismatched context causes an invalid-context error; the provider does not fetch replacement assignments.

## Add optional tracking hooks

The provider performs evaluations without tracking by default. Add only the integrations the application needs:

| Factory | Behavior |
| --- | --- |
| `createDatadogExposureLoggingHook(options)` | Deduplicates and batches eligible exposure events. |
| `createDatadogEvaluationLoggingHook(options)` | Aggregates and sends flag evaluation telemetry. |
| `createDatadogRumTrackingHook()` | Adds flag evaluations to an existing global `DD_RUM` instance. It does not initialize RUM or populate the evaluation context. |

Use `composeDatadogTrackingHooks()` to initialize and shut down the selected integrations together. Register its hooks on the client from the initialization example before evaluations that need tracking:

```javascript
import {
  composeDatadogTrackingHooks,
  createDatadogExposureLoggingHook,
  createDatadogEvaluationLoggingHook,
  createDatadogRumTrackingHook,
} from '@datadog/openfeature-browser/rules-based';

const trackingOptions = {
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
  service: '<SERVICE_NAME>',
};

const tracking = composeDatadogTrackingHooks(
  createDatadogExposureLoggingHook(trackingOptions),
  createDatadogEvaluationLoggingHook(trackingOptions),
  createDatadogRumTrackingHook(),
);

await tracking.initialize();
client.addHooks(...tracking.hooks);

const trackedValue = client.getBooleanValue('checkout_new', false);
```

These hooks run only for evaluations made through this client instance. Continue using the same client for tracked evaluations. Omit an integration's import and factory call to exclude it. RUM tracking requires [Browser RUM][6] to be available as `DD_RUM` and can increase RUM-billed event counts.

Exposure and evaluation hooks do not collect events until `initialize()` completes. Exposure events are batched and deduplicated, so a repeated evaluation may not create another exposure request.

When tracking is no longer needed, unregister the hooks and shut down their resources:

{{< code-block lang="javascript" >}}
client.clearHooks();
await tracking.shutdown();
{{< /code-block >}}

`clearHooks()` removes **all client-level hooks** from this client; this example assumes the client is dedicated to this tracking setup. It does not remove global or provider hooks. `shutdown()` requests a final flush and stops tracking timers and subscriptions; returning does not guarantee that every network request has completed. Clearing hooks or removing the core provider alone does not shut down manually created tracking resources.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/client/javascript/
[2]: /feature_flags/client/javascript/#installation
[3]: /account_management/api-app-keys/#client-tokens
[4]: /feature_flags/concepts/distribution_channels/
[5]: /feature_flags/concepts/evaluation_context/#context-attributes
[6]: /real_user_monitoring/application_monitoring/browser/
[7]: /feature_flags/concepts/monthly_flag_configuration_requests/
