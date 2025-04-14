---
title: Single Step APM Instrumentation
aliases:
- /tracing/trace_collection/single-step-apm
type: multi-code-lang
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---
## Overview

Single Step Instrumentation (SSI) for APM installs the Datadog Agent and [instruments][4] your applications in one step, with no additional configuration steps required.

## Compatibility

To see requirements for compatible languages, operating systems, and architectures, see [Single Step Instrumentation compatibility][6].

## Enabling APM on your applications

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation** option selected, the Agent is installed and configured to enable APM. This automatically instruments your application, without any additional installation or configuration steps.

Follow the relevant documentation to learn more about Single Step Instrumentation for your deployment type:

{{< partial name="apm/apm-single-step.html" >}} 

<br>

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
