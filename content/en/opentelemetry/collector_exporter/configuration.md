---
title: Configuration
further_reading:
- link: "https://opentelemetry.io/docs/collector/management/"
  tag: "External Site"
  text: "OpenTelemetry Collector Management"
- link: "https://opentelemetry.io/docs/collector/configuration/"
  tag: "External Site"
  text: "OpenTelemetry Collector Configuration"
---

The OpenTelemetry Collector receives, processes, and exports telemetry data from your applications. To send this data to Datadog, you need to configure several components within the Collector:

- [Datadog Exporter][1]: Forwards trace, metric, and logs data from OpenTelemetry SDKs on to Datadog (without the Datadog Agent).
- [Datadog Connector][29]: Calculates Trace Metrics from collected span data.

## Setting up the OpenTelemetry Collector

To run the OpenTelemetry Collector with the Datadog Exporter and Datadog Connector:

### Step 1 - Download the OpenTelemetry Collector

Download the latest release of the OpenTelemetry Collector Contrib distribution, from [the project's repository][3].

### Step 2 - Configure the Datadog Exporter and Connector

To use the Datadog Exporter, add it to your [OpenTelemetry Collector configuration][4]. Create a configuration file and name it `collector.yaml`. Use the example file which provides a basic configuration that is ready to use after you set your Datadog API key as the `DD_API_KEY` environment variable:

{{% otel-endpoint-note %}}

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
  # The hostmetrics receiver is required to get correct infrastructure metrics in Datadog.
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
      processes:
  # The prometheus receiver scrapes metrics needed for the OpenTelemetry Collector Dashboard.
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/**/*example*/*.log

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

connectors:
  datadog/connector:

exporters:
  datadog/exporter:
    api:
      site: {{< region-param key="dd_site" >}}
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp]
      processors: [batch]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector, datadog/exporter]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog]
```

The above configuration enables the receiving of OTLP data from OpenTelemetry instrumentation libraries over HTTP and gRPC, and sets up a [batch processor][5], which is mandatory for any non-development environment. Note that you may get `413 - Request Entity Too Large` errors if you batch too much telemetry data in the batch processor.

The exact configuration of the batch processor depends on your specific workload as well as the signal types. Datadog intake has different payload size limits for the 3 signal types:
- Trace intake: 3.2MB
- Log intake: [5MB uncompressed][6]
- Metrics V2 intake: [500KB or 5MB after decompression][7]

#### Advanced configuration

[This fully documented example configuration file][8] illustrates all possible configuration options for the Datadog Exporter. There may be other options relevant to your deployment, such as `api::site` or the ones on the `host_metadata` section.

### Step 3 - Configure your application

To get better metadata for traces and for smooth integration with Datadog:

- **Use resource detectors**: If they are provided by the language SDK, attach container information as resource attributes. For example, in Go, use the [`WithContainer()`][9] resource option.

- **Apply [Unified Service Tagging][10]**: Make sure you've configured your application with the appropriate resource attributes for unified service tagging. This ties Datadog telemetry together with tags for service name, deployment environment, and service version. The application should set these tags using the OpenTelemetry semantic conventions: `service.name`, `deployment.environment`, and `service.version`.

### Step 4 - Configure the logger for your application

{{< img src="logs/log_collection/otel_collector_logs.png" alt="A diagram showing the host, container, or application sending data to the filelog receiver in the collector and the Datadog Exporter in the collector sending the data to the Datadog backend" style="width:100%;">}}

Since the OpenTelemetry SDKs' logging functionality is not fully supported (see your specific language in the [OpenTelemetry documentation][11] for more information), Datadog recommends using a standard logging library for your application. Follow the language-specific [Log Collection documentation][12] to set up the appropriate logger in your application. Datadog strongly encourages setting up your logging library to output your logs in JSON to avoid the need for [custom parsing rules][13].

#### Configure the filelog receiver

Configure the filelog receiver using [operators][14]. For example, if there is a service `checkoutservice` that is writing logs to `/var/log/pods/services/checkout/0.log`, a sample log might look like this:

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

Example filelog configuration:

```
filelog:
   include:
     - /var/log/pods/**/*checkout*/*.log
   start_at: end
   poll_interval: 500ms
   operators:
     - id: parse_log
       type: json_parser
       parse_from: body
     - id: trace
       type: trace_parser
       trace_id:
         parse_from: attributes.trace_id
       span_id:
         parse_from: attributes.span_id
   attributes:
     ddtags: env:staging
```

- `include`: The list of files the receiver tails
- `start_at: end`: Indicates to read new content that is being written
- `poll_internal`: Sets the poll frequency
- Operators:
    - `json_parser`: Parses JSON logs. By default, the filelog receiver converts each log line into a log record, which is the `body` of the logs' [data model][15]. Then, the `json_parser` converts the JSON body into attributes in the data model.
    - `trace_parser`: Extract the `trace_id` and `span_id` from the log to correlate logs and traces in Datadog.

#### Remap OTel's `service.name` attribute to `service` for logs

For Datadog Exporter versions 0.83.0 and later, the `service` field of OTel logs is populated as [OTel semantic convention][25] `service.name`. However, `service.name` is not one of the default [service attributes][26] in Datadog's log preprocessing.

To get the `service` field correctly populated in your logs, you can specify `service.name` to be the source of a log's service by setting a [log service remapper processor][27].

{{% collapse-content title="Optional: Using Kubernetes" level="h4" %}}

There are multiple ways to deploy the OpenTelemetry Collector and Datadog Exporter in a Kubernetes infrastructure. For the filelog receiver to work, the [Agent/DaemonSet deployment][16] is the recommended deployment method.

In containerized environments, applications write logs to `stdout` or `stderr`. Kubernetes collects the logs and writes them to a standard location. You need to mount the location on the host node into the Collector for the filelog receiver. Below is an [extension example][17] with the mounts required for sending logs.

```
apiVersion: apps/v1
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
        - name: collector
          command:
            - "/otelcol-contrib"
            - "--config=/conf/otel-agent-config.yaml"
          image: otel/opentelemetry-collector-contrib:0.71.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # The k8s.pod.ip is used to associate pods for k8sattributes
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
              hostPort: 4318
            - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
              hostPort: 4317
            - containerPort: 8888 # Default endpoint for querying metrics.
          volumeMounts:
            - name: otel-agent-config-vol
              mountPath: /conf
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: otel-agent-config-vol
          configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
        # Mount nodes log file location.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

{{% /collapse-content %}}

## Out-of-the-box Datadog Exporter configuration

You can find working examples of out-of-the-box configuration for Datadog Exporter in the [`exporter/datadogexporter/examples` folder][31] in the OpenTelemetry Collector Contrib project. See the full configuration example file, [`ootb-ec2.yaml`][30]. Configure each of the following components to suit your needs:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}OTLP Receiver{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Hostname and Tags{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Batch and Memory Settings{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://docs.datadoghq.com/api/latest/logs/
[7]: https://docs.datadoghq.com/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /logs/log_collection/?tab=host
[13]: /logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#service-remapper
[28]: /opentelemetry/schema_semantics/hostname/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[31]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
