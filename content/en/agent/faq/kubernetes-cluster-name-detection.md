---
title: Kubernetes cluster name auto detection
kind: faq
further_reading:
- link: "agent/autodiscovery"
  tag: "documentation"
  text: Docker Agent Autodiscovery
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/kubernetes/integrations"
  tag: "documentation"
  text: "Custom Integrations"
---

For Agent v6.11+, the Datadog Agent can auto-detect the Kubernetes cluster name on Google GKE, Azure AKS, and AWS EKS. If detected, an alias which contains the cluster name as a suffix on the node name is added to all data collected to facilitate the identification of nodes across Kubernetes clusters. On Google GKE and Azure AKS, the cluster name is retrieved from the cloud provider API. For AWS EKS, the cluster name is retrieved from EC2 instance tags. On AWS, it is required to add the `ec2:DescribeInstances` [permission][10] to your Datadog IAM policy so that the Agent can query the EC2 instance tags.

**Note**: You can manually set this cluster name value with Agent v6.5+ thanks to the Agent configuration parameter [`clusterName`][11] or the `DD_CLUSTER_NAME` environment variable.

[10]: /integrations/amazon_ec2/#configuration
[11]: https://github.com/helm/charts/blob/a744ff8c90730d6d36698412150875fa96882b9d/stable/datadog/values.yaml#L58