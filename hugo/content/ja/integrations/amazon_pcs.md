---
app_id: amazon-pcs
app_uuid: 437d6d87-a4d8-4064-a624-d977c455922a
assets:
  dashboards:
    amazon-pcs: assets/dashboards/amazon_pcs_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.pcs.actual_capacity
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.pcs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30323961
    source_type_name: Amazon PCS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- aws
- モニター
- クラウド
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_pcs
integration_id: amazon-pcs
integration_title: AWS PCS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_pcs
public_title: AWS PCS
short_description: AWS Parallel Computing Service (PCS) は、高性能コンピューティング (HPC) クラスターを構築・管理するためのツールを提供します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Parallel Computing Service (PCS) は、高性能コンピューティング (HPC) クラスターを構築・管理するためのツールを提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS PCS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS Parallel Computing Service (AWS PCS) は、AWS でより簡単に高性能コンピューティング (HPC) ワークロードを実行およびスケールし、科学モデルやエンジニアリング モデルを構築できるマネージド サービスです。

このインテグレーションを有効にすると、Datadog で PCS のすべてのメトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### 構成

1. [AWS インテグレーション ページ][2]で、**Metric Collection** タブで AWS PCS が有効になっていることを確認してください。
2. [Datadog - AWS PCS インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_pcs" >}}


### サービスチェック

AWS PCS にはサービス チェックは含まれていません。

### イベント

AWS PCS にはイベントは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-pcs
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_pcs/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/ja/help/