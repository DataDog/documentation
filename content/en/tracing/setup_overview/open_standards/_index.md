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

### Ingesting OpenTelemetry Traces with the Collector

The OpenTelemetry Collector is configured by adding a [pipeline][8] to your `otel-collector-configuration.yml` file. Supply the relative path to this configuration file when you start the collector by passing it in via the `--config=<path/to/configuration_file>` command line argument. For examples of supplying a configuration file, see the [environment specific setup](#environent-specific-setup) section below or the [OpenTelemetry Collector documentation][9].

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

### Environment Specific Setup

#### Host:

- Download the appropriate binary from [the project repository latest release](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest).

- Create a `otel_collector_config.yaml` file. Here is an example template to get started. It enables the collector's otlp receiver and datadog exporter.

- Run on the host with the configration yaml file set via the `--config` parameter. For example,

  ```
    curl -L https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest/download/otelcontribcol_linux_amd64 | otelcontribcol_linux_amd64 --config otel_collector_config.yaml
  ```

#### Docker

Run an Opentelemetry Collector container to receive traces either from the [installed host](#receive-traces-from-host), or from [other containers](#receive-traces-from-other-containers).

##### Receive Traces From Host

- Create a `otel_collector_config.yaml` file. [Here is an example template](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#ingesting-opentelemetry-traces-with-the-collector) to get started. It enables the collector's otlp receiver and datadog exporter.

- Use a published docker image such as [`otel/opentelemetry-collector-contrib:latest`](https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags)

- OpenTelemetry Traces are sent to the OpenTelemetry Collector over TCP or UDP on a number of ports, which must be exposed on the container.  By default traces are sent over `OTLP/gRPC on port 55680`, but common protocols and their ports include: 

  ```
  Zipkin/HTTP on port 9411
  Jaeger/gRPC on port 14250
  Jaeger/HTTP on port 14268
  Jaeger/Compact on port 6831 (UDP)
  OTLP/gRPC on port 55680
  OTLP/HTTP on port 55681
  ```

- Run the container with the configured ports and an `otel_collector_config.yaml` file. For example:

  ```
   $ docker run \
    -p 55680:55680 \
    -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
    otel/opentelemetry-collector-contrib:latest
  ```
  
- Configure your application with the appropriate Resource attributes for unified service tagging by adding the metadata [described here](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#opentelemetry-collector-datadog-exporter)

##### Receive Traces From Other Containers

- Create a `otel_collector_config.yaml` file. [Here is an example template](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#ingesting-opentelemetry-traces-with-the-collector) to get started. It enables the collector's otlp receiver and datadog exporter.


- Configure your application with the appropriate Resource attributes for unified service tagging by adding the metadata [described here](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#opentelemetry-collector-datadog-exporter)

- Create a docker network 

  `docker network create <NETWORK_NAME>`
  
- Run the OpenTelemetry Collector container and Application container in the same network. *Note*: When running the application container, ensure the environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` is configured to use the appropriate hostname for the Collector. In the example below this would be `opentelemetry-collector`
 
  ```
  # Datadog Agent
  docker run -d --name opentelemetry-collector \
            --network <NETWORK_NAME> \
            -v /var/run/docker.sock:/var/run/docker.sock:ro \
            -v /proc/:/host/proc/:ro \
            -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
            -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
            otel/opentelemetry-collector-contrib:latest

  # Application
  docker run -d --name app \
            --network <NETWORK_NAME> \
            -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:55680 \
            company/app:latest
  ```

#### Kubernetes

The OpenTelemetry Collector can be run in two types of [deployment scenarios](https://opentelemetry.io/docs/collector/getting-started/#deployment). First, as an OpenTelemetry Collector "agent" running on the same host as the application in a sidecar or daemonset. Second, as a standalone service, e.g. a container or deployment, typically per cluster, datacenter or region.

In order to accurately track the appropriate metadata in Datadog for information and billing purposes, it is recommended the OpenTelemetry Collector be run at least in agent mode on each of the Kubernetes Nodes.

- When deploying the OpenTelemetry Collector as a Daemonset, refer to [the example configuration below](#opentelemetry-kubernetes-example-collector-configuration) as a guide.

- On the application container, use the downward API to pull the host IP; the application container needs an environment variable that points to status.hostIP. The OpenTelemetry Collector container Agent expects this to be named `OTEL_EXPORTER_OTLP_ENDPOINT`. Use the [below example snippet](#opentelemetry-kubernetes-example-application-configuration) as a guide.

##### OpenTelemetry Kubernetes Example Collector Configuration

```
---
# Give admin rights to the default account
# so that k8s_tagger can fetch info
# RBAC Config Here
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-conf
  labels:
    app: opentelemetry
    component: otel-agent-conf
data:
  otel-agent-config: |
    receivers:
      hostmetrics:
        collection_interval: 10s
        scrapers:
          load:
      otlp:
        protocols:
          grpc:
          http:
      jaeger:
        protocols:
          grpc:
          thrift_compact:
          thrift_http:
      zipkin:
    exporters:
      otlp:
        endpoint: "otel-collector.default:55680"
        insecure: true
    processors:
      batch:
      memory_limiter:
        # Same as --mem-ballast-size-mib CLI argument
        ballast_size_mib: 165
        # 80% of maximum memory up to 2G
        limit_mib: 400
        # 25% of limit up to 2G
        spike_limit_mib: 100
        check_interval: 5s      

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
    extensions:
      health_check: {}
    service:
      extensions: [health_check]
      pipelines:
        metrics:
          receivers: [otlp]
          # resourcedetection must come before k8s_tagger
          processors: [batch, resourcedetection, k8s_tagger]
          exporters: [otlp]
        traces:
          receivers: [otlp, jaeger, zipkin]
          # resourcedetection must come before k8s_tagger
          processors: [memory_limiter, resourcedetection, k8s_tagger, batch]
          exporters: [otlp]
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-agent
spec:
  selector:
    matchLabels:
      app: opentelemetry
      component: otel-agent
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-agent
    spec:
      containers:
      - command:
          - "/otelcontribcol"
          - "--config=/conf/otel-agent-config.yaml"
          # Memory Ballast size should be max 1/3 to 1/2 of memory.
          - "--mem-ballast-size-mib=165"          
        image: otel/opentelemetry-collector-contrib:latest
        name: otel-agent
        resources:
          limits:
            cpu: 500m
            memory: 500Mi
          requests:
            cpu: 100m
            memory: 100Mi
        ports:
        - containerPort: 6831 # Jaeger Thrift Compact
          protocol: UDP
        - containerPort: 8888 # Prometheus Metrics
        - containerPort: 9411 # Default endpoint for Zipkin receiver.
        - containerPort: 14250 # Default endpoint for Jaeger gRPC receiver.
        - containerPort: 14268 # Default endpoint for Jaeger HTTP receiver.
        - containerPort: 55680 # Default OpenTelemetry gRPC receiver port.
        - containerPort: 55681 # Default OpenTelemetry HTTP receiver port.
        env:
           # Get pod ip so that k8s_tagger can tag resources
          - name: POD_IP
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
            # This is picked up by the resource detector
          - name: OTEL_RESOURCE
            value: "k8s.pod.ip=$(POD_IP)"
        volumeMounts:
        - name: otel-agent-config-vol
          mountPath: /conf
        livenessProbe:
          httpGet:
            path: /
            port: 13133 # Health Check extension default port.
        readinessProbe:
          httpGet:
            path: /
            port: 13133 # Health Check extension default port.
      volumes:
        - configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
          name: otel-agent-config-vol
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-collector-conf
  labels:
    app: opentelemetry
    component: otel-collector-conf
data:
  otel-collector-config: |
    receivers:
      otlp:
        protocols:
          grpc:
          http:
    processors:
      batch:
      k8s_tagger:
    extensions:
      health_check: {}
      zpages: {}
    exporters:
      datadog:
        api:
          key: <YOUR_API_KEY>
    service:
      extensions: [health_check, zpages]
      pipelines:
        metrics/2:
          receivers: [otlp]
          processors: [batch, k8s_tagger]
          exporters: [datadog]
        traces/2:
          receivers: [otlp]
          processors: [batch, k8s_tagger]
          exporters: [datadog]
---
apiVersion: v1
kind: Service
metadata:
  name: otel-collector
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  ports:
  - name: otlp # Default endpoint for OpenTelemetry receiver.
    port: 55680
    protocol: TCP
    targetPort: 55680
  - name: metrics # Default endpoint for querying metrics.
    port: 8888
  selector:
   component: otel-collector
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: otel-collector
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  selector:
    matchLabels:
      app: opentelemetry
      component: otel-collector
  minReadySeconds: 5
  progressDeadlineSeconds: 120
  replicas: 1
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
      - command:
          - "/otelcontribcol"
          - "--config=/conf/otel-collectorcollector-config.yaml"
          - "--log-level=debug"
        image: otel/opentelemetry-collector-contrib:latest
        name: otel-collector
        resources:
          limits:
            cpu: 1
            memory: 2Gi
          requests:
            cpu: 200m
            memory: 400Mi
        ports:
        - containerPort: 55679 # Default endpoint for ZPages.
        - containerPort: 55680 # Default endpoint for OpenTelemetry receiver.
        - containerPort: 8888  # Default endpoint for querying metrics.
        volumeMounts:
        - name: otel-collector-config-vol
          mountPath: /conf
        livenessProbe:
          httpGet:
            path: /
            port: 13133 # Health Check extension default port.
        readinessProbe:
          httpGet:
            path: /
            port: 13133 # Health Check extension default port.
      volumes:
        - configMap:
            name: otel-collector-conf
            items:
              - key: otel-collector-config
                path: otel-collector-config.yaml
          name: otel-collector-config-vol
```

##### Opentelemetry Kubernetes Example Application Configuration

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
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/master/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[5]: https://opentelemetry.io/docs/collector/configuration/
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/master/exporter/datadogexporter/example/config.yaml
[8]: https://github.com/open-telemetry/opentelemetry-collector/blob/master/docs/design.md#pipelines
[9]: https://github.com/open-telemetry/opentelemetry-collector/tree/master/examples
[10]: https://github.com/open-telemetry/opentelemetry-collector/tree/master/processor/batchprocessor#batch-processor
