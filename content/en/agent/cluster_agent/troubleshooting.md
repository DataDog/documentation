---
title: Cluster Agent Troubleshooting
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
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Custom Integrations"
- link: "https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting"
  tag: "Github"
  text: "Troubleshooting the Datadog Cluster Agent"
---

To execute the troubleshooting commands for the Cluster Agent, you first need to be inside the pod of the Cluster Agent or the node-based Agent. For this, use:

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_POD_NAME> bash
```

## Datadog Cluster Agent

To see what cluster level metadata is served by the Datadog Cluster Agent, `exec` into the pod and run:

```text
datadog-cluster-agent metamap
```

You should see the following result:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent metamap

===============
Metadata Mapper
===============

Node detected: gke-test-default-pool-068cb9c0-sf1w

  - Namespace: kube-system
      - Pod: kube-dns-788979dc8f-hzbj5
        Services: [kube-dns]
      - Pod: kube-state-metrics-5587867c9f-xllnm
        Services: [kube-state-metrics]
      - Pod: kubernetes-dashboard-598d75cb96-5khmj
        Services: [kubernetes-dashboard]

Node detected: gke-test-default-pool-068cb9c0-wntj

  - Namespace: default
      - Pod: datadog-cluster-agent-8568545574-x9tc9
        Services: [datadog-custom-metrics-server dca]

  - Namespace: kube-system
      - Pod: heapster-v1.5.2-6d59ff54cf-g7q4h
        Services: [heapster]
      - Pod: kube-dns-788979dc8f-q9qkt
        Services: [kube-dns]
      - Pod: l7-default-backend-5d5b9874d5-b2lts
        Services: [default-http-backend]
      - Pod: metrics-server-v0.2.1-7486f5bd67-v827f
        Services: [metrics-server]
```

To verify that the Datadog Cluster Agent is being queried, look for:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# tail -f /var/log/datadog/cluster-agent.log
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
```

If you are not collecting events properly, make sure to have those environment variables set to `true`:

- Leader election: `DD_LEADER_ELECTION`
- Event collection: `DD_COLLECT_KUBERNETES_EVENTS`

As well as the proper verbs listed in the RBAC (notably, `watch events`).

If you have enabled those, check the leader election status and the `kube_apiserver` check with the following command:

```text
datadog-cluster-agent status
```

This should produce the following result:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent status
[...]
  Leader Election
  ===============
    Leader Election Status:  Running
    Leader Name is: datadog-cluster-agent-8568545574-x9tc9
    Last Acquisition of the lease: Mon, 11 Jun 2018 06:38:53 UTC
    Renewed leadership: Mon, 11 Jun 2018 09:41:34 UTC
    Number of leader transitions: 2 transitions
[...]
  Running Checks
  ==============
    kubernetes_apiserver
    --------------------
      Total Runs: 736
      Metrics: 0, Total Metrics: 0
      Events: 0, Total Events: 100
      Service Checks: 3, Total Service Checks: 2193
[...]
```

## Node Agent

You can check the status of the Datadog Cluster Agent while running the status command of the agent:
`datadog-agent status`

If the Datadog Cluster Agent is enabled and correctly configured, you should see:

```text
[...]
 =====================
 Datadog Cluster Agent
 =====================
   - Datadog Cluster Agent endpoint detected: https://XXX.XXX.XXX.XXX:5005
   Successfully Connected to the Datadog Cluster Agent.
   - Running: {Major:1 Minor:0 Pre:xxx Meta:xxx Commit:xxxxx}
```

Make sure the Cluster Agent service was created before the Agents' pods, so that the DNS is available in the environment variables:

```text
root@datadog-agent-9d5bl:/# env | grep DATADOG_CLUSTER_AGENT | sort
DATADOG_CLUSTER_AGENT_SERVICE_PORT=5005
DATADOG_CLUSTER_AGENT_SERVICE_HOST=10.100.202.234
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PORT=5005
DATADOG_CLUSTER_AGENT_PORT=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENTPORT_5005_TCP_PROTO=tcp
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_ADDR=10.100.202.234

root@datadog-agent-9d5bl:/# echo ${DD_CLUSTER_AGENT_AUTH_TOKEN}
DD_CLUSTER_AGENT_AUTH_TOKEN=1234****9
```

Verify that the node-based Agent is using the Datadog Cluster Agent as a tag provider:

```text
root@datadog-agent-9d5bl:/# cat /var/log/datadog/agent.log | grep "metadata-collector"
2018-06-11 06:59:02 UTC | INFO | (tagger.go:151 in tryCollectors) | kube-metadata-collector tag collector successfully started
```

Or look for error logs, such as:

```shell
2018-06-10 08:03:02 UTC | ERROR | Could not initialise the communication with the Datadog Cluster Agent, falling back to local service mapping: [...]
```

## Custom metric server

### Cluster Agent status and flare

If you are having issues with the Custom Metrics Server:

* Make sure you have the aggregation layer and the certificates set up.
* Make sure the metrics you want to autoscale on are available. As you create the HPA, the Datadog Cluster Agent parses the manifest and queries Datadog to try to fetch the metric. If there is a typographic issue with your metric name, or if the metric does not exist within your Datadog application, the following error is raised:

    ```shell
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

Run the `datadog-cluster-agent status` command to see the status of the External Metrics Provider process:

```shell
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

Errors with the External Metrics Provider process are displayed with this command. If you want more verbose output, run the flare command: `datadog-cluster-agent flare`.

The flare command generates a zip file containing the `custom-metrics-provider.log` where you can see output as follows:

```
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

The latter shows up if the Datadog Cluster Agent properly registers as an External Metrics Provider—and if you have the same service name referenced in the APIService for the External Metrics Provider, as well as the one for the Datadog Cluster Agent on port `443`. Also make sure you have created the RBAC from the [Register the External Metrics Provider][1] step.

If you see the following error when describing the HPA manifest:

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Make sure the Datadog Cluster Agent is running, and the service exposing the port `443`, whose name is registered in the APIService, is up.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/cluster_agent/external_metrics/#register-the-external-metrics-provider
