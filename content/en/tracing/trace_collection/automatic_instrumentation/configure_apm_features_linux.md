---
title: Enable SDK-dependent products on Linux
further_reading:
  - link: /tracing/trace_collection/automatic_instrumentation/single-step-apm
    tag: Documentation
    text: Learn more about Single Step Instrumentation
---

{{< callout url="#" btn_hidden="true" header="false" >}}
The following functionality is in Preview.
{{< /callout >}}

## Overview

On Linux hosts that use Single Step Instrumentation (SSI), you can enable or disable Datadog SDK-dependent products at the host level with the `application_monitoring.yaml` file. All instrumented services on the host inherit these settings.

## Configuration steps

1. Ensure the `application_monitoring.yaml` file exists at the following path:

   ```
   /etc/datadog-agent/application_monitoring.yaml
   ```

1. To enable or disable products, define them under the `apm_configuration_default` block and set them to `true` or `false`.

   **Note:** If a product is enabled through [environment variables set on the SDK][1], those values override the settings in `application_monitoring.yaml`.

   As an example, the following enables profiling and Data Streams Monitoring, and disables tracing:

   ```
   apm_configuration_default:
     DD_PROFILING_ENABLED: true
     DD_DATA_STREAMS_ENABLED: true
     DD_APM_TRACING_ENABLED: false
   ```

## Supported products and configuration keys

The following table lists the products and their respective configuration keys:


| Product                          | Configuration key             |
|----------------------------------|-------------------------------|
| [APM Tracing][2]                      | `DD_APM_TRACING_ENABLED`      |
| [Continuous Profiler][3]              | `DD_PROFILING_ENABLED`        |
| [Data Streams Monitoring][4]          | `DD_DATA_STREAMS_ENABLED`     |
| [App and API Protection (AAP)][5]     | `DD_APPSEC_ENABLED`           |
| [Code Security (IAST)][6]             | `DD_IAST_ENABLED`             |
| [Data Jobs Monitoring][7]             | `DD_DATA_JOBS_ENABLED`        |
| [Software Composition Analysis][8]    | `DD_APPSEC_SCA_ENABLED`       |


## SDK version requirements

The following minimum SDK versions support configuration via `application_monitoring.yaml`:

| Language   | Minimum SDK version |
|------------|---------------------|
| Java       | v1.47.0             |           
| Python     | v3.2.0              |           
| Node.js    | v5.41.0             |           
| .NET       | Not yet supported   |
| PHP        | v1.8.0              |
| Ruby       | v2.18.0             |
| Go         | v2.1.0              |



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/library_config/
[2]: https://www.datadoghq.com/product/apm/
[3]: https://www.datadoghq.com/product/code-profiling/
[4]: https://www.datadoghq.com/product/data-streams-monitoring/
[5]: https://www.datadoghq.com/dg/security/application-security-management/
[6]: https://www.datadoghq.com/dg/security/code-security/
[7]: https://www.datadoghq.com/product/data-jobs-monitoring/
[8]: https://www.datadoghq.com/product/software-composition-analysis/
