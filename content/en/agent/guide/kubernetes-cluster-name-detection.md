---
title: Kubernetes cluster name auto detection
kind: documentation
aliases:
  - /agent/faq/kubernetes-cluster-name-detection
further_reading:
- link: "/agent/autodiscovery/"
  tag: "documentation"
  text: Docker Agent Autodiscovery
- link: "/agent/kubernetes/host_setup/"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "/agent/kubernetes/integrations/"
  tag: "documentation"
  text: "Custom Integrations"
---

For Agent v6.11+, the Datadog Agent can auto-detect the Kubernetes cluster name on Google GKE, Azure AKS, and AWS EKS. If detected, the cluster name is added as a suffix on the node name to all data collected to facilitate the identification of nodes across Kubernetes clusters. On Google GKE and Azure AKS, the cluster name is retrieved from the cloud provider API. For AWS EKS, the cluster name is retrieved from EC2 instance tags. On AWS, it is required to add the `ec2:DescribeInstances` [permission][1] to your Datadog IAM policy so that the Agent can query the EC2 instance tags.

**Note**: You can manually set this cluster name value with Agent v6.5+ thanks to the Agent configuration parameter [`clusterName`][2] or the `DD_CLUSTER_NAME` environment variable.

[1]: /integrations/amazon_ec2/#configuration
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml#L66
