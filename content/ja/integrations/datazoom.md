---
app_id: datazoom
app_uuid: 3c289cc6-b148-4e99-98ae-66c01386f767
assets:
  dashboards:
    Datazoom Overview: assets/dashboards/datazoom_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datazoom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Datazoom
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/datazoom/README.md
display_on_public_website: true
draft: false
git_integration_title: datazoom
integration_id: datazoom
integration_title: Datazoom
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: datazoom
oauth: {}
public_title: Datazoom
short_description: Datazoom Collector のデータをログエクスプローラーで表示します。
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
  configuration: README.md#Setup
  description: Datazoom Collector のデータをログエクスプローラーで表示します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datazoom
---



## 概要

Datazoom は、コレクターのエコシステムを通じてエンドポイントからデータを収集するビデオデータプラットフォームです。

[Datazoom Datadog Connector][1] は、コレクターのデータを Datadog に送信し、[ログエクスプローラー][2]でデータをクエリすることができます。

Datazoom は INFO レベルに設定されたデータを送信します。

## セットアップ

### インストール

Datazoom インテグレーションは、Datadog にログを出力します。Datadog 側でのインストールは必要ありません。

### コンフィギュレーション

- Datazoom Datadog Connector の構成方法の詳細については、Datazoom のインテグレーション[ドキュメント][1]をご覧ください。

### ダッシュボード  

[Datazoom ログダッシュボード][3]をご覧ください。

## 収集データ

### メトリクス

Datazoom には、メトリクスは含まれません。

### サービスのチェック

Datazoom には、サービスのチェック機能は含まれません。

### イベント

Datazoom には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ブログ: Datadog で Datazoom のテレメトリーを監視する][5]

[1]: https://help.datazoom.io/hc/en-us/articles/360042494512-Datadog
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/dashboard/lists/preset/3?q=datazoom
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-datazoom/