---
app_id: amixr
app_uuid: 051b4bbe-d7cc-46bf-9a66-169ab7d5a4aa
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: amixr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Amixr
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Amixr
  sales_email: ildar@amixr.io
  support_email: ildar@amixr.io
categories:
- アラート設定
- 自動化
- コラボレーション
- インシデント
- notification
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/amixr/README.md
display_on_public_website: true
draft: false
git_integration_title: amixr
integration_id: amixr
integration_title: Amixr
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: amixr
oauth: {}
public_title: Amixr
short_description: Slack とのスムーズなインテグレーションで、開発者が使いやすいアラートマネジメントを実現
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Collaboration
  - Category::Incidents
  - Category::Notification
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Slack とのスムーズなインテグレーションで、開発者が使いやすいアラートマネジメントを実現
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amixr
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

### APM に Datadog Agent を構成する

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