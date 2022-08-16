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

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. Datadog has [an Exporter][1] available for the OpenTelemetry Collector which allows you to forward trace and metric data from OpenTelemetry SDKs on to Datadog (without the Datadog Agent). It works with all supported languages, and you can [connect those OpenTelemetry trace data with application logs][2].

## Running the collector

To run the OpenTelemetry Collector along with the Datadog Exporter:

1. Download the latest release of the OpenTelemetry Collector Contrib distribution, from [the project's repository][3].

2. Create a configuration file and name it `collector.yaml`. Use the [Configuring the Datadog Exporter](#configuring-the-datadog-exporter) example file below.

3. Run the collector, specifying the configuration file using the `--config` parameter:

      ```
      otelcontribcol_linux_amd64 --config collector.yaml
      ```

## Configuring the Datadog Exporter

To use the Datadog Exporter, add it to your [OpenTelemetry Collector configuration][4]. Here is a basic configuration file that is ready to use after you set your Datadog API key as the `DD_API_KEY` environment variable:

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
      site: {{< region-param key="dd_site" code="true" >}}
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

The above configuration enables the receiving of OTLP data from OpenTelemetry instrumentation libraries via HTTP and gRPC, and sets up a [batch processor][5], which is mandatory for any non-development environment.

### Advanced configuration

[This fully documented example configuration file][6] illustrates all possible configuration options for the Datadog Exporter. There may be other options relevant to your deployment, such as `api::site` or the ones on the `host_metadata` section.

### Host name resolution

The host name that OpenTelemetry signals are tagged with is obtained based on the following sources in order, falling back to the next one if the current one is unavailable or invalid:

1. From [resource attributes][7], for example `host.name` (many others are supported).
2. The `hostname` field in the exporter configuration.
3. Cloud provider API.
4. Kubernetes host name.
5. Fully qualified domain name.
6. Operating system host name.


## Configuring your application

To get better metadata for traces and for smooth integration with Datadog:

- **Use resource detectors**: If they are provided by the language SDK, attach container information as resource attributes. For example, in Go, use the [`WithContainer()`][8] resource option.

- **Apply [Unified Service Tagging][9]**: This ties Datadog telemetry together with tags for service name, deployment environment, and service version. The application should set these tags using the OpenTelemetry semantic conventions: `service.name`, `deployment.environment`, and `service.version`.


## Using Docker

Run an Opentelemetry Collector container to receive traces either from [localhost](#receive-traces-from-localhost), or from [other containers](#receive-traces-from-other-containers).

<div class="alert alert-info">
The latest tag of the OpenTelemetry Collector Contrib distro <a href="https://github.com/open-telemetry/opentelemetry-collector-releases/issues/73">is not updated on every release</a>.
Pin the Collector to the latest version to pick up the latest changes.
</div>

### Receive traces from localhost

To run the OpenTelemetry Collector as a Docker image and receive traces from the same host:

1. Create a `collector.yaml` file. You may use the [example template above](#configuring-the-datadog-exporter) to get started.

2. Choose a published Docker image such as [`otel/opentelemetry-collector-contrib:<VERSION>`][10].

3. Determine which ports to open on your container so that OpenTelemetry traces are sent to the OpenTelemetry Collector. By default, traces are sent over gRPC on port 4317. If you don't use gRPC, use port 4138.

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

To run the OpenTelemetry Collector as a Docker image and receive traces from other containers:

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

### DaemonSet deployment

Check out this [full example of configuring the OpenTelemetry Collector using the Datadog Exporter as a DaemonSet][11], including the application configuration example.

Note especially some [essential configuration options from the example][12], which ensure the essential ports of the DaemonSet are exposed and accessible to your application:

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

To collect valuable Kubernetes attributes, which are used for Datadog container tagging, report the Pod IP as a resource attribute. To do that, [as shown in the example][13]:

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

This ensures that [Kubernetes Attributes Processor][14] which is used in [the config map][15] is able to extract the necessary metadata to attach to traces. There are additional [roles][16] that need to be set to allow access to this metadata.

[The example][11] is complete, ready to use, and has the correct roles set up. All that is required of you is to provide your [application container][17].

To learn more about configuring your application, read the [Application Configuration](#application-configuration) section below.

### Gateway Collector Service

For Gateway deployments: 

1. Set up each [OpenTelemetry Collector agent][18], just like in the [DaemonSet deployment](#daemonset-deployment). 

2. Change the DaemonSet to include an [OTLP exporter][19] instead of the Datadog Exporter [currently in place][20]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

3. Make sure that the service pipelines use this exporter, instead of the Datadog one that [is in place in the example][21]:

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

   This ensures that each agent forwards its data via the OTLP protocol to the Collector Gateway. 

4. Replace `GATEWAY_HOSTNAME` with the address of your OpenTelemetry Collector Gateway.

5. To ensure that Kubernetes metadata continues to be applied to traces, tell the [`k8sattributes` processor][22] to forward the Pod IP to the Gateway Collector so that it can obtain the metadata:

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   For more information about the `passthrough` option, read [its documentation][23].

6. Make sure that the Gateway Collector's configuration uses the same Datadog Exporter settings that have been replaced by the OTLP exporter in the agents. For example:

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: {{< region-param key="dd_site" code="true" >}}
         key: ${DD_API_KEY}
   # ...
   ```yaml

### Application Configuration

To configure your application container:

 1. Ensure that the correct OTLP endpoint hostname is used. The OpenTelemetry Collector runs as a DaemonSet in both [agent](#daemonset-deployment) and [gateway](#gateway-collector-service) deployments, so the current host needs to be targeted. Set your application container's `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable correctly, as in the [example chart][24]:

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

2. Ensure your OpenTelemetry Instrumentation Library SDK is configured correctly, following the instructions in [Configuring your application](#configuring-your-application).

## Alongside the Datadog Agent

To use the OpenTelemetry Collector alongside the Datadog Agent:

1. Set up an additional DaemonSet to ensure that the Datadog Agent runs on each host alongside the previously set up [OpenTelmetry Collector DaemonSet](#daemonset-deployment). For information, read [the docs about deploying the Datadog Agent in Kubernetes][25].

2. Enable [OTLP ingestion in the Datadog Agent][26].

3. Now that the Datadog Agent is ready to receive OTLP traces and metrics, change your [OpenTelemetry Collector Daemonset](#daemonset-deployment) to use the [OTLP exporter][19] instead of the Datadog Exporter. To do so, add it to [your config map][27]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "${HOST_IP}:4317"
   # ...
   ```

4. Make sure that the `HOST_IP` environment variable is provided [in the DaemonSet][28]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
   # ...
   ```

5. Make sure that the [service pipelines][21] are using OTLP:

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


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[8]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[9]: /getting_started/tagging/unified_service_tagging/
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
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
[25]: https://docs.datadoghq.com/containers/kubernetes/
[26]: https://docs.datadoghq.com/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/?tab=kubernetesdaemonset#enabling-otlp-ingestion-on-the-datadog-agent
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33
