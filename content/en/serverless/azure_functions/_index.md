---
title: Install Serverless Monitoring for Azure Functions
---

## Overview
This page explains how to collect traces, trace metrics, runtime metrics, and custom metrics from your Azure Functions. To collect additional metrics, install the [Datadog Azure integration][6].

## Setup

{{< programming-lang-wrapper langs="nodejs,python" >}}
{{< programming-lang lang="nodejs" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   To use [automatic instrumentation][1], you must use `dd-trace` v5.25+.

   Datadog recommends pinning the package versions and regularly upgrading to the latest versions of both `@datadog/serverless-compat` and `dd-trace` to ensure you have access to enhancements and bug fixes.

2. **Start the Datadog serverless compatibility layer and initialize the Node.js tracer**. Add the following lines to your main application entry point file (for example, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module. 
   const tracer = require('dd-trace').init()
   ```

3. (Optional) **Enable runtime metrics**. See [Node.js Runtime Metrics][2].

4. (Optional) **Enable custom metrics**. See [Metric Submission: DogStatsD][3].

[1]: /tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
[2]: /tracing/metrics/runtime_metrics/nodejs/?tab=environmentvariables
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   To use [automatic instrumentation][1], you must use `dd-trace` v2.19+.

   Datadog recommends using the latest versions of both `datadog-serverless-compat` and `ddtrace` to ensure you have access to enhancements and bug fixes.

2. **Initialize the Datadog Python tracer and serverless compatibility layer**. Add the following lines to your main application entry point file:

   ```python
   from datadog_serverless_compat import start
   from ddtrace import tracer, patch_all

   start()
   patch_all()
   ```

3. (Optional) **Enable runtime metrics**. See [Python Runtime Metrics][2].

4. (Optional) **Enable custom metrics**. See [Metric Submission: DogStatsD][3].

[1]: /tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
[2]: /tracing/metrics/runtime_metrics/python/
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Deploy your function**.

6. **Configure Datadog intake**. Add the following environment variables to your function's application settings:

   | Name | Value |
   | ---- | ----- |
   | `DD_API_KEY` | Your [Datadog API key][1]. |
   | `DD_SITE` | Your [Datadog site][2]. For example, {{< region-param key=dd_site code="true" >}}. |

7. **Configure Unified Service Tagging**. You can collect metrics from your Azure Functions by installing the [Datadog Azure integration][6]. To correlate these metrics with your traces, first set the `env`, `service`, and `version` tags on your resource in Azure. Then, configure the following environment variables. You can add custom tags as `DD_TAGS`.

   | Name | Value |
   | ---- | ----- |
   | `DD_ENV` | How you want to tag your env for [Unified Service Tagging][9]. For example, `prod`. |
   | `DD_SERVICE` | How you want to tag your service for [Unified Service Tagging][9].  |
   | `DD_VERSION` | How you want to tag your version for [Unified Service Tagging][9]. |
   | `DD_TAGS` | Your comma-separated custom tags. For example, `key1:value1,key2:value2`.  |

## What's next?

- You can view your Azure Functions traces in [Trace Explorer][4]. Search for the service name you set in the `DD_SERVICE` environment variable to see your traces.
- You can use the [Serverless > Azure Functions][5] page to see your traces enriched with telemetry collected by the [Datadog Azure integration][6].

### Enable/disable trace metrics

[Trace metrics][3] are enabled by default. To configure trace metrics, use the following environment variable:

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: Enables (`true`) or disables (`false`) trace metrics. Defaults to `true`.

  **Values**: `true`, `false`

## Troubleshooting

### Enable debug logs

You can collect [debug logs][7] for troubleshooting. To configure debug logs, use the following environment variables:

`DD_TRACE_DEBUG`
: Enables (`true`) or disables (`false`) debug logging for the Datadog Tracing Library. Defaults to `false`.

  **Values**: `true`, `false` 

`DD_LOG_LEVEL`
: Sets logging level for the Datadog Serverless Compatibility Layer. Defaults to `info`.

  **Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

### Linux Consumption plans and GitHub Actions

To use a GitHub Action to deploy to a Linux Consumption function, you must configure your workflow to use an Azure Service Principal for RBAC. See [Using Azure Service Principal for RBAC as Deployment Credential][8].


[1]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /getting_started/site
[3]: /tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[6]: /integrations/azure/
[7]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[8]: https://github.com/Azure/functions-action?tab=readme-ov-file#using-azure-service-principal-for-rbac-as-deployment-credential
[9]: /getting_started/tagging/unified_service_tagging/