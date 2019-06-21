---
title: Prometheus metrics collection
kind: documentation
aliases:
- /getting_started/prometheus
further_reading:
- link: "logs/log_collection"
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
  - /agent/openmetrics
  - /agent/prometheus
---

Collect your exposed Prometheus metrics from your application [running inside containers](#container-auto-discovery) or directly [on your host](#host-agent) using the Datadog Agent and the [Datadog-Prometheus][1] integration.

## Overview

Starting with version 6.1.0, the Agent includes a [Prometheus][2] check capable of scraping Prometheus endpoints with a few lines of configuration. This page explains the basic usage of the generic `Prometheus` check, which enables you to scrape custom metrics from Prometheus endpoints. For more advanced usage of the `PrometheusCheck` interface, including writing a custom check, see the [Developer Tools][3] section.

## Setup
### Installation

[Install the Datadog Agent for your corresponding operating system][4]. The Prometheus/OpenMetrics check is included in the [Datadog Agent][4] package, so you don't need to install anything else on your containers or hosts.

### Configuration

If running the Agent as a binary on a host, configure your Prometheus/OpenMetrics check as any [other Agent integration](?tab=host). If running the Agent as a DaemonSet in Kubernetes, configure your Prometheus/OpenMetrics check using [Autodiscovery](?tab=kubernetes).

{{< tabs >}}
{{% tab "Host" %}}

First, edit the `prometheus.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to configure your Datadog-Prometheus integration. Then [restart the Agent][2] to start collecting your metrics. Find below the minimum required configuration needed to enable the integration and see the [sample prometheus.d/conf.yaml][3] for all available configuration options.

```yaml
init_config:

instances:
  - prometheus_url: 'localhost:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>'
    namespace: '<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>'
    metrics:
      - '<PROMETHEUS_METRIC_TO_FETCH>: <DATADOG_NEW_METRIC_NAME>'
```

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[2]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
{{% /tab %}}
{{% tab "Docker" %}}

The Agent detects if it's running on Docker and automatically searches all containers labels for Datadog-Prometheus labels. Autodiscovery expects labels to look like these examples, depending on the file type:

**Dockerfile**
```
LABEL "com.datadoghq.ad.check_names"='["prometheus"]'
LABEL "com.datadoghq.ad.init_configs"='["{}"]'
LABEL "com.datadoghq.ad.instances"='["{\"prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>\",\"metrics\":[\"<PROMETHEUS_METRIC_TO_FETCH>: <DATADOG_NEW_METRIC_NAME>\"]}"]'
```

**docker-compose.yaml**
```yaml
labels:
  com.datadoghq.ad.check_names: '["prometheus"]'
  com.datadoghq.ad.init_configs: '["{}"]'
  com.datadoghq.ad.instances: '["{\"prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>\",\"metrics\":[\"<PROMETHEUS_METRIC_TO_FETCH>: <DATADOG_NEW_METRIC_NAME>\"]}"]'
```

**docker run command**
```
-l com.datadoghq.ad.check_names='["prometheus"]' -l com.datadoghq.ad.init_configs='["{}"]' -l com.datadoghq.ad.instances='["{\"prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>\",\"metrics\":[\"<PROMETHEUS_METRIC_TO_FETCH>: <DATADOG_NEW_METRIC_NAME>\"]}"]'
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Like all [Datadog Agent integrations][1], the Datadog-Prometheus integration can be configured using [Autodiscovery][2]. This allows you to send a given container/pod exposed Prometheus metrics to Datadog by applying the following `annotations` to it:

```
# (...)
metadata:
#(...)
  annotations:
      ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: |
        ["prometheus"]
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

[1]: /getting_started/integrations
[2]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
{{% /tab %}}
{{< /tabs >}}

With the following configuration placeholder values:

* `<PROMETHEUS_PORT>`: Port to connect to in order to access the Prometheus endpoint.
* `<PROMETHEUS_ENDPOINT>`: URL for the metrics served by the container, in Prometheus format.
* `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>`: Set namespace to be prefixed to every metric when viewed in Datadog.
*  `<METRIC_TO_FETCH>`: Prometheus metrics key to be fetched from the Prometheus endpoint.
* `<NEW_METRIC_NAME>`: Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<NEW_METRIC_NAME>` in Datadog.

Find below the full list of parameters that can be used for your `instances`:

|Name | Type | Necessity | Default value | Description |
|---| --- | --- | ------ |---|
|`prometheus_url`|string|required|none| The URL where your application metrics are exposed by Prometheus.|
|`namespace`|string|required|none| The namespace to be appended before all metrics namespaces. Your metrics are collected in the form `namespace.metric_name`.|
|`metrics`|list of key:value elements|required|none| List of `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` pairs for metrics to be fetched from the Prometheus endpoint.<br> `<NEW_METRIC_NAME>` is optional. It transforms the name in Datadog if set.<br> This list should contain at least one metric.|
|`prometheus_metrics_prefix`|string|optional|none| Prefix for exposed Prometheus metrics.|
|`health_service_check`|boolean|optional|true| Send a service check reporting on the health of the Prometheus endpoint.<br> The check is named `<NAMESPACE>.prometheus.health`.|
|`label_to_hostname`|string|optional|none| Override the hostname with the value of one label.|
|`label_joins`|object|optional|none| The label join allows you to target a metric and retrieve its label via a 1:1 mapping.|
|`labels_mapper`|list of key:value element|optional|none| The label mapper allows you to rename some labels.<br> Format: `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`.|
|`type_overrides`|list of key:value element|optional|none| Type override allows you to override a type in the Prometheus payload<br> or type an untyped metric (they're ignored by default).<br> Supported `<METRIC_TYPE>`s are `gauge`, `counter`, `histogram`, and `summary`.|
|`tags`|list of key:value element|optional|none| List of tags to attach to every metric, event, and service check emitted by this integration.<br><br> [Learn more about tagging][5].|
|`send_histogram_buckets`|boolean|optional|true| Set `send_histograms_buckets` to `true` to send the histograms bucket.|
|`send_monotonic_counter`|boolean|optional|true| To send counters as monotonic counter<br><br> see [the relevant issue][6] in GitHub. |
|`exclude_labels`|list of string|optional|none| List of labels to be excluded.|
|`ssl_cert`|string|optional|none| If your Prometheus endpoint is secured, here are the settings to configure it:<br> Can either be: only the path to the certificate and thus you should specify the private key<br>, or it can be the path to a file containing both the certificate and the private key.|
|`ssl_private_key`|string|optional|none| Needed if the certificate does not include the private key.<br> **WARNING**: The private key to your local certificate must be unencrypted.|
|`ssl_ca_cert`|string|optional|none| The path to the trusted CA used for generating custom certificates. Set this to false to disable SSL certificate<br> verification.|
|`prometheus_timeout`|integer|optional|10| Set a timeout in seconds for the Prometheus query.|
|`max_returned_metrics`|integer|optional|2000| The check limits itself to 2000 metrics by default. Increase this limit if needed.|

## From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][7]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For example, reference the [kube-proxy][8] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/prometheus
[2]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[3]: /developers/prometheus
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/tagging
[6]: https://github.com/DataDog/integrations-core/issues/1303
[7]: /developers/prometheus
[8]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
