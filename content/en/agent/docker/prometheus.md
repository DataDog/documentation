---
title: Docker Prometheus and OpenMetrics metrics collection
kind: documentation
further_reading:
- link: "/agent/docker/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/docker/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/docker/integrations/"
  tag: "Documentation"
  text: "Collect automatically your applications metrics and logs"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/docker/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
---

Collect your exposed Prometheus and OpenMetrics metrics from your application running inside your containers by using the Datadog Agent, and the [Datadog-OpenMetrics][1] or [Datadog-Prometheus][2] integrations.

## Overview

Starting with version 6.5.0, the Agent includes [OpenMetrics][3] and [Prometheus][4] checks capable of scraping Prometheus endpoints. Datadog recommends using the OpenMetrics check since it is more efficient and fully supports Prometheus text format. For more advanced usage of the `OpenMetricsCheck` interface, including writing a custom check, see the [Developer Tools][5] section. Use the Prometheus check only when the metrics endpoint does not support a text format.

This page explains the basic usage of these checks, enabling you to import all your Prometheus exposed metrics within Datadog.

## Setup

### Installation

Launch the Docker Agent next to your other containers by replacing `<DATADOG_API_KEY>` with the API key for your organization in the command below:

{{< tabs >}}
{{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<DATADOG_API_KEY>" \
              -e DD_SITE="<YOUR_DATADOG_SITE>" \
              datadog/agent
```

{{% /tab %}}
{{% tab "Amazon Linux version <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
                              -v /proc/:/host/proc/:ro \
                              -v /cgroup/:/host/sys/fs/cgroup:ro \
                              -e DD_API_KEY="<DATADOG_API_KEY>" \
                              -e DD_SITE="<YOUR_DATADOG_SITE>" \
                              datadog/agent

```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
              -e DD_SITE="<YOUR_DATADOG_SITE>" \
              datadog/agent
```

{{% /tab %}}
{{< /tabs >}}

**Note**: Your Datadog site is {{< region-param key="dd_site" code="true" >}}.

### Configuration

The Agent detects if it's running on Docker and automatically searches all container labels for Datadog-OpenMetrics labels. Autodiscovery expects labels to look like these examples, depending on the file type:

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='["{\"prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{% tab "docker-compose.yaml" %}}

```yaml
labels:
    com.datadoghq.ad.check_names: '["openmetrics"]'
    com.datadoghq.ad.init_configs: '[{}]'
    com.datadoghq.ad.instances: |
    [
      {
        "prometheus_url": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {
            "<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"
          }
        ]
      }
    ]
```

{{% /tab %}}
{{% tab "Docker run command" %}}

```shell
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='["{\"prometheus_url\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

With the following configuration placeholder values:

| Placeholder                              | Description                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<PROMETHEUS_PORT>`                      | Port to connect to in order to access the Prometheus endpoint.                                                                                                                                                 |
| `<PROMETHEUS_ENDPOINT>`                  | URL for the metrics served by the container, in Prometheus format.                                                                                                                                             |
| `<NAMESPACE>` | Set namespace to be prefixed to every metric when viewed in Datadog.                                                                                                                                           |
| `<METRIC_TO_FETCH>`                      | Prometheus metrics key to be fetched from the Prometheus endpoint.                                                                                                                                             |
| `<NEW_METRIC_NAME>`                      | Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<NEW_METRIC_NAME>` in Datadog. If you choose not to use this option, pass a list of strings rather than `key:value` pairs. |

**Note**: See the [sample openmetrics.d/conf.yaml][6] for all available configuration options.

## Getting started

### Simple metric collection

To get started with collecting metrics exposed by Prometheus running within a container, follow these steps:

1. Launch the Datadog Agent:
    {{< tabs >}}
    {{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<DATADOG_API_KEY>" \
              datadog/agent
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
              datadog/agent \
              -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. To launch Prometheus in a container, run: `docker run -p 9090:9090 prom/prometheus`. In order to notify the Agent to query this container with the OpenMetrics check, add the following configuration:

    ```shell
    -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[  {"prometheus_url":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[ {"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]}]'
    ```

     To launch the Prometheus container with the right annotations for Autodiscovery to work, run:

    ```shell
    docker run -p 9090:9090 -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com. datadoghq.ad.instances='[{"prometheus_url":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker",  "metrics":[{"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]}]' prom/prometheus
    ```

3. Go into your [Metric summary][7] page to see the collected metrics: `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_docker/prometheus_collected_metric_docker.png" alt="Prometheus metric collected docker">}}

## From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, don't hesitate to [contribute][5]!

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For example, reference the [kube-proxy][8] integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/openmetrics/
[2]: /integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /developers/prometheus/
[6]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[7]: https://app.datadoghq.com/metric/summary
[8]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
