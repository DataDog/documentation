---
aliases:
- /ja/agent/faq/kubernetes-cluster-name-detection
- /ja/agent/guide/kubernetes-cluster-name-detection
further_reading:
- link: /agent/autodiscovery/
  tag: documentation
  text: Docker Agent オートディスカバリー
- link: /agent/kubernetes/host_setup/
  tag: documentation
  text: Kubernetes DaemonSet のセットアップ
- link: /agent/kubernetes/integrations/
  tag: documentation
  text: カスタムインテグレーション
title: Kubernetes クラスター名の自動検出
---

For Agent v6.11+, the Datadog Agent can automatically detect the Kubernetes cluster name on Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS), and Amazon Elastic Kubernetes Service (EKS). If detected, the cluster name is added as a suffix on the node name to all data collected. This facilitates the identification of nodes across Kubernetes clusters. 

On GKE and AKS, the cluster name is retrieved from the cloud provider API. 

On Amazon EKS, the cluster name is retrieved from EC2 instance tags. For the Datadog Agent to query EC2 instance tags, you must add the `ec2:DescribeInstances` [permission][1] to your Datadog IAM policy.

**Note**: You can manually set this cluster name value with Agent v6.5+ by using Agent configuration parameter [`clusterName`][2] or the `DD_CLUSTER_NAME` environment variable.

[1]: /ja/integrations/amazon_ec2/#configuration
[2]: https://github.com/DataDog/helm-charts/blob/896a355268ff6b3cfd33f945ae373912caa8b6e4/charts/datadog/values.yaml#L96