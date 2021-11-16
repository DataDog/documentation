---
categories:
  - Collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: Datadog イベントストリームでストーリーを参照してコメントを入力。
doc_link: https://docs.datadoghq.com/integrations/pivotal/
draft: false
git_integration_title: pivotal
has_logo: true
integration_id: pivotal
integration_title: Pivotal Tracker
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: pivotal
public_title: Datadog-Pivotal Tracker インテグレーション
short_description: Datadog イベントストリームでストーリーを参照してコメントを入力。
version: '1.0'
---
{{< img src="integrations/pivotal/pivotal_event.png" alt="Pivotal のイベント" popup="true">}}

## 概要

Pivotal Tracker を Datadog に接続して、以下のことができます。

- イベントストリーム内のストーリーの進捗を参照して議論することができます。
- ストーリーの完了をシステム内の他のイベントやメトリクスに関連付けることができます。

## セットアップ

### インストール

ストリームで Pivotal イベントを取得するには、Pivotal [プロファイルページ][1]で生成される API トークンを入力します。

{{< img src="integrations/pivotal/pivotal_token.png" alt="Pivotal のトークン" popup="true">}}

## 収集データ

### メトリクス

Pivotal Tracker インテグレーションには、メトリクスは含まれません。

### イベント

Pivotal Tracker インテグレーションには、イベントは含まれません。

### サービスのチェック

Pivotal Tracker インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://www.pivotaltracker.com/signin
[2]: https://docs.datadoghq.com/ja/help/