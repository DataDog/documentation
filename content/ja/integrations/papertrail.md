---
app_id: papertrail
app_uuid: 630c6ff6-e853-4ef7-8be4-371a55269208
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 147
    source_type_name: PaperTrail
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- notifications
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: papertrail
integration_id: papertrail
integration_title: Papertrail
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: papertrail
public_title: Papertrail
short_description: Papertrail のログを Datadog のイベントストリームで表示、検索、議論。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Notifications
  configuration: README.md#Setup
  description: Papertrail のログを Datadog のイベントストリームで表示、検索、議論。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Papertrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/papertrail/papertrailexample.png" alt="Papertrail の例" popup="true">}}

## 概要

Papertrail と Datadog を使用して、以下のことができます。

- 自由形式のログデータをすぐに使用できるメトリクスに変換できます。
- 運用情報のサイロ化を避けることができます。ログ由来のメトリクスをアプリ/システムレベルのメトリクスと共に表示し、相互に関連付けることができます。

## 計画と使用

### インフラストラクチャーリスト

Papertrail からのメトリクスをキャプチャするには、以下のようにします。

1. Papertrail の[イベントビューア][1]で、グラフ化するログイベントの検索を保存します。
2. 検索の名前を入力し、**Save & Setup an Alert** ボタンをクリックします。
3. Graphing & Metrics で Datadog を選択します。
    {{< img src="integrations/papertrail/papertrailnotify.png" style="max-width:500px;" alt="Papertrail 通知" popup="true">}}

4. アラート頻度などの詳細を選択します。
5. Datadog API キーを指定して、メトリクスに付ける名前を入力し、オプションで、メトリクスと関連付けるタグを入力します。
    {{< img src="integrations/papertrail/papertraildetails.png" style="max-width:500px;" alt="Papertrail 通知" popup="true">}}

6. **Create Alert** ボタンをクリックします。

Papertrail が、選択された間隔で Datadog を更新します。

### ブラウザトラブルシューティング

このインテグレーションに構成手順は必要ありません。

## リアルユーザーモニタリング

### データセキュリティ

Papertrail インテグレーションには、メトリクスは含まれません。

### ヘルプ

Papertrail インテグレーションには、イベントは含まれません。

### ヘルプ

Papertrail インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://papertrailapp.com/events
[2]: https://docs.datadoghq.com/ja/help/