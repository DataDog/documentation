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

Edit the `prometheus.yaml` file to add the different instances you want to retrieve custom metrics from.

The minimal configuration of an instance includes:

* A `prometheus_url` that points to the metric route. **Note:** this must be unique.
* A `namespace` that is prepended to all metrics to avoid metric name collisions.
* A list of `metrics` that you want to retrieve as custom metrics. For each metric you can either add it to the list `- metric_name` or rename it by specifying a new metric name `- metric_name: renamed`.

Note: It's possible to use a `*` wildcard such as `- metric*` that would fetch all matching metrics. Use with caution; this can potentially generate a lot of custom metrics!

Your metrics are collected in the form `namespace.metric_name`. By default, you get a service check named `namespace.prometheus.health` to indicate the health of the Prometheus endpoint.

### Advanced settings

For a comprehensive list of settings refer to the [example configuration][3].

#### Auto-discovery

You can configure the Prometheus check using [Autodiscovery][4] to quickly collect Prometheus metrics exposed by a container or pod.

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

In Prometheus it's common to have some placeholder metric holding all the labels because it's possible to do some label joins in the Prometheus query language. The Datadog Agent allows you to [join some labels during processing][5], so the metric is sent with all labels/tags wanted.
For instance, to add the `node` label on every metric with the `pod` label, use the following configuration lines:

```
   label_joins:
     target_metric:
       label_to_match: pod
       labels_to_get:
         - node
```

### From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][1]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For an example, reference the [kube-proxy][6] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/prometheus
[2]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[3]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[4]: /agent/autodiscovery
[5]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example#L34
[6]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
