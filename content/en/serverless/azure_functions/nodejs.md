---
title: Instrument Azure Functions for Node.js
type: multi-code-lang
code_lang: nodejs
code_lang_weight: 10
---

## Setup

1. Instrumenting Azure Functions requires two dependencies: 
   - Datadog Serverless Agent, a serverless-specific Datadog Agent to collect and send traces to Datadog
   - Datadog Node.js Tracing Library (`dd-trace`), to create and send traces to a Datadog Agent

   To install these packages:
   ```
   npm install @datadog/sma
   npm install dd-trace
   ```

   Datadog recommends that you pin the package versions and regularly upgrade to the latest versions of both of these packages. This ensures that you have access to enhancements and bug fixes.

   If your Azure Functions use a version of Node.js earlier than v18, choose the appropriate version of `dd-trace`. See the [release lines][1].

   Automatic instrumentation of the Azure Functions package requires version 4.48.0+ (v4 release line) or 5.24.0+ (v5 release line) of `dd-trace`.
2. To initialize `dd-trace`, add the following line to your main application entry point file (for example, `app.js`)
   ```js
   // This line must come before importing any instrumented module. 
   const tracer = require('dd-trace').init()
   ```
   For more options for configuring `dd-trace`, see [Datadog Node.js tracer settings][2].
3. Configure the following environment variables:

   - `DD_API_KEY`: your [Datadog API key][3]
   - `DD_SITE`: your [Datadog site][4], {{< region-param key="dd_site" code="true" >}}
   - `DD_ENV`: the environment name to use for [Unified Service Tagging][5]
   - `DD_SERVICE`: the service name to use for Unified Service Tagging
   - `DD_VERSION`: the version name to use for Unified Service Tagging
4. To further extend Unified Service Tagging, install the [Datadog Azure integration][6] and set tags on your Azure Functions. This allows for [Azure Function metrics][7] and other Azure metrics to be correlated with traces.

   You can set additional custom tags by using the `DD_TAGS` environment variable:
   ```
   DD_TAGS="key1:value1,key2:value2"
   ```

## Validation

To view the traces in Datadog, go to your [APM Trace Explorer][6] and search for the service you set in the `DD_SERVICE` environment variable.

You can also view traces on the [Serverless Azure Functions][9] page. This view is enriched with telemetry collected by the [Datadog Azure integration][6].

## Additional features

### Enable trace metrics

[Trace metrics][7] are disabled by default. You can enable them with the `DD_TRACE_TRACER_METRICS_ENABLED` environment variable:

```
DD_TRACE_TRACER_METRICS_ENABLED=true
```

### Correlate logs and traces
To inject trace IDs into logs, see [Correlating Node.js logs and traces][8].

## Troubleshooting
By default, the Datadog Tracing Library and Datadog Serverless Agent log at the `INFO` level. You can view more granular logs by configuring environment variables.

Enable debug logs for the Datadog Tracing Library with the `DD_TRACE_DEBUG` environment variable:

```
DD_TRACE_DEBUG=true
```

Enable debug logs for the Datadog Serverless Agent with the `DD_LOG_LEVEL` environment variable:

```
DD_LOG_LEVEL=debug
```

Alternatively disable logs for the Datadog Serverless Agent with the `DD_LOG_LEVEL` environment variable:

```
DD_LOG_LEVEL=off
```

[1]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[2]: https://datadoghq.dev/dd-trace-js/#tracer-settings
[3]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /getting_started/site/
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://app.datadoghq.com/apm/traces
[7]: /tracing/metrics/metrics_namespace/
[8]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[9]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function