---
title: OpenTelemetry Collector Datadog Exporter
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /opentelemetry/otel_collector_datadog_exporter/
description: 'Send OpenTelemetry data to the OpenTelemetry collector and Datadog exporter'
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

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. The [Datadog Exporter][1] for the OpenTelemetry Collector allows you to forward trace, metric, and logs data from OpenTelemetry SDKs on to Datadog (without the Datadog Agent). It works with all supported languages, and you can [connect those OpenTelemetry trace data with application logs][2].

{{< img src="metrics/otel/datadog_exporter.png" alt="Application Instrumented Library, Cloud Integrations, and Other Monitoring Solutions (for example Prometheus) -> Datadog Exporter inside OpenTelemetry Collector -> Datadog" style="width:100%;">}}


## Setting up the OpenTelemetry Collector with the Datadog Exporter

To run the OpenTelemetry Collector along with the Datadog Exporter, download the latest release of the [OpenTelemetry Collector Contrib distribution][3]. 

### Out-of-the-box Datadog Exporter configuration

In the `exporter/datadogexporter` folder is a working example of an out-of-the-box configuration for Datadog Exporter. See the full configuration example file, [`ootb-ec2.yaml`][4]. Configure each of the following components to suit your needs:

{{< whatsnext desc="Exporter components" >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Hostname and tags{{< /nextlink >}}
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

3. Run the container and expose the necessary port, using the previously defined `collector.yaml` file. For example, considering you are using port 4317:

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

Using a DaemonSet is the most common and recommended way to configure OpenTelemetry collection in a Kubernetes environment. To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure:

1. Use this [full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet][1], including the application configuration example.

   Note especially some [essential configuration options from the example][2], which ensure the essential ports of the DaemonSet are exposed and accessible to your application:

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

   If you do not need both the standard HTTP and gRPC ports for your application, it is fine to remove them.

2. Collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example][3]:

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   This ensures that [Kubernetes Attributes Processor][4] which is used in [the config map][5] is able to extract the necessary metadata to attach to traces. There are additional [roles][6] that need to be set to allow access to this metadata. [The example][1] is complete, ready to use, and has the correct roles set up.
  
3. Provide your [application container][7]. To configure your application container, ensure that the correct OTLP endpoint hostname is used. The OpenTelemetry Collector runs as a DaemonSet, so the current host needs to be targeted. Set your application container's `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable correctly, as in the [example chart][8]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
{{% /tab %}}
{{% tab "Kubernetes (Gateway)" %}}

To deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes Gateway deployment:

1. Use this [full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet][1], including the application configuration example.

   Note especially some [essential configuration options from the example][2], which ensure the essential ports of the DaemonSet are exposed and accessible to your application:

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

   If you do not need both the standard HTTP and gRPC ports for your application, it is fine to remove them.

2. Collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute, [as shown in the example][3]:

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   This ensures that [Kubernetes Attributes Processor][4] which is used in [the config map][5] is able to extract the necessary metadata to attach to traces. There are additional [roles][6] that need to be set to allow access to this metadata. [The example][1] is complete, ready to use, and has the correct roles set up.
  
3. Provide your [application container][7]. To configure your application container, ensure that the correct OTLP endpoint hostname is used. The OpenTelemetry Collector runs as a DaemonSet, so the current host needs to be targeted. Set your application container's `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable correctly, as in the [example chart][8]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

4. Change the DaemonSet to include an [OTLP exporter][9] instead of the Datadog Exporter [currently in place][10]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

5. Make sure that the service pipelines use this exporter, instead of the Datadog one that [is in place in the example][11]:

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   This ensures that each agent forwards its data via the OTLP protocol to the Collector Gateway. 

6. Replace `GATEWAY_HOSTNAME` with the address of your OpenTelemetry Collector Gateway.

7. To ensure that Kubernetes metadata continues to be applied to traces, tell the [`k8sattributes` processor][12] to forward the Pod IP to the Gateway Collector so that it can obtain the metadata:

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   For more information about the `passthrough` option, read [its documentation][13].

8. Make sure that the Gateway Collector's configuration uses the same Datadog Exporter settings that have been replaced by the OTLP exporter in the agents. For example (where `<DD_SITE>` is your site, {{< region-param key="dd_site" code="true" >}}):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15-L18
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L27
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/e79d917/processor/k8sattributesprocessor/doc.go#L196-L220
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

To use the OpenTelemetry Operator:

1. Follow the [official documentation for deploying the OpenTelemetry Operator][1]. As described there, deploy the certificate manager in addition to the Operator.

2. Configure the Operator using one of the OpenTelemetry Collector standard Kubernetes configurations:
   * [Daemonset deployment][2] - Use the DaemonSet deployment if you want to ensure you receive host metrics. 
   * [Gateway deployment][3]

   For example:

   ```yaml
   apiVersion: opentelemetry.io/v1alpha1
   kind: OpenTelemetryCollector
   metadata:
     name: opentelemetry-example
   spec:
     mode: daemonset
     hostNetwork: true
     image: otel/opentelemetry-collector-contrib
     env:
       - name: DD_API_KEY
         valueFrom:
           secretKeyRef:
             key:  datadog_api_key
             name: opentelemetry-example-otelcol-dd-secret
     config:
       receivers:
         otlp:
           protocols:
             grpc:
             http:
       hostmetrics:
         collection_interval: 10s
         scrapers:
           paging:
             metrics:
               system.paging.utilization:
                 enabled: true
           cpu:
             metrics:
               system.cpu.utilization:
                 enabled: true
           disk:
           filesystem:
             metrics:
               system.filesystem.utilization:
                 enabled: true
           load:
           memory:
           network:
       processors:
         k8sattributes:
         batch:
           send_batch_max_size: 100
           send_batch_size: 10
           timeout: 10s
       exporters:
         datadog:
           api:
             key: ${env:DD_API_KEY}
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
           traces:
             receivers: [otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
   ```




[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[3]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesgateway#4-run-the-collector
{{% /tab %}}
{{% tab "Alongside the Agent" %}}

To use the OpenTelemetry Collector alongside the Datadog Agent:

1. Set up an additional DaemonSet to ensure that the Datadog Agent runs on each host alongside the previously set up [OpenTelemetry Collector DaemonSet][1]. For information, read [the docs about deploying the Datadog Agent in Kubernetes][2].

2. Enable [OTLP ingestion in the Datadog Agent][3].

3. Now that the Datadog Agent is ready to receive OTLP traces, logs, and metrics, change your [OpenTelemetry Collector DaemonSet][1] to use the [OTLP exporter][4] instead of the Datadog Exporter by adding the following configuration to [your config map][5]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "${HOST_IP}:4317"
       tls:
         insecure: true
   # ...
   ```

4. Make sure that the `HOST_IP` environment variable is provided [in the DaemonSet][6]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
   # ...
   ```

5. Make sure that the [service pipelines][7] are using OTLP:

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   In this case, don't use the `hostmetrics` receiver because those metrics will be emitted by the Datadog Agent.

[1]: /opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[2]: /containers/kubernetes/
[3]: /opentelemetry/otlp_ingest_in_the_agent/?tab=kubernetesdaemonset#enabling-otlp-ingestion-on-the-datadog-agent
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
{{% /tab %}}
{{< /tabs >}}

### Logs and traces correlation

If you are using the Datadog Exporter to also send OpenTelemetry traces to Datadog, use the `trace_parser` operator to extract the `trace_id` from each trace and add it to the associated logs. Datadog automatically correlates the related logs and traces. See [Connect OpenTelemetry Traces and Logs][18] for more information.

{{< img src="logs/log_collection/logs_traces_correlation.png" alt="The trace panel showing a list of logs correlated with the trace" style="width:70%;">}}

### Host name resolution

The host name that OpenTelemetry signals are tagged with is obtained based on the following sources in order, falling back to the next one if the current one is unavailable or invalid:

1. From [resource attributes][19], for example `host.name` (many others are supported).
2. The `hostname` field in the exporter configuration.
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

## Out-of-the-box dashboards

Datadog provides out-of-the-box dashboards that you can copy and customize. To use Datadog's out-of-the-box OpenTelemetry dashboards:

1. Install the [OpenTelemetry integration][21].
2. Go to **Dashboards** > **Dashboards list** and search for `opentelemetry`:

   {{< img src="metrics/otel/dashboard.png" alt="The Dashboards list, showing two OpenTelemetry out-of-the-box dashboards: Host Metrics and Collector Metrics." style="width:80%;">}}

The **Host Metrics** dashboard is for data collected from the [host metrics receiver][22]. The **Collector Metrics** dashboard is for any other types of metrics collected, depending on which [metrics receiver][23] you choose to enable.


### Containers overview dashboard

<div class="alert alert-info">The Container Overview dashboard is in private beta. <a href="https://forms.gle/g3ndvTnepWY4Bvuh7">Fill out this form</a> to try it out.</div>

<div class="alert alert-warning">This feature is affected by <a href="/containers/guide/docker-deprecation/">Docker deprecation in Kubernetes</a> and you might not be able to use <code>dockerstatsreceiver</code> for OpenTelemetry with Kubernetes version 1.24+.</div>

The [Docker Stats][24] receiver generates container metrics for the OpenTelemetry Collector. The Datadog Exporter translates container metrics to their Datadog counterparts.

Use the following configuration to enable additional attributes on the Docker Stats receiver that populates the containers overview dashboard:

```yaml
  docker_stats:
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

The minimum required OpenTelemetry Collector version that supports this feature is v0.78.0. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[18]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
