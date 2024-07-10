---
title: Troubleshooting Cluster and Endpoint Checks
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "/containers/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "/containers/cluster_agent/endpointschecks/"
  tag: "Documentation"
  text: "Running Endpoint Checks with Autodiscovery"  
---

## Cluster checks

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

## Endpoint checks

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