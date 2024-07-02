---
"app_id": "openmetrics"
"app_uuid": "302b841e-8270-4ecd-948e-f16317a316bc"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10045"
    "source_type_name": OpenMetrics
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/openmetrics/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "openmetrics"
"integration_id": "openmetrics"
"integration_title": "OpenMetrics"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "openmetrics"
"public_title": "OpenMetrics"
"short_description": "OpenMetrics is an open standard for exposing metric data"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Metrics"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": OpenMetrics is an open standard for exposing metric data
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": OpenMetrics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Extract custom metrics from any OpenMetrics or Prometheus endpoints.

<div class="alert alert-warning">All the metrics retrieved by this integration are considered <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">custom metrics</a>.</div>

The integration is compatible with both the [Prometheus exposition format][1] as well as with the [OpenMetrics specification][2].

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][3] for guidance on applying these instructions.

This integration has a latest mode (enabled by setting `openmetrics_endpoint` to point to the target endpoint) and a legacy mode (enabled by setting `prometheus_url` instead). To get all the most up-to-date features, Datadog recommends enabling the latest mode. For more information, see [Latest and Legacy Versioning For OpenMetrics-based Integrations][4].

### インストール

The OpenMetrics check is packaged with the [Datadog Agent v6.6.0 or later][5].

### 構成

Edit the `conf.d/openmetrics.d/conf.yaml` file at the root of your [Agent's configuration directory][6]. See the [sample openmetrics.d/conf.yaml][7] for all available configuration options. This is the latest OpenMetrics check example as of Datadog Agent version 7.32.0. If you previously implemented this integration, see the [legacy example][8].

For each instance, the following parameters are required:

| Parameter        | Description                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openmetrics_endpoint` | The URL where your application metrics are exposed in Prometheus or OpenMetrics format (must be unique).                                                                                                                         |
| `namespace`      | The namespace to prepend to all metrics.                                                                                                                                                                                                                                 |
| `metrics`        | A list of metrics to retrieve as custom metrics. Add each metric to the list as `metric_name` or `metric_name: renamed` to rename it. The metrics are interpreted as regular expressions. Use `".*"` as a wildcard (`metric.*`) to fetch all matching metrics. **Note**: Regular expressions can potentially send a lot of custom metrics. |

Starting in Datadog Agent v7.32.0, in adherence to the [OpenMetrics specification standard][2], counter names ending in `_total` must be specified without the `_total` suffix. For example, to collect `promhttp_metric_handler_requests_total`, specify the metric name `promhttp_metric_handler_requests`. This submits to Datadog the metric name appended with `.count`, `promhttp_metric_handler_requests.count`.

This check has a limit of 2000 metrics per instance. The number of returned metrics is indicated when running the Datadog Agent [status command][9]. You can specify the metrics you are interested in by editing the configuration. To learn how to customize the metrics to collect, see [Prometheus and OpenMetrics Metrics Collection][10].

If you need to monitor more metrics, contact [Datadog support][11].

### Validation

[Run the Agent's status subcommand][9] and look for `openmetrics` under the Checks section.

## 収集データ

### メトリクス

All metrics collected by the OpenMetrics check are forwarded to Datadog as custom metrics.

### イベント

The OpenMetrics check does not include any events.

### サービスチェック

The OpenMetrics check does not include any service checks.

## トラブルシューティング

### High custom metrics billing

OpenMetrics configurations with generic wildcard values for the `metrics` option have significant impact on custom metrics billing.

Datadog recommends using specific metric names or partial metric name matches for more precise collection.

### Missing untyped metrics

By default, the integration skips metrics that come without a type on a Prometheus exposition. If you want to collect untyped metrics, you must explicitly specify their type in the `metrics` mapping, for example:

```yaml
  metrics:
    - "<NAME_OF_METRIC_WITHOUT_TYPE>":
        "type": "gauge"
```

Remember that metric names can be specified as regular expressions, making it possible to specify the type for a set of metrics without listing all of them individually.

### Errors parsing the OpenMetrics payload with Agent 7.46

The version of this integration shipped with version 7.46 of the Agent gives preference by default to the OpenMetrics format when requesting metrics from the metrics endpoint. It does so by setting the `Accept` header to `application/openmetrics-text;version=1.0.0,application/openmetrics-text;version=0.0.1;q=0.75,text/plain;version=0.0.4;q=0.5,*/*;q=0.1`. This was done in combination with dynamically determining which scraper to use based on the `Content-Type` it receives from the server, to reduce the need for manual setup.

Previous versions defaulted to `text/plain`, which normally results in the server returning metrics in the Prometheus exposition format. This means that updating to this version of the integration may result in switching from the Prometheus format to the OpenMetrics format.

Although the behavior should remain the same in most circumstances, some applications return metrics in a format that is not fully OpenMetrics-compliant, despite setting the `Content-Type` to signal the use of the OpenMetrics standard format. This may cause our integration to report errors while parsing the metrics payload.

If you see parsing errors when scraping the OpenMetrics endpoint with this new version, you can force the use of the less strict Prometheus format by manually setting the `Accept` header that the integration sends to `text/plain` using the `headers` option in the [configuration file][12]. For instance: 

```yaml
## All options defined here are available to all instances.
#
init_config:
  ...
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    ...
    headers:
      Accept: text/plain
```

Need help? Contact [Datadog support][11].

## Further Reading

- [Configuring a OpenMetrics Check][13]
- [Writing a custom OpenMetrics Check][14]

[1]: https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes
[3]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.datadoghq.com/getting_started/integrations/prometheus/?tab=docker#configuration
[6]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-core/blob/7.30.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/getting_started/integrations/prometheus/
[11]: https://docs.datadoghq.com/help/
[12]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L537-L546
[13]: https://docs.datadoghq.com/agent/openmetrics/
[14]: https://docs.datadoghq.com/developers/openmetrics/

