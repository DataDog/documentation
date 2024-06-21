---
title: Instrument Azure App Service - Linux Containers
kind: documentation
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
---

## Overview

<div class="alert alert-info">To instrument your Azure App Service containers with a sidecar, see <a href="/serverless/guide/azure_app_service_linux_sidecar">Instrument Azure App Service - Sidecar pattern</a>.</div>

This instrumentation method uses `serverless-init` and provides the following additional monitoring capabilities for containerized Linux Azure App Service workloads:

- Fully distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

### Prerequisites

Make sure you have a [Datadog API Key][6] and are using a programming language [supported by a Datadog tracing library][2].

## Instrument your application

### Dockerfile

Datadog publishes new releases of the serverless-init container image to Google's gcr.io, AWS's ECR, and on Docker Hub:

| dockerhub.io | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

Images are tagged based on semantic versioning, with each new version receiving three relevant tags:

* `1`, `1-alpine`: use these to track the latest minor releases, without breaking chagnes
* `1.x.x`, `1.x.x-alpine`: use these to pin to a precise version of the library
* `latest`, `latest-alpine`: use these to follow the latest version release, which may include breaking changes

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

{{% svl-init-nodejs %}}

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

{{% svl-init-python %}}

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

{{% svl-init-java %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% svl-init-go %}}

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

{{% svl-init-dotnet %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

{{% svl-init-ruby %}}

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

{{% svl-init-php %}}

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. Configure your application

Once the container is built and pushed to your registry, the last step is to set the required environment variables for the Datadog Agent:
- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a [Azure Secret][7] for privacy and safety issue.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page. Your site is: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: Set to `true` to enable tracing.

For more environment variables and their function, see [Additional Configurations](#additional-configurations).

### 3. Results

Once the deployment is completed, your metrics and traces are sent to Datadog. In Datadog, navigate to **Infrastructure->Serverless** to see your serverless metrics and traces.

## Deployment

{{% aas-workflow-linux %}}

## Additional configurations

- **Advanced Tracing:** The Datadog Agent already provides some basic tracing for popular frameworks. Follow the [advanced tracing guide][2] for more information.

- **Logs:** If you use the [Azure integration][1], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

- **Custom Metrics:** You can submit custom metrics using a [DogStatsd client][3]. For monitoring Cloud Run and other serverless applications, use [distribution][8] metrics. Distributions provide `avg`, `sum`, `max`, `min`, and `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also manage tags. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][9]. To monitor a distribution for a count metric type, use `sum` for both the time and space aggregations.

- **Trace Sampling:**  To manage the APM traced request sampling rate for serverless applications, set the DD_TRACE_SAMPLE_RATE environment variable on the function to a value between 0.000 (no tracing of Container App requests) and 1.000 (trace all Container App requests).

Metrics are calculated based on 100% of the application’s traffic, and remain accurate regardless of any sampling configuration.

### Environment Variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API Key][6] - **Required**|
| `DD_SITE` | [Datadog site][4] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_LOGS_INJECTION`| When true, enrich all logs with trace data for supported loggers in [Java][10], [Node.js][11], [.NET][12], and [PHP][13]. See additional docs for [Python][14], [Go][15], and [Ruby][16]. |
| `DD_TRACE_SAMPLE_RATE`|  Controls the trace ingestion sample rate `0.0` and `1.0`|
| `DD_SERVICE`      | See [Unified Service Tagging][5].                                       |
| `DD_VERSION`      | See [Unified Service Tagging][5].                                       |
| `DD_ENV`          | See [Unified Service Tagging][5].                                       |
| `DD_SOURCE`       | See [Unified Service Tagging][5].                                       |
| `DD_TAGS`         | See [Unified Service Tagging][5].                                       |

## Troubleshooting

If you are not receiving traces or custom metric data as expected, enable **App Service logs** to receive debugging logs.

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

Share the content of the **Log stream** with [Datadog Support][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#log-collection
[2]: /tracing/trace_collection/library_config
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /getting_started/site/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /account_management/api-app-keys/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[8]: /metrics/distributions/
[9]: /metrics/#time-and-space-aggregation
[10]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[11]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[12]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[13]: /tracing/other_telemetry/connect_logs_and_traces/php
[14]: /tracing/other_telemetry/connect_logs_and_traces/python
[15]: /tracing/other_telemetry/connect_logs_and_traces/go
[16]: /tracing/other_telemetry/connect_logs_and_traces/ruby
