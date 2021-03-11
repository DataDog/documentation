---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "service_checks": assets/service_checks.json
"categories":
- 監視
"creates_events": true
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/bluematador/README.md"
"display_name": "Blue Matador"
"draft": false
"git_integration_title": "bluematador"
"guid": "db258635-5063-4a06-85c6-b15c1ea3df4b"
"integration_id": "blue-matador"
"integration_title": "Blue Matador"
"is_public": true
"kind": "インテグレーション"
"maintainer": "support@bluematador.com"
"manifest_version": "1.0.0"
"metric_prefix": "bluematador."
"metric_to_check": ""
"name": "bluematador"
"public_title": "Datadog-Blue Matador インテグレーション"
"short_description": "Blue Matador は自動的にセットアップされ、何百ものアラートを動的に管理します。"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要

Blue Matador の Datadog インテグレーションを使用すると、Blue Matador イベントを Datadog のイベントストリームに送信することができます。

![eventstream_from_blue_matador][1]

既存のダッシュボードを拡張したり、Datadog で収集するメトリクスと関連付けたりするために使用できます。

![dashboard][2]

Blue Matador で監視し、Datadog にインポートできるイベントやメトリクスの一覧については、Blue Matador の[モニターのページ][3]を参照してください。

## セットアップ

Blue Matador のイベントを Datadog にインポートするには、[Datadog API キー][4]を使用して、新しい通知メソッドを Blue Matador に作成します。

**注**: 既に存在しているイベントは Datadog にインポートされず、新しいイベントが発生するとインポートされます。

セットアップの詳しい説明については、[Blue Matador の Datadog ドキュメント][5]を参照してください。

## 収集データ

### メトリクス

Blue Matador インテグレーションには、メトリクスは含まれません。

### イベント

すべてのイベントが Datadog のイベントストリームに送信されます。

### サービスのチェック

Blue Matador インテグレーションには、サービスのチェック機能は含まれません。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/eventstream.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/dashboard.png
[3]: https://www.bluematador.com/monitored-events
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://www.bluematador.com/docs/datadog-integration

