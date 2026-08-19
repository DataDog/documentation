---
title: Set Up Datadog APM
description: Choose the right Datadog APM setup for your environment and language, instrument your application, and verify your first trace.
aliases:
    - /getting_started/tracing/distributed-tracing
algolia:
    tags: ['apm setup', 'application performance monitoring', 'distributed tracing', 'tracing setup', 'single step instrumentation']
further_reading:
    - link: '/tracing/trace_collection/'
      tag: 'Documentation'
      text: 'Compare application instrumentation methods'
    - link: '/tracing/troubleshooting/'
      tag: 'Documentation'
      text: 'Troubleshoot APM'
    - link: '/tracing/guide/#enabling-tracing-tutorials'
      tag: 'Guides'
      text: 'Explore APM setup tutorials'
    - link: 'https://learn.datadoghq.com/courses/intro-to-apm'
      tag: 'Learning Center'
      text: 'Introduction to Application Performance Monitoring'
---

## Overview

To collect traces with Datadog Application Performance Monitoring (APM), instrument your application and configure it to send traces to Datadog. For supported applications on Linux, Docker, Kubernetes, and Windows, **Single Step Instrumentation (SSI) is the recommended starting point** because it installs and loads the Datadog SDK without application code changes.

Use this page to choose the setup path for your environment and language, then verify that your application sends traces to Datadog.

<div class="alert alert-info">To try APM with a sample application, follow the <a href="/tracing/guide/apm-quickstart-python-linux/">Python and Linux SSI quickstart</a>.</div>

## Before you begin

To set up APM, you need:

- A [Datadog account][1] and [API key][2].
- Access to install or update the Datadog Agent and application instrumentation.
- Permission to restart or redeploy your application.
- Your application's language, runtime, and deployment environment.

If your application already sends traces to Datadog, use the [SDK configuration][3] or [APM troubleshooting][4] documentation instead of reinstalling instrumentation.

## Set up Datadog APM

First, check whether your application requires a specialized setup:

| Your application runs in | Start with |
|---|---|
| AWS Lambda or another serverless environment | [Serverless setup][5] |
| An environment already instrumented with OpenTelemetry | [Send OpenTelemetry data to Datadog][6] |
| Android or iOS | [Android tracing][7] or [iOS tracing][8] |
| A proxy or API gateway | [Proxy Tracing][9] |

For applications on hosts, in containers, or on Kubernetes, choose between SSI and a manually managed SDK.

### Single Step Instrumentation (recommended)

Use SSI when it supports both your deployment environment and application runtime. SSI supports Java, Python, Ruby, Node.js, .NET, and PHP applications, subject to runtime and environment requirements. Review [SSI compatibility][10] before installation.

Choose your deployment environment:

| Environment | Setup guide | What the guide covers |
|---|---|---|
| Linux host or VM | [Set up SSI on Linux][11] | New and existing Agent installations |
| Docker on Linux | [Set up SSI on Docker][12] | Host instrumentation, the Agent container, and application containers |
| Kubernetes with Linux nodes | [Set up SSI on Kubernetes][13] | Datadog Operator and Datadog Helm chart installations |
| Windows | [Set up SSI on Windows][14] | Supported .NET applications; host-wide .NET and Java support is in Preview |

Each guide includes environment-specific installation and verification steps.

{{% dd-apm-skill %}}

### Manually managed Datadog SDK

Use a manually managed Datadog SDK when:

- SSI does not support your language, runtime, operating system, or deployment model.
- Your application already manages a Datadog SDK as a dependency.
- You need application-controlled SDK installation or versioning.

**Go applications are not supported by SSI.** To instrument a Go application, [add the Datadog Go SDK][15] with Orchestrion or configure the SDK in code.

For other languages, [choose a Datadog SDK][16] and follow its installation instructions. If you need a vendor-neutral instrumentation API or use a runtime without a Datadog SDK, [instrument your application with OpenTelemetry][17].

## Verify your first trace

After you complete the selected setup guide:

1. Complete the verification steps for your environment.
1. Restart or redeploy the instrumented application when the guide requires it.
1. Send a request to the application to generate traffic.
1. In Datadog, go to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][18] and confirm that your service appears.
1. Go to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][19] and select a trace to inspect its spans.

If your service does not appear, first confirm that instrumentation loaded, then verify the connection between the application and the Agent. See [Troubleshooting Single Step APM][20] or [APM Connection Errors][21] for the selected setup method.

## Next steps

After your application sends traces to Datadog:

- Apply [Unified Service Tags][22] to correlate telemetry by service, environment, and version.
- [Correlate logs and traces][23].
- Enable [runtime metrics][24].
- Review [ingestion controls][25] and [retention filters][26] before a broad production rollout.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: /tracing/trace_collection/library_config/
[4]: /tracing/troubleshooting/
[5]: /serverless/
[6]: /opentelemetry/setup/
[7]: /tracing/trace_collection/dd_libraries/android/
[8]: /tracing/trace_collection/dd_libraries/ios/
[9]: /tracing/trace_collection/proxy_setup/
[10]: /tracing/trace_collection/single-step-apm/compatibility/
[11]: /tracing/trace_collection/single-step-apm/linux/
[12]: /tracing/trace_collection/single-step-apm/docker/
[13]: /tracing/trace_collection/single-step-apm/kubernetes/
[14]: /tracing/trace_collection/single-step-apm/windows/
[15]: /tracing/trace_collection/dd_libraries/go/
[16]: /tracing/trace_collection/dd_libraries/
[17]: /opentelemetry/instrument/
[18]: https://app.datadoghq.com/services
[19]: https://app.datadoghq.com/apm/traces
[20]: /tracing/trace_collection/single-step-apm/troubleshooting/
[21]: /tracing/troubleshooting/connection_errors/
[22]: /getting_started/tagging/unified_service_tagging/
[23]: /tracing/other_telemetry/connect_logs_and_traces/
[24]: /tracing/metrics/runtime_metrics/
[25]: /tracing/trace_pipeline/ingestion_controls/
[26]: /tracing/trace_pipeline/trace_retention/
