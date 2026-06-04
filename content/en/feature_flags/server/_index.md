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
---

## Overview

Datadog Feature Flags for server-side applications allow you to remotely control feature availability, run experiments, and roll out new functionality with confidence. Server-side SDKs integrate with the Datadog tracer for your language and use Remote Configuration to receive flag updates in real time.

Datadog Feature Flags is built on the [OpenFeature standard](https://openfeature.dev/docs/reference/intro/), an open-source, vendor-neutral specification for feature flag APIs. If you're new to OpenFeature concepts like providers, evaluation context, and hooks, see the [OpenFeature concepts documentation](https://openfeature.dev/docs/category/concepts).

This guide covers the common setup required for all server-side SDKs, including Agent configuration and application environment variables. Select your language or framework to view SDK-specific setup instructions:

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

## Prerequisites

Before setting up server-side feature flags, ensure you have:

- **Datadog Agent 7.55 or later** installed and running
- **Datadog [API key][2]** configured
- **APM tracing** [enabled in your application][4]
- **Remote Configuration** enabled for your organization. Verify this in [{{< ui >}}Organization Settings{{< /ui >}}][3].

## Agent configuration

Server-side feature flags use [Remote Configuration][1] to deliver flag configurations to your application. Remote Configuration is enabled by default in Agent 7.47.0 and later. If your Agent has Remote Configuration disabled, re-enable it by setting `DD_REMOTE_CONFIGURATION_ENABLED=true` or adding `remote_configuration.enabled: true` to your `datadog.yaml`.

See the [Remote Configuration documentation][1] for detailed setup instructions across different deployment environments.

### Polling interval

The Agent polls Datadog for configuration updates at a configurable interval. This interval determines the average time between making a flag change in the UI and the change becoming available to your application.

{{< code-block lang="bash" >}}
# Optional: Configure polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

## Application configuration

Configure your application with the standard Datadog environment variables. These are common across all server-side SDKs:

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>

# Agent connection (if not using default localhost:8126)
DD_AGENT_HOST=localhost
DD_TRACE_AGENT_PORT=8126

# Required: Enable the feature flagging provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
# See "Set Up Server-Side Flag Evaluation Metrics" documentation
{{< /code-block >}}

<div class="alert alert-warning">The <code>DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true</code> environment variable is required to enable the feature flagging provider. Java also supports the system property <code>-Ddd.experimental.flagging.provider.enabled=true</code>, and Ruby and Node.js support code-based configuration as an alternative. See the SDK-specific documentation for details.</div>

<div class="alert alert-info">Remote Configuration must be available for server-side Feature Flags. It is enabled by default on Agent 7.47.0 and later. Only set SDK-level Remote Configuration variables (such as <code>DD_REMOTE_CONFIG_ENABLED=true</code>) if your tracer has Remote Configuration disabled and you need to override that setting.</div>

See <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Set Up Server-Side Flag Evaluation Metrics</a> to enable the experimental <code>feature_flag.evaluations</code> metric. See <a href="/feature_flags/concepts/flag_graphs/">Feature Flag Graphs</a> for more information on available graphing.

## Testing with in-memory providers

Datadog supports these testing approaches:

- **Integration tests**: Point `DatadogProvider` at a dedicated test environment and control flag values from the Datadog UI. This exercises the real provider end-to-end, including Remote Configuration delivery.
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
