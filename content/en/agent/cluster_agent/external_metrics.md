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

The Horizontal Pod Autoscaling feature was introduced in [Kubernetes v1.2][1] to allow autoscaling off of basic metrics like `CPU`, but requires a resource called metrics-server to run along side your application. As of Kubernetes v1.6, it is possible to autoscale off of [custom metrics][2].
Custom metrics are user defined and are collected from within the cluster. As of Kubernetes v1.10, support for external metrics was introduced to autoscale off of any metric from outside the cluster that is collected for you by Datadog.

The custom and external metric providers, as opposed to the metrics server, are resources that have to be implemented and registered by the user.

As of v1.0.0, the Custom Metrics Server in the Datadog Cluster Agent implements the External Metrics Provider interface for External Metrics. This documentation page explains how to set it up and how to autoscale your Kubernetes workload based off of your Datadog metrics.

## Requirements

1. Running Kubernetes >v1.10 in order to be able to register the External Metrics Provider resource against the API Server.
2. Having the Aggregation layer enabled, refer to the [Kubernetes aggregation layer configuration documentation][3] to learn how to enable it.

## Setup
### Custom Metrics Server

To enable the Custom Metrics Server:

1. Review the manifests in the [Datadog Cluster Agent RBAC folder][4].
2. Enter the `datadog-agent` directory, and run:
    ```
    kubectl apply -f Dockerfiles/manifests/cluster-agent/rbac/rbac-cluster-agent.yaml
    ```
3. Edit the deployment manifest of the Datadog Cluster Agent:
  * Set `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` to `true` in the Deployment of the Datadog Cluster Agent.
  * Configure the `<DD_APP_KEY>` as well as the `<DD_API_KEY>` in the Deployment of the Datadog Cluster Agent with the Datadog [API and application keys for your account][5].
  * Optional - Set `DATADOG_HOST` to `https://app.datadoghq.eu` if you are using an EU account.
  * Finally, spin up the resources:
      ```
      kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"
      kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"
      kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/    clusterrolebinding.yaml"
      ```

### Register the External Metrics Provider


Once the Datadog Cluster Agent is up and running, register it as an External Metrics Provider, via the service exposing the port
`443` by apply the following RBAC rules:

```
kubectl apply -f Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
```

See an example of a [service exposing the port 443][6] and how to [register it as an APIService for External Metrics][7].

### Run the HPA

Once you have the Datadog Cluster Agent running and the service registered, create an [HPA][8] manifest and let the Datadog Cluster Agent pull metrics from Datadog. Find below an example HPA manifest to autoscale off a NGINX Deployment based of the `nginx.net.request_per_s` metric:

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
* The HPA is configured to autoscale the Deployment called `nginx`.
* The maximum number of replicas created is `5` and the minimum is `1`.
* The metric used is `nginx.net.request_per_s` and the scope is `kube_container_name: nginx`. Note that this metric format corresponds to the Datadog one.


Every 30 seconds Kubernetes queries the Datadog Cluster Agent to get the value of this metric and autoscales proportionally if necessary. For advanced use cases, it is possible to have several metrics in the same HPA, as you can see [in the Kubernetes horizontal pod autoscale documentation][9] the largest of the proposed value will be the one chosen.

## Cluster Checks Autodiscovery

Starting with version 1.2.0, the Datadog Cluster Agent can extend the Autodiscovery mechanism for non-containerized cluster resources. To enable this, make the following changes to the Cluster Agent deployment:

1. Set `DD_CLUSTER_CHECKS_ENABLED` to `true`.
2. Pass your cluster name as `DD_CLUSTER_NAME`. It's injected as a `cluster_name` instance tag to all configurations, to help you scope your metrics.
3. The recommended leader election lease duration is 15 seconds. Set it with the `DD_LEADER_LEASE_DURATION` envvar.
4. If the service name is different from the default `datadog-cluster-agent`, ensure the `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` environment variable reflects that.

Two configuration sources are currently supported, [described in the Autodiscovery documentation][10]:

* yaml files can be mounted from a ConfigMap in the `/conf.d` folder, they will be automatically imported by the image's entrypoint.
* Kubernetes Services annotations requires setting both the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables to `kube_services`.

Note that hostnames are not linked to cluster checks metrics, which limits the use of host tags and the `DD_TAGS` environment variable. To add tags to cluster checks metrics, use the `DD_CLUSTER_CHECKS_EXTRA_TAGS` environment variable.

Refer to [the dedicated Cluster Checks Autodiscovery guide][11] for more configuration and troubleshooting details on this feature.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent/rbac
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/cluster-agent-hpa-svc.yaml
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/rbac-hpa.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[9]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[10]: /agent/autodiscovery/clusterchecks/#setting-up-check-configurations
[11]: /agent/autodiscovery/clusterchecks
