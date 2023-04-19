---
title: Cluster Check Runners
kind: documentation
aliases:
- /agent/cluster_agent/clusterchecksrunner
- /containers/cluster_agent/clusterchecksrunner
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/containers/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Cluster Checks"
---

While the regular Datadog Agent executes [endpoint checks][1] for your node and application Pods, a _cluster check runner_ is specifically dedicated to running [_cluster checks_][2], which monitor internal Kubernetes services, as well as external services like managed databases and network devices.

**Note**: When using a cluster check runner, it is not necessary to enable cluster checks for the regular Datadog Agent.

## Set up

First, [deploy the Cluster Agent][3].

Then, deploy the cluster check runner using either [Datadog Operator][4] or [Helm][5]:

{{< tabs >}}
{{% tab "Operator" %}}

Using the Operator, you can launch and manage all of these resources with a single manifest. For example:

```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
  features:
    clusterChecks:
      enabled: true
      useClusterChecksRunners: true
  override:
    clusterAgent:
      replicas: 2
```

Deploy these resources into your cluster:

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

If you see the following output, it confirms the configuration was applied successfully:

```
datadogagent.datadoghq.com/datadog created
```

See the [Datadog Operator repo][1] for more information about the Datadog Operator.


[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

You can update the relevant sections of the chart to enable cluster checks, the Cluster Agent, and the cluster check runner at the same time. For example:

```
[...]
  clusterChecks:
    enabled: true
[...]
 clusterAgent:
  enabled: true
[...]
 clusterChecksRunner:
  enabled: true
  replicas: 2
```


{{% /tab %}}
{{< /tabs >}}

**Note**: Both the Datadog Operator and the Helm chart use `podAntiAffinity` to avoid having multiple cluster check runners on the same node. This is important because the Cluster Agent identifies the cluster check runners by their node names. Using `podAntiAffinity` avoids having name collisions.


[1]: https://docs.datadoghq.com/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
