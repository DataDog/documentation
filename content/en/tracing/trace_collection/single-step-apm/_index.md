---
title: Single Step APM Instrumentation
description: "Automatically instrument applications with Datadog APM using Single Step Instrumentation (SSI). Install the Datadog Agent and enable tracing with no code changes on Kubernetes, Linux, Docker, or Windows."
aliases:
- /tracing/trace_collection/admission_controller/
- /tracing/trace_collection/library_injection_local/
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
  - link: /tracing/guide/injectors
    tag: Documentation
    text: Understanding injector behavior with Single Step Instrumentation
  - link: /tracing/trace_collection/single-step-apm/troubleshooting/
    tag: Documentation
    text: "Troubleshooting Single Step APM"
  - link: /tracing/guide/local_sdk_injection
    tag: Documentation
    text: Instrument your applications using local SDK injection
  - link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
    tag: Learning Center
    text: Troubleshooting APM Instrumentation on a Host
  - link: "https://www.datadoghq.com/blog/datadog-csi-driver/"
    tag: "Blog"
    text: "Bring high-performance observability to secure Kubernetes environments with Datadog's CSI driver"
  - link: "https://www.datadoghq.com/blog/rum-apm-single-step"
    tag: "Blog"
    text: "Enable end-to-end visibility into your Java apps with a single command"
  - link: "https://www.datadoghq.com/blog/single-step-instrumentation-rules/"
    tag: "Blog"
    text: "Manage service tracing across hosts with Single Step Instrumentation rules"
---
## Overview

Single Step Instrumentation (SSI) automatically installs the Datadog SDKs into your applications with no code changes or additional configuration required.

To learn more about how it works, see the [injector guide for Single Step Instrumentation][2].

## Prerequisites

1. Check whether the application already loads a tracing SDK. Remove or disable only conflicting tracer initialization before enabling SSI, then restart the application. You can keep custom spans and non-tracing OpenTelemetry dependencies.
1. Confirm environment compatibility by reviewing the [SSI compatibility guide][5] for supported languages, operating systems, and architectures.

## Instrument SDKs across applications

When you [install or update the Datadog Agent][1] with {{< ui >}}APM Instrumentation{{< /ui >}} enabled, the Agent instruments your applications by loading the Datadog SDK into supported processes. This enables distributed tracing by capturing and sending trace data from your services without requiring code changes.

After instrumentation, you can optionally:
- [configure Unified Service Tags (USTs)][3]
- enable additional SDK-dependent products and features, such as Continuous Profiler or Application Security Monitoring

Click on one of the following tiles to learn how to set up SSI for your deployment type:

{{< card-grid card_width="170px" image_width="200" >}}
  {{< image-card href="linux/" src="integrations_logos/linux.png" alt="linux" >}}
  {{< image-card href="docker/" src="integrations_logos/docker.png" alt="docker" >}}
  {{< image-card href="kubernetes/" src="integrations_logos/kubernetes.png" alt="kubernetes" >}}
  {{< image-card href="windows/" src="integrations_logos/windows.png" alt="windows" >}}
{{< /card-grid >}}

<br>

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/guide/injectors
[3]: /getting_started/tagging/unified_service_tagging
[4]: /tracing/trace_collection/single-step-apm/troubleshooting
[5]: /tracing/trace_collection/single-step-apm/compatibility/
