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

Single Step Instrumentation (SSI) automatically installs the Datadog APM SDKs with no additional configuration required, reducing onboarding time from days to minutes.

For more information about how SSI works, read the [guide on how injectors work with SSI][8].

## Enabling APM on your applications

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation** option selected, the Agent is installed and configured to enable APM. This automatically instruments your application, without any additional installation or configuration steps.

Follow the relevant documentation to learn more about Single Step Instrumentation for your deployment type:

{{< partial name="apm/apm-single-step.html" >}} 

<br>

<div class="alert alert-info">To see requirements for compatible languages, operating systems, and architectures, see <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">Single Step Instrumentation compatibility.</a></div>

## Enabling additional APM features 

After installing the Datadog APM SDK with SSI, you can configure additional tracing-based features. These features use your application traces to provide enhanced visibility, security, and performance insights.

The available features and setup methods depend on your platform:

| Configuration method | Description | Supported platforms |
|:---|:---|:---|
| Configure in `application_monitoring.yaml` | Enable features across all services on a host without modifying application command lines. | Linux only |
| Configure with [workload targeting][9] | By default, Single Step Instrumentation instruments all services in all namespaces. Use workload targeting to limit instrumentation to specific namespaces, pods, or workloads, and apply custom configurations. | Kubernetes only |
| [Set environment variables][10] | Enable features by setting environment variables directly in your application configuration. | Linux, Kubernetes, Windows, Docker |

## Troubleshooting

### Single Step Instrumentation is not taking effect

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