---
"assets":
  "dashboards": {}
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- ""
"creates_events": true
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/statsig/README.md"
"display_name": "Statsig"
"draft": false
"git_integration_title": "statsig"
"guid": "f22e08ca-b524-45ad-815c-9ad654015158"
"integration_id": "statsig"
"integration_title": "Statsig"
"is_public": true
"kind": "integration"
"maintainer": "support@statsig.com"
"manifest_version": "1.0.0"
"metric_prefix": "statsig."
"metric_to_check": "statsig.log_event.count"
"name": "statsig"
"public_title": "Statsig"
"short_description": "Datadog で Statsig の変更を監視する"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要

Datadog-Statsig インテグレーションにより、Statsig でイベントおよびメトリクスを送信できるようになるため、製品やサービスを監視し、機能のロールアウトまたはコンフィギュレーションの変更がエコシステムに与える影響を可視化できます。

## セットアップ

### インストール

Statsig のインテグレーションセットアップにインストールは必要ありません。

### コンフィギュレーション

1. Datadog API キーをコピーします。
2. [Statsig コンソールで Integrations タブに移動します][1]。
3. Datadog カードをクリックします。
4. 上部のフィールドに API キーを貼り付け、Confirm をクリックします。

## 収集データ

Statsig インテグレーションでは、Datadog からのデータは収集されません。

### メトリクス
{{< get-metrics-from-git "statsig" >}}


### サービスのチェック

Statsig インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Statsig インテグレーションにより、Statsig でのコンフィギュレーション変更イベントが Datadog に送信されます（たとえば、新規または更新された機能ゲートまたは新しいインテグレーションが有効になった時）。

## トラブルシューティング

ヘルプが必要な場合は、Statsig サポート（support@statsig.com）または[弊社までお問い合わせ][3]ください。

[1]: https://console.statsig.com/integrations
[2]: https://github.com/DataDog/integrations-extras/blob/master/statsig/metadata.csv
[3]: https://www.statsig.com/contact

