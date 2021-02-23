---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "service_checks": assets/service_checks.json
"categories":
- notification
"creates_events": true
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/launchdarkly/README.md"
"display_name": "LaunchDarkly"
"draft": false
"git_integration_title": "launchdarkly"
"guid": "a1441ba8-be33-4123-8808-5a87cd696b64"
"integration_id": "launchdarkly"
"integration_title": "LaunchDarkly"
"is_public": true
"kind": "インテグレーション"
"maintainer": "support@launchdarkly"
"manifest_version": "1.0.1"
"metric_prefix": "launchdarkly_relay."
"name": "launchdarkly"
"public_title": "Datadog-LaunchDarkly インテグレーション"
"short_description": "Datadog の LaunchDarkly の変更を監視する"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要

Datadog-LaunchDarkly インテグレーションにより、LaunchDarkly 機能のデプロイが顧客のサービスまたはシステムに及ぼす影響を確認できます。たとえば、デプロイされた機能によりサービスの速度が低下した場合、Datadog 内で原因を確認できます。

![Datadog の LaunchDarkly イベント][1]

## セットアップ

このインテグレーションには [Datadog API キー][2]が必要です。API キーを作成できるのは Datadog 管理者のみです。Datadog API キーを取得したら、[Datadog インテグレーションの LaunchDarkly ドキュメント][3]にアクセスして、Datadog-LaunchDarkly インテグレーションのセットアップ方法を確認してください。

**注**: 設定するには、有効な [Datadog API キー][2]が必要です。

## 収集データ

### メトリクス

LaunchDarkly インテグレーションには、メトリクスは含まれません。

### イベント

LaunchDarkly インテグレーションは、LaunchDarkly から Datadog にフラグ、プロジェクト、環境イベントを送信します。

### サービスのチェック

LaunchDarkly インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[LaunchDarkly のサポートチーム][4]までお問合せください。

## その他の参考資料

[LaunchDarkly][5] およびこのインテグレーションの詳細は[こちら][3]を参照してください。.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/launchdarkly/images/ld-datadog-hover.gif
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.launchdarkly.com/docs/datadog
[4]: https://support.launchdarkly.com/hc/en-us/requests/new
[5]: https://launchdarkly.com

