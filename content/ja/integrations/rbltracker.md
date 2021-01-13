---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/rbltracker/README.md'
display_name: RBLTracker
draft: false
git_integration_title: rbltracker
guid: 94218bd0-8cc3-4686-8b67-ea9110b77092
integration_id: rbltracker
integration_title: RBLTracker
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.1
metric_prefix: ''
metric_to_check: ''
name: rbltracker
public_title: Datadog-RBLTracker インテグレーション
short_description: RBLTracker は、操作が簡単なリアルタイムのブラックリスト監視機能を提供します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

RBLTracker は、電子メール、Web サイト、およびソーシャルメディアに関して、使いやすいリアルタイムのブラックリスト監視機能を提供します。

[RBLTracker][1] アカウントを Datadog に接続して、以下のことができます。

- RBLTracker からダッシュボードにリストイベントをプッシュすることができます。
- RBLTracker からダッシュボードにリスト除外イベントをプッシュすることができます。

## セットアップ

RBLTracker のセットアップには、Webhook を使用します。

1. Datadog で、**Integrations -> APIs** セクションから [API キーをコピー][2]します。
2. [RBLTracker][1] で、RBLTracker ポータルの **Manage -> Contacts** セクションから新しい Datadog コンタクトタイプを作成します。
3. Datadog **API キー**を貼り付けます。
4. (オプション) この新しいコンタクトのコンタクトスケジュールを調整します。

RBLTracker は、Datadog イベントダッシュボードにリストアラートおよびリスト除外アラートを送信します。完全なインテグレーションガイドについては、[こちら][3]をクリックしてください。

## 収集データ

### メトリクス

RBLTracker チェックには、メトリクスは含まれません。

### イベント

RBLTracker リスト/リスト除外イベントを [Datadog のイベントストリーム][4]にプッシュします。

### サービスのチェック

RBLTracker チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://rbltracker.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://rbltracker.com/docs/adding-a-datadog-contact-type
[4]: https://docs.datadoghq.com/ja/events/
[5]: https://docs.datadoghq.com/ja/help/