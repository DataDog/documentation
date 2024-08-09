---
app_id: eks-anywhere
app_uuid: 21bd91d8-7594-4c2f-bbd8-11595e4511d1
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10248
    source_type_name: Amazon EKS Anywhere
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- クラウド
- コンテナ
- kubernetes
- ログの収集
- orchestration
- プロビジョニング
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/eks_anywhere/README.md
display_on_public_website: true
draft: false
git_integration_title: eks_anywhere
integration_id: eks-anywhere
integration_title: Amazon EKS Anywhere
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: eks_anywhere
public_title: Amazon EKS Anywhere
short_description: オンプレミスで Kubernetes クラスターを運用するための EKS デプロイメントオプション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: オンプレミスで Kubernetes クラスターを運用するための EKS デプロイメントオプション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon EKS Anywhere
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![EKS ダッシュボード][1]

## 概要

Amazon Elastic Kubernetes Service (EKS) は、標準 Kubernetes 環境のデプロイとメンテナンスを部分的に自動化するためのマネージド型 Kubernetes サービスです。既存の Kubernetes アプリケーションを EKS に移行する場合、あるいは新しいクラスターをデプロイする場合も、Datadog は EKS 環境のリアルタイムの監視を支援します。

[Amazon EKS Anywhere][2]は、仮想マシン (VMware vSphere など) やベアメタルサーバーなど、オンプレミスで Kubernetes クラスターを作成・運用できるデプロイメントオプションです。

## 計画と使用

Datadog は既に Kubernetes や AWS と統合されているため、すぐに EKS を監視することができます。Kubernetes クラスターで実行中の Agent を EKS に移行する予定がある場合に、Datadog でクラスターの監視を続行できます。

さらに、[Amazon EKS マネージド型ノードグループ][3] および [AWS Outposts の Amazon EKS][4] もサポートされています。

### Datadog Helm チャート構成

[Helm を使った Agent デプロイメント手順][5]に、これらの構成手順を追加して使用してください。

1. `datadog.kubelet.tlsVerify` を `false` に設定します。
2. Agent ポッドに許容範囲を設定します。これは、コントロールプレーンを監視するために必要です。

以下の Helm スニペットは、EKS Anywhere を監視するための具体的な変更点を示しています。

```yaml
datadog:
  kubelet:
    tlsVerify: false
agents:
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
```

### メトリクスの収集

EKS のモニタリングには、以下の Datadog インテグレーションの 1 つの設定と、EKS で実行する他の AWS サービス用インテグレーション ([ELB][6] など) が必要です。

- [Kubernetes][7]
- [AWS][8]
- [AWS EC2][9]

### 収集データ

_Agent バージョン 6.0 以降で利用可能_

セットアップは Kubernetes の場合とまったく同じです。
すべてのコンテナからのログ収集を開始するには、Datadog Agent の[環境変数][10]を使用します。

また、DaemonSets を使用して、すべてのノードで [Datadog Agent を自動的にデプロイ][11]します。

環境変数の詳細とさらに高度なセットアップオプションについては、[コンテナログの収集手順][12]を参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

## その他の参考資料

- [Datadog を使用した Amazon EKS の監視][14]
- [Amazon EKS 監視のキーメトリクス][15]
- [AWS Fargate の Amazon EKS][16]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://aws.amazon.com/eks/eks-anywhere/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[4]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=helm#installation
[6]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[7]: https://docs.datadoghq.com/ja/integrations/kubernetes/
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[10]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[11]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#container-installation
[12]: https://docs.datadoghq.com/ja/logs/log_collection/docker/#option-2-container-installation
[13]: https://docs.datadoghq.com/ja/help/
[14]: https://www.datadoghq.com/blog/announcing-eks
[15]: https://www.datadoghq.com/blog/eks-cluster-metrics
[16]: https://docs.datadoghq.com/ja/integrations/eks_fargate/