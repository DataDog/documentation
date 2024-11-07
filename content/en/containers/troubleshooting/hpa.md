---
title: Troubleshooting Custom Metrics Server and HPA
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "/containers/guide/cluster_agent_autoscaling_metrics"
  tag: "Documentation"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
---

## Cluster Agent status and flare

If you are having issues with the Custom Metrics Server:

* Make sure you have the aggregation layer and the certificates set up.
* Make sure the metrics you want to autoscale on are available. As you create the HPA, the Datadog Cluster Agent parses the manifest and queries Datadog to try to fetch the metric. If there is a typographic issue with your metric name, or if the metric does not exist within your Datadog account, the following error is raised:

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

Run the `agent status` command to see the status of the External Metrics Provider process:

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

Errors with the External Metrics Provider process are displayed with this command. If you want more verbose output, run the flare command: `agent flare`.

The flare command generates a zip file containing the `custom-metrics-provider.log` where you can see output as follows:

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - cluster: eks
    metricName: redis.key
    ts: 1532042322
    valid: false
    value: 0

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - dcos_version: 1.9.4
    metricName: docker.mem.limit
    ts: 1.532042322
    valid: true
    value: 268435456
```

If the metric's flag `Valid` is set to `false`, the metric is not considered in the HPA pipeline.

## Describing the HPA manifest

If you see the following message when describing the HPA manifest:

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

Then it's likely that you don't have the proper RBAC or service connectivity set for the metrics provider. Make sure that `kubectl get apiservices` shows:

```text
% kubectl get apiservices
NAME                                   SERVICE                                     AVAILABLE   AGE
...
v1beta1.external.metrics.k8s.io        default/datadog-cluster-agent-metrics-api   True        57s
```

The external metrics API Service shows up with available `true` if the API Service, Service, and port mapping in the pod all match up. As well as the Cluster Agent having the correct RBAC permissions. Make sure you have created the resources from the [Register the External Metrics Provider][1] step.

If you see the following error when describing the HPA manifest:

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Make sure the Datadog Cluster Agent is running, and the service exposing the port `8443`, whose name is registered in the APIService, is up.

## Differences of value between Datadog and Kubernetes

As Kubernetes autoscales your resources the HPA makes a scaling decision based on the metric value provided by the Cluster Agent. The Cluster Agent will query for and store the exact metric value returned by the Datadog API. If your HPA is using a target with `type: Value` this exact metric value is provided to the HPA. If your HPA is using `type: AverageValue` this metric value is divided by the current number of replicas.

This is why your may see values returned like:

```text
% kubectl get datadogmetric
NAME             ACTIVE   VALID   VALUE   REFERENCES                UPDATE TIME
example-metric   True     True    7       hpa:default/example-hpa   21s

% kubectl get hpa
NAME          REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
example-hpa   Deployment/nginx   3500m/5 (avg)   1         3         2          24
```

As the value of `7` was divided by the replicas `2` to give that `3.5` average. Both types are supported for the HPA, just take the type into account when setting up your query and target value. See the [Cluster Agent guide here for configuration examples][2].

*Disclaimer*: The Datadog Cluster Agent processes the metrics set in different HPA manifests and queries Datadog to get values every 30 seconds, by default. Kubernetes queries the Datadog Cluster Agent every 30 seconds, by default. As this process is done asynchronously, you should not expect to see the above rule verified at all times, especially if the metric varies, but both frequencies are configurable in order to mitigate any issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/guide/cluster_agent_autoscaling_metrics
[2]: /containers/guide/cluster_agent_autoscaling_metrics/?tab=helm#value-vs-averagevalue-for-the-target-metric