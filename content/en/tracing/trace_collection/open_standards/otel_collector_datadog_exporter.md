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

The OpenTelemetry Collector is a vendor-agnostic separate agent process for collecting and exporting telemetry data emitted by many processes. Datadog has [an exporter available within the OpenTelemetry Collector][1] to receive traces and metrics data from the OpenTelemetry SDKs, and to forward the data on to Datadog (without the Datadog Agent). It works with all supported languages, and you can [connect those OpenTelemetry trace data with application logs][2].

You can [deploy the OpenTelemetry Collector using any of the supported methods][3], and configure it by adding a `datadog` exporter to your [OpenTelemetry configuration YAML file][4] along with your [Datadog API key][5]:

```
datadog:
  api:
    key: "<API key>"
```
To send the data to a different [Datadog site][6], also set the `site` parameter:
```
datadog:
  api:
    key: "<API key>"
    site: {{< region-param key="dd_site" code="true" >}}
```

On each OpenTelemetry-instrumented application, set the resource attributes `deployment.environment`, `service.name`, and `service.version` using [the language's SDK][1]. 

The exporter attempts to get a hostname by checking the following sources in order, falling back to the next one if the current one is unavailable or invalid:

1. Hostname set in the OTLP resource
1. Manually set hostname in the exporter configuration
1. Cloud provider API hostname
1. Kubernetes hostname
1. Fully qualified domain name
1. Operating system host name

## Ingesting OpenTelemetry traces with the collector

<div class="alert alert-warning">
The Datadog exporter for the OpenTelemetry Collector is currently in beta. It may consume high CPU and memory resources. Configuring particularly the pipeline and batch processor may take some iteration before it responds with accurate metrics given your production environment. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

The OpenTelemetry Collector is configured by adding a [pipeline][7] to your `otel-collector-configuration.yml` file. Supply the relative path to this configuration file when you start the collector by passing it in via the `--config=<path/to/configuration_file>` command line argument. For examples of supplying a configuration file, see the [environment specific setup](#environment-specific-setup) section below or the [OpenTelemetry Collector documentation][8].

Here is an example trace pipeline configured with an `otlp` receiver, `batch` processor and `datadog` exporter:

```
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:

exporters:
  datadog:
    host_metadata:
      tags:
        - example:tag
    api:
      key: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      site: {{< region-param key="dd_site" code="true" >}}

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
```

## Environment specific setup

### Host

1. Download the appropriate binary from [the project repository latest release][9].

2. Create a `otel_collector_config.yaml` file. [Here is an example template](#ingesting-opentelemetry-traces-with-the-collector) to get started. It enables the collector's OTLP Receiver and Datadog Exporter.

3. Run the download on the host, specifying  the configration yaml file set via the `--config` parameter. For example:

      ```
      otelcontribcol_linux_amd64 --config otel_collector_config.yaml
      ```

### Docker

Run an Opentelemetry Collector container to receive traces either from the [installed host](#receive-traces-from-host), or from [other containers](#receive-traces-from-other-containers).

<div class="alert alert-info">
The latest tag of the OpenTelemetry Collector Contrib distro <a href="https://github.com/open-telemetry/opentelemetry-collector-releases/issues/73">is not updated on every release</a>.
Pin the Collector to the latest version to pick up the latest changes.
</div>

#### Receive traces from host

1. Create a `otel_collector_config.yaml` file. [Here is an example template](#ingesting-opentelemetry-traces-with-the-collector) to get started. It enables the collector's OTLP receiver and the Datadog exporter.

2. Choose a published Docker image such as [`otel/opentelemetry-collector-contrib:latest`][10].

3.  Determine which ports to open on your container. OpenTelemetry traces are sent to the OpenTelemetry Collector over TCP or UDP on several ports, which must be exposed on the container. By default, traces are sent over OTLP/gRPC on port `4317`, but common protocols and their ports include:

      - Zipkin/HTTP on port `9411`
      - Jaeger/gRPC on port `14250`
      - Jaeger/HTTP on port `14268`
      - Jaeger/Compact on port (UDP) `6831`
      - OTLP/gRPC on port `4317`
      - OTLP/HTTP on port `4318`

4. Run the container with the configured ports and an `otel_collector_config.yaml` file. For example:

      ```
      $ docker run \
      -p 4317:4317 \
      --hostname $(hostname) \
      -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
      otel/opentelemetry-collector-contrib:<VERSION>
      ```

5. Configure your application with the appropriate resource attributes for unified service tagging by [adding metadata](#opentelemetry-collector-datadog-exporter)

#### Receive traces from other containers

1. Create an `otel_collector_config.yaml` file. [Here is an example template](#ingesting-opentelemetry-traces-with-the-collector) to get started. It enables the collector's OTLP receiver and Datadog exporter.


2. Configure your application with the appropriate resource attributes for unified service tagging by adding the metadata [described here](#opentelemetry-collector-datadog-exporter)

3. Create a docker network:

    ```
    docker network create <NETWORK_NAME>
    ```

4. Run the OpenTelemetry Collector container and application container in the same network. **Note**: When running the application container, ensure the environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` is configured to use the appropriate hostname for the OpenTelemetry Collector. In the example below, this is `opentelemetry-collector`.

    ```
    # Datadog Agent
    docker run -d --name opentelemetry-collector \
              --network <NETWORK_NAME> \
              --hostname $(hostname) \
              -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
              otel/opentelemetry-collector-contrib:<VERSION>

    # Application
    docker run -d --name app \
              --network <NETWORK_NAME> \
              --hostname $(hostname) \
              -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
              company/app:latest
    ```

### Kubernetes

The OpenTelemetry Collector can be run in two types of [deployment scenarios][3]:

- As an OpenTelemetry Collector agent running on the same host as the application in a sidecar or daemonset; or

- As a standalone service, for example a container or deployment, typically per-cluster, per-datacenter, or per-region.

To accurately track the appropriate metadata in Datadog, run the OpenTelemetry Collector in agent mode on each of the Kubernetes nodes.

When deploying the OpenTelemetry Collector as a daemonset, refer to [the example configuration below](#example-kubernetes-opentelemetry-collector-configuration) as a guide.

On the application container, use the downward API to pull the host IP. The application container needs an environment variable that points to `status.hostIP`. The OpenTelemetry Application SDKs expect this to be named `OTEL_EXPORTER_OTLP_ENDPOINT`. Use the [below example snippet](#example-kubernetes-opentelemetry-application-configuration) as a guide.

#### Example Kubernetes OpenTelemetry collector configuration

A full example Kubernetes manifest for deploying the OpenTelemetry Collector as both daemonset and standalone collector [can be found here][11]. Modify the example to suit your environment. The key sections that are specific to Datadog are as follows:

1. The example demonstrates deploying the OpenTelemetry Collectors in [agent mode via daemonset][12], which collect relevant k8s node and pod specific metadata, and then forward telemetry data to an OpenTelemetry Collector in [standalone collector mode][13]. This OpenTelemetry Collector in standalone collector mode then exports to the Datadog backend. See [this diagram of this deployment model][14].

2. For OpenTelemetry Collectors deployed as agent by daemonset, in the daemonset, `spec.containers.env` should use the downward API to capture `status.podIP` and add it as part of the `OTEL_RESOURCE_ATTRIBUTES` environment variable. This is used by the OpenTelemetry Collector's `resourcedetection` and `k8sattributes` processors, which should be included along with a `batch` processor and added to the `traces` pipeline.

    In the daemonset's `spec.containers.env` section:

    ```yaml
      # ...
      env:
         # Get pod ip so that k8sattributes can tag resources
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
          # This is picked up by the resource detector
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "k8s.pod.ip=$(POD_IP)"
      # ...
    ```

    In the `otel-agent-conf` ConfigMap's `data.otel-agent-config` `processors` section:

    ```yaml
      # ...
      # The resource detector injects the pod IP
      # to every metric so that k8sattributes can
      # fetch information afterwards.
      resourcedetection:
        detectors: [env]
        timeout: 5s
        override: false
      # The k8sattributes processor in the Agent is in passthrough mode
      # so that it only tags with the minimal info for the
      # collector k8sattributes to complete
      k8sattributes:
        passthrough: true
      # ...
    ```

    In the `otel-agent-conf` ConfigMap's `data.otel-agent-config` `service.pipelines.traces` section:

    ```yaml
      # ...
      # resourcedetection must come before k8sattributes
      processors: [batch, resourcedetection, k8sattributes]
      # ...
    ```

3. For OpenTelemetry Collectors in standalone collector mode, which receive traces from downstream collectors and export to Datadog's backend, include a `batch` processor and a `k8sattributes` processor. These should be included along with the `datadog` exporter and added to the `traces` pipeline.

    In the `otel-collector-conf` ConfigMap's `data.otel-collector-config` `processors` section:

    ```yaml
      # ...
      batch:
      k8sattributes:
      # ...
    ```

    In the `otel-collector-conf` ConfigMap's `data.otel-collector-config` `exporters` section:

    ```yaml
      exporters:
        datadog:
          api:
            key: <YOUR_API_KEY>
    ```

    In the `otel-collector-conf` ConfigMap's `data.otel-collector-config` `service.pipelines.traces` section:

    ```yaml
      # ...
      processors: [batch, k8sattributes]
      exporters: [datadog]
      # ...
    ```
<div class="alert alert-warning">If you get the error <code>unknown processors type "k8sattributes" for k8sattributes</code>, upgrade to the latest OpenTelemetry Collector (v0.37.0 or greater).</div>

#### Example Kubernetes OpenTelemetry application configuration

In addition to the OpenTelemetry Collector configuration, ensure that OpenTelemetry SDKs that are installed in an application transmit telemetry data to the collector, by configuring the environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` with the host IP. Use the downward API to pull the host IP, and set it as an environment variable, which is then interpolated when setting the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable:

```
apiVersion: apps/v1
kind: Deployment
...
spec:
  containers:
  - name: <CONTAINER_NAME>
    image: <CONTAINER_IMAGE>/<TAG>
    env:
      - name: HOST_IP
        valueFrom:
          fieldRef:
            fieldPath: status.hostIP
        # This is picked up by the opentelemetry sdks
      - name: OTEL_EXPORTER_OTLP_ENDPOINT
        value: "http://$(HOST_IP):4317"
```

To see more information and additional examples of how you might configure your collector, see [the OpenTelemetry Collector configuration documentation][4].

### Running alongside the Datadog Agent

If running the OpenTelemetry Collector on a host with an existing Datadog Agent, replace the Datadog exporter with an OTLP exporter pointing to the Datadog Agent:

1. Enable the Datadog Agent OTLP ingest through gRPC by following the instructions in the [dedicated section][15].

2. On the OpenTelemetry collector config, define an OTLP exporter pointing to the Datadog Agent endpoint. For example, if your Datadog Agent is listening on port 4317 and you are running on the same host, you may define the exporter as:
   ```yaml
   exporters:
     otlp:
       endpoint: "0.0.0.0:4317"
       tls:
        insecure: true
   ```
   When running in a containerized environment, ensure the `endpoint` setting is configured to use the appropriate hostname for the Datadog Agent.

3. On the OpenTelemetry collector config, replace uses of the Datadog exporter in your metrics and traces pipelines with the OTLP exporter. For example, if you have one metrics and one traces pipeline with the Datadog exporter, use the following configuration:
   ```yaml
   pipelines:
     metrics:
      receivers: [...]
      processors: [...]
      exporters: [nop/1, nop/2, otlp] # replaced 'datadog' by 'otlp'
    traces:
      receivers: [...]
      processors: [...]
      exporters: [nop/3, nop/4, otlp] # replaced 'datadog' by 'otlp'
   ```

This configuration ensures consistent host metadata and centralizes the configuration for host tags and host aliases.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /getting_started/site/
[7]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#pipelines
[8]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/examples
[9]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[10]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/example_k8s_manifest.yaml
[12]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-an-agent
[13]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-a-standalone-collector
[14]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/images/opentelemetry-service-deployment-models.png
[15]: /tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
