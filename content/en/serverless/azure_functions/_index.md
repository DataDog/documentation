---
title: Tracing Azure Functions
---

## Overview
Azure Functions

<!-- TODO: some more preamble -->

This page explains how to collect traces from your Azure Functions. To collect metrics, install the [Datadog Azure integration][6].

## Setup

{{< programming-lang-wrapper langs="nodejs,python" >}}
{{< programming-lang lang="nodejs" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   If your Azure Functions use a version of Node.js earlier than v18, ensure that you use a [compatible version of `dd-trace`][1].

   To use [automatic instrumentation][2], you must use `dd-trace` v4.48+ (v4 release line) or v5.25+ (v5 release line).

   Datadog recommends pinning the package versions and regularly upgrading to the latest versions of both `@datadog/serverless-compat` and `dd-trace` to ensure you have access to enhancements and bug fixes.

2. **Start the Datadog serverless compatibility layer and initialize the Node.js tracer**. Add the following lines to your main application entry point file (for example, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module. 
   const tracer = require('dd-trace').init()
   ```

   [1]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
   [2]: /tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   You must use `ddtrace` v2.19+.

   Datadog recommends using the latest versions of both `datadog-serverless-compat` and `ddtrace` to ensure you have access to enhancements and bug fixes.

2. **Initialize the Datadog Python tracer and serverless compatibility layer**. Add the following lines to your main application entry point file:

   ```python
   from datadog_serverless_compat import start
   from ddtrace import tracer, patch_all

   start()
   patch_all()
   ```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

3. **Deploy your function**.

4. **Configure Datadog intake**. Add the following environment variables to your function's application settings:
   ```
   DD_API_KEY=<YOUR_API_KEY>
   DD_SITE={{< region-param key=dd_site code="true" >}}
   ```
   - Set `DD_API_KEY` to your [Datadog API key][1].
   - Set `DD_SITE` to {{< region-param key=dd_site code="true" >}}. (Ensure that your correct [Datadog site][2] is selected in the drop-down on the right side of this page.)

5. **Correlate traces with metrics by setting tags**. You can collect metrics from your Azure Functions by installing the [Datadog Azure integration][6]. To correlate these metrics with your traces, configure the following tags as environment variables. You can add custom tags as `DD_TAGS`.

   ```
   DD_ENV="<ENVIRONMENT>"
   DD_SERVICE="<SERVICE_NAME>"
   DD_VERSION="<VERSION>"
   DD_TAGS="<KEY_1:VALUE_1>,<KEY_2:VALUE_2>"
   ```

## View traces in Datadog

In Datadog, navigate to the [Trace Explorer][4] page and search for the service name you set in the `DD_SERVICE` environment variable

<!-- TODO: maybe some more here -->

You can also view traces on the [Serverless > Azure Functions][5] page. This view is enriched with telemetry collected by the [Datadog Azure integration][6].

## Enable debug logs

You can collect debug logs for troubleshooting. To configure debug logs, use the following environment variables:

`DD_TRACE_DEBUG`
: Enables (`true`) or disables (`false`) debug logging for the Datadog Tracing Library. Defaults to `false`.

  **Values**: `true`, `false` 

`DD_LOG_LEVEL`
: Sets logging level for the Datadog Serverless Agent. Defaults to `info`.

  **Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

## Enable other features

### Trace metrics

[Trace metrics][3] are enabled by default. To configure trace metrics, use the following environment variable:

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: Enables (`true`) or disables (`false`) trace metrics. Defaults to `true`.

  **Values**: `true`, `false`

### Correlate logs and traces

<!-- TODO: to be continued -->

[1]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /getting_started/site
[3]: /tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[6]: /integrations/azure/