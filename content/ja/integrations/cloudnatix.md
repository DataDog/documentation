---
app_id: cloudnatix
app_uuid: caebfbe2-48ba-443f-b2c6-bd80122b2605
assets:
  dashboards:
    cloudnatix_overview: assets/dashboards/cloudnatix_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    metrics:
      check:
      - cloudnatix.vpa
      - cloudnatix.vpa.recommendation
      - cloudnatix.workload.resource
      - cloudnatix.workload.monthly_spend
      - cloudnatix.workload.monthly_projected_saving
      - cloudnatix.pod_evition_by_vpa
      - cloudnatix.compute.daily_spend
      metadata_path: metadata.csv
      prefix: cloudnatix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10367
    source_type_name: CloudNatix
author:
  homepage: https://cloudnatix.com/
  name: CloudNatix
  sales_email: sales@cloudnatix.com
  support_email: support@cloudnatix.com
categories:
- cloud
- aws
- azure
- google cloud
- kubernetes
- metrics
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudnatix/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudnatix
integration_id: cloudnatix
integration_title: CloudNatix
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cloudnatix
pricing: []
public_title: CloudNatix
short_description: Provides automated capacity, cost, and operation optimization from
  CloudNatix.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::AWS
  - Category::Azure
  - Category::Google Cloud
  - Category::Kubernetes
  - Category::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Provides automated capacity, cost, and operation optimization from
    CloudNatix.
  media:
  - caption: CloudNatix Datadog dashboard that provides insights on cluster spending,
      usage, and cost optimization.
    image_url: images/cloudnatix-dashboard.png
    media_type: image
  - caption: Visualize the amount of estimated possible savings per workload
    image_url: images/cloudnatix-projected-saving.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/infrastructure-optimization-rightsizing-cloudnatix-datadog/
  support: README.md#Support
  title: CloudNatix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは [CloudNatix][1] からのデータを提供します。

CloudNatix は、複数の VM ベースおよび Kubernetes クラスターに接続し、特許出願中のオートパイロット技術により、自動化されたキャパシティ、コスト、および運用の最適化を可能にします。CloudNatix Insights は、DevOps チームに潜在的なキャパシティと可用性の問題を事前に視覚化します。

CloudNatix インテグレーションは、すぐに使えるダッシュボードでコストと運用の最適化に関する洞察を Datadog に提供し、クラスターのコストを素早く確認し、コスト削減の機会を分析することができます。

## セットアップ

### インストール

クラスターに CloudNatix チェックをインストールするには

1. CloudNatix インテグレーションチェックをインストールした Datadog Agent の Docker イメージをビルドします。詳細は、[コミュニティインテグレーションの利用][2]を参照してください。
2. ビルドされた Docker イメージで Kubernetes クラスターに [Datadog Agent をインストール][3]します。
3. Kubernetes クラスターに [CloudNatix をインストール][4]します。CloudNatix Cluster Agent は、
   Datadog インテグレーションで動作するように自動的に構成されます。

### 検証

[Agent の status サブコマンドを実行][15]し、Checks セクションで `cloudnatix` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cloudnatix" >}}


### サービスチェック

CloudNatix には、サービスのチェック機能は含まれません。

### イベント

CloudNatix には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[CloudNatix サポート][7]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Optimize your infrastructure with CloudNatix and Datadog][8]

[1]: https://cloudnatix.com/
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=docker
[3]: https://app.datadoghq.com/account/settings#agent/kubernetes
[4]: https://docs.cloudnatix.com/docs/tutorial
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/cloudnatix/metadata.csv
[7]: mailto:support@cloudnatix.com
[8]: https://www.datadoghq.com/blog/infrastructure-optimization-rightsizing-cloudnatix-datadog/