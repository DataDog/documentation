---
title: Configuration
kind: documentation
further_reading:
- link: "https://opentelemetry.io/docs/collector/management/"
  tag: "OpenTelemetry"
  text: "OpenTelemetry Collector Management"
- link: "https://opentelemetry.io/docs/collector/configuration/"
  tag: "OpenTelemetry"
  text: "OpenTelemetry Collector Configuration"
---

## OpenTelemetry Collector configuration

To learn more about configuring the Collector, read the [OpenTelemetry Collector Configuration][3] documentation.

## Out-of-the-box Datadog Exporter configuration

You can find working examples of out-of-the-box configuration for Datadog Exporter in the [`exporter/datadogexporter/examples` folder][5] in the OpenTelemetry Collector Contrib project. See the full configuration example file, [`ootb-ec2.yaml`][4]. Configure each of the following components to suit your needs:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otel_collector_datadog_exporter/" >}}Datadog Exporter{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}OTLP Receiver{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Hostname and Tags{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Batch and Memory Settings{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/docker_metrics/" >}}Docker Metrics{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/host_metrics/" >}}Host Metrics{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/trace_metrics/" >}}Trace Metrics{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/log_collection/" >}}Log Collection{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_health_metrics/" >}}Collector Health Metrics{{< /nextlink >}}

{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://opentelemetry.io/docs/collector/configuration/
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/