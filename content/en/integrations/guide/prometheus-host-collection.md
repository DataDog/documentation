---
title: Prometheus and OpenMetrics metrics collection from a host
further_reading:
    - link: 'logs/log_collection'
      tag: 'Documentation'
      text: 'Collect your logs'
    - link: '/infrastructure/process'
      tag: 'Documentation'
      text: 'Collect your processes'
    - link: 'tracing'
      tag: 'Documentation'
      text: 'Collect your traces'
    - link: developers/prometheus
      tag: 'Documentation'
      text: 'Write your own custom Prometheus Check'
---

Collect your exposed Prometheus and OpenMetrics metrics from your application running on your hosts using the Datadog Agent, and the [Datadog-OpenMetrics][1] or [Datadog-Prometheus][2] integrations.

## Overview

Starting with version 6.5.0, the Agent includes [OpenMetrics][3] and [Prometheus][4] checks capable of scraping Prometheus endpoints. Datadog recommends using the OpenMetrics check since it is more efficient and fully supports Prometheus text format. For more advanced usage of the `OpenMetricsCheck` interface, including writing a custom check, see the [Developer Tools][5] section. Use the Prometheus check only when the metrics endpoint does not support a text format.

This page explains the basic usage of these checks, enabling you to import all your Prometheus exposed metrics within Datadog.

## Setup

### Installation

[Install the Datadog Agent for your corresponding operating system][6]. OpenMetrics and Prometheus checks are included in the [Datadog Agent][7] package, so you don't need to install anything else on your containers or hosts.

### Configuration

To collect your exposed metrics:

1. Edit the `openmetrics.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][8]. See the [sample openmetrics.d/conf.yaml][9] for all available configuration options. This is the minimum required configuration needed to enable the integration:

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

     With the following configuration placeholder values:

    | Placeholder             | Description                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | Port to connect to in order to access the Prometheus endpoint.                                                                                                                                                         |
    | `<ENDPOINT>`            | URL for the metrics served by the container, in Prometheus format.                                                                                                                                                     |
    | `<NAMESPACE>`           | Set namespace to be prefixed to every metric when viewed in Datadog.                                                                                                                                                   |
    | `<METRIC_TO_FETCH>`     | Prometheus metrics key to be fetched from the Prometheus endpoint.                                                                                                                                                     |
    | `<DATADOG_METRIC_NAME>` | Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<DATADOG_METRIC_NAME>` in Datadog. <br>If you choose not to use this option, pass a list of strings rather than `key:value` pairs. |

2. [Restart the Agent][10] to start collecting your metrics.

### Parameters available

Find below the full list of parameters that can be used for your `instances`:

| Name                                    | Type                                    | Necessity | Default value | Description                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics_endpoint`                        | string                                  | required  | none          | The URL exposing metrics in the OpenMetrics format.                                                                           |
| `namespace`                             | string                                  | required  | none          | The namespace to be appended before all metrics namespaces. Your metrics are collected in the form `namespace.metric_name`.                                                                                                                                          |
| `metrics`                               | list of strings or `key:value` elements | required  | none          | List of `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` pairs for metrics to be fetched from the Prometheus endpoint.<br> `<NEW_METRIC_NAME>` is optional. It transforms the name in Datadog if set. This list should contain at least one metric.                            |
| `raw_metric_prefix`             | string                                  | optional  | none          | A prefix that is removed from all exposed metric names, if present.                                                                                                                 |
| `health_service_check`                  | boolean                                 | optional  | true          | Send a service check reporting on the health of the Prometheus endpoint. The check is named `<NAMESPACE>.prometheus.health`.                                                                                                                                         |
| `label_to_hostname`                     | string                                  | optional  | none          | Override the hostname with the value of one label.                                                                                                                                                                                                                   |
| `label_joins`                           | object                                  | optional  | none          | The label join allows you to target a metric and retrieve its label using a 1:1 mapping.                                                                                                                                                                               |
| `labels_mapper`                         | list of key:value element               | optional  | none          | The label mapper allows you to rename some labels. Format: `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`.                                                                                                                                                                    |
| `type_overrides`                        | list of key:value element               | optional  | none          | Type override allows you to override a type in the Prometheus payload or type an untyped metric (they're ignored by default).<br> Supported `<METRIC_TYPE>`s are `gauge`, `monotonic_count`, `histogram`, and `summary`.                                             |
| `tags`                                  | list of key:value element               | optional  | none          | List of tags to attach to every metric, event, and service check emitted by this integration.<br> [Learn more about tagging][5].                                                                                                                                     |
| `send_distribution_buckets`             | boolean                                 | optional  | false         | Set `send_distribution_buckets` to `true` to send and convert OpenMetrics histograms to [Distribution metrics][15]. <br>`collect_histogram_buckets` must be set to `true` (default value).<br> **Note**: For OpenMetrics v2, use `collect_counters_with_distributions` instead.                                                                              |
| `send_distribution_counts_as_monotonic` | boolean                                 | optional  | false         | Set `send_distribution_counts_as_monotonic` to `true` to send OpenMetrics histogram/summary counts as monotonic counts.                                                                                                                                              |
| `collect_histogram_buckets`               | boolean                                 | optional  | true          | Set `collect_histogram_buckets` to `true` to send the histograms bucket.                                                                                                                                                                                               |
| `send_monotonic_counter`                | boolean                                 | optional  | true          | o send counts as monotonic counts see the [relevant issue in GitHub][9].                                                                                                                                                                                             |
| `exclude_labels`                        | list of string                          | optional  | none          | List of labels to be excluded.                                                                                                                                                                                                                                       |
| `ssl_cert`                              | string                                  | optional  | none          | If your Prometheus endpoint is secured, here are the settings to configure it:<br> Can either be: only the path to the certificate and thus you should specify the private key, or it can be the path to a file containing both the certificate and the private key. |
| `ssl_private_key`                       | string                                  | optional  | none          | Needed if the certificate does not include the private key.<br> **WARNING**: The private key to your local certificate must be unencrypted.                                                                                                                          |
| `ssl_ca_cert`                           | string                                  | optional  | none          | The path to the trusted CA used for generating custom certificates.                                                                                                                                                                                                  |
| `prometheus_timeout`                    | integer                                 | optional  | 10            | Set a timeout in seconds for the Prometheus/OpenMetrics query.                                                                                                                                                                                                       |
| `max_returned_metrics`                  | integer                                 | optional  | 2000          | The check limits itself to 2000 metrics by default. Increase this limit if needed.                                                                                                                                                                                   |
| `bearer_token_auth`                     | boolean                                 | optional  | false         | Set `bearer_token_auth` to `true` to add a bearer token authentication header. **Note**: If `bearer_token_path` is not set, `/var/run/secrets/kubernetes.io/serviceaccount/token` is used as the default path.                                                       |
| `bearer_token_path`                     | string                                  | optional  | none          | The path to a Kubernetes service account bearer token file (make sure the file exists and is mounted correctly). **Note**: Set `bearer_token_auth` to `true` to enable adding the token to HTTP headers for authentication.                                          |
| `collect_counters_with_distributions`   | boolean                                 | optional  | false         | Whether or not to also collect the observation counter metrics ending in `.sum` and `.count` when sending histogram buckets as Datadog distribution metrics. This implicitly enables the `histogram_buckets_as_distributions` option. |

**Note**: All parameters but `send_distribution_buckets` and `send_distribution_counts_as_monotonic` are supported by both OpenMetrics check and Prometheus check.

## Getting started

### Simple metric collection

To get started with collecting metrics exposed by Prometheus, follow these steps:

1. Follow the [Prometheus Getting Started][11] documentation to start a local version of Prometheus that monitors itself.

2. [Install the Datadog Agent for your platform][6].

3. Edit the `openmetrics.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][8] with the following content:

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Restart the Agent][12].

5. Go into your [Metric summary page][13] to see the collected metrics: `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="Prometheus metric collected">}}

## From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][5]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For example, reference the [kube-proxy][14] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/openmetrics/
[2]: /integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /developers/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /getting_started/tagging/
[8]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/summary
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /metrics/distributions/
