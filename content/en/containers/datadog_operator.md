---
title: Datadog Operator
aliases:
  - /agent/kubernetes/operator_configuration
  - /containers/kubernetes/operator_configuration
further_reading:
  - link: '/getting_started/containers/datadog_operator'
    tag: 'guide'
    text: 'Getting Started with the Datadog Operator'
  - link: 'https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md'
    tag: "Source Code"
    text: 'Datadog Operator: Advanced Installation'
  - link: 'https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md'
    tag: "Source Code"
    text: 'Datadog Operator: Configuration'
---

[Datadog Operator][1] is an open source [Kubernetes Operator][2] that enables you to deploy and configure the Datadog Agent in a Kubernetes environment. 

By using the Operator, you can use a single Custom Resource Definition (CRD) to deploy the node-based Agent, [Cluster Agent][3], and [cluster checks runner][4]. The Operator reports deployment status, health, and errors in the Operator's CRD status. Because the Operator uses higher-level configuration options, it limits the risk of misconfiguration.

Once you have deployed the Agent, the Datadog Operator provides the following:

- Validation for your Agent configurations
- Keeping all Agents up-to-date with your configuration
- Orchestration for creating and updating Agent resources
- Reporting of Agent configuration status in the Operator's CRD status
- Optionally, use of an advanced DaemonSet deployment by using Datadog's [ExtendedDaemonSet][5]

### Why use the Datadog Operator instead of a Helm chart or DaemonSet?

You can also use a Helm chart or a DaemonSet to install the Datadog Agent on Kubernetes. However, using the Datadog Operator offers the following advantages:

- The Operator has built-in defaults based on Datadog best practices.
- Operator configuration is more flexible for future enhancements.
- As a [Kubernetes Operator][2], the Datadog Operator is treated as a first-class resource by the Kubernetes API.
- Unlike the Helm chart, the Operator is included in the Kubernetes reconciliation loop.

Datadog fully supports using a DaemonSet to deploy the Agent, but manual DaemonSet configuration leaves significant room for error. Therefore, using a DaemonSet is not highly recommended.

## Usage

See the [Getting Started with the Datadog Operator][6] guide to learn how to use the Operator to deploy the Datadog Agent. 

For all installation and configuration options, see the detailed [installation][7] and [configuration][8] pages in the [`datadog-operator`][1] repo. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /containers/cluster_agent
[4]: /containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
