---
title: Serverless Environments
description: Use Datadog Feature Flags server SDKs in serverless environments with or without a Datadog Agent.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/feature_flags/concepts/configuration_sources/"
  tag: "Concept"
  text: "Server SDK Configuration Sources"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/serverless/"
  tag: "Documentation"
  text: "Serverless Monitoring"
---

## Overview

All seven Datadog server SDKs support agentless flag configuration. The SDK loads configuration over HTTPS and evaluates flags locally. A Datadog Agent is not required.

Use the [server SDK getting-started guides][1] for the canonical versions and minimum configuration. This guide covers serverless deployment and event delivery.

## Agentless architecture

1. Install the SDK and provider for the language. Java uses standalone `dd-openfeature`. .NET requires automatic instrumentation. PHP requires the native extension and a subprocess sidecar.
2. Configure `DD_API_KEY` and `DD_ENV` in the application before startup. Set `DD_SITE` if the site is not `datadoghq.com`.
3. For PHP, set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` before startup. Other new setups do not require source or enablement settings.
4. Initialize the provider and wait for initial configuration where supported. PHP waits during its first evaluation.

Store API keys in the platform's secret manager. Allow outbound HTTPS to the Datadog flag configuration service. Each evaluation uses local configuration; it does not send a configuration request.

The SDK polls every 30 seconds by default. It retains the last accepted configuration during temporary delivery errors. Before the first configuration arrives, evaluations return caller-provided defaults.

See [Configuration Sources][2] for endpoint, polling, and timeout settings. See [Migrate an existing Remote Configuration setup][3] if the application uses legacy enablement settings.

## Send feature flag telemetry

Flag configuration, experiment exposures, aggregated evaluation events, and OTLP metrics use separate delivery paths.

| SDK | Experiment exposures | Aggregated flag evaluation events | Event delivery in agentless mode |
|---|---|---|---|
| Java | Supported | Supported | Direct HTTPS; a compatible local relay can be used with the Java agent |
| Node.js | Supported | Not supported in the documented release | Prefer a compatible relay; use direct HTTPS fallback |
| Python | Supported | Supported | Prefer a compatible relay; use direct HTTPS fallback |
| .NET | Supported | Supported | Prefer a compatible relay; use direct HTTPS fallback |
| Ruby | Supported | Supported | Prefer a compatible relay; use direct HTTPS fallback |
| Go | Supported | Supported | Prefer a compatible relay; use direct HTTPS fallback |
| PHP | Supported | Supported | Prefer a compatible relay; use direct HTTPS fallback |

These capabilities apply to the [documented SDK versions][1]. Direct event delivery uses the application's API key and Datadog site. Remote Configuration uses Agent-backed event delivery.

Experiment exposures are generated only for flags associated with an experiment. Aggregated evaluation events and the separate `feature_flag.evaluations` OTLP metric are different signals. Configure the metric through [Server-Side Flag Evaluation Metrics][4]. Agentless configuration does not configure an OTLP exporter.

### Use a local telemetry relay

`serverless-init` is an optional local relay for supported event paths. It is not a Feature Flags configuration source. Keep the source set to `agentless` to receive configuration from the CDN.

Follow [Serverless Monitoring][5] to configure a supported relay for the platform. Use `serverless-init` 1.9.13 or later for EVP event delivery. Configure its API key and site separately from the application credentials.

### Verify event delivery

1. Confirm that a known flag evaluates from received configuration.
2. Evaluate a flag associated with an experiment and confirm that the experiment receives an exposure.
3. If the language supports aggregated evaluation events, confirm that evaluation data appears in Datadog.
4. If using a local relay, check its connection and forwarding logs.
5. Verify the OTLP path separately if the application uses `feature_flag.evaluations`.

## Agent-backed Remote Configuration

Use this path when the application should receive configuration from an existing Datadog Agent. `serverless-init` does not replace the Agent for Remote Configuration.

Configure the application:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
export DD_AGENT_HOST='<PRIVATE_AGENT_HOSTNAME_OR_IP>'
export DD_TRACE_AGENT_PORT=8126
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Configure the Agent with its API key, site, and Remote Configuration. The application must reach the Agent over a private network. The Agent must reach Datadog over HTTPS.

For Java, load `dd-java-agent` 1.69.0 or later with `-javaagent`, alongside `dd-openfeature` 1.69.0 or later. Use the Java command or `JAVA_TOOL_OPTIONS` to set the JVM option. See [Java Remote Configuration][6].

## Runtime considerations

- **Cold starts:** Blocking initialization adds the time needed to receive initial configuration. Use background initialization if the application can serve default values during startup.
- **Java:** Standalone `dd-openfeature` does not require a Java agent or a tracing layer for agentless delivery.
- **.NET:** The runtime must support the Datadog native profiler. The provider package alone is insufficient.
- **Ruby:** Use a supported runtime and native extension. See [Ruby requirements][7].
- **PHP:** The runtime must support the extension and subprocess sidecar. Pass deployment variables to PHP workers before startup.
- **Edge runtimes:** Verify that the platform supports the selected SDK and its native dependencies. Browser-only runtimes cannot use the Node.js tracer provider.

Datadog-managed agentless delivery is not available for Datadog for Government. Use a supported configuration source for the selected site.

## Public API and local evaluation

The public Feature Flags API manages flags and environments. Use the server SDK to evaluate flags locally instead of querying the management API for each application request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/server/#getting-started
[2]: /feature_flags/concepts/configuration_sources/
[3]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[4]: /feature_flags/guide/server_flag_evaluation_metrics/
[5]: /serverless/
[6]: /feature_flags/server/java/#use-agent-delivery
[7]: /feature_flags/server/ruby/#getting-started
