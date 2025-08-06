---
app_id: amixr
categories:
- アラート
- 自動化
- コラボレーション
- logs-restriction-queries-update-a-restriction-query
- notifications
- オーケストレーション
custom_kind: インテグレーション
description: Slack とのスムーズなインテグレーションで、開発者が使いやすいアラートマネジメントを実現
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Amixr
---
## 概要

Slack インテグレーションを活用して Amixr でアラートを管理することができます。

- Datadog からのアラートとその他イベントの収集・分析
- Google カレンダー連携または Slack 内でのオンコールローテーションのセットアップ
- 自動エスカレーションチェーンの構成
- 電話および SMS でのアラート受信
- GitOps でのインシデント管理のオーケストレーション

![Amixr_Interface](https://raw.githubusercontent.com/DataDog/integrations-extras/master/amixr/images/amixr-interface.png)

## セットアップ

### インストール

サーバーに追加でインストールする必要はありません。

### 設定

Amixr で構成する場合:

1. *Settings > Connect New Monitorings > Datadog > How to connect* の順に開きます
1. Datadog の Webhook URL をコピーします

Datadog で以下をコピーします。

1. サイドバーから **Integrations** ページを開きます。
1. 検索バーで **webhook** を検索します。
1. インテグレーションの名前を入力します。例: `amixr-alerts-prod`
1. 上記ステップで確認した Webhook URL を貼り付けます。
1. Save ボタンをクリックします。

### 検証

Datadog で以下をコピーします。

1. サイドバーから **Events** ページを開きます。
1. `@webhook-<インテグレーション名><任意の名前をここに入力>` と入力します。例: `@webhook-amixr-alerts-prod test alert`
1. Post ボタンをクリックします。

Amixr で構成する場合:

1. サイドバーから **Incidents** を開いて、アラートを受信したかを確認します。

## 収集データ

### メトリクス

Amixr インテグレーションには、メトリクスは含まれません。

### サービス チェック

Amixr インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Amixr インテグレーションには、イベントは含まれません。

## トラブルシューティング

Need help? Contact [Amixr support](https://amixr.io/support/).