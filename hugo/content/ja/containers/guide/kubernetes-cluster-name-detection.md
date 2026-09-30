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

GKE では、クラスター名がクラウド プロバイダー API から取得されます。

Azure AKS では、クラスター名はノードのリソース グループ名から解析され、[パターン][3]: `(MC|mc)_<resource-group>_<cluster-name>_<zone>` に準拠している必要があります。

Amazon EKS では、EC2 インスタンスタグからクラスター名が取得されます。Datadog Agent が EC2 インスタンスタグにクエリを実行するには、Datadog IAM ポリシーに `ec2:DescribeInstances` [権限][1]を追加する必要があります。

**注**: Agent v6.5+ では、Agent 構成パラメーター [`clusterName`][2] または `DD_CLUSTER_NAME` 環境変数を使用することで、このクラスター名の値を手動で設定できます。

[1]: /ja/integrations/amazon_ec2/#configuration
[2]: https://github.com/DataDog/helm-charts/blob/896a355268ff6b3cfd33f945ae373912caa8b6e4/charts/datadog/values.yaml#L96
[3]: https://github.com/DataDog/datadog-agent/blob/4edc7d4d1b6f3e6d902cf8ab9a6cb786aba2f69f/pkg/util/cloudproviders/azure/azure.go#L115-L116