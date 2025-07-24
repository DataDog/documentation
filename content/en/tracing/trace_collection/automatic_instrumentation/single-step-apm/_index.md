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
---
## Overview

Single Step Instrumentation (SSI) automatically installs the Datadog SDKs with no additional configuration required, reducing onboarding time from days to minutes.

To learn more about how it works, see the [injector guide for Single Step Instrumentation][8].

## Instrument SDKs across applications

When you [install or update the Datadog Agent][1] with **APM Instrumentation** enabled, the Agent instruments your applications by loading the Datadog SDK into supported processes. This enables distributed tracing by capturing and sending trace data from your services without requiring code changes.

After instrumentation, you can optionally:
- [configure Unified Service Tags (USTs)](#configure-universal-service-tags)
- [enable additional SDK-dependent products and features](#enable-sdk-dependent-products-and-features), such as Continuous Profiler or Application Security Monitoring

Click on one of the following tiles to learn how to set up SSI for your deployment type:

{{< partial name="apm/apm-single-step.html" >}} 

<br>

<div class="alert alert-info">To see requirements for compatible languages, operating systems, and architectures, see <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">Single Step Instrumentation compatibility.</a></div>

## Configure Unified Service Tags

Unified Service Tags (USTs) connect traces, metrics, and logs by applying consistent tags across your telemetry. This makes it easier to navigate your observability data.

Learn how to set USTs for:
- [Linux][14]
- [Docker][15]
- [Windows][18]
- [Kubernetes][16]



## Enable SDK-dependent products and features

Once SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as Continuous Profiler, Application Security Monitoring, and trace ingestion controls.

The available setup methods depend on your platform:

{{< tabs >}}
{{% tab "Linux" %}}

| Configuration method | Description | Supported platforms |
|:---|:---|:---|
| [Configure in `application_monitoring.yaml`][17] | Enable products across all services on a host without modifying application command lines. | Linux only |
| [Set environment variables][10] | Enable products by setting environment variables directly in your application configuration. | Linux, Kubernetes, Windows, Docker |

[10]: /tracing/trace_collection/library_config/
[17]: /tracing/trace_collection/automatic_instrumentation/configure_apm_features_linux/

{{% /tab %}}

{{% tab "Docker" %}}

| Configuration method | Description | Supported platforms |
|:---|:---|:---|
| [Set environment variables][10] | Enable products by setting environment variables directly in your application configuration. | Linux, Kubernetes, Windows, Docker |

[10]: /tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Kubernetes" %}}

| Configuration method | Description | Supported platforms |
|:---|:---|:---|
| [Configure with workload targeting][9] | By default, Single Step Instrumentation instruments all services in all namespaces. Use workload targeting to limit instrumentation to specific namespaces, pods, or workloads, and apply custom configurations. | Kubernetes only |
| [Set environment variables][10] | Enable products by setting environment variables directly in your application configuration. | Linux, Kubernetes, Windows, Docker |

[9]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Windows" %}}

| Configuration method | Description | Supported platforms |
|:---|:---|:---|
| [Set environment variables][10] | Enable products by setting environment variables directly in your application configuration. | Linux, Kubernetes, Windows, Docker |

[10]: /tracing/trace_collection/library_config/

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

Single Step Instrumentation automatically disables when it detects [custom instrumentation][7] in your application. If you want to use SSI, you'll need to:

1. Remove any existing custom instrumentation code.
1. Restart your application.

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
[17]: /tracing/trace_collection/automatic_instrumentation/configure_apm_features_linux/
