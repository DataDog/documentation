---
title: Autoscaling with Cluster Agent Custom & External Metrics
kind: documentation
aliases:
- /agent/guide/cluster-agent-custom-metrics-server
- /agent/cluster_agent/external_metrics
- /containers/cluster_agent/external_metrics
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/agent/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "/agent/kubernetes/daemonset_setup/"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

## Overview

Horizontal Pod Autoscaling, introduced in [Kubernetes v1.2][1], allows autoscaling off of basic metrics like `CPU`, but it requires a resource called `metrics-server` to run alongside your application. As of Kubernetes v1.6, it is possible to autoscale off of [custom metrics][2].

Custom metrics are user defined and are collected from within the cluster. As of Kubernetes v1.10, support for external metrics was introduced to autoscale off any metric from outside the cluster, such as those collected by Datadog.

You must first register the Cluster Agent as the External Metrics Provider. Next, adapt your HPAs to rely on the Cluster Agent's provided metrics.

As of v1.0.0, the Custom Metrics Server in the Datadog Cluster Agent implements the External Metrics Provider interface for external metrics. This page explains how to set it up and how to autoscale your Kubernetes workload based on your Datadog metrics.

## Setup

### Requirements

1. Kubernetes >v1.10: you must register the External Metrics Provider resource against the API server.
2. Enable the Kubernetes [aggregation layer][3].
3. A valid [Datadog API Key **and** Application Key][4].

### Installation

{{< tabs >}}
{{% tab "Datadog Operator" %}}

To enable the external metrics server with your Cluster Agent managed by the Datadog Operator, first [set up the Datadog Operator][1]. Then, provide a valid Datadog API Key, Application Key, and set the `features.externalMetricsServer.enabled` to `true` in your `DatadogAgent` custom resource:

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

The Operator automatically updates the necessary RBAC configurations and sets the corresponding `Service` and `APIService` for Kubernetes to use.

The keys can alternatively be set by referencing the names of pre-created `Secrets` and the data keys storing your Datadog API and Application Keys.
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_API_KEY>
        appSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_APP_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

[1]: /agent/guide/operator-advanced
{{% /tab %}}
{{% tab "Helm" %}}

To enable the external metrics server with your Cluster Agent in Helm, update your [datadog-values.yaml][1] file with the following configurations. Provide a valid Datadog API Key and Application Key, and set `clusterAgent.metricsProvider.enabled` to `true`. Then redeploy your Datadog Helm chart:

  ```yaml
  datadog:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
    #(...)

  clusterAgent:
    enabled: true
    # Enable the metricsProvider to be able to scale based on metrics in Datadog
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # Set this to true to enable Metrics Provider
      enabled: true
  ```

This automatically updates the necessary RBAC configurations and sets up the corresponding `Service` and `APIService` for Kubernetes to use.

The keys can alternatively be set by referencing the names of pre-created `Secrets` containing the data keys `api-key` and `app-key` with the configurations `datadog.apiKeyExistingSecret` and `datadog.appKeyExistingSecret`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

#### Custom metrics server

To enable the Custom Metrics Server, first follow the instructions to [set up the Datadog Cluster Agent][1] within your cluster. Once you have verified a successful base deployment, edit your `Deployment` manifest for the Datadog Cluster Agent with the following steps:

1. Set `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` environment variable to `true`.
2. Ensure you have **both** your environment variables `DD_APP_KEY` and `DD_API_KEY` set.
3. Ensure you have your `DD_SITE` environment variable set to your Datadog site: {{< region-param key="dd_site" code="true" >}}. It defaults to the `US` site `datadoghq.com`.

#### Register the external metrics provider service

Once the Datadog Cluster Agent is up and running, apply some additional RBAC policies and set up the `Service` to route the corresponding requests.

