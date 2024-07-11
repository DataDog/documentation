---
title: Migrate to OpenTelemetry Collector version 0.95.0+
aliases:
- /opentelemetry/guide/switch_from_processor_to_connector
---

[OTel Collector Contrib version 0.95.0][1] disables Trace Metrics computation in the Datadog Exporter by default.

In versions 0.95.0 and later, the calculation of Trace Metrics is handled by the Datadog Connector. This change ensures that:
- Trace Metrics are consistently calculated on 100% of the trace data, even when sampling is applied.
- Moving calculation to the Datadog Connector better aligns with the OpenTelemetry recommended architecture.

To continue receiving Trace Metrics, configure the Datadog Connector in the OpenTelemetry Collector.

## Migrate to OpenTelemetry Collector version 0.95.0+

<div class="alert alert-warning">To continue receiving Trace Metrics, you must configure the Datadog Connector as a part of your upgrade to OpenTelemetry Collector version 0.95.0+. Upgrading without configuring the Datadog Connector might also result in difficulties viewing the APM Traces page within the application. Monitors and dashboards based on the affected metrics might also be impacted.</a></div>

Before proceeding with the upgrade to the OTel Collector versions 0.95.0+:
- Review the [release notes](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0) to understand the nature of the changes.
- Assess how these changes may affect your current configuration and deployment.
- Consider reaching out to the [Datadog support team][2] for guidance and assistance in planning your upgrade strategy.

To upgrade:
1. Include `datadog/connector` in the list of configured connectors.
1. Include `datadog/connector` and `datadog/exporter` in the list of the configured exporters in your OpenTelemetry `traces` pipeline.
1. Include `datadog/connector` in the list of the configured receivers in your OpenTelemetry `metrics` pipeline.
1. Include `datadog/exporter` in the list of the configured exporters in your OpenTelemetry `metrics` pipeline.

## Example configuration

Below is an example of an OpenTelemetry configuration before and after migration.

Before migration:
```
// Legacy default configuration before v0.95.0
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
processors:
  batch:
exporters:
  datadog:
    api:
      key: <api key here>
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
```

After migration:
```
// New default configuration after v0.95.0
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
processors:
  batch:
connectors:
  datadog/connector:
exporters:
  datadog/exporter:
    api:
      key: <api key here>
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector, datadog/exporter]
    metrics:
      receivers: [datadog/connector, otlp] // The connector provides the metrics to your metrics pipeline
      processors: [batch]
      exporters: [datadog/exporter]
```

## Vendor-specific Open-Telemetry distributions

If you're running a vendor-specific OpenTelemetry distribution that does not include the Datadog Connector, revert to the previous Trace Connector behavior by disabling the `exporter.datadogexporter.DisableAPMStats` feature gate.

```sh
otelcol --config=config.yaml --feature-gates=-exporter.datadogexporter.DisableAPMStats
```

For questions or assistance, contact [Datadog support][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://docs.datadoghq.com/help/
