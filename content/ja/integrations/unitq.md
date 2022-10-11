---
app_id: unitq
app_uuid: 7781542f-b4a2-40e2-86cd-9987980a0ead
assets:
  dashboards:
    unitQ: assets/dashboards/unitq_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: unitq.user_feedback
      metadata_path: metadata.csv
      prefix: unitq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: unitQ
author:
  homepage: https://www.unitq.com/
  name: unitQ
  sales_email: hello@unitq.com
  support_email: hello@unitq.com
categories:
- モニタリング
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unitq/README.md
display_on_public_website: true
draft: false
git_integration_title: unitq
integration_id: unitq
integration_title: unitQ
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: unitq
oauth: {}
public_title: unitQ
short_description: ユーザーの声を品質向上に役立てます。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Monitoring
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: ユーザーの声を品質向上に役立てます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: unitQ
---



## 概要

unitQ は、ユーザーの声を集約し、検索可能なプラットフォームです。AI 技術により、ユーザーの声からデータドリブンなインサイトを抽出し、製品の品質向上を支援します。

unitQ Datadog インテグレーションにより、unitQ から Datadog にメトリクスを転送することができるようになります。unitQ のメトリクスを Datadog に転送することで、Datadog のグラフ化やアラート機能を活用し、ユーザーからのフィードバックを追跡することができ、顧客満足度を高めることができます。

## セットアップ

### コンフィギュレーション

1. unitQ で、**Integrations** に移動します。
2. Datadog タイルを選択します
3. 次の詳細を入力します。
   - **Datadog Site**:
     - Datadog US リージョンを使用する場合は、`https://api.datadoghq.com` と入力します。
     - Datadog EU リージョンを使用する場合は、`https://api.datadoghq.eu` と入力します。
   - **API Key**: [Datadog API キー][1]を入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "unitq" >}}


### サービスのチェック

unitQ には、サービスのチェック機能は含まれません。

### イベント

unitQ には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://github.com/DataDog/integrations-extras/blob/master/unitq/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/