1. Create a `Service` named `datadog-custom-metrics-server`, exposing the port `8443` with the following `custom-metric-server.yaml` manifest:

    ```yaml
    kind: Service
    apiVersion: v1
    metadata:
      name: datadog-custom-metrics-server
    spec:
      selector:
        app: datadog-cluster-agent
      ports:
      - protocol: TCP
        port: 8443
        targetPort: 8443
    ```
    **Note:** The Cluster Agent by default is expecting these requests over port `8443`. However, if your Cluster Agent `Deployment` has set the environment variable `DD_EXTERNAL_METRICS_PROVIDER_PORT` to some other port value, change the `targetPort` of this `Service` accordingly.

    Apply this `Service` by running `kubectl apply -f custom-metric-server.yaml`
2. Download the [`rbac-hpa.yaml` RBAC rules file][2].
3. Register the Cluster Agent as an external metrics provider by applying this file:
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

[1]: /agent/cluster_agent/setup/?tab=daemonset
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
{{% /tab %}}
{{< /tabs >}}

Once enabled, the Cluster Agent is ready to fetch metrics for the HPA. There are two options:
- [Autoscaling with DatadogMetric Queries](#autoscaling-with-datadogmetric-queries)
- [Autoscaling without DatadogMetric Queries](#autoscaling-without-datadogmetric-queries)

Datadog recommends using the `DatadogMetric` option. While this does require an additional step of deploying the `DatadogMetric` CustomResourceDefinition (CRD), this provides a lot more flexibility in the queries performed. If you do not use `DatadogMetric` queries, your HPAs use the native Kubernetes external metrics format, which the Cluster Agent translates into a Datadog metric query.

If you are dual-shipping your metrics to multiple Datadog organizations, you can configure the Cluster Agent to fetch from these multiple endpoints for high availability. For more information, see the [Dual Shipping][5] documentation.

## Autoscaling with DatadogMetric queries

You can autoscale on a Datadog query by using the `DatadogMetric` [Custom Resource Definition (CRD)][6] and Datadog Cluster Agent versions `1.7.0` or above. This is a more flexible approach and allows you to scale with the exact Datadog query you would use in-app.

### Requirements

For autoscaling to work correctly, custom queries must follow these rules:

- The query **must** be syntactically correct, otherwise it prevents the refresh of **ALL** metrics used for autoscaling (effectively stopping autoscaling).
- The query result **must** output only one series (otherwise, the results are considered invalid).
- The query **should** yield at least two non-null timestamped points (it's possible to use a query that returns a single point, though in this case, autoscaling may use incomplete points).

**Note**: While the query is arbitrary, the start and end times are still set at `Now() - 5 minutes` and `Now()` by default.

### Setup DatadogMetric CRD

The Custom Resource Definition (CRD) for the `DatadogMetric` object can be added to your Kubernetes cluster by using Helm, the Datadog Operator, or Daemonset:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

To activate the usage of the `DatadogMetric` CRD update your `DatadogAgent` custom resource and set `features.externalMetricsServer.useDatadogMetrics` to `true`.

  ```yaml
  kind: DatadogAgent
  apiVersion: datadoghq.com/v2alpha1
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>
    features:
      externalMetricsServer:
        enabled: true
        useDatadogMetrics: true
  ```

The Operator automatically updates the necessary RBAC configurations and directs the Cluster Agent to manage these HPA queries through these `DatadogMetric` resources.

{{% /tab %}}
{{% tab "Helm" %}}

To activate usage of the `DatadogMetric` CRD update your [values.yaml][1] Helm configuration to set `clusterAgent.metricsProvider.useDatadogMetrics` to `true`. Then redeploy your Datadog Helm chart:

  ```yaml
  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
      # clusterAgent.metricsProvider.useDatadogMetrics
      # Enable usage of DatadogMetric CRD to autoscale on arbitrary Datadog queries
      useDatadogMetrics: true
  ```

**Note:** This attempts to install the `DatadogMetric` CRD automatically. If that CRD already exists prior to the initial Helm installation, it may conflict.

This automatically updates the necessary RBAC files and directs the Cluster Agent to manage these HPA queries through these `DatadogMetric` resources.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}
To activate usage of the `DatadogMetric` CRD, follow these extra steps:

1. Install the `DatadogMetric` CRD in your cluster.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Update Datadog Cluster Agent RBAC manifest, it has been updated to allow usage of `DatadogMetric` CRD.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Set the `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` to `true` in the deployment of the Datadog Cluster Agent.
{{% /tab %}}
{{< /tabs >}}

### Create the DatadogMetric object
Once the `DatadogMetric` custom resource has been added to your cluster, you can create `DatadogMetric` objects for your HPAs to reference. While any HPA can reference any `DatadogMetric`, Datadog recommends creating them in the same namespace as your HPA.

**Note**: Multiple HPAs can use the same `DatadogMetric`.

You can create a `DatadogMetric` with the following manifest:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <DATADOG_METRIC_NAME>
spec:
  query: <CUSTOM_QUERY>
```

#### Example DatadogMetric object
For example, a `DatadogMetric` object to autoscale an NGINX deployment based on the `nginx.net.request_per_s` Datadog metric:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

### Use DatadogMetric in HPA
Once your Cluster Agent has been set up and `DatadogMetric` created, update your HPA to reference this `DatadogMetric` relative to its namespace and name. The general format is to specify the metric for the HPA as a `type: External` and specify the metric name like `datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>`.

#### Example HPAs with DatadogMetric
An HPA using the `DatadogMetric` named `nginx-requests`, assuming both objects are in namespace `nginx-demo`.

Using `apiVersion: autoscaling/v2`:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@nginx-demo:nginx-requests
      target:
        type: Value
        value: 9
```

Using `apiVersion: autoscaling/v2beta1`:

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: datadogmetric@nginx-demo:nginx-requests
      targetValue: 9
```

In these manifests:
- The HPA is configured to autoscale the deployment called `nginx`.
- The maximum number of replicas created is `3`, and the minimum is `1`.
- The HPA relies on the `DatadogMetric` `nginx-requests` in the `nginx-demo` namespace.

Once the `DatadogMetric` is linked to an HPA, the Datadog Cluster Agent marks it as active. The Cluster Agent then makes requests to Datadog for the query, stores the results in the `DatadogMetric` object, and provides the values to the HPA.

## Autoscaling without DatadogMetric queries
If you do not want to autoscale with the `DatadogMetric` you can still create your HPAs with the native Kubernetes format. The Cluster Agent converts the HPA format into a Datadog metric query.

Once you have the Datadog Cluster Agent running and the service registered, create an [HPA][7] manifest and specify `type: External` for your metrics. This notifies the HPA to pull the metrics from the Datadog Cluster Agent's service:

```yaml
spec:
  metrics:
    - type: External
      external:
        metricName: "<METRIC_NAME>"
        metricSelector:
          matchLabels:
            <TAG_KEY>: <TAG_VALUE>
```

### Example HPAs without DatadogMetric
An HPA manifest to autoscale off an NGINX deployment based off of the `nginx.net.request_per_s` Datadog metric using `apiVersion: autoscaling/v2`:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metric:
        name: nginx.net.request_per_s
      target:
        type: Value
        value: 9
```

The following is the same HPA manifest as above using `apiVersion: autoscaling/v2beta1`:
```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: nginx.net.request_per_s
      metricSelector:
        matchLabels:
            kube_container_name: nginx
      targetValue: 9
```

In these manifests:

- The HPA is configured to autoscale the deployment called `nginx`.
- The maximum number of replicas created is `3`, and the minimum is `1`.
- The metric used is `nginx.net.request_per_s`, and the scope is `kube_container_name: nginx`. This format corresponds to Datadog's metrics format.

Every 30 seconds, Kubernetes queries the Datadog Cluster Agent to get the value of this metric and autoscales proportionally if necessary. For advanced use cases, it is possible to have several metrics in the same HPA. As noted in [Kubernetes horizontal pod autoscaling][8], the largest of the proposed values is the one chosen.

### Migration

Existing HPAs are automatically migrated using external metrics.

When you set `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` to `true` but you still have HPAs that do **not** reference a `DatadogMetric`, normal syntax (without referencing a `DatadogMetric` through `datadogmetric@...`) is still supported.

The Datadog Cluster Agent automatically creates `DatadogMetric` resources in its own namespace (their name starts with `dcaautogen-`) to accommodate this, allowing a smooth transition to `DatadogMetric`.

If you choose to migrate an HPA later on to reference a `DatadogMetric`, the automatically generated resource is cleaned up by the Datadog Cluster Agent after a few hours.

## Cluster Agent querying
The Cluster Agent performs the queries for the `DatadogMetric` objects every 30 seconds. The Cluster Agent also batches the metric queries performed into groups of 35. Therefore, 35 `DatadogMetric` queries are included in a single request to the Datadog metrics API.

By batching these queries, the Cluster Agent can perform them more efficiently and avoid being rate-limited.

This means that the Cluster Agent performs roughly 120 API requests per hour per 35 `DatadogMetric` objects. As you add more `DatadogMetric` objects or add the autoscaling functionality to additional Kubernetes clusters, this increases the number of calls to fetch metrics within the same org.

The Cluster Agent also queries for the past five minutes of data by default for each of these metric queries. This is to ensure the Cluster Agent is scaling off *recent* data. However, if your metric queries are relying on data from one of the cloud integrations (AWS, Azure, GCP, etc.), these are [fetched at a slight delay][9] and are not covered within the five minute interval. In these cases, provide the environment variables to the Cluster Agent to increase the date range and data age allowed for the metric queries.

```yaml
- name: DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE
  value: "900"
- name: DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE
  value: "900"
```

## Troubleshooting

### DatadogMetric Status
The Datadog Cluster Agent takes care of updating the `status` subresource of all `DatadogMetric` resources to reflect results from queries to Datadog. This is the main source of information to understand what happens if something is failing. You can run the following to get this information outputted for you:

```shell
kubectl describe datadogmetric <RESOURCE NAME>
```

#### Example

The `status` part of a `DatadogMetric`:

```yaml
status:
  conditions:
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Active
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Valid
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Updated
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "False"
    type: Error
  currentValue: "1977.2"
```

The four conditions give you insights on the current state of your `DatadogMetric`:

- `Active`: Datadog considers a `DatadogMetric` active if at least one HPA is referencing it. Inactive `DatadogMetrics` are not updated to minimize API usage.
- `Valid`: Datadog considers a `DatadogMetric` valid when the answer for the associated query is valid. An invalid status probably means that your custom query is not semantically correct. See the `Error` field for details.
- `Updated`: This condition is **always** updated when the Datadog Cluster Agent touches a `DatadogMetric`.
- `Error`: If processing this `DatadogMetric` triggers an error, this condition is true and contains error details.

The `currentValue` is the value gathered from Datadog and returned to the HPAs.

### Value vs AverageValue for the target metric
The HPAs in these example use the target type of `Value` instead of `AverageValue`. Both options are supported. Adjust your Datadog metric queries accordingly.

When using `Value`, the metric value returned by the Datadog metric query is provided exactly as-is to the HPA for its scaling decision. When using `AverageValue`, the metric value returned is divided by the current number of pods. Set your `<Metric Value>` accordingly to how you want your HPA to scale based on your query and returned value.

Using `apiVersion: autoscaling/v2`, the target metric configuration for `Value` looks like:
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: Value
        value: <METRIC_VALUE>
```

Whereas `AverageValue` looks like:
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: AverageValue
        averageValue: <METRIC_VALUE>
```

For `apiVersion: autoscaling/v2beta1` the respective options are `targetValue` and `targetAverageValue`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /account_management/api-app-keys/
[5]: /agent/configuration/dual-shipping/?tab=helm#cluster-agent-metrics-provider
[6]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions
[7]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[9]: /integrations/guide/cloud-metric-delay
