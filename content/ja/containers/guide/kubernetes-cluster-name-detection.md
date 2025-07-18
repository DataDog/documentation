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
kind: documentation
title: Kubernetes クラスター名の自動検出
---

Agent v6.11+ の場合、Datadog Agent は Google GKE、Azure AKS、AWS EKS で Kubernetes クラスター名を自動検出できます。検出された場合、ノード名のサフィックスとしてクラスター名が収集されたすべてのデータに追加され、Kubernetes クラスター全体のノードの識別が容易になります。Google GKE および Azure AKS では、クラスター名はクラウドプロバイダー API から取得されます。AWS EKS の場合、クラスター名は EC2 インスタンスタグから取得されます。AWS では、Agent が EC2 インスタンスタグをクエリできるように、Datadog IAM ポリシーに `ec2:DescribeInstances` [権限][1]を追加する必要があります。

**注**: Agent v6.5+ では、Agent 構成パラメーター [`clusterName`][2] または `DD_CLUSTER_NAME` 環境変数のおかげで、このクラスター名の値を手動で設定できます。

[1]: /ja/integrations/amazon_ec2/#configuration
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml#L66