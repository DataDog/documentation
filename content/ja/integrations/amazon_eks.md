---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - aws
  - containers
  - orchestration
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md'
display_name: Amazon EKS
git_integration_title: amazon_eks
guid: 9bc1f66e-de05-4460-b082-783c45a07355
integration_id: amazon-eks
integration_title: Amazon-EKS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aws.eks.
name: amazon_eks
public_title: Datadog-Amazon-EKS インテグレーション
short_description: Amazon EKS は、Kubernetes を簡単に実行できるマネージド型サービスです。 on AWS
support: コア
supported_os:
  - linux
  - mac_os
---
![EKS ダッシュボード][1]

## 概要

Elastic Container Service for Kubernetes (EKS) は、標準 Kubernetes 環境のデプロイとメンテナンスを部分的に自動化するためのマネージド型 Kubernetes サービスとして AWS に追加された最新機能です。既存の Kubernetes アプリケーションを EKS に移行する場合、あるいは新しいクラスターをデプロイする場合も、Datadog は EKS 環境のリアルタイムの監視を支援します。

## セットアップ

Datadog は既に Kubernetes や AWS と統合されているため、すぐに EKS を監視することができます。Kubernetes クラスターで実行中の Agent を EKS に移行する予定がある場合に、Datadog でクラスターの監視を続行できます。

### メトリクスの収集

EKS を監視するには、以下の Datadog インテグレーションをセットアップする必要があります。

* [Kubernetes][2]
* [AWS][3]
* [AWS EC2][4]

EKS で実行している他の AWS サービス (例: [ELB][5]) のインテグレーションも同様です。

### ログの収集

**Agent 6.0 以上で使用可能**

セットアップは Kubernetes の場合とまったく同じです。
すべてのコンテナからのログ収集を開始するには、Datadog Agent の[環境変数][6]を使用します。

また、DaemonSets を利用して、すべてのノードで [Datadog Agent を自動的にデプロイ][7]します。

環境変数の詳細とさらに高度なセットアップオプションについては、[コンテナログの収集手順][8]を参照してください。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

* [Datadog を使用した Amazon EKS の監視][10]
* [Amazon EKS 監視のキーメトリクス][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.datadoghq.com/ja/integrations/kubernetes
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[4]: https://docs.datadoghq.com/ja/integrations/amazon_ec2
[5]: https://docs.datadoghq.com/ja/integrations/amazon_elb
[6]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[7]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#container-installation
[8]: https://docs.datadoghq.com/ja/logs/log_collection/docker/#option-2-container-installation
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/announcing-eks
[11]: https://www.datadoghq.com/blog/eks-cluster-metrics


{{< get-dependencies >}}