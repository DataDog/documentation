---
title: Instrument Azure Functions for Python
type: multi-code-lang
code_lang: python
code_lang_weight: 20
---

## Setup

1. Instrumenting Azure Functions requires two dependencies: 
   - Datadog Serverless Agent, a serverless-specific Datadog Agent to collect and send traces to Datadog
   - Datadog Python Tracing Library (`ddtrace`), to create and send traces to a Datadog Agent
   - Datadog Azure Worker Extension

   To install these packages:
   ```
   pip install datadog-sma
   pip install ddtrace
   pip install dd-azure-worker-extension

   ```

   Datadog recommends that you pin the package versions and regularly upgrade to the latest versions of both of these packages. This ensures that you have access to enhancements and bug fixes.
2. Add the Datadog Azure Worker Extension to initialize the Datadog Python Tracer and create a root span for each function:
   ```
   import dd_azure_worker_extension
   ```
3. To enable the Datadog Azure Worker Extension, set the `PYTHON_ENABLE_WORKER_EXTENSIONS` environment variable:
  
   ```
   PYTHON_ENABLE_WORKER_EXTENSIONS=1
   ```
3. Configure the following environment variables:

   - `DD_API_KEY`: your [Datadog API key][1]
   - `DD_SITE`: your [Datadog site][2], {{< region-param key="dd_site" code="true" >}}
   - `DD_ENV`: the environment name to use for [Unified Service Tagging][3]
   - `DD_SERVICE`: the service name to use for Unified Service Tagging
   - `DD_VERSION`: the version name to use for Unified Service Tagging
4. To further extend Unified Service Tagging, install the [Datadog Azure integration][4] and set tags on your Azure Functions. This allows for [Azure Function metrics][5] and other Azure metrics to be correlated with traces.

   You can set additional custom tags by using the `DD_TAGS` environment variable:
   ```
   DD_TAGS="key1:value1,key2:value2"
   ```

## Validation

To view the traces in Datadog, go to your [APM Trace Explorer][6] and search for the service you set in the `DD_SERVICE` environment variable.

You can also view traces on the [Serverless Azure Functions][6] page. This view is enriched with telemetry collected by the [Datadog Azure integration][4].

## Additional features

### Enable trace metrics

[Trace metrics][7] are disabled by default. You can enable them with the `DD_TRACE_TRACER_METRICS_ENABLED` environment variable:

```
DD_TRACE_TRACER_METRICS_ENABLED=true
```

### Correlate logs and traces
To inject trace IDs into logs, see [Correlating Python logs and traces][8].

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

[1]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /getting_started/site/
[3]: /getting_started/tagging/unified_service_tagging
[4]: https://app.datadoghq.com/apm/traces
[5]: /tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[7]: /tracing/metrics/metrics_namespace/
[8]: /tracing/other_telemetry/connect_logs_and_traces/python