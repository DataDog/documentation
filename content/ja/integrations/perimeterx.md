---
app_id: perimeterx
app_uuid: 47527216-ad8e-454b-8291-494f05c2d5c9
assets:
  dashboards:
    PerimeterX Overview: assets/dashboards/PerimeterX_Bot_Defender_Dashboard.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: perimeterx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PerimeterX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: support@perimeterx.com
  support_email: support@perimeterx.com
categories:
- security
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/perimeterx/README.md
display_on_public_website: true
draft: false
git_integration_title: perimeterx
integration_id: perimeterx
integration_title: PerimeterX
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: perimeterx
oauth: {}
public_title: PerimeterX
short_description: PerimeterX のログとメトリクスを Datadog と統合
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
  - Category::Security
  configuration: README.md#Setup
  description: PerimeterX のログとメトリクスを Datadog と統合
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PerimeterX
---



## 概要

このインテグレーションを利用して、[PerimeterX][1] に関連するログとイベントを Datadog に転送することができます。

## セットアップ

すべてのコンフィギュレーションは PerimeterX 側で行われます。サードパーティインテグレーションについて詳しくは、[PerimeterX のドキュメント][2]を参照してください。 

### インストール

ホストでのインストールは必要ありません。

### コンフィギュレーション

1. [Datadog ポータル][3] で新しいインテグレーションの API キーを生成します。
2. [PerimeterX サポート][4]でサポートチケットを開き、Datadog のログエクスポートとのインテグレーションをリクエストします。このとき、サポートに以下の情報を提供する必要があります。
   - Datadog インテグレーションの API キー
   - 送信したいデータ対象 (メトリクスおよび/またはログ)
   - Datadog に転送が必要な PerimeterX のアプリケーション ID

### 検証

PerimeterX サポートから Datadog とのインテグレーション完了通知を受け取ったら、以下の手順でインテグレーションの動作を確認します。

1. Datadog ポータルにログインします。
2. Logs -> Search の順に移動します。
3. クエリのフィルターを "Source:perimeterx" に設定して検索を実行します。
4. PerimeterX からのログを受信していることを確認します (ログの表示開始までには数分程度かかることがあります) 。

## 収集データ

### メトリクス

PerimeterX には、[リクエスト][5]用のメトリクスは含まれません。

### サービスのチェック

PerimeterX にはサービスチェックは含まれません。

### イベント

PerimeterX にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.perimeterx.com/
[2]: https://docs.perimeterx.com/pxconsole/docs/data-integration-to-third-party-apps
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: mailto:support@perimeterx.com
[5]: https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics
[6]: https://docs.datadoghq.com/ja/help/