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

Agent v6.11+ の場合、Datadog Agent は Google Kubernetes Engine (GKE)、Azure Kubernetes Service (AKS)、Amazon Elastic Kubernetes Service (EKS) で Kubernetes クラスター名を自動検出できます。検出された場合、収集されたすべてのデータに、ノード名のサフィックスとしてクラスター名が追加されます。これにより、Kubernetes クラスター全体でノードの識別が容易になります。

On GKE, the cluster name is retrieved from the cloud provider API.

On Azure AKS, the cluster name is parsed from the resource group name of the node and must conform to the [pattern][3]: `(MC|mc)_<resource-group>_<cluster-name>_<zone>`.

On Amazon EKS, the cluster name is retrieved from EC2 instance tags. For the Datadog Agent to query EC2 instance tags, you must add the `ec2:DescribeInstances` [permission][1] to your Datadog IAM policy.

**Note**: You can manually set this cluster name value with Agent v6.5+ by using Agent configuration parameter [`clusterName`][2] or the `DD_CLUSTER_NAME` environment variable.

[1]: /ja/integrations/amazon_ec2/#configuration
[2]: https://github.com/DataDog/helm-charts/blob/896a355268ff6b3cfd33f945ae373912caa8b6e4/charts/datadog/values.yaml#L96
[3]: https://github.com/DataDog/datadog-agent/blob/4edc7d4d1b6f3e6d902cf8ab9a6cb786aba2f69f/pkg/util/cloudproviders/azure/azure.go#L115-L116