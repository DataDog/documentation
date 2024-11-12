---
title: Instrument Azure Functions for Java
type: multi-code-lang
code_lang: java
code_lang_weight: 30
---

## Setup

1. Download the Datadog JARs and deploy them with your function.
   ```
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-azure-java-agent.jar 'https://dtdg.co/latest-serverless-azure-java-agent'
   ```

   See [Tracing Java Applications][1] for details on downloading a specific version of the Datadog Java Tracer.
2. Add the following `-javaagent` arguments to the JVM options:
   ```
   -javaagent:/path/to/dd-serverless-azure-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **Note**: The environment variable to set JVM options varies by plan (Consumption versus Premium/Dedicated). See [Azure Functions Java developer guide][2] for more details.
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

View the traces in Datadog. Go to your [APM Trace Explorer][10] and search for the service you set in the `DD_SERVICE` environment variable.

You can also view traces on the [Serverless Azure Functions][13] page. This view is enriched with telemetry collected by the [Datadog Azure integration][6].

## Additional features

### DogStatsD metrics
A DogStatsD server is enabled by default. This allows [Java runtime metrics][11] and [custom metrics][12] to be submitted to Datadog. For custom metrics, count, gauge, and distribution metric types are supported.

To disable the DogStatsD server, use the `DD_USE_DOGSTATSD` environment variable:

```
DD_USE_DOGSTATSD=false
```

### Enable trace metrics

[Trace metrics][8] are disabled by default. You can enable them with the `DD_TRACE_TRACER_METRICS_ENABLED` environment variable:

```
DD_TRACE_TRACER_METRICS_ENABLED=true
```

### Correlate logs and traces
To inject trace IDs into logs, see [Correlating Java logs and traces][9].

### Sample unwanted spans

Use the `DD_TRACE_SAMPLING_RULES` environment variable to sample unwanted spans:

```
DD_TRACE_SAMPLING_RULES=[{"resource":"POST /QuickPulseService.svc/ping", "sample_rate": 0},{"resource":"POST /QuickPulseService.svc/post", "sample_rate": 0},{"resource":"POST /?/track", "sample_rate": 0},{"resource":"GET /api/profileragent/v4/settings", "sample_rate": 0},{"resource":"ldconfig", "sample_rate": 0},{"resource":"uname", "sample_rate": 0}]
```

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

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /getting_started/site/
[5]: /getting_started/tagging/unified_service_tagging
[6]: /integrations/azure/#setup
[7]: /integrations/azure_functions/
[8]: /tracing/metrics/metrics_namespace/
[9]: /tracing/other_telemetry/connect_logs_and_traces/java
[10]: https://app.datadoghq.com/apm/traces
[11]: /tracing/metrics/runtime_metrics/java/
[12]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java
[13]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function