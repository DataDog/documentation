---
categories:
  - Collaboration
ddtype: crawler
dependencies: []
description: Datadog アラートとグラフを Moxtra に送信。
doc_link: 'https://docs.datadoghq.com/integrations/moxtra/'
draft: false
git_integration_title: moxtra
has_logo: true
integration_id: moxtra
integration_title: Moxtra
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: moxtra
public_title: Datadog-Moxtra インテグレーション
short_description: Datadog アラートとグラフを Moxtra に送信。
version: '1.0'
---
## 概要

Moxtra は、出先でもデスクでも作業を可能にする埋め込み可能なマルチレイヤークラウドコラボレーションサービスを提供します。

Moxtra を統合して、以下のことができます。

- メトリクスアラートがトリガーされたときに通知を受けることができます。
- チーム内でグラフを共有できます。

## セットアップ

### インストール

このインテグレーションを有効にするには、以下の手順に従ってください。

1. Moxtra アカウントで、Integrations タブに移動します。
2. Datadog を検索し、インテグレーションを追加します。
3. Datadog の Webhook 対応サービス [Datadog-Webhook タイル][1]に Webhook URL を追加します。
4. [Moxtra インテグレーションタイル][2]の **Install Integration** ボタンをクリックします。

## 収集データ

### メトリクス

Moxtra インテグレーションには、メトリクスは含まれません。

### イベント

Moxtra インテグレーションには、イベントは含まれません。

### サービスのチェック

Moxtra インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
[2]: https://app.datadoghq.com/account/settings#integrations/moxtra
[3]: https://docs.datadoghq.com/ja/help/