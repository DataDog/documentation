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
---

## Overview

Datadog Feature Flags for server-side applications allow you to remotely control feature availability, run experiments, and roll out new functionality with confidence. Server-side SDKs receive flag configuration and evaluate flags locally. Some SDKs use a Datadog tracer for configuration delivery or telemetry.

Datadog Feature Flags is built on the [OpenFeature standard](https://openfeature.dev/docs/reference/intro/), an open source, vendor-neutral specification for feature flag APIs. If you're new to OpenFeature concepts like providers, evaluation context, and hooks, see the [OpenFeature concepts documentation](https://openfeature.dev/docs/category/concepts).

## Configuration delivery

Agentless [configuration delivery][8] is the default in server SDK versions that support it. The SDK fetches flag configuration directly from the Datadog-managed CDN over HTTPS, then evaluates flags locally. A Datadog Agent is not required for flag configuration.

The default source does not activate {{< prodname >}}Feature Flags{{< /prodname >}} traffic for every tracer installation. Agentless polling begins only when application code initializes or accesses the Datadog OpenFeature provider. Explicitly selecting `remote_config` activates the Feature Flags Remote Configuration subscription. Requests through either source contribute to server {{< prodname >}}Feature Flags{{< /prodname >}} billing.

| SDK | Minimum agentless version |
|---|---|
| Java `dd-openfeature` and `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |

Java CDN delivery requires `dd-openfeature` and `dd-java-agent`. It does not require a Datadog Agent for flag configuration.

<div class="alert alert-warning">The initial Node.js agentless releases support configuration delivery and local flag evaluation only. They do not export evaluation metrics or exposure events. Java agentless delivery changes only the configuration source. Without a supported Datadog Agent or serverless telemetry path, Java also does not export these signals.</div>

Agentless delivery is available for the SDKs and versions listed. Other server SDKs use Agent Remote Configuration.

## Choose a language

Select your language or framework to view SDK-specific setup instructions:

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

For serverless runtimes, see [Serverless Environments][5] for no-Agent setup, version requirements, and initial telemetry limitations.

## Prerequisites

Requirements depend on the selected SDK and configuration source. Standard requirements include:

- The language-specific tracer or OpenFeature provider versions listed on the SDK page
- A Datadog [API key][2]

Java CDN delivery requires the Java agent in the application process. It does not require APM tracing or a separate Datadog Agent service.

Source-specific requirements are:

| Source | Requirements |
|---|---|
| `agentless` (default where supported) | Configure `DD_API_KEY`, `DD_SITE`, and `DD_ENV` in the application process. No Agent is required for flag configuration. |
| `remote_config` | Datadog Agent 7.55 or later with Remote Configuration enabled, the API key configured on the Agent, and Remote Configuration enabled for your organization in [{{< ui >}}Organization Settings{{< /ui >}}][3]. Java also requires compatible `dd-openfeature` and `dd-java-agent` versions. |

## Agentless configuration

On a [supported SDK version](#configuration-delivery), configure the application process:

{{< code-block lang="bash" >}}
# Required for direct configuration delivery
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

No Feature Flags enablement or source setting is required. See [Java Feature Flags][10] or [Node.js Feature Flags][9] for dependency versions and language-specific initialization. Initializing or accessing the provider starts CDN polling; tracer installation and initialization alone do not.

## Agent Remote Configuration

For Java and Node.js, set the source explicitly to retain Agent-managed delivery:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Remote Configuration is enabled by default in Agent 7.47.0 and later. If your Agent has Remote Configuration disabled, re-enable it by setting `DD_REMOTE_CONFIGURATION_ENABLED=true` or adding `remote_configuration.enabled: true` to your `datadog.yaml`.

See the [Remote Configuration documentation][1] for detailed setup instructions across deployment environments.

Existing Java and Node.js implementations with `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` remain on Remote Configuration during a migration window. The setting is deprecated. See [Migrate from the legacy provider setting][7] to remain on Remote Configuration explicitly or move to agentless delivery.

### Remote Configuration polling interval

The Agent polls Datadog for configuration updates at a configurable interval:

{{< code-block lang="bash" >}}
# Optional: Configure the Agent polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

## Advanced application configuration

Configure your application with the standard Datadog environment variables. These are common across all server-side SDKs:

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>

# Optional: Disable Feature Flags and both delivery paths
# DD_FEATURE_FLAGS_ENABLED=false

# Optional: Enable flag evaluation metrics
# See "Set Up Server-Side Flag Evaluation Metrics" documentation
{{< /code-block >}}

<div class="alert alert-info">In the Java and Node.js versions listed above, <code>DD_FEATURE_FLAGS_ENABLED</code> defaults to <code>true</code>, so you do not need to set it. Setting it to <code>false</code> disables the provider, CDN polling, and the Feature Flags Remote Configuration subscription. Other server SDKs continue to use the activation settings documented on their language pages.</div>

For SDKs and delivery modes that support it, see <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Set Up Server-Side Flag Evaluation Metrics</a> to enable the <code>feature_flag.evaluations</code> metric. The initial Node.js agentless releases do not export evaluation metrics or exposure events. Java requires a supported Datadog Agent or serverless telemetry path to export these signals. See <a href="/feature_flags/concepts/flag_graphs/">Feature Flag Graphs</a> for more information on available graphing.

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
