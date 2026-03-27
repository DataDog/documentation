---
title: Configure Datadog SDKs with application_monitoring.yaml on Linux
aliases:
- /tracing/trace_collection/configure_apm_features_linux
- /tracing/trace_collection/automatic_instrumentation/configure_apm_features_linux
further_reading:
  - link: /tracing/trace_collection/library_config/
    tag: Documentation
    text: Library configuration options
---

## Overview

On Linux hosts, you can configure Datadog SDKs at the host level using the `application_monitoring.yaml` file. The file works for any SDK loaded on the host, including those loaded through Single Step Instrumentation (SSI). All instrumented services on the host inherit these settings.

## Configuration steps

1. Ensure the `application_monitoring.yaml` file exists at the following path:

   ```
   /etc/datadog-agent/application_monitoring.yaml
   ```

1. Define configuration values under the `apm_configuration_default` block.

   **Note:** If a configuration value is set through [environment variables][1], those values override the settings in `application_monitoring.yaml`.

   As an example, the following enables profiling and Data Streams Monitoring, and disables tracing:

   ```yaml
   apm_configuration_default:
     DD_PROFILING_ENABLED: true
     DD_DATA_STREAMS_ENABLED: true
     DD_APM_TRACING_ENABLED: false
   ```

1. Restart services on the host to apply the configuration changes.

## Supported configuration options

You can set any [library configuration environment variable][1] in `application_monitoring.yaml`.

**Note**: The Go SDK only supports APM tracing configuration options.

## SDK version requirements

The following minimum SDK versions support configuration through `application_monitoring.yaml`:

| Language   | Minimum SDK version |
|------------|---------------------|
| Java       | v1.47.0             |
| Python     | v3.2.0              |
| Node.js    | v5.41.0             |
| .NET       | v3.25.0             |
| PHP        | v1.8.0              |
| Ruby       | v2.18.0             |
| Go         | v2.1.0              |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/library_config/
