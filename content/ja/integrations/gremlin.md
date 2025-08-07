---
app_id: gremlin
categories:
- 問題追跡
custom_kind: インテグレーション
description: Gremlin で発生したイベントを Datadog に送信
further_reading:
- link: https://www.datadoghq.com/blog/gremlin-datadog/
  tag: blog
  text: How Gremlin monitors its own Chaos Engineering service with Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Gremlin
---
## 概要

Gremlin の攻撃の表示、再実行、停止を Datadog から直接行うことができます。

Pairing Gremlin with Datadog's [Events](https://docs.datadoghq.com/getting_started/#events) is an effective way to add failure-testing context to your Datadog workflows.

- ダッシュボードに攻撃イベントを重ねて表示することで、Gremlin がメトリクスにいつどのように影響しているかを正確に特定できます。
- Show, Rerun, and Halt Gremlin attacks from your Datadog [Event Stream](https://app.datadoghq.com/event/stream)

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png)

## セットアップ

### 設定

To activate this integration, you need to pass your Datadog API key to Gremlin. This is done on the [Integrations Page](https://app.gremlin.com/settings/integrations), by clicking the **Add** button on the row for **Datadog**. You are prompted for your **Datadog API key**. Once entered, the integration is initialized.

- API key: <span class="hidden-api-key">${api_key}</span>

You should start seeing events from this integration in your [Event Stream](https://app.datadoghq.com/event/stream).

## 収集データ

### メトリクス

Gremlin インテグレーションは、メトリクスを提供しません。

### イベント

The Gremlin integration sends events to your [Datadog Event Stream](https://app.gremlin.com/settings/integrations) when attacks are started or stopped on Gremlin.

### サービス チェック

Gremlin インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [How Gremlin monitors its own Chaos Engineering service with Datadog](https://www.datadoghq.com/blog/gremlin-datadog/)