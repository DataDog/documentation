---
assets:
  dashboards:
    PerimeterX Overview: assets/dashboards/PerimeterX_Bot_Defender_Dashboard.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - security
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/perimeterx/README.md'
display_name: PerimeterX
draft: false
git_integration_title: perimeterx
guid: 6e3a9bc2-6766-4b24-9edf-12811d821d41
integration_id: perimeterx
integration_title: PerimeterX
is_beta: false
is_public: true
kind: integration
maintainer: support@perimeterx.com
manifest_version: 1.0.0
metric_prefix: perimeterx.
metric_to_check: ''
name: perimeterx
public_title: Datadog-PerimeterX インテグレーション
short_description: PerimeterX のログとメトリクスを Datadog と統合
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションを利用して、[PerimeterX][https://www.perimeterx.com/] に関連するログとイベントを Datadog に転送することができます。

## セットアップ

すべてのコンフィギュレーションは PerimeterX 側で行われます。サードパーティインテグレーションについて詳しくは、[PerimeterX のドキュメント][1]を参照してください。 

### インストール

ホストでのインストールは必要ありません。

### コンフィギュレーション

1. [Datadog ポータル][2]で新しいインテグレーションの API キーを生成します。
2. [PerimeterX サポート][3]でサポートチケットを開き、Datadog のログエクスポートとのインテグレーションをリクエストします。このとき、サポートに以下の情報を提供する必要があります。
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

PerimeterX には、[リクエスト][4]用のメトリクスは含まれません。

### サービスのチェック

PerimeterX にはサービスチェックは含まれません。

### イベント

PerimeterX にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.perimeterx.com/pxconsole/docs/data-integration-to-third-party-apps
[2]: https://app.datadoghq.com/account/settings#api
[3]: mailto:support@perimeterx.com
[4]: https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics
[5]: https://docs.datadoghq.com/ja/help/