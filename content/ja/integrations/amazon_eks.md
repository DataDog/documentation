---
app_id: amazon-eks
app_uuid: abb8b86b-eeb7-4e38-b436-f4cbb09b4398
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10018
    source_type_name: Amazon EKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- configuration & deployment
- containers
- kubernetes
- log collection
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks
integration_id: amazon-eks
integration_title: Amazon EKS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_eks
public_title: Amazon EKS
short_description: Amazon EKS は、AWS で Kubernetes を簡単に実行できるマネージド型サービスです
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::クラウド
  - Category::構成 & デプロイ
  - Category::コンテナ
  - Category::Kubernetes
  - Category::ログの収集
  - Category::オーケストレーション
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon EKS は、AWS で Kubernetes を簡単に実行できるマネージド型サービスです
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon EKS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![EKS ダッシュボード][1]

## 概要

Amazon Elastic Kubernetes Service (EKS) は、標準 Kubernetes 環境のデプロイとメンテナンスを部分的に自動化するためのマネージド型 Kubernetes サービスです。既存の Kubernetes アプリケーションを EKS に移行する場合、あるいは新しいクラスターをデプロイする場合も、Datadog は EKS 環境のリアルタイムの監視を支援します。

## 計画と使用

Datadog は既に Kubernetes や AWS と統合されているため、すぐに EKS を監視することができます。Kubernetes クラスターで実行中の Agent を EKS に移行する予定がある場合に、Datadog でクラスターの監視を続行できます。

さらに、[Amazon EKS マネージド型ノードグループ][2] および [AWS Outposts の Amazon EKS][3] もサポートされています。

### EKS Anywhere

セットアップ手順については、[Amazon EKS Anywhere インテグレーション][4]をご参照ください。

### メトリクスの収集

EKS のモニタリングには、以下の Datadog インテグレーションの1つの設定と、EKS で実行する他の AWS サービス用インテグレーション ([ELB][5] など) が必要です。

- [Kubernetes][6]
- [AWS][7]
- [AWS EC2][8]

### 収集データ

_Agent バージョン 6.0 以降で利用可能_

セットアップは Kubernetes の場合とまったく同じです。
すべてのコンテナからのログ収集を開始するには、Datadog Agent の[環境変数][9]を使用します。

また、DaemonSets を利用して、すべてのノードで [Datadog Agent を自動的にデプロイ][10]します。

環境変数の詳細とさらに高度なセットアップオプションについては、[コンテナログの収集手順][11]を参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

- [Datadog を使用した Amazon EKS の監視][13]
- [Amazon EKS 監視のキーメトリクス][14]
- [AWS Fargate の Amazon EKS][15]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[4]: https://docs.datadoghq.com/ja/integrations/eks_anywhere/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/ja/integrations/kubernetes/
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[8]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[9]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[10]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#container-installation
[11]: https://docs.datadoghq.com/ja/logs/log_collection/docker/#option-2-container-installation
[12]: https://docs.datadoghq.com/ja/help/
[13]: https://www.datadoghq.com/blog/announcing-eks
[14]: https://www.datadoghq.com/blog/eks-cluster-metrics
[15]: https://docs.datadoghq.com/ja/integrations/eks_fargate/