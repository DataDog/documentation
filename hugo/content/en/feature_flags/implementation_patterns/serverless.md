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

The Datadog Feature Flags Java and Node.js SDKs can receive flag configuration directly from the Datadog-managed CDN. This _agentless_ configuration source simplifies onboarding because it does not require a Datadog Agent for flag configuration. It also supports serverless applications that cannot connect to a Datadog Agent.

After configuration is loaded, flag evaluation happens locally in the application. The SDK does not make a network request for each evaluation.

Agentless configuration delivery is available in:

| SDK | Minimum version |
|---|---|
| Java `dd-openfeature` and `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |

Java CDN delivery requires `dd-openfeature` and `dd-java-agent`. The Java runtime must support loading `dd-java-agent` with the `-javaagent` JVM option. You can pass this option in the Java command or through `JAVA_TOOL_OPTIONS`.

Other server SDKs and versions earlier than those listed require Agent Remote Configuration for flag delivery.

<div class="alert alert-warning">The initial Node.js agentless releases load configuration and evaluate flags locally. They do not export evaluation metrics or exposure events. Java agentless delivery changes only the configuration source. Without a supported Datadog Agent or serverless telemetry path, Java also does not export these signals.</div>

## Agentless architecture

Use agentless delivery when the serverless runtime can make outbound HTTPS requests to Datadog. For Java, the runtime must also let you set the `-javaagent` JVM option:

1. Use a [supported SDK version](#overview).
2. For Java, load `dd-java-agent` with `-javaagent` or `JAVA_TOOL_OPTIONS`. See the Java setup for [Cloud Run Functions][7] or [Cloud Run containers][8] for examples.
3. Configure the API key, Datadog site, and environment in the serverless application:

   {{< code-block lang="bash" >}}
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   DD_ENV=<YOUR_ENVIRONMENT>{{< /code-block >}}

4. Initialize or access the Datadog OpenFeature provider as described in the [Java][6] or [Node.js][3] setup. This starts CDN polling. No Feature Flags enablement or source setting is required.
5. Store `DD_API_KEY` in the serverless platform's secret manager and expose it only to the application process.

The SDK polls the Datadog-managed CDN every 30 seconds by default and uses ETags for unchanged configuration. It preserves the last accepted configuration during temporary errors. If no configuration has been accepted, OpenFeature evaluations return the caller-provided default value.

Tracer installation and initialization alone do not start CDN polling. Requests to the CDN contribute to server Feature Flags billing only after application code activates the provider.

Agentless mode removes the Datadog Agent dependency for _flag configuration_. It does not remove language-specific tracer requirements. It also does not configure or enable APM and serverless telemetry. You can use the Datadog Lambda Extension, `serverless-init`, an Agent sidecar, or another supported telemetry path independently.

## Agent-backed Remote Configuration

Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` to explicitly use the existing Agent Remote Configuration path:

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

For Java, use compatible `dd-openfeature` and `dd-java-agent` versions. Use version 1.65.0 or later for both components.

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
- **Outbound connectivity**: Agentless delivery requires outbound HTTPS access to the Datadog-managed flag configuration service.
- **API key ownership**: In agentless mode, the application owns `DD_API_KEY`. In `remote_config` mode, the Agent owns the API key.
- **Flag updates**: Delivery is eventually consistent. Allow for the SDK polling interval and application startup time when testing changes.
- **Last-known-good behavior**: After a configuration has been accepted, temporary network failures or malformed responses do not replace it.
- **Runtime support**: Java requires Java 11 or later. For Node.js, check the tracer's runtime compatibility requirements.
- **Kill switch**: `DD_FEATURE_FLAGS_ENABLED` defaults to `true`. Set it to `false` to disable the provider and both configuration delivery paths. Evaluations then return caller-provided default values.

Datadog-managed agentless delivery is not available for Datadog for Government in these versions. Use Agent Remote Configuration on that site.

If your deployment uses `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`, see [Migrate from the legacy provider setting][5].

## Environment notes

### AWS Lambda

Java and Node.js Lambda functions can use agentless configuration delivery when they run a minimum SDK version and can reach Datadog over HTTPS. Java functions must load `dd-java-agent` with `-javaagent`, either directly or through `JAVA_TOOL_OPTIONS`. A Java tracing layer can provide this setup. The Datadog Lambda Extension is not required for flag configuration.

### Google Cloud serverless environments

Java workloads can use agentless configuration delivery on Java 11 or later when the runtime can load `dd-java-agent`. The Java setup for [Cloud Run Functions][7] and [Cloud Run containers][8] uses `JAVA_TOOL_OPTIONS` to set `-javaagent`. Node.js workloads require a supported tracer runtime. Both runtimes require outbound HTTPS access.

### Azure Functions

Java function apps can use agentless configuration delivery on Java 11 or later when the runtime can load `dd-java-agent`. Node.js function apps require a supported tracer runtime. Both runtimes require outbound HTTPS access. An external Datadog Agent is only required when `remote_config` is selected.

### Edge runtimes

Some edge runtimes do not support the Datadog Node.js tracer APIs required by the Feature Flags provider. Verify tracer compatibility for the target platform before relying on agentless configuration delivery.

## Public API and local evaluation

The public [Feature Flags API][4] is intended for managing flags and environments. It is not a per-request flag evaluation API for server-side applications.

Do not query Datadog APIs from each serverless invocation to evaluate flags. Use the server SDK, which periodically loads flag configuration and evaluates locally.

## Validate your setup

Before enabling Feature Flags in production:

1. Confirm the application uses a [minimum supported SDK version](#overview). For Java, confirm that the JVM loads `dd-java-agent`.
2. For agentless delivery, confirm the application has `DD_API_KEY`, `DD_SITE`, and `DD_ENV`. For Agent Remote Configuration, confirm the Agent has its API key and Remote Configuration enabled.
3. Initialize the OpenFeature provider and check that it reaches a ready state.
4. Change a non-production flag in Datadog and confirm that the workload receives the updated value after the polling interval.
5. Confirm that your application handles caller-provided defaults if configuration is unavailable during a cold start.
6. For Node.js, do not plan experimentation workflows around evaluation metrics or exposure data. For Java, configure a supported Datadog Agent or serverless telemetry path before you use these signals.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: /feature_flags/server/
[3]: /feature_flags/server/nodejs/
[4]: /api/latest/feature-flags/
[5]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[6]: /feature_flags/server/java/
[7]: /serverless/google_cloud_run/functions/java/?tab=maven
[8]: /serverless/google_cloud_run/containers/in_container/java/
