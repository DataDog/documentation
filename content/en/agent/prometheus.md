---
title: Configuring a Prometheus Check
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
- link: developers/prometheus
  tag: "Documentation"
  text: "Write your own custom Prometheus Check"
aliases:
  - /agent/openmetrics/
---

## Overview

This page explains the basic usage of the generic `Prometheus` check, the fastest and simplest way to scrape custom metrics from Prometheus endpoints. For more advanced usage of the `PrometheusCheck` interface, including writing a custom check, see the [Developer Tools][1] section.

## Generic Prometheus check

Starting with version 6.1.0, the Agent includes a new [Prometheus][2] check capable of scraping Prometheus endpoints with only a few lines of configuration.

### Configuration

If running the Agent as a DaemonSet in Kubernetes, configure the Prometheus check using [auto-discovery](#auto-discovery). If running the Agent as a binary on a host, edit the `prometheus.d/conf.yaml` configuration file to add the different instances you want to retrieve custom metrics from.

The minimal configuration of an instance includes:

* A `prometheus_url` that points to the metric route. **Note:** this must be unique.
* A `namespace` that is prepended to all metrics to avoid metric name collisions.
* A list of `metrics` that you want to retrieve as custom metrics. For each metric you can either add it to the list `- metric_name` or rename it by specifying a new metric name `- metric_name: renamed`.

**Note**: It's possible to use a `*` wildcard such as `- metric*` that would fetch all matching metrics. Use with caution; this can potentially generate a lot of custom metrics!

Your metrics are collected in the form `namespace.metric_name`. By default, you get a service check named `namespace.prometheus.health` to indicate the health of the Prometheus endpoint.

For a comprehensive list of settings refer to the [example configuration][3].

#### Auto-discovery

Configure the Prometheus check using [Autodiscovery][4] to collect Prometheus metrics exposed by a container or pod by applying on it following `annotations`:

```
annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: |
      ["prometheus"]
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_NAME>.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9990/<PROMETHEUS_METRICS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          " metrics": ["<PROMETHEUS_METRIC_TO_FETCH>: <DATADOG_NEW_METRIC_NAME>"]
         }
      ]
```

With the following placeholder values:

* `<CONTAINER_NAME>`: name of the container in the pod template section
* `<PROMETHEUS_METRICS_ENDPOINT>`: URL for the metrics as served by the container in Prometheus format
* `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>`: set namespace to be prefixed to every metric when viewed in DataDog UI
*  `<PROMETHEUS_METRIC_TO_FETCH>`: Prometheus metrics key to be fetched from the prometheus endpoint.
* `<DATADOG_NEW_METRIC_NAME>`: Optional parameter which if set, transforms in Datadog the `<PROMETHEUS_METRIC_TO_FETCH>` metric key to `<DATADOG_NEW_METRIC_NAME>`.

See the [Datadog-Prometheus Integration][5] to discover more options for the `ad.datadoghq.com/<CONTAINER_NAME>.instances` annotation or directly the [`sample prometheus.d/conf.yaml` configuration file][6].


Example of Autodiscovery using pod annotations on a `linkerd` pod:

```
annotations:
    ad.datadoghq.com/l5d.check_names: |
      ["prometheus"]
    ad.datadoghq.com/l5d.init_configs: |
      [{}]
    ad.datadoghq.com/l5d.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9990/admin/metrics/prometheus", "namespace": "linkerd",
          "metrics": ["jvm:thread:daemon_count"],
          "type_overrides": {
            "jvm:thread:daemon_count": "gauge"
          }
        }
      ]
```

#### Custom join

In Prometheus it's common to have some placeholder metric holding all the labels because it's possible to do some label joins in the Prometheus query language. The Datadog Agent allows you to [join some labels during processing][7], so the metric is sent with all labels/tags wanted. For instance, to add the `node` label on every metric with the `pod` label, use the following configuration lines  inside the `prometheus.d/conf.yaml` configuration file:

```
   label_joins:
     target_metric:
       label_to_match: pod
       labels_to_get:
         - node
```

### From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][1]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For an example, reference the [kube-proxy][8] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/prometheus
[2]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[3]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[4]: /agent/autodiscovery
[5]: /integrations/prometheus
[6]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example#L34
[8]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
