---
title: Kubernetes Prometheus and OpenMetrics metrics collection
kind: documentation
aliases:
    - /getting_started/prometheus
    - /getting_started/integrations/prometheus
    - /agent/openmetrics
    - /agent/prometheus
    - /agent/kubernetes/prometheus
further_reading:
- link: "/agent/kubernetes/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/kubernetes/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Automatically collect your applications' metrics and logs"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/kubernetes/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
- link: "/integrations/guide/prometheus-metrics/"
  tag: "Documentation"
  text: Mapping Prometheus Metrics to Datadog Metrics
---

Collect your exposed Prometheus and OpenMetrics metrics from your application running inside Kubernetes by using the Datadog Agent, and the [Datadog-OpenMetrics][1] or [Datadog-Prometheus][2] integrations.

## Overview

Starting with version 6.5.0, the Agent includes [OpenMetrics][3] and [Prometheus][4] checks capable of scraping Prometheus endpoints. Datadog recommends using the OpenMetrics check since it is more efficient and fully supports Prometheus text format. For more advanced usage of the `OpenMetricsCheck` interface, including writing a custom check, see the [Developer Tools][5] section. Use the Prometheus check only when the metrics endpoint does not support a text format.

This page explains the basic usage of these checks, which enable you to scrape custom metrics from Prometheus endpoints.

For an explanation of how Prometheus and OpenMetrics metrics map to Datadog metrics, see the [Mapping Prometheus Metrics to Datadog Metrics][6] guide.

## Setup

### Installation

[Deploy the Datadog Agent in your Kubernetes cluster][7]. OpenMetrics and Prometheus checks are included in the [Datadog Agent][8] package, so you don't need to install anything else on your containers or hosts.

### Configuration

Configure your OpenMetrics or Prometheus check using Autodiscovery, by applying the following `annotations` to your **pod** exposing the OpenMetrics/Prometheus metrics:

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Note:** AD Annotations v2 was introduced in Datadog Agent 7.36 to simplify integration configuration. For previous versions of the Datadog Agent, use AD Annotations v1.

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "openmetrics": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
              "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
              "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
            }
          ]
        }
      }
    
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{% tab "Kubernetes (AD v1)" %}}

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
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{< /tabs >}}

With the following configuration placeholder values:

| Placeholder                              | Description                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_IDENTIFIER>`                 | The identifier used in the `annotations` must match the container `name` exposing the metrics. |
| `<PROMETHEUS_ENDPOINT>`                  | URL path for the metrics served by the container, in Prometheus format.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Set namespace to be prefixed to every metric when viewed in Datadog.                               |
| `<METRIC_TO_FETCH>`                      | Prometheus metrics key to be fetched from the Prometheus endpoint.                                 |
| `<NEW_METRIC_NAME>`                      | Transforms the `<METRIC_TO_FETCH>` metric key to `<NEW_METRIC_NAME>` in Datadog.                   |


The `metrics` configuration is a list of metrics to retrieve as custom metrics. Include each metric to fetch and the desired metric name in Datadog as key value pairs, for example, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. You can alternatively provide a list of metric names strings, interpreted as regular expressions, to bring the desired metrics with their current names. If you want **all** metrics, then use `"*"` rather than `".*"`.

**Note:** Regular expressions can potentially send a lot of custom metrics.

For a full list of available parameters for instances, including `namespace` and `metrics`, see the [sample configuration openmetrics.d/conf.yaml][9].

## Getting started

### Simple metric collection

1. [Launch the Datadog Agent][10].

2. Use the [Prometheus `prometheus.yaml`][11] to launch an example Prometheus Deployment with the Autodiscovery configuration on the pod:
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **Note:** AD Annotations v2 was introduced in Datadog Agent 7.36 to simplify integration configuration. For previous versions of the Datadog Agent, use AD Annotations v1.
   
   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.checks: |
              {
                "openmetrics": {
                  "instances": [
                    {
                      "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                      "namespace": "documentation_example_kubernetes",
                      "metrics": [
                          {"promhttp_metric_handler_requests": "handler.requests"},
                          {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                          "go_memory.*"
                        ]
                    }
                  ]
                }
              }
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```
   {{% /tab %}}
   {{% tab "Kubernetes (AD v1)" %}}

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.check_names: |
              ["openmetrics"]
            ad.datadoghq.com/prometheus-example.init_configs: |
              [{}]
            ad.datadoghq.com/prometheus-example.instances: |
              [
                {
                  "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                  "namespace": "documentation_example_kubernetes",
                  "metrics": [
                    {"promhttp_metric_handler_requests": "handler.requests"},
                    {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                    "go_memory.*"
                  ]
                }
              ]
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```

   {{% /tab %}}
   {{< /tabs >}}

     Command to create the Prometheus Deployment:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. Go into your [Metric summary][12] page to see the metrics collected from this example pod. This configuration will collect the metric `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight`, and all exposed metrics starting with `go_memory`.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Prometheus metric collected kubernetes">}}

## Metric collection with Prometheus annotations

With Prometheus Autodiscovery, the Datadog Agent is able to detect native Prometheus annotations (for example: `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) and schedule OpenMetrics checks automatically to collect Prometheus metrics in Kubernetes.

