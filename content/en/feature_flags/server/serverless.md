---
title: Serverless Environments
description: Use Datadog Feature Flags server SDKs from serverless environments with a Datadog Agent.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/serverless/"
  tag: "Documentation"
  text: "Serverless Monitoring"
---

## Overview

Datadog Feature Flags server SDKs receive flag configuration through [Remote Configuration][1]. The Datadog Agent is required for this flow: it connects to Datadog, receives signed Remote Configuration payloads, validates those payloads, and makes the resulting feature flag configuration available to the Datadog SDK in your application.

After the SDK receives the payload, flag evaluation happens locally in your application. The SDK does not make a network request to Datadog for each flag evaluation.

Serverless runtimes that cannot run or reach a Datadog Agent do not support Feature Flags server SDK payload delivery. Deeper support for serverless environments is planned for a future release.

## Recommended architecture

For serverless workloads, run a Datadog Agent on stateful infrastructure that your serverless application can reach over a private network. For example, run the Agent on EC2, ECS, EKS, a Google Compute Engine VM, GKE, an Azure VM, or AKS.

Configure the Agent with Remote Configuration enabled:

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

Then configure the serverless application to use the Agent as its trace Agent endpoint and enable the Feature Flags provider:

{{< code-block lang="bash" >}}
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
DD_REMOTE_CONFIG_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

Also configure the standard service tags used by the server SDK:

{{< code-block lang="bash" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

Use the language-specific Feature Flags server SDK setup after the Agent connection is available. See [Server-Side Feature Flags][2] for setup by language.

## Operational considerations

Treat the Agent as part of the runtime dependency chain for server-side flag delivery:

- **Network path**: The serverless workload must be able to reach the Agent on the trace Agent port, typically `8126`. The Agent must be able to reach Datadog over HTTPS.
- **Private connectivity**: Keep the Agent endpoint on a private network. Do not expose the Agent trace intake publicly.
- **High availability**: If the Agent is unavailable during startup, SDKs use default values until the first configuration payload is available. Run enough Agent capacity for the serverless workload's concurrency and availability requirements.
- **Cold starts**: Blocking provider initialization can increase cold-start latency. If startup latency is more important than immediately serving remote flag values, initialize asynchronously and rely on defaults until the provider is ready.
- **Flag updates**: Remote Configuration delivery is eventually consistent. Allow for the Agent polling interval and SDK startup time when testing a newly changed flag.

## Environment notes

### AWS Lambda

AWS Lambda does not support direct Feature Flags server SDK payload delivery through the Datadog Lambda Extension alone. The Lambda Extension can collect telemetry, but it is not a replacement for the Agent Remote Configuration path required by Feature Flags server SDKs.

If the Lambda function runs in a VPC, configure it to reach a Datadog Agent running on stateful infrastructure, such as EC2, ECS, or EKS. Then set `DD_AGENT_HOST`, `DD_TRACE_AGENT_PORT`, `DD_REMOTE_CONFIG_ENABLED`, and the Feature Flags provider setting on the function.

For Java Lambda functions, the Java Feature Flags SDK expects the Datadog Java tracer runtime to receive Remote Configuration from the Agent. Native-image builds, such as Quarkus native or GraalVM AOT applications, are not a supported direct path for Java Feature Flags server SDK payload delivery.

### Google Cloud Run services

Cloud Run services can use Datadog serverless monitoring instrumentation, including in-container and sidecar approaches for telemetry. Remote Configuration for Feature Flags server SDKs is not supported directly in Cloud Run managed services. If you need server-side flags from Cloud Run, run a stateful Agent outside Cloud Run and connect to it over private networking.

### Google Cloud Run functions and Cloud Functions

Cloud Run functions and Cloud Functions do not support direct Feature Flags server SDK payload delivery. Use a reachable stateful Agent if your networking model allows it, or rely on application defaults until first-class serverless support is available.

### Azure Functions

Azure Functions do not support direct Feature Flags server SDK payload delivery. If the function app can reach private Azure infrastructure, run the Agent on an Azure VM, AKS, or another supported stateful compute environment and point the function app to that Agent.

### AWS Fargate and container tasks

If your serverless container environment lets you run a Datadog Agent sidecar or otherwise connect to a supported Agent, use the standard server SDK setup. In this model, the task or service behaves like any other application connected to an Agent with Remote Configuration enabled.

### Managed edge and function platforms

Platforms such as Vercel Functions, Netlify Functions, and Cloudflare Workers generally do not provide a supported Agent runtime or private Agent connection model for Feature Flags server SDKs. These platforms are not supported for server-side Feature Flags payload delivery.

## Public API and local evaluation

The public Feature Flags API is intended for managing flags and environments. It is not a per-request flag evaluation API for server-side applications.

Do not query Datadog APIs from each serverless invocation to evaluate flags. Use the server SDK with an Agent-backed Remote Configuration path when available. If no Agent path is available, use application-owned defaults or static configuration until direct serverless support is available. This fallback is outside Remote Configuration delivery and does not provide signed payload validation or live updates.

## Validate the setup

After deployment:

1. Verify that the Agent has Remote Configuration enabled with `datadog-agent status`.
2. Confirm that the serverless workload can connect to the Agent trace endpoint.
3. Initialize the OpenFeature provider and check that it reaches a ready state.
4. Change a non-production flag in Datadog and confirm that the serverless workload receives the updated value after the Remote Configuration polling interval.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: /feature_flags/server/
