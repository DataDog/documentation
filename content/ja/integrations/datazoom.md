---
assets:
  dashboards:
    Datazoom Overview: assets/dashboards/datazoom_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/datazoom/README.md
display_name: Datazoom
draft: false
git_integration_title: datazoom
guid: eef8335b-ae57-4bbf-82a7-41f9b8a704e9
integration_id: datazoom
integration_title: Datazoom
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: datazoom.
metric_to_check: ''
name: datazoom
public_title: Datazoom
short_description: Datazoom Collector のデータをログエクスプローラーで表示します。
support: contrib
supported_os:
- linux
- mac_os
- windows
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