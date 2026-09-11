---
title: Datadog Operator
description: Deploy and manage the Datadog Agent on Kubernetes using the Datadog Operator
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
  - link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
    tag: "Architecture Center"
    text: "Instrument your app using the Datadog Operator and Admission Controller"
---

[Datadog Operator][1] is an open source [Kubernetes Operator][2] that enables you to deploy and configure the Datadog Agent in a Kubernetes environment.

By using the Operator, you can use a single Custom Resource Definition (CRD) to deploy the node-based Agent, [Cluster Agent][3], and [cluster checks runner][4]. The Operator reports deployment status, health, and errors in the Operator's CRD status. Because the Operator uses higher-level configuration options, it limits the risk of misconfiguration.

Once you have deployed the Agent, the Datadog Operator provides the following:

- Validation for your Agent configurations
- Keeping all Agents up-to-date with your configuration
- Orchestration for creating and updating Agent resources
- Reporting of Agent configuration status in the Operator's CRD status
- Per-node-group Agent configuration from a single resource with [DatadogAgentProfiles][10]
- Automatic detection of the cluster [provider][11], which applies the matching configuration, such as control plane monitoring on Amazon EKS and Red Hat OpenShift
- Remote management with Fleet Automation (private preview)

### Why use the Datadog Operator instead of a Helm chart or DaemonSet?

You can also install the Datadog Agent with the [`datadog` Helm chart][9] or a DaemonSet. Datadog recommends the Operator for new deployments.

Helm and the Operator differ in how they manage the Agent. Helm renders the Agent's Kubernetes objects from a `values.yaml` file at install and upgrade time. The Operator runs a controller that reconciles a single `DatadogAgent` custom resource toward its desired state continuously, not only at install time.

The Operator also offers capabilities the Helm chart does not. For example, [DatadogAgentProfiles][10] applies different configurations to different node groups from one resource, whereas Helm requires a separate chart release per node group with hand-written affinity rules.

In Datadog Operator v1.29.0 and later, the Operator reaches feature parity with the Helm chart on the major cloud providers, so you do not lose functionality by choosing it. It can also be installed and upgraded through native platform catalogs that the Helm chart is not published in: Red Hat OperatorHub, the [Amazon EKS add-on][12], and [Google Cloud Marketplace][13].

Use the `datadog` Helm chart when the Operator does not fit your environment: on platforms the Operator does not support yet (such as Talos or Flatcar), on GKE on Google Distributed Cloud (GDC), or when you need a Helm feature the Operator does not expose. For the platforms and providers the Operator supports, see the [providers documentation][11].

Datadog fully supports using a DaemonSet to deploy the Agent, but manual DaemonSet configuration leaves significant room for error and is not recommended.

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
[9]: /containers/kubernetes/installation?tab=helm
[10]: /containers/datadog_operator/datadog_agent_profiles
[11]: /containers/datadog_operator/providers
[12]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[13]: https://console.cloud.google.com/marketplace/product/datadog-saas/datadog
