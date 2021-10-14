---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- 監視
- コラボレーション
- notification
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/amixr/README.md"
"display_name": "Amixr"
"draft": false
"git_integration_title": "amixr"
"guid": "56e3b585-27b4-4a04-b528-9c1adfecf387"
"integration_id": "amixr"
"integration_title": "Amixr"
"is_public": true
"kind": "インテグレーション"
"maintainer": "ildar@amixr.io"
"manifest_version": "1.0.0"
"metric_prefix": "amixr."
"metric_to_check": ""
"name": "amixr"
"public_title": "Datadog-Amixr インテグレーション"
"short_description": "Slack とのスムーズなインテグレーションで、開発者が使いやすいアラートマネジメントを実現"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要

Slack インテグレーションを活用して Amixr でアラートを管理することができます。

- Datadog からのアラートとその他イベントの収集・分析
- Google カレンダー連携または Slack 内でのオンコールローテーションのセットアップ
- 自動エスカレーションチェーンの構成
- 電話および SMS でのアラート受信
- GitOps でのインシデント管理のオーケストレーション

![Amixr_Interface][1]

## セットアップ

### インストール

サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

Amixr で構成する場合:

1. *Settings > Connect New Monitorings > Datadog > How to connect* の順に開きます
2. Datadog の Webhook URL をコピーします

Datadog で以下をコピーします。

1. サイドバーから **Integrations** ページを開きます。
2. 検索バーで **webhook** を検索します。
3. インテグレーションの名前を入力します。例: `amixr-alerts-prod`
4. 上記ステップで確認した Webhook URL を貼り付けます。
5. Save ボタンをクリックします。

### 検証

Datadog で以下をコピーします。

1. サイドバーから **Events** ページを開きます。
2. `@webhook-<インテグレーション名><任意の名前をここに入力>` と入力します。例: `@webhook-amixr-alerts-prod test alert`
3. Post ボタンをクリックします。

Amixr で構成する場合:

1. サイドバーから **Incidents** を開いて、アラートを受信したかを確認します。

## 収集データ

### メトリクス

Amixr インテグレーションには、メトリクスは含まれません。

### サービスのチェック

Amixr インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Amixr インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Amixr のサポートチーム][2]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/amixr/images/amixr-interface.png
[2]: https://amixr.io/support/

