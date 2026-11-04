---
title: Datadog Operator
description: Deploy and manage the Datadog Agent and BYOC workloads on Kubernetes using the Datadog Operator
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

[Datadog Operator][1] is an open source [Kubernetes Operator][2] that deploys and manages Datadog workloads through custom resources. Use `DatadogAgent` for the Agent or `DatadogBYOCCluster` for a BYOC engine deployment and its Observability Pipelines Workers.

## Manage the Datadog Agent

Use a single `DatadogAgent` custom resource to deploy the node-based Agent, [Cluster Agent][3], and [cluster checks runner][4]. The Operator reports deployment status, health, and errors in the custom resource's status. Because the Operator uses higher-level configuration options, it limits the risk of misconfiguration.

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

For Agent deployments, Datadog Operator v1.29.0 and later reaches feature parity with the `datadog` Helm chart on the major cloud providers. The Operator can also be installed and upgraded through native platform catalogs for Agent deployments: Red Hat OperatorHub, the [Amazon EKS add-on][12], and [Google Cloud Marketplace][13]. These platform and feature-parity statements do not describe BYOC support.

Use the `datadog` Helm chart when the Operator does not fit your environment: on platforms the Operator does not support yet (such as Talos or Flatcar), on GKE on Google Distributed Cloud (GDC), or when you need a Helm feature the Operator does not expose. For the platforms and providers the Operator supports, see the [providers documentation][11].

Datadog fully supports using a DaemonSet to deploy the Agent, but manual DaemonSet configuration leaves significant room for error and is not recommended.

## Usage

### BYOC

With Operator v1.33.0 or later, use a [DatadogBYOCCluster][14] to declare the metastore, indexer, searcher, control plane, janitor, optional compactor and read-only metastore, and one or more Observability Pipelines Workers.

The Operator configures the connection from Workers to the indexer, shares Datadog credentials and site settings, derives engine tuning from resources, reconciles managed workloads, and aggregates their availability. Create each Observability Pipeline in Datadog beforehand and provide its ID in `spec.components.pipelines[].pipelineID`; the Operator does not create pipeline definitions.

BYOC support is opt-in and requires both the BYOC and Worker CRDs. The installation guide covers new AWS EKS deployments using the reverse connection to Datadog. BYOC Ingress configuration and OpenShift OperatorHub installation are not supported. See [Install BYOC with the Datadog Operator][15].

### Datadog Agent

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
[14]: /containers/datadog_operator/crd_byoccluster/
[15]: /byoc-logs/install/datadog_operator/
