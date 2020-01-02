---
categories:
  - notification
ddtype: クローラー
dependencies: []
description: xMatters を Datadog のアラートとイベントで通知チャンネルとして使用
doc_link: 'https://docs.datadoghq.com/integrations/xmatters/'
git_integration_title: xmatters
has_logo: true
integration_title: xMatters
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: xmatters
public_title: Datadog-xMatters インテグレーション
short_description: xMatters を Datadog のアラートとイベントで通知チャンネルとして使用
version: '1.0'
---
{{< img src="integrations/xmatters/xmatters.png" alt="Xmatters overview"  >}}

## 概要

xMatters IT Alerting は、さまざまなチームとサイロにまたがるツールチェーンをユーザーとつなぎあわせます。xMatters が通信を自動化するため、システムの停止を事前に防止し、解決担当者を迅速に配置し、重大なインシデントを管理し、利害関係者に最新情報を提供することができます。

Datadog を xMatters に接続して、以下のことができます。

* xMatters の通知をトリガーして、応答をすべての IT ツールに統合することができます。

* エスカレーションルール、オンコールスケジュール、スキル、および場所に基づいて、解決担当者に通知することができます。

* Datadog 内から xMatters の現在のオンコールスケジュールを確認することができます。

* 他の xMatters インテグレーションをトリガーしたり、タスクワークフローを開始する応答オプションを構成できます。タスクには、チケットの作成、コンソールの更新、追加通知の送信、チャットや電話会議によるコラボレーションの開始などがあります。

* 付加的な報告や分析を運用プロセスに追加できます。

## セットアップ
### インストール

xMatters-Datadog インテグレーションをセットアップするには、次の手順に従ってください。

* xMatters で使用する[新しいアプリケーションキー][1]を生成します。

* [xMatters 通信プランを構成][2]します。

* [Datadog Webhook インテグレーション][3]を通して、各 xMatters Webhook を構成します。

## 収集されたデータ
### メトリック

xMatters インテグレーションには、メトリクスは含まれません。

### イベント
xMatters インテグレーションには、イベントは含まれません。

### サービスチェック
xMatters インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://support.xmatters.com/hc/en-us/articles/214369486
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}