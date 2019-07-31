---
title: How do I run the kubernetes_state check as a cluster check?
kind: faq
further_reading:
- link: "agent/kubernetes"
  tag: "Documentation"
  text: "Kubernetes with Datadog"
- link: "agent/autodiscovery"
  tag: "Documentation"
  text: "Using Autodiscovery with Kubernetes and Docker"
- link: "agent/autodiscovery/clusterchecks"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
---

The `kubernetes_state` check, which monitors `kube-state-metrics`, is enabled automatically by [Autodiscovery](/agent/autodiscovery/). In larger Kubernetes clusters, this check may consume too much RAM. In this case, consider running the `kubernetes_state` check as a [cluster check][1].

## Configuration

Refer to the [Running Cluster Checks with Autodiscovery][1] documentation for more information. See options that begin with `clusterchecksDeployment` in the Helm chart [readme][2].

**Note**: Mount an empty file to override `/etc/datadog-agent/conf.d/kubernetes_state.d/auto_conf.yaml` in the Agent DaemonSet. Otherwise, the Autodiscovered check still runs and may still consume a significant amount of RAM.

## Background

If you use Autodiscovery from the DaemonSet, one of your Agents (the one running on the same node as `kube-state-metrics`) runs the check and uses a significant amount of memory, while other Agents in the DaemonSet use far less. To prevent the outlier Agent from getting killed, you could increase the memory limit for all Agents, but this could be a waste. The alternative is to use the DaemonSet for lightweight checks to keep the general memory usage low, and use a small (e.g. 2-3 pods) dedicated deployment for heavy checks, where each pod has a large amont of RAM and only runs cluster checks.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery/clusterchecks
[2]: https://github.com/helm/charts/blob/master/stable/datadog/README.md
