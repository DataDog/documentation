---
categories:
  - コラボレーション
ddtype: crawler
dependencies: []
description: Office 365 グループと Datadog を使用して、コラボレーション、共有、パフォーマンスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/office_365_groups/'
draft: true
git_integration_title: office_365_groups
has_logo: true
integration_title: Office 365 グループ
is_public: false
kind: インテグレーション
manifest_version: '1.0'
name: office_365_groups
public_title: Datadog-Office 365 Groups インテグレーション
short_description: Office 365 グループと Datadog を使用して、コラボレーション、共有、パフォーマンスを追跡
version: '1.0'
---
## 概要

Office 365 Groups インテグレーションは、Datadog のイベントやモニター通知などを Office 365 グループのチャンネルに直接提供します。
これにより、パフォーマンスの問題について常に最新の情報をチームに提供し、グラフを共有できます。また、特定の Office 365 グループチャンネルにアラートやイベントを送信することができます。コネクターは、チーム全体に自動的に最新の情報を提供し続けるための手段を提供します。[Datadog ストリームからチームチャンネル名をメンションする][1]ことで、情報を広く伝えることができ、誰もが常に情報を把握できます。チームメンションを使用してダッシュボードのグラフにアノテーションを追加し、スナップショットをチームで共有できます。

## セットアップ

### コンフィグレーション

Datadog Office 365 Groups インテグレーションを有効にするには、以下のようにします。

1. [Datadog-Office 365 インテグレーション][2]を使用して、Datadog が Office 365 に接続することを許可します。
2. Datadog の情報の送信先となるグループ名と、それらに[関連付けられている Webhook URL][3] を入力します。

## 収集データ

### メトリクス

Office 365 Groups インテグレーションには、メトリクスは含まれません。

### イベント

Office 365 Groups インテグレーションには、イベントは含まれません。

### サービスのチェック

Office 365 Groups インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[2]: https://app.datadoghq.com/account/settings#integrations/office_365_groups
[3]: https://docs.microsoft.com/en-us/outlook/actionable-messages/send-via-connectors#get-a-connector-webhook-url-for-your-inbox
[4]: https://docs.datadoghq.com/ja/help/