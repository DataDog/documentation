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

Starting with version 6.1.0, the Agent includes a new [Prometheus][1] check capable of scraping Prometheus endpoints with only a few lines of configuration. This page explains the basic usage of the generic `Prometheus` check, the fastest and simplest way to scrape custom metrics from Prometheus endpoints. For more advanced usage of the `PrometheusCheck` interface, including writing a custom check, see the [Developer Tools][2] section.

## Configuration

If running the Agent as a DaemonSet in Kubernetes, configure the Prometheus check using [auto-discovery](#auto-discovery). If running the Agent as a binary on a host, edit the `prometheus.d/conf.yaml` configuration file to add the different instances you want to retrieve custom metrics from.

The minimal configuration of an instance includes:

* A `prometheus_url` that points to the metric route. **Note:** this must be unique.
* A `namespace` that is prepended to all metrics to avoid metric name collisions.
* A list of `metrics` that you want to retrieve as custom metrics. For each metric you can either add it to the list `- metric_name` or rename it by specifying a new metric name `- metric_name: renamed`.

**Note**: It's possible to use a `*` wildcard such as `- metric*` that would fetch all matching metrics. Use with caution; this can potentially generate a lot of custom metrics!

Your metrics are collected in the form `namespace.metric_name`. By default, you get a service check named `namespace.prometheus.health` to indicate the health of the Prometheus endpoint.

For a comprehensive list of settings refer to the [Datadog-Prometheus integration][3] and its [example configuration][4]. For instane in Prometheus it's common to have some placeholder metric holding all the labels because it's possible to do some label joins in the Prometheus query language. The Datadog Agent allows you to [join some labels during processing][5], so the metric is sent with all labels/tags wanted.

## Prometheus with Auto-discovery

As all [Datadog Agent integrations][6], the Datadog-Prometheus Integration can be configured using [Autodiscovery][7]. This allows you to send your container/pod Prometheus metrics to Datadog by apply the following `annotations` to it:

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

See the [Datadog-Prometheus Integration][3] to discover more options for the `ad.datadoghq.com/<CONTAINER_NAME>.instances` annotation or directly the [`sample prometheus.d/conf.yaml` configuration file][8].

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

## From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][2]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For an example, reference the [kube-proxy][9] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[2]: /developers/prometheus
[3]: /integrations/prometheus
[4]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example#L39
[6]: /getting_started/integrations
[7]: /agent/autodiscovery
[8]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
