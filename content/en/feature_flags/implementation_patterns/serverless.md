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

Supported Datadog Feature Flags server SDKs can receive Universal Flag Configuration (UFC) directly from the Datadog-managed CDN. This _agentless_ configuration source does not require a Datadog Agent, which makes it the default delivery mode for supported serverless applications.

After configuration is loaded, flag evaluation happens locally in the application. The SDK does not make a network request for each evaluation.

Agentless configuration delivery is available in:

| SDK | Minimum version |
|---|---|
| Java (`dd-java-agent` and `dd-openfeature`) | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |

Other server SDKs require Agent Remote Configuration for flag delivery. Earlier Java and Node.js releases also require it.

<div class="alert alert-warning"><strong>Flag evaluation only:</strong> The initial agentless releases load configuration and evaluate flags. They do not provide agentless delivery for exposure events or aggregate <code>flagevaluation</code> events. No-Agent deployments do not send those events.</div>

## Default Agentless architecture

Use agentless delivery when the serverless runtime can make outbound HTTPS requests to Datadog:

1. Use a Java or Node.js SDK version listed in [Overview](#overview).
2. Configure the API key, site, and environment in the serverless application:

   {{< code-block lang="bash" >}}
   DD_API_KEY=<DATADOG_API_KEY>
   DD_ENV=<YOUR_ENVIRONMENT>

   # Optional: Defaults to datadoghq.com
   DD_SITE=<DATADOG_SITE>

   # Optional: Agentless is the default in supported versions
   DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
   {{< /code-block >}}

3. Initialize or access the Datadog OpenFeature provider as described on the [Java][3] or [Node.js][4] setup page. This starts CDN polling.
4. Store `DD_API_KEY` in the serverless platform's secret manager and expose it only to the application process.

The SDK polls the Datadog-managed CDN every 30 seconds by default and uses ETags for unchanged configuration. It preserves the last accepted configuration during temporary errors. If no configuration has been accepted, OpenFeature evaluations return the caller-provided default value.

Tracer installation and initialization alone do not start CDN polling. Requests to the CDN contribute to server Feature Flags billing only after application code activates the provider.

Agentless mode removes the Agent dependency for _flag configuration_. It does not change your APM or serverless telemetry setup. You can continue to use the Datadog Lambda Extension, `serverless-init`, an Agent sidecar, or another supported telemetry path independently.

## Agent-backed remote configuration

Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` to explicitly use the existing Agent Remote Configuration path:

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

Configure the Agent with Remote Configuration and the API key:

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

The serverless workload must be able to reach the Agent on a private network, and the Agent must be able to reach Datadog over HTTPS. Do not expose the Agent trace intake publicly.

Explicitly selecting `remote_config` enables the Feature Flags Remote Configuration subscription, even if application code does not initialize the provider. These requests contribute to server Feature Flags billing.

## Operational considerations

- **Cold starts**: Blocking provider initialization waits for the first configuration and can add cold-start latency. Initialize asynchronously if serving caller-provided default values during startup is acceptable.
- **Outbound connectivity**: Agentless delivery requires HTTPS access to the Datadog-managed UFC CDN. It does not require access to Agent port `8126`.
- **API key ownership**: In agentless mode, the application owns `DD_API_KEY`. In `remote_config` mode, the Agent owns the API key.
- **Flag updates**: Delivery is eventually consistent. Allow for the SDK polling interval and application startup time when testing changes.
- **Last-known-good behavior**: After a configuration has been accepted, temporary network failures or malformed responses do not replace it.
- **Runtime support**: Agentless configuration removes the Agent requirement, but it does not make an otherwise unsupported Java or Node.js runtime compatible with the tracer. Check the language tracer's compatibility requirements.
- **Kill switch**: Set `DD_FEATURE_FLAGGING_PROVIDER_ENABLED=false` to disable the provider and both configuration delivery paths.

Datadog-managed agentless delivery is not available for Datadog for Government in these versions. Use Agent Remote Configuration on that site.

If your deployment uses `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`, see [Migrate from the legacy provider setting][6].

## Environment notes

### AWS Lambda

Java and Node.js Lambda functions can use agentless configuration delivery when they run the minimum SDK versions and can reach Datadog over HTTPS. The Datadog Lambda Extension is not required for flag configuration, but you can continue to use it for supported serverless telemetry.

### Google Cloud serverless environments

Java and Node.js workloads can use agentless configuration delivery when the tracer is supported in the selected runtime and outbound HTTPS is available. This applies independently of in-container or sidecar telemetry instrumentation.

### Azure functions

Java and Node.js function apps can use agentless configuration delivery when the tracer is supported and outbound HTTPS is available. An external Agent is only required when `remote_config` is selected.

### Edge runtimes

Some edge runtimes do not support the Datadog Java or Node.js tracer APIs required by the Feature Flags provider. Verify tracer compatibility for the target platform before relying on agentless configuration delivery.

## Public API and local evaluation

The public [Feature Flags API][5] is intended for managing flags and environments. It is not a per-request flag evaluation API for server-side applications.

Do not query Datadog APIs from each serverless invocation to evaluate flags. Use the server SDK, which periodically loads UFC and evaluates locally.

## Validate your setup

Before enabling agentless Feature Flags in production:

1. Confirm the application uses the minimum Java or Node.js SDK version.
2. Confirm the application has `DD_API_KEY`, `DD_ENV`, and the correct `DD_SITE`.
3. Initialize the OpenFeature provider and check that it reaches a ready state.
4. Change a non-production flag in Datadog and confirm that the workload receives the updated value after the polling interval.
5. Confirm that your application handles caller-provided defaults if configuration is unavailable during a cold start.
6. Do not use exposure or aggregate `flagevaluation` data as a readiness check for a no-Agent deployment; those events do not have an agentless delivery path in the initial releases.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: /feature_flags/server/
[3]: /feature_flags/server/java/
[4]: /feature_flags/server/nodejs/
[5]: /api/latest/feature-flags/
[6]: /feature_flags/concepts/configuration_sources/#migrate-from-the-legacy-provider-setting
