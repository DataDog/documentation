---
title: Azure Container Apps
further_reading:
    - link: 'https://www.datadoghq.com/blog/azure-container-apps/'
      tag: 'Blog'
      text: 'Collect traces, logs, and custom metrics from Container Apps services'
---

## Overview
Azure Container Apps is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Container Apps through the [Azure integration][1]. Datadog also provides a solution for instrumenting your Container Apps applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

### Prerequisites

Make sure you have a [Datadog API Key][6] and are using a programming language [supported by a Datadog tracing library][2].

## Instrument your application

You can instrument your application in one of two ways: [Dockerfile](#dockerfile) or [buildpack](#buildpack).

### Dockerfile

Datadog publishes new releases of the serverless-init container image to Google's gcr.io, AWS' ECR, and on Docker Hub:

| hub.docker.com | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

Images are tagged based on semantic versioning, with each new version receiving three relevant tags:

* `1`, `1-alpine`: use these to track the latest minor releases, without breaking changes
* `1.x.x`, `1.x.x-alpine`: use these to pin to a precise version of the library
* `latest`, `latest-alpine`: use these to follow the latest version release, which may include breaking changes

## How `serverless-init` works

The `serverless-init` application wraps your process and executes it as a subprocess. It starts a DogStatsD listener for metrics and a Trace Agent listener for traces. It collects logs by wrapping the stdout/stderr streams of your application. After bootstrapping, serverless-init then launches your command as a subprocess.

To get full instrumentation, ensure you are calling `datadog-init` as the first command that runs inside your Docker container. You can do this through by setting it as the entrypoint, or by setting it as the first argument in CMD.

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
- **`DD_AZURE_SUBSCRIPTION_ID`**: The Azure Subscription ID associated with the Container App resource (Required).
- **`DD_AZURE_RESOURCE_GROUP`**: The Azure Resouce Group associated with the Container App resource (Required).

- `DD_TRACE_ENABLED`: Set to `true` to enable tracing.

For more environment variables and their function, see [Additional Configurations](#additional-configurations).

This command deploys the service and allows any external connection to reach it. Set `DD_API_KEY` as an environment variable, and set your service listening to port 80.

```shell
az containerapp up \
  --name APP_NAME \
  --resource-group RESOURCE_GROUP \
  --ingress external \
  --target-port 80 \
  --env-vars "DD_API_KEY=$DD_API_KEY" "DD_TRACE_ENABLED=true" "DD_SITE='datadoghq.com'" \
  --image YOUR_REGISTRY/YOUR_PROJECT
```

### 3. Results

Once the deployment is completed, your metrics and traces are sent to Datadog. In Datadog, navigate to [**Infrastructure > Serverless**][17] to see your serverless metrics and traces.

## Additional configurations

- **Advanced Tracing:** The Datadog Agent already provides some basic tracing for popular frameworks. Follow the [advanced tracing guide][2] for more information.

- **Logs:** If you use the [Azure integration][1], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

- **Custom Metrics:** You can submit custom metrics using a [DogStatsd client][3]. For monitoring Cloud Run and other serverless applications, use [distribution][8] metrics. Distributions provide `avg`, `sum`, `max`, `min`, and `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also manage tags. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][9]. To monitor a distribution for a count metric type, use `sum` for both the time and space aggregations.

- **Trace Sampling:**  To manage the APM traced request sampling rate for serverless applications, set the DD_TRACE_SAMPLE_RATE environment variable on the function to a value between 0.000 (no tracing of Container App requests) and 1.000 (trace all Container App requests).

Metrics are calculated based on 100% of the application's traffic, and remain accurate regardless of any sampling configuration.

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

This integration depends on your runtime having a full SSL implementation. If you are using a slim image for Node, you may need to add the following command to your Dockerfile to include certificates.

```
RUN apt-get update && apt-get install -y ca-certificates
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#log-collection
[2]: /tracing/trace_collection/#for-setup-instructions-select-your-language
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
[17]: https://app.datadoghq.com/functions?cloud=azure&entity_view=container_apps