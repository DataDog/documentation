---
app_id: amazon-globalaccelerator
app_uuid: 344106fe-9dc6-4ca5-a386-6811332f174c
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.globalaccelerator.processed_bytes_in
      metadata_path: metadata.csv
      prefix: aws.globalaccelerator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10431
    source_type_name: Amazon GlobalAccelerator
author:
  homepage: https://www.datadoghq.com
  name: Ruby
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- モニター
- クラウド
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_globalaccelerator
integration_id: amazon-globalaccelerator
integration_title: Amazon Global Accelerator
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_globalaccelerator
public_title: Amazon Global Accelerator
short_description: Global Accelerator は、アクセラレータを使用してアプリケーションのパフォーマンスを向上させます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Global Accelerator は、アクセラレータを使用してアプリケーションのパフォーマンスを向上させます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Global Accelerator
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS Global Accelerator は、ローカルおよびグローバルユーザー向けにアプリケーションのパフォーマンスを向上させるアクセラレータを作成するサービスです。

このインテグレーションを有効にすると、すべての Global Accelerator メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、**Metric Collection** タブの下にある Global Accelerator が有効になっていることを確認します。
2. [Datadog - Amazon Global Accelerator インテグレーション][3]をインストールします。


## データ収集

### メトリクス
{{< get-metrics-from-git "amazon_globalaccelerator" >}}


### サービスチェック

Amazon Global Accelerator には、サービスのチェック機能は含まれません。

### イベント

Amazon Global Accelerator には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-globalaccelerator
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_globalaccelerator/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/