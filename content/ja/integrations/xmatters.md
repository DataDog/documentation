---
categories:
- notification
dependencies: []
description: xMatters を Datadog のアラートとイベントの通知チャンネルとして使用。
doc_link: https://docs.datadoghq.com/integrations/xmatters/
draft: false
git_integration_title: xmatters
has_logo: true
integration_id: xmatters
integration_title: xMatters
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: xmatters
public_title: Datadog-xMatters インテグレーション
short_description: xMatters を Datadog のアラートとイベントで通知チャンネルとして使用。
team: web-integrations
version: '1.0'
---

{{< img src="integrations/xmatters/xmatters.png" alt="xMatters の概要" popup="true">}}

## 概要

xMatters は、技術的な問題がビジネス上の問題になることを防ぐデジタルサービス可用性プラットフォームです。大企業、アジャイル SRE、イノベーションに従事する DevOps チームが、そのインシデントに対する事前対応、自動化、そしてサービス管理に利用し、高度にフラグメント化された現代の技術環境において運用の可視化と制御を維持しています。Datadog 向け xMatters は、ユーザーをさまざまなチームとサイロにまたがるツールチェーンにつなげます。

Datadog を xMatters に接続して、以下のことができます。

- xMatters の通知をトリガーして、応答をすべての IT ツールに統合することができます。
- エスカレーションルール、オンコールスケジュール、スキル、および場所に基づいて、解決担当者に通知することができます。
- Datadog 内から xMatters の現在のオンコールスケジュールを確認することができます。
- 他の xMatters インテグレーションをトリガーしたり、タスクワークフローを開始する応答オプションを構成できます。タスクには、チケットの作成、コンソールの更新、追加通知の送信、チャットや電話会議によるコラボレーションの開始などがあります。
- 付加的な報告や分析を運用プロセスに追加できます。

## セットアップ

### インストール

xMatters-Datadog インテグレーションをセットアップするには、次の手順に従ってください。

- xMatters で使用する[新しいアプリケーションキー][1]を生成します。
- [xMatters 通信プランを構成][2]します。
- [Datadog Webhook インテグレーション][3]を使って、各 xMatters Webhook を構成します。

## 収集データ

### メトリクス

xMatters インテグレーションには、メトリクスは含まれません。

### イベント

xMatters インテグレーションには、イベントは含まれません。

### サービスのチェック

xMatters インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://help.xmatters.com/integrations/#cshid=DATADOG
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/ja/help/