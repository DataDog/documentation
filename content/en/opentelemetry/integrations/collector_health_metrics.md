---
title: Health Metrics
aliases: 
- /opentelemetry/collector_exporter/collector_health_metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/collector_health_metrics.png" alt="OpenTelemetry Collector health metrics dashboard" style="width:100%;" >}}

The OpenTelemetry Collector exposes internal telemetry as metrics. You can collect these metrics and send them to Datadog to monitor Collector health and pipeline throughput.

You can send the Collector's health metrics to Datadog with two approaches:

- **Prometheus**: Scrape the Collector's internal Prometheus endpoint with the [Prometheus receiver][1] and forward the metrics through a metrics pipeline to the Datadog Exporter.
- **OTLP**: Configure the Collector's internal telemetry to export metrics directly to the [Datadog OTLP metrics intake endpoint][4] over OTLP HTTP.

## Setup

### Configure the pipeline

The following tabs cover two approaches: a Prometheus-style scrape and a direct OTLP push. After configuring the pipeline, see the [Configuration reference](#configuration-reference) for all available options.

{{< tabs >}}
{{% tab "Prometheus" %}}

Configure the Collector to expose its internal metrics on a Prometheus pull endpoint. Scrape that endpoint with the [Prometheus receiver][101] and route the data through a metrics pipeline to the [Datadog Exporter][102].

```yaml
receivers:
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: 'otelcol'
          scrape_interval: 10s
          static_configs:
            - targets: ['0.0.0.0:8888']

exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: <DATADOG_SITE>
    metrics:
      resource_attributes_as_tags: true
    sending_queue:
      batch:
        flush_timeout: 10s

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
                without_scope_info: true
                # with_resource_constant_labels:
                #   included: ["service.name", "service.instance.id"]
                #   excluded: []
      # views:
      #   - selector:
      #       instrument_name: otelcol_processor_*
      #     stream:
      #       aggregation:
      #         drop: {}
  pipelines:
    metrics:
      receivers: [prometheus/internal]
      exporters: [datadog]
```

Replace `<DATADOG_SITE>` with your [Datadog site][106]: {{< region-param key="dd_site" code="true" >}}.

The `service.telemetry.metrics` block exposes the Collector's internal metrics on `0.0.0.0:8888`. The `prometheus/internal` receiver scrapes that same endpoint, and the metrics pipeline forwards the scraped metrics to Datadog.

For all available options, see [`pull.exporter.prometheus` options](#pullexporterprometheus-options).

#### Enrich with processors (optional)

Add the [resource detection processor][103] to the metrics pipeline to automatically populate cloud and host resource attributes (for example, `host.id`, `cloud.provider`, `cloud.region`). You can also add other processors such as [`transform`][104] or [`k8sattributes`][105] to enrich or transform Collector health metrics before export.

```yaml
processors:
  resourcedetection:
    detectors: [env, system, ec2]
    override: false

service:
  pipelines:
    metrics:
      receivers: [prometheus/internal]
      processors: [resourcedetection]
      exporters: [datadog]
```

<div class="alert alert-warning">
If you have a Datadog Agent running on the same host as an OpenTelemetry Collector or DDOT Collector that uses a Prometheus receiver to scrape Collector health metrics, make sure the Agent's <a href="/integrations/openmetrics/">OpenMetrics integration</a> is either turned off or scraping a different endpoint than the Collector health metrics endpoint. Otherwise, both the Agent and Collector scrape the same endpoint, resulting in duplicate Collector health metrics.
</div>

[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[102]: /opentelemetry/setup/collector_exporter/
[103]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor
[104]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
[105]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor
[106]: /getting_started/site

{{% /tab %}}
{{% tab "OTLP" %}}

Configure the Collector's internal telemetry to push metrics directly to the [Datadog OTLP metrics intake endpoint][201] using a periodic OTLP HTTP reader. This approach does not require a Prometheus receiver or a metrics pipeline for Collector health metrics.

```yaml
service:
  telemetry:
    metrics:
      level: normal
      readers:
        - periodic:
            interval: 10000
            timeout: 5000
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: <OTLP_METRICS_ENDPOINT>
                temporality_preference: delta
                compression: gzip
                timeout: 5000
                headers:
                  - name: dd-api-key
                    value: ${env:DD_API_KEY}
                  - name: dd-otel-metric-config
                    value: '{"resource_attributes_as_tags": true, "instrumentation_scope_metadata_as_tags": true}'
                # default_histogram_aggregation: explicit_bucket_histogram
                # headers_list: "dd-api-key=${env:DD_API_KEY}"
                # insecure: false
                # certificate: /path/to/ca.pem
                # client_certificate: /path/to/client.pem
                # client_key: /path/to/client.key
      # views:
      #   - selector:
      #       instrument_name: otelcol_processor_*
      #     stream:
      #       aggregation:
      #         drop: {}
```

Replace `<OTLP_METRICS_ENDPOINT>` with the [Datadog OTLP metrics intake endpoint][201] for your [Datadog site][202]: {{< region-param key="otlp_metrics_endpoint" code="true" >}}.

The Datadog OTLP metrics intake endpoint accepts only delta metrics, so `temporality_preference: delta` is required. The `dd-api-key` header authenticates the request. For configuration options (including the `dd-otel-metric-config` header for customizing metric translation) and troubleshooting, see [Datadog OTLP Metrics Intake Endpoint][201].

<div class="alert alert-warning">
This setup pushes metrics directly to the OTLP intake endpoint, bypassing any enrichment that pipeline processors (such as <code>resourcedetection</code> or <code>k8sattributes</code>) would otherwise apply. To populate Datadog tags and host metadata (which are needed for hostname resolution and the default Collector dashboard), set the relevant attributes explicitly under <a href="#tag-with-resource-attributes-optional"><code>service.telemetry.resource</code></a>. If you need automatic hostname and cloud-attribute detection, use the Prometheus tab instead.
</div>

For all available options, see [`periodic.exporter.otlp` options](#periodicexporterotlp-options).

[201]: /opentelemetry/setup/otlp_ingest/metrics/
[202]: /getting_started/site

{{% /tab %}}
{{< /tabs >}}

### Tag with resource attributes (optional)

Use `service.telemetry.resource` to attach resource attributes (such as `k8s.cluster.name`, `service.instance.id`, or any [Datadog-mapped semantic convention][6]) to all telemetry the Collector emits about itself.

Use the legacy inline map format for a concise definition:

```yaml
service:
  telemetry:
    resource:
      k8s.cluster.name: my-cluster
      k8s.pod.name: ${env:HOSTNAME}
      service.instance.id: ${env:HOSTNAME}
      deployment.environment: prod
```

Alternatively, use the declarative `attributes` format, which supports explicit typing and a `schema_url`. This format requires Collector v0.151.0 or later:

```yaml
service:
  telemetry:
    resource:
      schema_url: https://opentelemetry.io/schemas/1.27.0
      attributes:
        - name: k8s.cluster.name
          value: my-cluster
        - name: k8s.pod.name
          value: ${env:HOSTNAME}
```

To suppress a default attribute such as `service.version`, specify it with a null value in the legacy inline format.

Datadog maps these attributes to tags and host metadata. For the full list of supported mappings, see [OpenTelemetry Semantic Conventions and Datadog Conventions][6] and [Mapping OpenTelemetry Semantic Conventions to Hostnames][7].

## Configuration reference

### `service.telemetry.metrics` fields

The following top-level fields apply to both Prometheus and OTLP setups:

`level`
: Verbosity of the Collector's internal metrics. One of `none`, `basic`, `normal` (default), or `detailed`. Set `level: detailed` to enable `views`.

`readers`
: List of metric readers. At least one is required when `level` is not `none`. Each reader is either a `pull` reader (Prometheus) or a `periodic` reader (OTLP or console).

`views`
: Optional list of [SDK views][5] that drop, rename, filter, or re-aggregate specific instruments. Only available when `level: detailed`.

### `pull.exporter.prometheus` options

`host` / `port`
: Address to expose the Prometheus endpoint on. Defaults to `localhost:8888`. Use `0.0.0.0` to expose outside the loopback interface.

`without_type_suffix`
: When `true` (the Collector default), drops the type suffix (for example, `_total` for counters) from metric names. Names appear as `otelcol_exporter_sent_metric_points` instead of `otelcol_exporter_sent_metric_points_total`.

`without_units`
: When `true`, drops the unit suffix (for example, `_seconds`, `_bytes`) from metric names.

`without_scope_info`
: When `true`, suppresses the `otel_scope_info` metric and `otel_scope_*` labels.

`with_resource_constant_labels.included` / `with_resource_constant_labels.excluded`
: Allowlist and denylist of resource attributes to copy onto every exported metric as constant labels.

### `periodic.exporter.otlp` options

The `periodic` reader (which contains the OTLP exporter) accepts these top-level options:

`interval`
: Time in milliseconds between exports. Defaults to `60000` (60 seconds).

`timeout`
: Maximum time in milliseconds to wait for an export to complete. Defaults to `30000` (30 seconds).

The `otlp` block inside `periodic.exporter` accepts these options:

`protocol`
: One of `grpc`, `http/protobuf`, or `http/json`. Use `http/protobuf` for the Datadog OTLP metrics intake endpoint.

`endpoint`
: URL of the OTLP receiver. For Datadog, use {{< region-param key="otlp_metrics_endpoint" code="true" >}}.

`headers` / `headers_list`
: Headers to add to every export request. Use the structured `headers` list (each entry is a `{name, value}` pair) or `headers_list` as a URL-encoded string (for example, `dd-api-key=${env:DD_API_KEY}`).

`compression`
: Compression algorithm. One of `gzip` or `none`.

`timeout`
: Per-request timeout in milliseconds. Distinct from the reader-level `timeout`.

`temporality_preference`
: One of `cumulative`, `delta`, or `lowmemory`. The Datadog OTLP metrics intake endpoint requires `delta`.

`default_histogram_aggregation`
: One of `explicit_bucket_histogram` (default) or `base2_exponential_bucket_histogram`.

`insecure`
: When `true`, disables TLS. Defaults to `false`.

`certificate`, `client_certificate`, `client_key`
: Paths to PEM files for custom CA verification and mutual TLS (mTLS) client authentication.

## Data collected

| OpenTelemetry Metric | Description |
|---|---|
| `otelcol_process_uptime` | Uptime of the process |
| `otelcol_process_memory_rss` | Total physical memory (resident set size) |
| `otelcol_exporter_queue_size` | Current size of the retry queue (in batches) |
| `otelcol_exporter_sent_spans` | Number of spans successfully sent to destination |
| `otelcol_exporter_send_failed_metric_points` | Number of metric points in failed attempts to send to destination |
| `otelcol_exporter_send_failed_spans` | Number of spans in failed attempts to send to destination |
| `otelcol_process_cpu_seconds` | Total CPU user and system time in seconds |
| `otelcol_receiver_refused_spans` | Number of spans that could not be pushed into the pipeline |
| `otelcol_exporter_queue_capacity` | Fixed capacity of the retry queue (in batches) |
| `otelcol_receiver_accepted_spans` | Number of spans successfully pushed into the pipeline |
| `otelcol_exporter_sent_metric_points` | Number of metric points successfully sent to destination |
| `otelcol_exporter_enqueue_failed_spans` | Number of spans failed to be added to the sending queue |
| `otelcol_scraper_errored_metric_points` | Number of metric points that were unable to be scraped |
| `otelcol_scraper_scraped_metric_points` | Number of metric points successfully scraped |
| `otelcol_receiver_refused_metric_points` | Number of metric points that could not be pushed into the pipeline |
| `otelcol_receiver_accepted_metric_points` | Number of metric points successfully pushed into the pipeline |
| `otelcol_process_runtime_heap_alloc_bytes` | Bytes of allocated heap objects (see 'go doc runtime.MemStats.HeapAlloc') |
| `otelcol_process_runtime_total_alloc_bytes` | Cumulative bytes allocated for heap objects (see 'go doc runtime.MemStats.TotalAlloc') |
| `otelcol_exporter_enqueue_failed_log_records` | Number of log records failed to be added to the sending queue |
| `otelcol_processor_batch_timeout_trigger_send` | Number of times the batch was sent due to a timeout trigger |
| `otelcol_exporter_enqueue_failed_metric_points` | Number of metric points failed to be added to the sending queue |
| `otelcol_process_runtime_total_sys_memory_bytes` | Total bytes of memory obtained from the OS (see [the Go docs for `runtime.MemStats.Sys`][3]) |
| `otelcol_processor_batch_batch_size_trigger_send` | Number of times the batch was sent due to a size trigger |
| `otelcol_exporter_sent_log_records` | Number of log records successfully sent to destination |
| `otelcol_receiver_refused_log_records` | Number of log records that could not be pushed into the pipeline |
| `otelcol_receiver_accepted_log_records` | Number of log records successfully pushed into the pipeline |


## Example logging output

```
ResourceMetrics #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> service.name: Str(opentelemetry-collector)
     -> net.host.name: Str(192.168.55.78)
     -> service.instance.id: Str(192.168.55.78:8888)
     -> net.host.port: Str(8888)
     -> http.scheme: Str(http)
     -> k8s.pod.ip: Str(192.168.55.78)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-0368add8e328c28f7)
     -> host.image.id: Str(ami-08a2e6a8e82737230)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-53-115.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.pod.name: Str(opentelemetry-collector-agent-gqwm8)
     -> k8s.daemonset.name: Str(opentelemetry-collector-agent)
     -> k8s.daemonset.uid: Str(6d6fef61-d4c7-4226-9b7b-7d6b893cb31d)
     -> k8s.node.name: Str(ip-192-168-53-115.ec2.internal)
     -> kube_app_name: Str(opentelemetry-collector)
     -> kube_app_instance: Str(opentelemetry-collector)
     -> k8s.namespace.name: Str(otel-staging)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:23Z)
     -> k8s.pod.uid: Str(988d1bdc-5baf-4e98-942f-ab026a371daf)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/prometheusreceiver 0.88.0-dev
Metric #0
Descriptor:
     -> Name: otelcol_otelsvc_k8s_namespace_added
     -> Description: Number of namespace add events received
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
Data point attributes:
     -> service_instance_id: Str(d80d11f9-aa84-4e16-818d-3e7d868c0cfe)
     -> service_name: Str(otelcontribcol)
     -> service_version: Str(0.88.0-dev)
StartTimestamp: 1970-01-01 00:00:00 +0000 UTC
Timestamp: 2023-11-20 13:17:36.881 +0000 UTC
Value: 194151496.000000
Metric #9
Descriptor:
     -> Name: otelcol_receiver_accepted_spans
     -> Description: Number of spans successfully pushed into the pipeline.
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[3]: https://pkg.go.dev/runtime#MemStats.Sys
[4]: /opentelemetry/setup/otlp_ingest/metrics/
[5]: https://opentelemetry.io/docs/specs/otel/metrics/sdk/#view
[6]: /opentelemetry/mapping/semantic_mapping/
[7]: /opentelemetry/mapping/hostname/
