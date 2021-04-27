---
title: Cluster Checks Runner
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

While the regular Datadog Agent executes [endpoint checks][1] for your node and application pods, the Cluster Checks Runner is specifically dedicated to running [**cluster checks**][2], which monitor internal Kubernetes services, as well as external services like managed databases and network devices. Using both endpoint checks and cluster checks enables you to monitor both your cluster's services and any external services your application relies on.

**Note**: When using the Cluster Checks Runner, it is not necessary to enable cluster checks for the regular Datadog Agent.

## Set up

First, [deploy the Cluster Agent][3].

Then, deploy the Cluster Checks Runner using either [Datadog Operator][4] or [Helm][5].

{{< tabs >}}
{{% tab "Operator" %}}

Using the Operator, you can launch and manage all of these resources with a single manifest like the one shown in [this example][1].

Deploy these resources into your cluster:

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

You'll see the following output, confirming that the configuration was applied successfully:

```
datadogagent.datadoghq.com/datadog created
```

See the [Datadog Operator repo][2] for more information about the Datadog Operator.


[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-dca-clusterchecksrunner.yaml
[2]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

You can update the relevant sections of the chart, as shown below, to enable cluster checks, the Cluster Agent, and the Cluster Checks Runners at the same time:

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

Use `podAntiAffinity` to avoid having multiple Cluster Checks Runners on the same node.

**Note**: The Datadog Operator and the Helm chart use `podAntiAffinity` to avoid having multiple Cluster Checks Runners on the same node. This is important because the Cluster Agent identifies the Cluster Checks Runners by their node names, using `podAntiAffinity` avoids having name collisions.


[1]: https://docs.datadoghq.com/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
