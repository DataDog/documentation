---
title: Troubleshooting Custom Metrics Server and HPA
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
---

### Cluster Agent status and flare

If you are having issues with the Custom Metrics Server:

* Make sure you have the aggregation layer and the certificates set up.
* Make sure the metrics you want to autoscale on are available. As you create the HPA, the Datadog Cluster Agent parses the manifest and queries Datadog to try to fetch the metric. If there is a typographic issue with your metric name, or if the metric does not exist within your Datadog application, the following error is raised:

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

Run the `datadog-cluster-agent status` command to see the status of the External Metrics Provider process:

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

Errors with the External Metrics Provider process are displayed with this command. If you want more verbose output, run the flare command: `datadog-cluster-agent flare`.

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

### Describing the HPA manifest

If you see the following message when describing the HPA manifest:

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

Then it's likely that you don't have the proper RBAC set for the HPA. Make sure that `kubectl api-versions` shows:

```text
autoscaling/v2beta1
[...]
external.metrics.k8s.io/v1beta1
```

The latter shows up if the Datadog Cluster Agent properly registers as an External Metrics Provider—and if you have the same service name referenced in the APIService for the External Metrics Provider, as well as the one for the Datadog Cluster Agent on port `8443`. Also make sure you have created the RBAC from the [Register the External Metrics Provider][1] step.

If you see the following error when describing the HPA manifest:

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Make sure the Datadog Cluster Agent is running, and the service exposing the port `8443`, whose name is registered in the APIService, is up.

### Differences of value between Datadog and Kubernetes

As Kubernetes autoscales your resources, the current target is weighted by the number of replicas of the scaled deployment.
The value returned by the Datadog Cluster Agent is fetched from Datadog and should be proportionally equal to the current target times the number of replicas.

Example:

```text
    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - app: puppet
    - env: demo
    metricName: nginx.net.request_per_s
    ts: 1532042322
    valid: true
    value: 2472
```

The Cluster Agent fetched `2472`, but the HPA indicates:

```text
NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   824/9 (avg)   1         3         3          41m
```

And indeed `824 * 3 replicas = 2472`.

*Disclaimer*: The Datadog Cluster Agent processes the metrics set in different HPA manifests and queries Datadog to get values every 30 seconds, by default. Kubernetes queries the Datadog Cluster Agent every 30 seconds, by default. As this process is done asynchronously, you should not expect to see the above rule verified at all times, especially if the metric varies, but both frequencies are configurable in order to mitigate any issues.