---
app_id: rbltracker
app_uuid: 4b512bd9-ca9d-4d6a-b4f2-5fec54ce75bc
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rbltracker.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RBLTracker
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: RBL Tracker
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rbltracker/README.md
display_on_public_website: true
draft: false
git_integration_title: rbltracker
integration_id: rbltracker
integration_title: RBLTracker
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rbltracker
public_title: RBLTracker
short_description: RBLTracker は、操作が簡単なリアルタイムのブラックリスト監視機能を提供します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Security
  - Supported OS::macOS
  configuration: README.md#Setup
  description: RBLTracker は、操作が簡単なリアルタイムのブラックリスト監視機能を提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RBLTracker
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

RBLTracker は、Datadog イベントダッシュボードにリストアラートおよびリスト除外アラートを送信します。完全なインテグレーションガイドについては、[Datadog コンタクトタイプの追加][3]をご参照ください。

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
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://rbltracker.com/docs/adding-a-datadog-contact-type
[4]: https://docs.datadoghq.com/ja/events/
[5]: https://docs.datadoghq.com/ja/help/