---
app_id: perimeterx
app_uuid: 47527216-ad8e-454b-8291-494f05c2d5c9
assets:
  dashboards:
    PerimeterX Overview: assets/dashboards/PerimeterX_Bot_Defender_Dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: perimeterx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10105
    source_type_name: PerimeterX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PerimeterX
  sales_email: support@perimeterx.com
  support_email: support@perimeterx.com
categories:
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/perimeterx/README.md
display_on_public_website: true
draft: false
git_integration_title: perimeterx
integration_id: perimeterx
integration_title: PerimeterX
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: perimeterx
public_title: PerimeterX
short_description: PerimeterX のログとメトリクスを Datadog と統合
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: PerimeterX のログとメトリクスを Datadog と統合
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PerimeterX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このインテグレーションを利用して、[PerimeterX][1] に関連するログとイベントを Datadog に転送することができます。

## 計画と使用

すべてのコンフィギュレーションは PerimeterX 側で行われます。サードパーティインテグレーションについて詳しくは、[PerimeterX のドキュメント][2]を参照してください。 

### インフラストラクチャーリスト

ホストでのインストールは必要ありません。

### ブラウザトラブルシューティング

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

## リアルユーザーモニタリング

### データセキュリティ

PerimeterX には、[リクエスト][5]用のメトリクスは含まれません。

### ヘルプ

PerimeterX にはサービスチェックは含まれません。

### ヘルプ

PerimeterX にはイベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.perimeterx.com/
[2]: https://edocs.humansecurity.com/docs/configuring-the-export-via-portal
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: mailto:support@perimeterx.com
[5]: https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics
[6]: https://docs.datadoghq.com/ja/help/