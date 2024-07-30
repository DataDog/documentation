---
app_id: amazon-medialive
app_uuid: f1068638-b7c6-448a-bc57-0267f94d4edd
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.medialive.active_alerts
      metadata_path: metadata.csv
      prefix: aws.medialive.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 354
    source_type_name: Amazon MediaLive
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- メトリクス
- クラウド
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_medialive
integration_id: amazon-medialive
integration_title: Amazon MediaLive
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_medialive
public_title: Amazon MediaLive
short_description: AWS Elemental MediaLive は、ブロードキャストグレードのライブビデオ処理サービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  configuration: README.md#Setup
  description: AWS Elemental MediaLive は、ブロードキャストグレードのライブビデオ処理サービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MediaLive
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS Elemental MediaLive は、ブロードキャストグレードのライブビデオ処理サービスです。

このインテグレーションを有効にすると、Datadog にすべての MediaLive メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `MediaLive` にチェックが入っていることを
   確認します。
2. [Datadog - MediaLive インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_medialive" >}}


### ヘルプ

MediaLive インテグレーションには、イベントは含まれません。

### ヘルプ

MediaLive インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-medialive
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_medialive/amazon_medialive_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/