---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - インシデント
  - モニタリング
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/cortex/README.md
display_name: cortex
draft: false
git_integration_title: cortex
guid: 3c59d4a9-6f2a-4f86-91e7-84a1a3e4f43b
integration_id: cortex
integration_title: Cortex
is_public: true
kind: integration
maintainer: support@getcortexapp.com
manifest_version: 1.0.0
metric_prefix: cortex.
metric_to_check: ''
name: cortex
public_title: Cortex
short_description: Cortex ダッシュボードから直接 Datadog インシデントを作成
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
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