### Requirements

- Datadog Agent v7.27+ or v6.27+ (for Pod checks)
- Datadog Cluster Agent v1.11+ (for service and endpoint checks)

### Configuration

It's recommended to first check which pods and services have the `prometheus.io/scrape=true` annotation before enabling this feature. This can be done with the following commands:

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Once the Prometheus Scrape feature is enabled the Datadog Agent collects custom metrics from these resources. If you do not want to collect the custom metrics from these resources you can remove this annotation or update the autodiscovery rules as described in the [advanced configuration section](#advanced-configuration).

#### Basic configuration

{{< tabs >}}
{{% tab "Helm" %}}

In your Helm `values.yaml`, add the following:

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
```
{{% /tab %}}
{{% tab "DaemonSet" %}}

In your DaemonSet manifest for the Agent `daemonset.yaml`, add the following environment variables for the Agent container:
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
If the Cluster Agent is enabled, inside its manifest `cluster-agent-deployment.yaml`, add the following environment variables for the Cluster Agent container:
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true" 
```

{{% /tab %}}
{{< /tabs >}}

This instructs the Datadog Agent to detect the pods that have native Prometheus annotations and generate corresponding OpenMetrics checks.

It also instructs the Datadog Cluster Agent (if enabled) to detect the services that have native Prometheus annotations and generate corresponding OpenMetrics checks.

- `prometheus.io/scrape=true`: Required.
- `prometheus.io/path`: Optional, defaults to `/metrics`.
- `prometheus.io/port`: Optional, default is `%%port%%`, a [template variable][13] that is replaced by the container/service port.

This configuration generates a check that collects all metrics exposed using the default configuration of the [OpenMetrics integration][1].

#### Advanced configuration

{{< tabs >}}
{{% tab "Helm" %}}

You can define advanced OpenMetrics check configurations or custom Autodiscovery rules other than native Prometheus annotations with the `additionalConfigs` configuration field in `values.yaml`.

`additionalConfigs` is a list of structures containing OpenMetrics check configurations and Autodiscovery rules.

Only the parameters [on this page][2] are supported for OpenMetrics v2 with Autodiscovery and can be passed in the configurations list.

The Autodiscovery configuration can be based on container names, Kubernetes annotations, or both. When both `kubernetes_container_names` and `kubernetes_annotations` are defined, it uses AND logic (both rules must match).

`kubernetes_container_names` is a list of container names to target, it supports the `*` wildcard.

`kubernetes_annotations` contains two maps of annotations to define the discovery rules: `include` and `exclude`.

**Note:** The default value of `kubernetes_annotations` in the Datadog Agent configuration is the following:

```yaml
kubernetes_annotations:
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
```

**Example:**

In this example we're defining an advanced configuration targeting a container named `my-app` running in a pod with the annotation `app=my-app`. We're customizing the OpenMetrics check configuration as well, by enabling the `send_distribution_buckets` option and defining a custom timeout of 5 seconds.

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      -
        configurations:
        - timeout: 5
          send_distribution_buckets: true
        autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/autodiscovery/common/types/prometheus.go#L92-L100
{{% /tab %}}
{{% tab "DaemonSet" %}}

You can define advanced OpenMetrics check configurations or custom Autodiscovery rules other than native Prometheus annotations with the `DD_PROMETHEUS_SCRAPE_CHECKS` environment variable in the Agent and Cluster Agent manifests.

`DD_PROMETHEUS_SCRAPE_CHECKS` is a list of structures containing OpenMetrics check configurations and Autodiscovery rules.

Only the parameters [on this page][2] are supported for OpenMetrics v2 with Autodiscovery and can be passed in the configurations list.

The Autodiscovery configuration can be based on container names, Kubernetes annotations, or both. When both `kubernetes_container_names` and `kubernetes_annotations` are defined, it uses AND logic (both rules must match).

`kubernetes_container_names` is a list of container names to target, it supports the `*` wildcard.

`kubernetes_annotations` contains two maps of annotations to define the discovery rules: `include` and `exclude`.

**Note:** The default value of `kubernetes_annotations` in the Datadog Agent configuration is the following:

```yaml
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"exclude\":{\"prometheus.io/scrape\":\"false\"},\"include\":{\"prometheus.io/scrape\":\"true\"}}}}]"
```

**Example:**

In this example we're defining an advanced configuration targeting a container named `my-app` running in a pod with the annotation `app=my-app`. We're customizing the OpenMetrics check configuration as well, by enabling the `send_distribution_buckets` option and defining a custom timeout of 5 seconds.

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/autodiscovery/common/types/prometheus.go#L92-L100
{{% /tab %}}
{{< /tabs >}}

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
[6]: /integrations/guide/prometheus-metrics
[7]: /agent/kubernetes/#installation
[8]: /getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings#agent/kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
