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
- link: "/agent/autodiscovery/clusterchecks"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "agent/kubernetes/daemonset_setup"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "/agent/cluster_agent/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

## Introduction

The Horizontal Pod Autoscaling feature was introduced in [Kubernetes v1.2][1] to allow autoscaling off of basic metrics like `CPU`, but it requires a resource called `metrics-server` to run alongside your application. As of Kubernetes v1.6, it is possible to autoscale off of [custom metrics][2].
Custom metrics are user defined and are collected from within the cluster. As of Kubernetes v1.10, support for external metrics was introduced to autoscale off of any metric from outside the cluster that is collected for you by Datadog.

The custom and external metric providers, as opposed to the metrics server, are resources that have to be implemented and registered by the user.

As of v1.0.0, the Custom Metrics Server in the Datadog Cluster Agent implements the External Metrics Provider interface for external metrics. This documentation page explains how to set it up and how to autoscale your Kubernetes workload based off of your Datadog metrics.

## Requirements

1. Running Kubernetes >v1.10 in order to be able to register the External Metrics Provider resource against the API server.
2. Having the aggregation layer enabled. Refer to the [Kubernetes aggregation layer configuration documentation][3].

## Set up the Cluster Agent external metric server

### Custom metrics server

To enable the Custom Metrics Server, follow the instructions to [set up the Datadog Cluster Agent][4], but when editing the deployment manifest of the Datadog Cluster Agent in [Step 3 - Create the Cluster Agent and its service][5], follow those extra steps:

1. Set `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` to `true` in the deployment of the Datadog Cluster Agent.
2. Configure the `<DD_APP_KEY>` as well as the `<DD_API_KEY>` in the deployment of the Datadog Cluster Agent with the Datadog [API and application keys for your account][6].
3. Optional: set `DATADOG_HOST` to `https://app.datadoghq.eu` if you are using an EU account.

### Register the External Metrics Provider

Once the Datadog Cluster Agent is up and running:

1. Create the `datadog-custom-metrics-server` service, exposing the port `443` with the following `custom-metric-server.yaml` manifest:

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

    Apply this change by running `kubectl apply -f custom-metric-server.yaml`

3. Download the [`rbac-hpa.yaml` RBAC rules file][7].
2. Register the Cluster Agent as an External Metrics Provider via the service, exposing the port `443` by applying the RBAC rules from above:
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

## Run the HPA

Once you have the Datadog Cluster Agent running and the service registered, create an [HPA][8] manifest and specify `type: External` for your metrics in order to notify the Datadog Cluster Agent to pull the metrics from Datadog:

```yaml
spec:
  metric:
    - type: External
      external:
      metricName: "<METRIC_NAME>"
      metricSelector:
        matchLabels:
          "<TAG_KEY>:<TAG_VALUE>"
```

**Example**: An HPA manifest to autoscale off an NGINX deployment based off of the `nginx.net.request_per_s` Datadog metric:

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
* The HPA is configured to autoscale the deployment called `nginx`.
* The maximum number of replicas created is `5`, and the minimum is `1`.
* The metric used is `nginx.net.request_per_s`, and the scope is `kube_container_name: nginx`. This metric format corresponds to the Datadog one.

Every 30 seconds, Kubernetes queries the Datadog Cluster Agent to get the value of this metric and autoscales proportionally if necessary. For advanced use cases, it is possible to have several metrics in the same HPA. As you can see [in the Kubernetes horizontal pod autoscaling documentation][9], the largest of the proposed values is the one chosen.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /agent/cluster_agent/setup
[5]: /agent/cluster_agent/setup/#step-3-create-the-cluster-agent-and-its-service
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/rbac-hpa.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[9]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
