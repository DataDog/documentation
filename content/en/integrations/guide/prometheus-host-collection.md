---
title: Prometheus and OpenMetrics metrics collection from a host
kind: documentation
further_reading:
- link: "logs/log_collection"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
- link: developers/prometheus
  tag: "Documentation"
  text: "Write your own custom Prometheus Check"
---

Collect your exposed Prometheus and OpenMetrics metrics from your application running on your hosts using the Datadog Agent, and the [Datadog-OpenMetrics][1] or [Datadog-Prometheus][2] integrations.

## Overview

Starting with version 6.5.0, the Agent includes [OpenMetrics][3] and [Prometheus][4] checks capable of scraping Prometheus endpoints. Datadog recommends using the OpenMetrics check since it is more efficient and fully supports Prometheus text format. For more advanced usage of the `OpenMetricsCheck` interface, including writing a custom check, see the [Developer Tools][5] section. Use the Prometheus check only when the metrics endpoint does not support a text format.

This page explains the basic usage of these checks, enabling you to import all your prometheus exposed metrics within Datadog.

## Setup

### Installation

[Install the Datadog Agent for your corresponding operating system][6]. OpenMetrics and Prometheus checks are included in the [Datadog Agent][7] package, so you don't need to install anything else on your containers or hosts.

### Configuration

To collect your exposed metrics:

1. Edit the `openmetrics.d/conf.yaml`  file in the `conf.d/` folder at the root of your [Agent's configuration directory][8]. See the [sample openmetrics.d/conf.yaml][9] for all available configuration options. This is the minimum required configuration needed to enable the integration::

    ```yaml
    init_config:

    instances:
        - prometheus_url: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

     With the following configuration placeholder values:

    | Placeholder | Description |
    | ---- | ---- |
    | `<PORT>` |  Port to connect to in order to access the Prometheus endpoint. |
    | `<ENDPOINT>` |  URL for the metrics served by the container, in Prometheus format. |
    | `<NAMESPACE>` |  Set namespace to be prefixed to every metric when viewed in Datadog. |
    | `<METRIC_TO_FETCH>` |  Prometheus metrics key to be fetched from the Prometheus endpoint. |
    | `<DATADOG_METRIC_NAME>` |  Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<DATADOG_METRIC_NAME>` in Datadog. <br>If you choose not to use this option, pass a list of strings rather than `key:value` pairs. |

2. [Restart the Agent][10] to start collecting your metrics.

## Getting started

### Simple metric collection

Here is a simple getting started to collect metrics exposed by your Prometheus:

1. Follow the [Prometheus Getting Started][11] documentation to start a local version of prometheus that monitors itself.

2. [Install the Datadog Agent for your platform][6].

3. Edit the `openmetrics.d/conf.yaml`  file in the `conf.d/` folder at the root of your [Agent's configuration directory][8] with the following content:

    ```yaml
    init_config:

    instances:

      - prometheus_url: http://localhost:9090/metrics
        namespace: "documentation_example"
        metrics:
          - promhttp_metric_handler_requests_total : prometheus.handler.requests.total
    ```

4. [Restart the Agent][12]

5. Go into your Metric summary page to see the collected metrics: `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="Prometheus metric collected">}}

## From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][5]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For example, reference the [kube-proxy][13] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/openmetrics
[2]: /integrations/prometheus
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /developers/prometheus
[6]: https://app.datadoghq.com/account/settings#agent
[7]: /tagging
[8]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
