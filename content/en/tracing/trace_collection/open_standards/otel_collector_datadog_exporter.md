---
title: OpenTelemetry collector Datadog exporter
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
description: 'Send OpenTelemetry traces to the OpenTelemetry collector and Datadog exporter'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
---

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. Datadog has [an Exporter][1] available for the OpenTelemetry Collector which allows users to forward trace and metric data from OpenTelemetry SDKs on to Datadog (without the Datadog Agent). It works with all supported languages, and you can [connect those OpenTelemetry trace data with application logs][2].

## Running the collector

In order to run the OpenTelemetry Collector along with the Datadog Exporter follow these steps:

1. Download the latest release of the OpenTelemetry Collector Contrib distribution, from [the project's repository][3].

2. Create a configuration file and name it `collector.yaml`. Please follow the [Configuring the Datadog Exporter](#configuring-the-datadog-exporter) section below.

3. Run the collector, specifying the configuration file using the `--config` parameter:

      ```
      otelcontribcol_linux_amd64 --config collector.yaml
      ```

## Configuring the Datadog Exporter

To use the Datadog Exporter, simply add it to your [OpenTelemetry Collector configuration][4]. Here is a bare-bones configuration file that is ready-to-use as soon as you have set your Datadog API key as the DD_API_KEY environment variable:

```yaml
receivers:
  otlp:
    protocols:
      http:
      grpc:

processors:
  batch:

exporters:
  datadog:
    api:
      key: ${DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
```

The above configuration enables the receiving of OTLP data from OpenTelemetry instrumentation libraries via HTTP and gRPC and sets up a [batch processor][5] which is mandatory for any non-development environment.

### Advanced configuration

A fully documented example configuration file can be found [here][6], illustrating all possible configuration options for the Datadog Exporter. There may be other options relevant to your deployment, such as `site` or `host_metadata`.

### Host name resolution

The host name that OpenTelemetry signals are tagged with is obtained based on the following sources in order, falling back to the next one if the current one is unavailable or invalid:

1. From [resource attributes][7] (such as for example `host.name`, but many others are supported).
2. The `hostname` field in the exporter configuration.
3. Cloud Provider API.
4. Kubernetes host name.
5. Fully Qualified Domain Name.
6. Operating System host Name.


## Configuring your application

There are a few things you could do to make sure you get better metadata for traces and a smooth integration with Datadog.

### Resource Detectors

The OpenTelemetry specification requires that SDKs implement [resource detectors][8] for common platforms and environments (such as Docker, Kubernetes, EKS, ECS, GKE, etc.). For example, the Go repository [has them available][9] for AWS and GCP.

We strongly recommend using these if available in your SDK.

### Unified Service Tagging

Unified service tagging ties Datadog telemetry together through using three essential tags that define:
* The service name
* The deployment environment
* The service version

The application should send these as the semantical OpenTelemetry resource attributes: `service.name`, `deployment.environment` and `service.version`.

## Using Docker

Run an Opentelemetry Collector container to receive traces either from [localhost](#receive-traces-from-host), or from [other containers](#receive-traces-from-other-containers).

<div class="alert alert-info">
The latest tag of the OpenTelemetry Collector Contrib distro <a href="https://github.com/open-telemetry/opentelemetry-collector-releases/issues/73">is not updated on every release</a>.
Pin the Collector to the latest version to pick up the latest changes.
</div>

### Receive traces from localhost

Follow these steps if you wish to run the OpenTelemetry Collector as a Docker image and receive traces from the same host:

1. Create a `collector.yaml` file. You may use the [example template above](#configuring-the-datadog-exporter) to get started.

2. Choose a published Docker image such as [`otel/opentelemetry-collector-contrib:latest`][10].

3. Determine which ports to open on your container. OpenTelemetry traces are sent to the OpenTelemetry Collector over HTTP on two ports, depending on whether you are using gRPC or not. These ports must be exposed on the container. By default, traces are sent over gRPC on port 4317.

4. Run the container and expose the necessary port, using the previously defined `collector.yaml` file. For example, considering you are using port 4317:

      ```
      $ docker run \
          -p 4317:4317 \
          --hostname $(hostname) \
          -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
          otel/opentelemetry-collector-contrib:<VERSION>
      ```

5. Make sure you've configured your application with the appropriate resource attributes for [unified service tagging](#unified-service-tagging).

### Receive traces from other containers

Follow these steps if you wish to run the OpenTelemetry Collector as a Docker image and receive traces from other containers:

1. Create a `collector.yaml` file. You may use the [example template above](#configuring-the-datadog-exporter) to get started.

2. Make sure you've configured your application with the appropriate resource attributes for [unified service tagging](#unified-service-tagging).

3. Create a Docker network:

    ```
    docker network create <NETWORK_NAME>
    ```

4. Run the OpenTelemetry Collector and application containers as part of the same network.

    ```
    # Run the OpenTelemetry Collector
    docker run -d --name opentelemetry-collector \
              --network <NETWORK_NAME> \
              --hostname $(hostname) \
              -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
              otel/opentelemetry-collector-contrib:<VERSION>
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

## Using Kubernetes

There are multiple ways to deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure. The most common and recommended way is by using a Daemonset.

### DaemonSet Deployment

A full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet, including the application configuration example can be found [here][11].

Some essential configuration options that are [visible in the example][12] as well, but worth underlining here are to make sure the essential ports of the DaemonSet will be exposed and accessible to your application:

```yaml
# ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying metrics.
# ...
```

If you do not need both the standard HTTP and gRPC ports for your application, it is fine to remove them.

In order to collect valuable Kubernetes Infrastructure metrics, which are used for Datadog Container tagging, we must ensure to report the Pod IP as a resource attribute. To do that, the following snippet is [part of the example][13]:

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

This ensures that [Kubernetes Attributes Processor][14] which is used in [our config map][15] is able to extract the necessary metadata to attach to traces. There are additional [roles][16] that need to be set in order to allow access to this metadata.

The [example visible in the repository][11] is complete, ready-to-use and has the correct roles set up. All that is required of you is to provide your [application container][17].

To learn more about configuring your application, please see the [Application Configuration](#application-configuration) section below.

### Gateway Collector Service

For Gateway deployments, we'll first need to set up each [OpenTelemetry Collector agent][18], just like in the [DaemonSet deployment](#daemonset-deployment). Then, the DaemonSet needs to be changed to include an [OTLP exporter][19] instead of the Datadog Exporter [currently in place][20]:

```yaml
# ...
exporters:
  otlp:
    endpoint: "<GATEWAY_HOSTNAME>:4317"
# ...
```

Then, make sure that the service pipelines use this exporter, instead of the Datadog one that [is in place in the example][21]:

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

This will ensure that each agent forwards its data via the OTLP protocol to the Collector Gateway. Make sure to replace `GATEWAY_HOSTNAME` with the address of your OpenTelemetry Colllector Gateway.

Additionally, to ensure that Kubernetes metadata continues to be applied to traces, we need to tell the [`k8sattributes` processor][22] to forward the Pod IP to the Gateway Collector so that it can obtain the metadata:

```yaml
# ...
k8sattributes:
  passthrough: true
# ...
```

To read more about the `passthrough` option, check [its documentation][23].

Lastly, make sure that the gateway Collector's configuration uses the Datadog Exporter settings that have been removed from the agents.

### Alongside the Datadog Agent

To use the OpenTelemetry Collector alongside the Datadog Agent, you will need an additional DaemonSet to ensure that the Datadog Agent runs on each host alongside the previously set up [OpenTelmetry Collector DaemonSet](#daemonset-deployment). To learn how to deploy the Datadog Agent in Kubernetes, you can [visit our help pages][24].

Next, we'll have to enable OTLP ingestion in the Datadog Agent. In order to learn how to do that, go to [this page][25].

Now that the Datadog Agent is ready to receive OTLP traces and metrics, we'll have to change our [OpenTelemetry Collector Daemonset](#daemonset-deployment) to use the [OTLP exporter][19] instead of the Datadog Exporter. To do so, add it to [your config map][26]:

```yaml
# ...
exporters:
  otlp:
    endpoint: "${HOST_IP}:4317"
# ...
```

Given this change, we should make sure that the `HOST_IP` environment variable is provided [in the DaemonSet][27]:

```yaml
# ...
        env:
        - name: HOST_IP
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
# ...
```

Finally, make sure that the [service pipelines][21] are using it:

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

### Application Configuration

To configure your application container correctly, all you have to do is to ensure that the correct OTLP endpoint hostname is used. The OpenTelemetry Collector runs as a DaemonSet in both [agent](#daemonset-deployment) and [gateway](#gateway-collector-service) deployments, so the current host needs to be targeted. In order to do so, your application container needs to set `OTEL_EXPORTER_OTLP_ENDPOINT` correctly, just like in our [example chart][28]:

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

Additionally, please make sure that your OpenTelemetry Instrumentation Library SDK is configured correctly. Make sure to follow the [Configuring your application](#configuring-your-application) section for that.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[8]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#detecting-resource-information-from-the-environment
[9]: https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/detectors
[10]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[14]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[18]: https://opentelemetry.io/docs/collector/deployment/#agent
[19]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[20]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15-L18
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L27
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/e79d917/processor/k8sattributesprocessor/doc.go#L196-L220
[24]: https://docs.datadoghq.com/containers/kubernetes/
[25]: https://docs.datadoghq.com/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/?tab=kubernetesdaemonset#enabling-otlp-ingestion-on-the-datadog-agent
[26]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
