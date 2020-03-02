---
title: Prometheus and OpenMetrics metrics collection with Kubernetes
kind: documentation
aliases:
    - /getting_started/prometheus
    - /getting_started/integartions/prometheus
    - /agent/openmetrics
    - /agent/prometheus
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

Collect your exposed Prometheus and OpenMetrics metrics from your application running inside containers or directly on your host by using the Datadog Agent, and the [Datadog-OpenMetrics][1] or [Datadog-Prometheus][2] integrations.

## Overview

Starting with version 6.5.0, the Agent includes [OpenMetrics][3] and [Prometheus][4] checks capable of scraping Prometheus endpoints with a few lines of configuration. Datadog recommends using the OpenMetrics check since it is more efficient and fully supports Prometheus text format. For more advanced usage of the `OpenMetricsCheck` interface, including writing a custom check, see the [Developer Tools][5] section. Use the Prometheus check only when the metrics endpoint does not support a text format.

This page explains the basic usage of these checks, which enable you to scrape custom metrics from Prometheus endpoints.

## Setup

### Installation

[Install the Datadog Agent for your corresponding operating system][6]. OpenMetrics and Prometheus checks are included in the [Datadog Agent][7] package, so you don't need to install anything else on your containers or hosts.

### Configuration

If you are running the Agent as a binary on a host, configure your OpenMetrics or Prometheus check as you would any [other Agent integration](?tab=host). If you are running the Agent as a DaemonSet in Kubernetes, configure your OpenMetrics or Prometheus check using [Autodiscovery](?tab=kubernetes).

Like all [Datadog Agent integrations][8], the Datadog-OpenMetrics integration can be configured using [Autodiscovery][9]. This allows you to send a given container/pod exposed OpenMetrics or Prometheus metrics to Datadog by applying the following `annotations` to it:

```yaml
# (...)
metadata:
    #(...)
    annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: |
            ["openmetrics"]
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: |
            [{}]
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: |
            [
              {
                "prometheus_url": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> ",
                "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
                "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
              }
            ]
spec:
    containers:
        - name: '<CONTAINER_IDENTIFIER>'
```

With the following configuration placeholder values:

- `<PROMETHEUS_PORT>`: Port to connect to in order to access the Prometheus endpoint.
- `<PROMETHEUS_ENDPOINT>`: URL for the metrics served by the container, in Prometheus format.
- `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>`: Set namespace to be prefixed to every metric when viewed in Datadog.
- `<METRIC_TO_FETCH>`: Prometheus metrics key to be fetched from the Prometheus endpoint.
- `<NEW_METRIC_NAME>`: Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<NEW_METRIC_NAME>` in Datadog. If you choose not to use this option, pass a list of strings rather than `key:value` pairs.

## From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][5]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For example, reference the [kube-proxy][10] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/openmetrics
[2]: /integrations/prometheus
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /developers/prometheus
[6]: https://app.datadoghq.com/account/settings#agent
[7]: /tagging
[8]: /getting_started/integrations
[9]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[10]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
