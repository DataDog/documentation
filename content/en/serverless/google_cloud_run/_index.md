---
title: Google Cloud Run
further_reading:

- link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
  tag: 'Blog'
  text: 'Collect traces, logs, and custom metrics from Cloud Run services'

---

## Overview

Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Cloud Run through the [Google Cloud integration][1]. Datadog also provides a solution for instrumenting your Cloud Run applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

### Prerequisites

Make sure you have a [Datadog API Key][6] and are using a programming language [supported by a Datadog tracing library][2].

## Instrument your application

You can instrument your application in one of two ways: [Dockerfile](#dockerfile) or [buildpack](#buildpack).

### Dockerfile

Datadog publishes new releases of the `serverless-init` container image to Google’s gcr.io, AWS’ ECR, and on Docker Hub:

| dockerhub.io | gcr.io | public.ecr.aws |
| ------------ | ------ | -------------- |
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

### Buildpack

[`Pack Buildpacks`][3] provide a convenient way to package your container without using a Dockerfile.

First, manually install your tracer:
- [Node.JS][14]
- [Python][13]
- [Java][15]
- [Go][12]
- [.NET][18]
- [Ruby][16]
- [PHP][17]

Then, build your application by running the following command:

```shell
pack build --builder=gcr.io/buildpacks/builder \
--buildpack from=builder \
--buildpack datadog/serverless-buildpack:latest \
gcr.io/YOUR_PROJECT/YOUR_APP_NAME
```

**Note**: Buildpack instrumentation is not compatible with Alpine images

## Configure your application

Once the container is built and pushed to your registry, the last step is to set the required environment variables for the Datadog Agent:
- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a [Google Cloud Secret][11] for privacy and safety issue.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page. Your site is: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: set to `true` to enable tracing
- `DD_TRACE_PROPAGATION_STYLE`: Set this to `datadog` to use context propagation and log trace correlation.

For more environment variables and their function, see [Additional Configurations](#additional-configurations).

The following command deploys the service and allows any external connection to reach it. Set `DD_API_KEY` as an environment variable, and set your service listening to port 8080.

```
shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=8080 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \
  --update-env-vars=DD_TRACE_PROPAGATION_STYLE='datadog' \
```

## Results

Once the deployment is completed, your metrics and traces are sent to Datadog. In Datadog, navigate to **Infrastructure->Serverless** to see your serverless metrics and traces.

## Additional configurations

- **Advanced Tracing:** The Datadog Agent already provides some basic tracing for popular frameworks. Follow the [advanced tracing guide][2] for more information.

- **Logs:** If you use the [Google Cloud integration][1], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

- **Custom Metrics:** You can submit custom metrics using a [DogStatsd client][4]. For monitoring Cloud Run and other serverless applications, use [distribution][9] metrics. Distributions provide `avg`, `sum`, `max`, `min`, and `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also manage tags. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][11]. To monitor a distribution for a count metric type, use `sum` for both the time and space aggregations.

### Environment Variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API Key][7] - **Required**|
| `DD_SITE` | [Datadog site][5] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_LOGS_INJECTION`| When true, enrich all logs with trace data for supported loggers in [Java][19], [Node][20], [.NET][21], and [PHP][22]. See additional docs for [Python][23], [Go][24], and [Ruby][25]. |
| `DD_TRACE_SAMPLE_RATE`|  Controls the trace ingestion sample rate `0.0` and `1.0`. |
| `DD_SERVICE`      | See [Unified Service Tagging][6].                                  |
| `DD_VERSION`      | See [Unified Service Tagging][6].                                  |
| `DD_ENV`          | See [Unified Service Tagging][6].                                  |
| `DD_SOURCE`       | See [Unified Service Tagging][6].                                  |
| `DD_TAGS`         | See [Unified Service Tagging][6].                                  |

## Troubleshooting

This integration depends on your runtime having a full SSL implementation. If you are using a slim image, you may need to add the following command to your Dockerfile to include certificates.

```
RUN apt-get update && apt-get install -y ca-certificates
```


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/google_cloud_platform/#log-collection
[2]: /tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://buildpacks.io/docs/tools/pack/
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /getting_started/site/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /account_management/api-app-keys/#api-keys
[8]: https://github.com/DataDog/crpb/tree/main
[9]: /metrics/distributions/
[10]: /metrics/#time-and-space-aggregation
[11]: https://cloud.google.com/run/docs/configuring/secrets
[12]: /tracing/trace_collection/library_config/go/
[13]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
[14]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
[15]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
[16]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[17]: /tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
[18]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
[19]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[20]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[21]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[22]: /tracing/other_telemetry/connect_logs_and_traces/php
[23]: /tracing/other_telemetry/connect_logs_and_traces/python
[24]: /tracing/other_telemetry/connect_logs_and_traces/go
[25]: /tracing/other_telemetry/connect_logs_and_traces/ruby
