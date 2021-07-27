---
title: Custom Metrics Server
kind: documentation
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

## Introduction

The Horizontal Pod Autoscaling feature was introduced in [Kubernetes v1.2][1] to allow autoscaling off of basic metrics like `CPU`, but it requires a resource called `metrics-server` to run alongside your application. As of Kubernetes v1.6, it is possible to autoscale off of [custom metrics][2].
Custom metrics are user defined and are collected from within the cluster. As of Kubernetes v1.10, support for external metrics was introduced to autoscale off of any metric from outside the cluster that is collected for you by Datadog.

The custom and external metric providers, as opposed to the metrics server, are resources that have to be implemented and registered by the user.

As of v1.0.0, the Custom Metrics Server in the Datadog Cluster Agent implements the External Metrics Provider interface for external metrics. This documentation page explains how to set it up and how to autoscale your Kubernetes workload based off of your Datadog metrics.

### Requirements

1. Running Kubernetes >v1.10 in order to be able to register the External Metrics Provider resource against the API server.
2. Having the aggregation layer enabled. See the [Kubernetes aggregation layer configuration documentation][3].

## Set up the Cluster Agent external metric server


{{< tabs >}}
{{% tab "Helm" %}}

To enable the external metrics server with your Cluster Agent in Helm, update your [datadog-values.yaml][1] file with the following Cluster Agent configuration. After you set `clusterAgent.metricsProvider.enabled` to `true`, redeploy your Datadog Helm chart:

  ```yaml
  clusterAgent:
    enabled: true
    # Enable the metricsProvider to be able to scale based on metrics in Datadog
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # Set this to true to enable Metrics Provider
      enabled: true
  ```

This automatically updates the necessary RBAC configurations as well as sets up the corresponding `Service` and `APIService` for Kubernetes to use.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Daemonset" %}}

### Custom metrics server

To enable the Custom Metrics Server, first follow the instructions to [set up the Datadog Cluster Agent][1] within your cluster. Once you have verified a successful base deployment, edit your `Deployment` manifest for the Datadog Cluster Agent with the following steps:

1. Set `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` environment variable to `true`
2. Ensure you have **both** your environment variables `DD_APP_KEY` and `DD_API_KEY` set
3. Ensure you have your `DD_SITE` environment variable set to your Datadog site: {{< region-param key="dd_site" code="true" >}}. It defaults to the `US` site `datadoghq.com`.

### Register the external metrics provider service

Once the Datadog Cluster Agent is up and running, apply some additional RBAC policies and set up the `Service` to route the corresponding requests.

1. Create a `Service` named `datadog-custom-metrics-server`, exposing the port `443` with the following `custom-metric-server.yaml` manifest:

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
        port: 443
        targetPort: 443
    ```
    **Note:** The Cluster Agent by default is expecting these requests over port `443`. However, if your Cluster Agent `Deployment` has set the environment variable `DD_EXTERNAL_METRICS_PROVIDER_PORT` to some other port value, change the `targetPort` of this `Service` accordingly.

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

## Run the HPA

Once you have the Datadog Cluster Agent running and the service registered, create an [HPA][4] manifest and specify `type: External` for your metrics in order to notify the HPA to pull the metrics from the Datadog Cluster Agent's service:

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

#### Example HPA
An HPA manifest to autoscale off an NGINX deployment based off of the `nginx.net.request_per_s` Datadog metric:

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
      targetAverageValue: 9
```

Note in this manifest that:

- The HPA is configured to autoscale the deployment called `nginx`.
- The maximum number of replicas created is `3`, and the minimum is `1`.
- The metric used is `nginx.net.request_per_s`, and the scope is `kube_container_name: nginx`. This metric format corresponds to the Datadog one.

Every 30 seconds, Kubernetes queries the Datadog Cluster Agent to get the value of this metric and autoscales proportionally if necessary. For advanced use cases, it is possible to have several metrics in the same HPA. As you can see [in the Kubernetes horizontal pod autoscaling documentation][5], the largest of the proposed values is the one chosen.

**Note**: Running multiple Cluster Agents raises API usage. The Datadog Cluster Agent completes 120 calls per hour for approximately 45 HPA objects in Kubernetes. Running more than 45 HPAs increases the number of calls when fetching metrics from within the same org.

## Autoscaling with custom queries using DatadogMetric CRD

You can autoscale on a Datadog query by using the `DatadogMetric` [Custom Resource Definition (CRD)][6] and Datadog Cluster Agent versions `1.7.0` or above. This is a more flexible approach and allows you to scale with the exact Datadog query you would use in-app.

### Custom query requirements

For autoscaling to work correctly, the query must follow these rules:

- The query **must** be syntactically correct, otherwise it prevents the refresh of **ALL** metrics used for autoscaling (effectively stopping autoscaling).
- The query result **must** output only one series (otherwise, the results are considered invalid).
- The query **should** yield at least two timestamped points (it's possible to use a query that returns a single point, though in this case, autoscaling may use incomplete points).

**Note**: While the query is arbitrary, the start and end times are still set at `Now() - 5 minutes` and `Now()`

### Set up Datadog Cluster Agent to use DatadogMetric
{{< tabs >}}
{{% tab "Helm" %}}

To activate usage of the `DatdogMetric` CRD update your [datadog-values.yaml][1] Helm configuration to set `clusterAgent.metricsProvider.useDatadogMetrics` to `true`. Then redeploy your Datadog Helm chart:

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
{{% tab "Daemonset" %}}
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

### Set up an HPA to use a DatadogMetric object

Once the set up step is done, you can create `DatadogMetric` resources. `DatadogMetric` is a namespaced resource. While any HPA can reference any `DatadogMetric`, Datadog recommends creating them in same namespace as your HPA.

**Note**: Multiple HPAs can use the same `DatadogMetric`.

You can create a `DatadogMetric` with the following manifest:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <your_datadogmetric_name>
spec:
  query: <your_custom_query>
```

#### Example DatadogMetric object
A `DatadogMetric` object to autoscale an NGINX deployment based on the `nginx.net.request_per_s` Datadog metric:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

Once your `DatadogMetric` is created, you need to configure your HPA to use this `DatadogMetric`:

```yaml
spec:
  metrics:
    - type: External
      external:
        metricName: "datadogmetric@<namespace>:<datadogmetric_name>"
```

#### Example HPA with a DatadogMetric
An HPA using the `DatadogMetric` named `nginx-requests`, assuming both objects are in namespace `nginx-demo`:

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
      targetAverageValue: 9
```

Once you've linked your HPA to a `DatadogMetric`, the Datadog Cluster Agent uses your custom query to provide values to your HPA.

### Automatic migration of existing HPAs using external metrics

When you set `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` to `true` but you still have HPAs that do **not** reference a `DatadogMetric`, normal syntax (without referencing a `DatadogMetric` through `datadogmetric@...`) is still supported.

The Datadog Cluster Agent automatically creates `DatadogMetric` resources in its own namespace (their name starts with `dcaautogen-`) to accommodate this, it allows a smooth transition to `DatadogMetric`.

If you choose to migrate an HPA later on to reference a `DatadogMetric`, the automatically generated resource is cleaned up by the Datadog Cluster Agent after few hours.

### Troubleshooting

The Datadog Cluster Agent takes care of updating the `status` subresource of all `DatadogMetric` resources to reflect results from queries to Datadog. This is the main source of information to understand what happens if something is failing. You can run the following to get this information outputted for you:

```shell
kubectl describe datadogmetric <RESOURCE NAME>
```

**Example**: `status` part of a `DatadogMetric`:

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[5]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[6]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions
