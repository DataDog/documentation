---
title: Single Step APM Instrumentation
aliases:
- /tracing/trace_collection/single-step-apm
- /tracing/trace_collection/admission_controller/
- /tracing/trace_collection/library_injection_local/
type: multi-code-lang
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
  - link: /tracing/guide/injectors
    tag: Documentation
    text: Understanding injector behavior with Single Step Instrumentation
  - link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
    tag: Documentation
    text: "Troubleshooting Single Step APM"
  - link: /tracing/guide/local_sdk_injection
    tag: Documentation
    text: Instrument your applications using local SDK injection
  - link: "https://www.datadoghq.com/blog/datadog-csi-driver/"
    tag: "Blog"
    text: "Bring high-performance observability to secure Kubernetes environments with Datadog's CSI driver"
---
## Overview

Single Step Instrumentation (SSI) automatically installs the Datadog SDKs with no additional configuration required, reducing onboarding time from days to minutes.

To learn more about how it works, see the [injector guide for Single Step Instrumentation][8].

## Prerequisites

1. Remove any custom instrumentation code from your application and restart it. SSI is automatically disabled if custom instrumentation is detected.
1. Confirm environment compatibility by reviewing the [SSI compatibility guide][18] for supported languages, operating systems, and architectures.

## Instrument SDKs across applications

When you [install or update the Datadog Agent][1] with **APM Instrumentation** enabled, the Agent instruments your applications by loading the Datadog SDK into supported processes. This enables distributed tracing by capturing and sending trace data from your services without requiring code changes.

After instrumentation, you can optionally:
- [configure Unified Service Tags (USTs)][14]
- enable additional SDK-dependent products and features, such as Continuous Profiler or Application Security Monitoring

Click on one of the following tiles to learn how to set up SSI for your deployment type:

{{< partial name="apm/apm-single-step.html" >}} 

<br>

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][15].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/metrics/runtime_metrics/
[3]: /tracing/software_catalog/
[4]: /tracing/glossary/#instrumentation
[5]: /containers/cluster_agent/admission_controller/
[6]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /tracing/trace_collection/custom_instrumentation/
[8]: /tracing/guide/injectors
[9]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /tracing/trace_collection/library_config/
[11]: /tracing/metrics/runtime_metrics/
[12]: /tracing/software_catalog/
[13]: /tracing/glossary/#instrumentation
[14]: /getting_started/tagging/unified_service_tagging
[15]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[16]: /tracing/trace_collection/custom_instrumentation/
[17]: /tracing/trace_collection/automatic_instrumentation/configure_apm_features_linux/
[18]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
