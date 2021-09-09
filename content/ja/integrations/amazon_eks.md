---
assets:
  dashboards: {}
  logs: {}
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
  - https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md
display_name: Amazon EKS
draft: false
git_integration_title: amazon_eks
guid: 9bc1f66e-de05-4460-b082-783c45a07355
integration_id: amazon-eks
integration_title: Amazon-EKS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aws.eks.
name: amazon_eks
public_title: Datadog-Amazon-EKS インテグレーション
short_description: Amazon EKS は、AWS で Kubernetes を簡単に実行できるマネージド型サービスです
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![EKS ダッシュボード][1]

## 概要

Amazon Elastic Kubernetes Service (EKS) は、標準 Kubernetes 環境のデプロイとメンテナンスを部分的に自動化するためのマネージド型 Kubernetes サービスです。既存の Kubernetes アプリケーションを EKS に移行する場合、あるいは新しいクラスターをデプロイする場合も、Datadog は EKS 環境のリアルタイムの監視を支援します。

## セットアップ

Datadog は既に Kubernetes や AWS と統合されているため、すぐに EKS を監視することができます。Kubernetes クラスターで実行中の Agent を EKS に移行する予定がある場合に、Datadog でクラスターの監視を続行できます。

さらに、[Amazon EKS マネージド型ノードグループ][2] および [AWS Outposts の Amazon EKS][3] もサポートされています。

### メトリクスの収集

EKS を監視するには、以下の Datadog インテグレーションをセットアップする必要があります。

- [Kubernetes][4]
- [AWS][5]
- [AWS EC2][6]

EKS で実行している他の AWS サービス (例: [ELB][7]) のインテグレーションも同様です。

### ログの収集

_Agent バージョン 6.0 以降で利用可能_

セットアップは Kubernetes の場合とまったく同じです。
すべてのコンテナからのログ収集を開始するには、Datadog Agent の[環境変数][8]を使用します。

また、DaemonSets を利用して、すべてのノードで [Datadog Agent を自動的にデプロイ][9]します。

環境変数の詳細とさらに高度なセットアップオプションについては、[コンテナログの収集手順][10]を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

- [Datadog を使用した Amazon EKS の監視][12]
- [Amazon EKS 監視のキーメトリクス][13]
- [AWS Fargate の Amazon EKS][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[4]: https://docs.datadoghq.com/ja/integrations/kubernetes/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[7]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[8]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[9]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#container-installation
[10]: https://docs.datadoghq.com/ja/logs/log_collection/docker/#option-2-container-installation
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://www.datadoghq.com/blog/announcing-eks
[13]: https://www.datadoghq.com/blog/eks-cluster-metrics
[14]: https://docs.datadoghq.com/ja/integrations/amazon_eks_fargate/