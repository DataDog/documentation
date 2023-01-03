---
app_id: cortex
app_uuid: 15baccdd-d89c-4591-ab45-e6378d8c174f
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cortex.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: cortex
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: support@getcortexapp.com
  support_email: support@getcortexapp.com
categories:
- インシデント
- モニタリング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cortex/README.md
display_on_public_website: true
draft: false
git_integration_title: cortex
integration_id: cortex
integration_title: Cortex
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: cortex
oauth: {}
public_title: Cortex
short_description: Cortex ダッシュボードから直接 Datadog インシデントを作成
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
  - Category::Incidents
  - Category::Monitoring
  configuration: README.md#Setup
  description: Cortex ダッシュボードから直接 Datadog インシデントを作成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cortex
---



## 概要

[Cortex][1] インテグレーションにより、Cortex ダッシュボードから直接 Datadog インシデントをトリガーできます。

## セットアップ

このインテグレーションをセットアップするには、Cortex アカウント、Datadog API 、アプリケーションキーが必要です。

### コンフィギュレーション

1. 初めてのお客様でデモをご希望の場合、Cortex までお問い合わせください。
2. [Datadog API キー][2]を作成します。
3. [Datadog アプリケーションキー][3]を作成します。
4. Datadog API およびアプリケーションキーを [Cortex Datadog インテグレーション][4]に追加します。

### 検証

1. [Cortex のホームページ][5]に移動します。
2. 既存のサービスを選択するか、[新しいサービスを作成します][6]。
3. サイドバーの "INTEGRATIONS" で、"See all" をクリックし、"Datadog" を選択します。
4. "Incidents" の上の赤い "Trigger Incident" ボタンをクリックします。
5. フォームに情報を入力し、緑の "Trigger Incident" ボタンをクリックします。
6. 画面に以下のメッセージが表示されます。「インシデントがトリガーされました。Datadog で確認するには、こちらをクリックします。」
7. また、新しいインシデントは "Incidents" でも確認できます。

## 収集データ

### メトリクス

Cortex には、メトリクスは含まれません。

### サービスのチェック

Cortex には、サービスのチェック機能は含まれません。

### イベント

Cortex には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[support@getcortexapp.com][7] までお問い合わせください。

[1]: https://www.getcortexapp.com/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[4]: https://app.getcortexapp.com/admin/settings/datadog
[5]: https://app.getcortexapp.com/admin/index
[6]: https://app.getcortexapp.com/admin/service/new
[7]: mailto:support@getcortexapp.com