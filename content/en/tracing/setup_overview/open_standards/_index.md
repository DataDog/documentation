---
title: OpenTracing and OpenTelemetry
kind: documentation
description: 'Use open standards to generate your application traces'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
aliases:


---
Datadog supports a variety of open standards, including [OpenTracing][1] and [OpenTelemetry][2]. Each of the following languages has support for sending Open Tracing data to Datadog. They all also have support for sending OpenTelemetry data to Datadog via the [OpenTelemetry Collector Datadog exporter](#opentelemetry-collector-datadog-exporter). Additionally, Python, Ruby, and NodeJS have dedicated OpenTelemetry Datadog span exporters, which export traces from OpenTelemetry tracing clients to a Datadog Agent. 

Click your language to see instructions for setting up OpenTracing or language-specific OpenTelemetry exporters. See below for setting up the [OpenTelemetry Collector Datadog exporter](#opentelemetry-collector-datadog-exporter):

{{< partial name="apm/apm-opentracing.html" >}}

<br>

## OpenTelemetry Collector Datadog exporter

The OpenTelemetry Collector is a vendor-agnostic separate agent process for collecting and exporting telemetry data emitted by many processes. Datadog has [an exporter available within the OpenTelemetry Collector][3] to receive traces and metrics data from the OpenTelemetry SDKs, and to forward the data on to Datadog (without the Datadog Agent). It works with all supported languages. 

You can [deploy the OpenTelemetry Collector via any of the supported methods][4], and configure it by adding a `datadog` exporter to your [OpenTelemetry configuration YAML file][5] along with your [Datadog API key][6]:

```
datadog:
  api:
    key: "<API key>"
```
To send the data to the Datadog EU site, also set the `site` parameter:
```
datadog:
  api:
    key: "<API key>"
    site: datadoghq.eu
```

On each OpenTelemetry-instrumented application, set the resource attributes `development.environment`, `service.name`, and `service.version` using [the language's SDK][2]. As a fall-back, you can also configure hostname (optionally), environment, service name, and service version at the collector level for unified service tagging by following the [example configuration file][7]. If you don't specify the hostname explicitly, the exporter attempts to get an automatic default by checking the following sources in order, falling back to the next one if the current one is unavailable or invalid:

<!--- 1. Hostname set by another OpenTelemetry component -->
1. Manually set hostname in configuration
1. EC2 non-default hostname (if in EC2 instance)
1. EC2 instance id (if in EC2 instance)
1. Fully qualified domain name
1. Operating system host name

### Ingesting OpenTelemetry traces with the collector

The OpenTelemetry Collector is configured by adding a [pipeline][8] to your `otel-collector-configuration.yml` file. Supply the relative path to this configuration file when you start the collector by passing it in via the `--config=<path/to/configuration_file>` command line argument. For examples of supplying a configuration file, see the [environment specific setup](#environment-specific-setup) section below or the [OpenTelemetry Collector documentation][9].

The exporter assumes you have a pipeline that uses the `datadog` exporter, and includes a [batch processor][10] configured with the following:
  - A required `timeout` setting of `10s` (10 seconds). A batch representing 10 seconds of traces is a constraint of Datadog's API Intake for Trace Related Statistics. 
  <div class="alert alert-info"><strong>Important!</strong> Without this <code>timeout</code> setting, trace related metrics including <code>.hits</code>, <code>.errors</code>, and <code>.duration</code> for different services and service resources will be inaccurate over periods of time.</div>

<div class="alert alert-warning">
The Datadog exporter for the OpenTelemetry Collector is currently in beta. It may consume high CPU and memory resources. Configuring particularly the pipeline and batch processor may take some iteration before it responds with accurate metrics given your production environment. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

Here is an example trace pipeline configured with an `otlp` receiver, `batch` processor, and `datadog` exporter:

```
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:
    timeout: 10s

exporters:
  datadog/api:
    hostname: customhostname
    env: prod
    service: myservice
    version: myversion

    tags:
      - example:tag

    api:
      key: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      site: datadoghq.eu

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/api]
```

### Environment specific setup

#### Host

1. Download the appropriate binary from [the project repository latest release][11].

2. Create a `otel_collector_config.yaml` file. [Here is an example template](#ingesting-opentelemetry-traces-with-the-collector) to get started. It enables the collector's OTLP Receiver and Datadog Exporter.

3. Run the download on the host, specifying  the configration yaml file set via the `--config` parameter. For example:

      ```
      otelcontribcol_linux_amd64 --config otel_collector_config.yaml
      ```

#### Docker

Run an Opentelemetry Collector container to receive traces either from the [installed host](#receive-traces-from-host), or from [other containers](#receive-traces-from-other-containers).

##### Receive traces from host

1. Create a `otel_collector_config.yaml` file. [Here is an example template](#ingesting-opentelemetry-traces-with-the-collector) to get started. It enables the collector's OTLP receiver and the Datadog exporter.

2. Choose a published Docker image such as [`otel/opentelemetry-collector-contrib:latest`][12].

3.  Determine which ports to open on your container. OpenTelemetry traces are sent to the OpenTelemetry Collector over TCP or UDP on a number of ports, which must be exposed on the container.  By default, traces are sent over OTLP/gRPC on port `55680`, but common protocols and their ports include: 

      - Zipkin/HTTP on port `9411`
      - Jaeger/gRPC on port `14250`
      - Jaeger/HTTP on port `14268`
      - Jaeger/Compact on port (UDP) `6831` 
      - OTLP/gRPC on port `55680`
      - OTLP/HTTP on port `55681`

4. Run the container with the configured ports and an `otel_collector_config.yaml` file. For example:

      ```
      $ docker run \
      -p 55680:55680 \
      -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
      otel/opentelemetry-collector-contrib
      ```
  
5. Configure your application with the appropriate resource attributes for unified service tagging by [adding metadata](#opentelemetry-collector-datadog-exporter)

##### Receive traces from other containers

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
              -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
              otel/opentelemetry-collector-contrib

    # Application
    docker run -d --name app \
              --network <NETWORK_NAME> \
              -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:55680 \
              company/app:latest
    ```

#### Kubernetes

The OpenTelemetry Collector can be run in two types of [deployment scenarios][4]:

- As an OpenTelemetry Collector agent running on the same host as the application in a sidecar or daemonset; or 

- As a standalone service, for example a container or deployment, typically per-cluster, per-datacenter, or per-region.

To accurately track the appropriate metadata in Datadog, run the OpenTelemetry Collector in agent mode on each of the Kubernetes nodes.

When deploying the OpenTelemetry Collector as a daemonset, refer to [the example configuration below](#example-kubernetes-opentelemetry-collector-configuration) as a guide.

On the application container, use the downward API to pull the host IP. The application container needs an environment variable that points to `status.hostIP`. The OpenTelemetry Application SDKs expect this to be named `OTEL_EXPORTER_OTLP_ENDPOINT`. Use the [below example snippet](#example-kubernetes-opentelemetry-application-configuration) as a guide.

##### Example Kubernetes OpenTelemetry Collector configuration

A full example Kubernetes manifest for deploying the OpenTelemetry Collector as both daemonset and standalone collector [can be found here][13]. Modify the example to suit your environment. The key sections that are specific to Datadog are as follows:

1. The example demonstrates deploying the OpenTelemetry Collectors in [agent mode via daemonset][14], which collect relevant k8s node and pod specific metadata, and then forward telemetry data to an OpenTelemetry Collector in [standalone collector mode][15]. This OpenTelemetry Collector in standalone collector mode then exports to the Datadog backend. See [this diagram of this deployment model][16].

2. For OpenTelemetry Collectors deployed as agent via daemonset, in the daemonset, `spec.containers.env` should use the downward API to capture `status.podIP` and add it as part of the `OTEL_RESOURCE` environment variable. This is used by the OpenTelemetry Collector's `resourcedetection` and `k8s_tagger` processors, which should be included along with a `batch` processor and added to the `traces` pipeline.

    In the daemonset's `spec.containers.env` section:

    ```yaml
      # ...
      env:
         # Get pod ip so that k8s_tagger can tag resources
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
          # This is picked up by the resource detector
        - name: OTEL_RESOURCE
          value: "k8s.pod.ip=$(POD_IP)"
      # ...
    ```

    In the `otel-agent-conf` ConfigMap's `data.otel-agent-config` `processors` section:

    ```yaml
      # ...
      # The resource detector injects the pod IP
      # to every metric so that the k8s_tagger can
      # fetch information afterwards.
      resourcedetection:
        detectors: [env]
        timeout: 5s
        override: false
      # The k8s_tagger in the Agent is in passthrough mode
      # so that it only tags with the minimal info for the
      # collector k8s_tagger to complete
      k8s_tagger:
        passthrough: true
      batch:
      # ...
    ```

    In the `otel-agent-conf` ConfigMap's `data.otel-agent-config` `service.pipelines.traces` section:

    ```yaml
      # ...
      # resourcedetection must come before k8s_tagger
      processors: [resourcedetection, k8s_tagger, batch]
      # ...
    ```

3. For OpenTelemetry Collectors in standalone collector mode, which receive traces from downstream collectors and export to Datadog's backend, include a `batch` processor configured with a `timeout` of `10s` as well as the `k8s_tagger` enabled. These should be included along with the `datadog` exporter and added to the `traces` pipeline.

    In the `otel-collector-conf` ConfigMap's `data.otel-collector-config` `processors` section:

    ```yaml
      # ...
      batch:
        timeout: 10s
      k8s_tagger:
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
      processors: [k8s_tagger, batch]
      exporters: [datadog]
      # ...
    ```

##### Example Kubernetes OpenTelemetry application configuration

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
        value: "http://$(HOST_IP):55680"
```

To see more information and additional examples of how you might configure your collector, see [the OpenTelemetry Collector configuration documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentracing.io/docs/
[2]: https://opentelemetry.io/docs/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[5]: https://opentelemetry.io/docs/collector/configuration/
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/config.yaml
[8]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#pipelines
[9]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/examples
[10]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor#batch-processor
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest
[12]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/example_k8s_manifest.yaml
[14]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-an-agent
[15]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-a-standalone-collector
[16]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/images/opentelemetry-service-deployment-models.png
