---
title: Setting up OpenTelemetry Collector and Datadog Exporter
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /opentelemetry/otel_collector_datadog_exporter/
description: 'Send OpenTelemetry data to the OpenTelemetry Collector and Datadog Exporter'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: "Blog"
  text: "Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter"
- link: "https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/"
  tag: "Blog"
  text: "Use HiveMQ and OpenTelemetry to monitor IoT applications in Datadog"
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OTLP Metrics Types"
---

## Overview

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. The [Datadog Exporter][1] for the OpenTelemetry Collector allows you to forward trace, metric, and logs data from OpenTelemetry SDKs to Datadog (without the Datadog Agent). It works with all supported languages, and you can [connect OpenTelemetry trace data with application logs][2].

{{< img src="metrics/otel/datadog_exporter.png" alt="Application Instrumented Library, Cloud Integrations, and Other Monitoring Solutions (for example Prometheus) -> Datadog Exporter inside OpenTelemetry Collector -> Datadog" style="width:100%;">}}


## Setup and configuration

To run the OpenTelemetry Collector along with the Datadog Exporter, download the latest release of the [OpenTelemetry Collector Contrib distribution][3]. 

### Out-of-the-box Datadog Exporter configuration

You can find working examples of out-of-the-box configuration for Datadog Exporter in the [`exporter/datadogexporter/examples` folder][5] in the OpenTelemetry Collector Contrib project. See the full configuration example file, [`ootb-ec2.yaml`][4]. Configure each of the following components to suit your needs:

{{< whatsnext desc="" >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Hostname and Tags{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}OTLP Receiver{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/host_metrics/" >}}Host Metrics{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/docker_metrics/" >}}Docker Metrics{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/log_collection/" >}}Log Collection{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_health_metrics/" >}}Collector Health Metrics{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/trace_metrics/" >}}Trace Metrics{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Collector Batch and Memory Settings{{< /nextlink >}}
{{< /whatsnext >}}


## Running the collector

{{< tabs >}}
{{% tab "On a host" %}}

Run the collector, specifying the configuration file using the `--config` parameter:

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker (localhost)" %}}
To run the OpenTelemetry Collector as a Docker image and receive traces from the same host:

1. Choose a published Docker image such as [`otel/opentelemetry-collector-contrib`][1].

2. Determine which ports to open on your container so that OpenTelemetry traces are sent to the OpenTelemetry Collector. By default, traces are sent over gRPC on port 4317. If you don't use gRPC, use port 4318.

3. Run the container and expose the necessary port, using the `collector.yaml` file. For example, if you are using port 4317:

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "Docker (other containers)" %}}

To run the OpenTelemetry Collector as a Docker image and receive traces from other containers:

1. Create a Docker network:

    ```
    docker network create <NETWORK_NAME>
    ```

2. Run the OpenTelemetry Collector and application containers as part of the same network.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   When running the application container, ensure that the environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` is configured to use the appropriate hostname for the OpenTelemetry Collector. In the example below, this is `opentelemetry-collector`.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}
{{% tab "Kubernetes (DaemonSet)" %}}

Using a DaemonSet is the most common and recommended way to configure OpenTelemetry collection in a Kubernetes environment. 

To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure, use this [full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet][1], including the application configuration example.

[Some configuration options in the example][2] (repeated below) ensure that essential ports of the DaemonSet are exposed and accessible to your application:

```yaml
# ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
# ...
```

If you do not need both the standard HTTP and gRPC ports for your application, you can remove the corresponding configuration options.



[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46

{{% /tab %}}
{{% tab "Kubernetes (Gateway)" %}}

To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes Gateway deployment, use this [full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet][1], including the application configuration example.

[Some configuration options in the example][2] (repeated below) ensure that essential ports of the DaemonSet are exposed and accessible to your application:

```yaml
# ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
# ...
```

If you do not need both the standard HTTP and gRPC ports for your application, you can remove the corresponding configuration options.



[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

To use the OpenTelemetry Operator, follow the [official documentation for deploying the OpenTelemetry Operator][1]. As described there, deploy the certificate manager in addition to the Operator.

Configure the Operator using one of the OpenTelemetry Collector standard Kubernetes configurations:
* [DaemonSet deployment][2] - Use the DaemonSet deployment if you want to ensure you receive host metrics. 
* [Gateway deployment][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /opentelemetry/collector_exporter/?tab=kubernetesdaemonset#running-the-collector
[3]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesgateway#running-the-collector
{{% /tab %}}

{{< /tabs >}}


### Host name resolution

The host name that OpenTelemetry signals are tagged with is obtained based on the following sources, in order of decreasing precedence.

1. [Resource attributes][19], for example `host.name` (many others are supported).
2. The `hostname` field in the Datadog Exporter configuration.
3. Cloud provider API.
4. Kubernetes host name.
5. Fully qualified domain name.
6. Operating system host name.

## Deployment-based limitations

The OpenTelemetry Collector has [two primary deployment methods][20]: Agent and Gateway. Depending on your deployment method, the following components are available:

| Deployment mode | Host metrics | Kubernetes orchestration metrics | Traces | Logs auto-ingestion |
| --- | --- | --- | --- | --- |
| as Gateway | | {{< X >}} | {{< X >}} | |
| as Agent | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[18]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
