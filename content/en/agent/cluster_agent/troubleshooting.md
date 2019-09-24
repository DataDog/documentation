---
title: Datadog Cluster Agent Troubleshooting
kind: documentation
disable_toc: true
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
- link: "agent/kubernetes/integrations"
  tag: "Documentation"
  text: "Custom Integrations"
- link: "https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting"
  tag: "Github"
  text: "Troubleshooting the Datadog Cluster Agent"
---

To execute the troubleshooting commands for the Cluster Agent, you first need to be inside the pod of the Cluster Agent or the Node Agent. For this, use:

```
kubectl exec -it <DATADOG_CLUSTER_AGENT_POD_NAME> bash
```

## Datadog Cluster Agent

To see what cluster level metadata is served by the Datadog Cluster Agent exec in the pod and run:

```
datadog-cluster-agent metamap
```

You should see the following result:

```
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

```
root@datadog-cluster-agent-8568545574-x9tc9:/# tail -f /var/log/datadog/cluster-agent.log
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
```

If you are not collecting events properly, make sure to have those environment variables set to true:

- The leader election `DD_LEADER_ELECTION`
- The event collection `DD_COLLECT_KUBERNETES_EVENTS`

As well as the proper verbs listed in the RBAC (notably, `watch events`).

If you have enabled those, check the Leader Election status and the kube_apiserver check with the following command:

```
datadog-cluster-agent status
```

This should produce the following result:


```

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
`agent status`

If the Datadog Cluster Agent is enabled and correctly configured, you should see:

```
[...]
 =====================
 Datadog Cluster Agent
 =====================
   - Datadog Cluster Agent endpoint detected: https://XXX.XXX.XXX.XXX:5005
   Successfully Connected to the Datadog Cluster Agent.
   - Running: {Major:1 Minor:0 Pre:xxx Meta:xxx Commit:xxxxx}
```

Make sure the Cluster Agent service was created before the agents' pods, so that the DNS is available in the environment variables:

```
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

Verify that the Node Agent is using the Datadog Cluster Agent as a tag provider:

```
root@datadog-agent-9d5bl:/# cat /var/log/datadog/agent.log | grep "metadata-collector"
2018-06-11 06:59:02 UTC | INFO | (tagger.go:151 in tryCollectors) | kube-metadata-collector tag collector successfully started
```

Or look for error logs, such as:

```
2018-06-10 08:03:02 UTC | ERROR | Could not initialise the communication with the Datadog Cluster Agent, falling back to local service mapping: [...]
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
