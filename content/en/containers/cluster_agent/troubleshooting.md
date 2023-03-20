---
title: Cluster Agent Troubleshooting
kind: documentation
aliases:
- /agent/cluster_agent/troubleshooting
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

This document contains troubleshooting information for the following components:

- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Node Agent](#node-agent)
- [Custom Metrics Server](#custom-metrics-server)
  - [Cluster Agent status and flare](#cluster-agent-status-and-flare)
  - [Describing the HPA manifest](#describing-the-hpa-manifest)
  - [Differences of value between Datadog and Kubernetes](#differences-of-value-between-datadog-and-kubernetes)
- [Cluster Checks](#cluster-checks)
  - [Kubernetes: find the leader Cluster Agent](#kubernetes-find-the-leader-cluster-agent)
  - [Autodiscovery in the Cluster Agent](#autodiscovery-in-the-cluster-agent)
  - [Dispatching logic in the Cluster Agent](#dispatching-logic-in-the-cluster-agent)
  - [Autodiscovery in the node-based Agent](#autodiscovery-in-the-node-based-agent)
  - [Agent status](#agent-status)
- [Endpoint Checks](#endpoint-checks)
  - [Autodiscovery in the Node Agent](#autodiscovery-in-the-node-agent)
  - [Agent status](#agent-status-1)
  - [Autodiscovery in the Cluster Agent](#autodiscovery-in-the-cluster-agent-1)
- [Further Reading](#further-reading)

## Datadog Cluster Agent

To execute the troubleshooting commands for the Cluster Agent, you first need to be inside the Pod of the Cluster Agent or the node-based Agent. For this, use:

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_POD_NAME> bash
```

To see what cluster level metadata is served by the Datadog Cluster Agent, run:

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

If you are not collecting events properly, ensure that `DD_LEADER_ELECTION` and `DD_COLLECT_KUBERNETES_EVENTS` are set to `true`, as well as the proper verbs listed in the RBAC (notably, `watch events`).

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

You can check the status of the Datadog Cluster Agent by running the Agent status command:
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

Make sure the Cluster Agent service was created before the Agents' Pods, so that the DNS is available in the environment variables:

```text
root@datadog-agent-9d5bl:/# env | grep DATADOG_CLUSTER_AGENT | sort
DATADOG_CLUSTER_AGENT_PORT=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_ADDR=10.100.202.234
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PORT=5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PROTO=tcp
DATADOG_CLUSTER_AGENT_SERVICE_HOST=10.100.202.234
DATADOG_CLUSTER_AGENT_SERVICE_PORT=5005
DATADOG_CLUSTER_AGENT_SERVICE_PORT_AGENTPORT=5005

root@datadog-agent-9d5bl:/# echo ${DD_CLUSTER_AGENT_AUTH_TOKEN}
DD_CLUSTER_AGENT_AUTH_TOKEN=1234****9
```

Verify that the node-based Agent is using the Datadog Cluster Agent as a tag provider:

```text
root@datadog-agent-9d5bl:/# cat /var/log/datadog/agent.log | grep "metadata-collector"
2018-06-11 06:59:02 UTC | INFO | (tagger.go:151 in tryCollectors) | kube-metadata-collector tag collector successfully started
```

Or look for error logs, such as:

```text
2018-06-10 08:03:02 UTC | ERROR | Could not initialize the communication with the Datadog Cluster Agent, falling back to local service mapping: [...]
```

## Custom Metrics Server

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

## Cluster Checks

### Kubernetes: find the leader Cluster Agent

When leader election is enabled, only the leader serves cluster check configurations to the node-based Agents. If only one replica of the Cluster Agent Pod is running, it is the leader. Otherwise, you can identify the name of the leader in the `datadog-leader-election` ConfigMap:

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ... }'
```

In this case, the leader Pod is `cluster-agent-rhttz`. If the Pod is deleted or unresponsive, another Pod takes over automatically.

### Autodiscovery in the Cluster Agent

To ensure a configuration (static or Autodiscovered) is picked up by the Cluster Agent, use the `configcheck` command in the leader Cluster Agent:

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Dispatching logic in the Cluster Agent

The `clusterchecks` command allows you to inspect the state of the dispatching logic, including:

- Which node-based Agents are actively reporting to the Cluster Agent.
- Which checks are dispatched on each node.

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**Note:** the Instance ID is different from the `configcheck` command, as the instance is modified to add tags and options.

In this case, this configuration is dispatched to the `default-pool-bce5cd34-ttw6` node. Troubleshooting continues with respect to the Agent Pod on that corresponding node.

### Autodiscovery in the node-based Agent

The Agent `configcheck` command should show the instance, with the `cluster-checks` source:

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

The Instance ID matches the one you had earlier.

### Agent status

The Agent `status` command should show the check instance running and reporting successfully.

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## Endpoint Checks

Troubleshooting endpoint checks is similar to [troubleshooting cluster checks](#cluster-checks). Differences occur on Node Agents, where scheduled endpoint checks appear alongside cluster checks.

**Note**: Endpoint checks are scheduled by Agents that run on the same node as the Pod(s) that back the endpoint(s) of the service. If an endpoint is not backed by a Pod, the Cluster Agent converts the check into a cluster check. This cluster check can be run by any Node Agent.

### Autodiscovery in the Node Agent

The Agent `configcheck` command shows the instance, with the `endpoints-checks` source:

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:956741d8796d940c
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- pod_phase:running
- kube_deployment:nginx
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
```

### Agent status

The Agent `status` command should show the check instance running and reporting successfully.

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    nginx (4.0.0)
    -------------
      Instance ID: nginx:956741d8796d940c [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Autodiscovery in the Cluster Agent

The Cluster Agent `clusterchecks` command shows the instance(s), with the `kubernetes-endpoints` source:

```shell
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
...
===== 3 Pod-backed Endpoints-Checks scheduled =====

=== nginx check ===
Configuration provider: kubernetes-endpoints
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:f139adc46c81828e
name: My Nginx Endpoints
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
...
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/cluster_agent/external_metrics/#register-the-external-metrics-provider
