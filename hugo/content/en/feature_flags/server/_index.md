---
title: Server-Side Feature Flags
description: Set up Datadog Feature Flags for server-side applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/feature_flags/guide/server_flag_evaluation_metrics/"
  tag: "Guide"
  text: "Set Up Server-Side Flag Evaluation Metrics"
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Concept"
  text: "Feature Flag Graphs"
- link: "/feature_flags/implementation_patterns/serverless/"
  tag: "Documentation"
  text: "Serverless environments and Feature Flags"
- link: "/feature_flags/concepts/configuration_sources/"
  tag: "Concept"
  text: "Server SDK Configuration Sources"
- link: "/feature_flags/guide/apm_trace_enrichment/"
  tag: "Guide"
  text: "Set Up APM Trace Enrichment for Feature Flags"
---

## Overview

Datadog Feature Flags server SDKs receive flag configuration directly from the Datadog-managed CDN and evaluate flags locally. This agentless setup does not require a Datadog Agent.

The SDKs implement the [OpenFeature standard](https://openfeature.dev/docs/reference/intro/). Register the Datadog provider with OpenFeature to use its evaluation API.

## Getting started

Choose a language for the minimum installation, configuration, and evaluation example:

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

Use the following SDK versions or later. These are the baselines for the language guides and shared instructions.

| SDK | Minimum version for this guide |
|---|---|
| Java `dd-openfeature` | 1.69.0 |
| Node.js `dd-trace` | 6.24.0 |
| Python `ddtrace` | 4.17.0 |
| .NET tracer and `Datadog.FeatureFlags.OpenFeature` | 3.57.0 and 2.3.2 |
| Ruby `datadog` | 2.49.0 |
| Go `dd-trace-go` | 2.12.0 |
| PHP `datadog/dd-trace` | 1.28.0 |

Create a flag with the **Server** distribution channel enabled. Configure a Datadog [API key][2] and the flag environment in the application process:

```bash
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Set `DD_SITE` when the organization uses a site other than `datadoghq.com`. For the selected site, use {{< region-param key="dd_site" code="true" >}}.

Then initialize the provider and evaluate the flag as shown on the language page. No Feature Flags enablement or source setting is required for new setups, except PHP:

```bash
# PHP requires explicit source selection before startup.
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
```

Java uses the standalone `dd-openfeature` dependency. .NET still requires the tracer to be loaded with automatic instrumentation. PHP still requires the native extension. See each language guide for runtime requirements.

`DD_SERVICE` and `DD_VERSION` are optional attribution settings. Metrics, tracing, and custom polling settings are not required to receive flags.

## Migrate from Agent delivery

An existing deployment can remain on Agent delivery because of legacy enablement settings. Follow [Migrate an existing Remote Configuration setup][7] to move credentials into the application, select agentless delivery, and verify updates.

## Use Agent delivery

To retain Agent-managed delivery, configure Datadog Agent 7.55 or later with [Remote Configuration][1] enabled and an API key. Set this variable in the application:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
```

For Java, also load `dd-java-agent` 1.69.0 or later with `-javaagent`. Use `dd-openfeature` 1.69.0 or later. See the [Java Remote Configuration setup][12].

See [Server SDK Configuration Sources][8] for Agent requirements, source precedence, and delivery settings.

## Optional telemetry and tracing

Configuration delivery, event delivery, metrics, and APM tracing use separate paths:

- [Send feature flag telemetry][15]: experiment exposures and aggregated flag evaluation events, with supported direct delivery or a local relay.
- [Server-side flag evaluation metrics][6]: the separate `feature_flag.evaluations` OTLP metric.
- [APM trace enrichment][13]: flag evaluation data attached to APM traces.

Set `DD_FEATURE_FLAGS_ENABLED=false` to disable Feature Flags. See [Activation and billing][14] for when delivery starts.

## Testing with in-memory providers

Datadog supports these testing approaches:

- **Integration tests**: Point `DatadogProvider` at a dedicated test environment and control flag values from the Datadog UI. This exercises the real provider and selected configuration source end-to-end.
- **Unit tests**: Swap `DatadogProvider` for OpenFeature's standard `InMemoryProvider` (or an equivalent test stub, where no in-memory provider is available in the language) and set flag values directly in test code. This keeps tests hermetic and offline.

This section covers the in-memory approach. Because the OpenFeature API is designed to make providers swappable at runtime, your application code does not change — only the provider registered during test setup.

A typical test follows this pattern:

1. Build a map of flag keys to variants in your test setup.
2. Register an `InMemoryProvider` with that map through the OpenFeature API.
3. Call the OpenFeature client in the units being tested. The `InMemoryProvider` returns the flag assignments configured at test setup.
4. Reset the provider in test teardown to avoid cross-test state leakage.

See your language's SDK page (select from the top of this page) for a concrete test example.

## Context attribute requirements

<div class="alert alert-warning">
Evaluation context attributes must be flat primitive values (strings, numbers, booleans). Nested objects and arrays are <strong>not supported</strong> and will cause exposure events to be silently dropped.
</div>

Use flat attributes in your evaluation context:

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID,
  companyId: req.session?.companyID,
  tier: 'enterprise'
};

const value = client.getBooleanValue('my-flag', false, evaluationContext);
{{< /code-block >}}

Avoid nested objects and arrays:

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: req.session?.userID,
  company: { id: req.session?.companyID },  // nested object - NOT SUPPORTED
  roles: ['admin', 'user']                   // array - NOT SUPPORTED
};
{{< /code-block >}}

## Further reading

For percentage-based rollouts and deterministic bucketing, see [Traffic Splitting and Randomization](/feature_flags/concepts/traffic_splitting/).

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /tracing/guide/#tutorials-enabling-tracing
[5]: /feature_flags/implementation_patterns/serverless/
[7]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /feature_flags/concepts/configuration_sources/
[9]: /feature_flags/server/nodejs/
[10]: /feature_flags/server/java/
[11]: /feature_flags/server/python/

[6]: /feature_flags/guide/server_flag_evaluation_metrics/
[12]: /feature_flags/server/java/#use-agent-delivery
[13]: /feature_flags/guide/apm_trace_enrichment/
[14]: /feature_flags/concepts/configuration_sources/#activation-and-billing

[15]: /feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
