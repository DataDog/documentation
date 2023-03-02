---
app_id: blink
app_uuid: f2bd43a7-bbc5-4f69-89b7-437afbbff9fd
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: ./assets/service_checks.json
    source_type_name: Blink
author:
  homepage: https://www.blinkops.com/
  name: Blink
  sales_email: support@blinkops.com
  support_email: liav@blinkops.com
categories:
- orchestration
- notification
- 自動化
- クラウド
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/blink/README.md
display_on_public_website: true
draft: false
git_integration_title: blink
integration_id: blink
integration_title: Blink
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: blink
oauth: {}
public_title: Blink
short_description: モダンな CloudOps のためのノーコード自動化。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Orchestration
  - Category::Notification
  - Category::Automation
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: モダンな CloudOps のためのノーコード自動化。
  media:
  - caption: Blink の UI で Datadog のインシデントを作成する方法を紹介。
    image_url: ./images/incident.png
    media_type: image
  - caption: DataDog のアクティブなインシデントをすべてリストアップした Blink Automation。
    image_url: ./images/list-incidents.png
    media_type: image
  - caption: Blink とインテグレーションするための Datadog の接続を作成する。
    image_url: ./images/connection-creation.png
    media_type: image
  - caption: Datadog にインシデントを作成する Blink Automation の自動スケジュール。
    image_url: ./images/new-incident.png
    media_type: image
  overview: README.md#Overview
  support: support@blinkops.com
  title: Blink
---



## 概要

[Blink][1] インテグレーションは、Blink Automations で使用可能なノーコードアクションとトリガーのコレクションです。手動で API コールやスクリプトを書く代わりに、Blink の視覚化されたエディターを使って Datadog API アクションをワークフローにドラッグアンドドロップしたり、[ライブラリ][2]から既存の何百もの既成オートメーションの1 つを使用することができます。

このインテグレーションにより、以下のことが可能になります。
1. Datadog の新しいインシデントに反応して Blink 内でオートメーションをトリガーする
2. Blink で Datadog のインシデントを作成、更新する
3. Blink の Datadog イベントストリームからインシデントやイベントを表示する

[ドキュメントサイト][3]でアクションと機能の全リストをご覧いただけます。

## セットアップ

Datadog のワークスペースと Blink の接続方法については、[弊社ドキュメント][4]をご覧ください。

## 収集データ

### イベント

このインテグレーションは、イベントとインシデントを Datadog に送信し、Blink 内で関連するインシデントを検索して更新することができます。

### アラート設定

Blink で Datadog のモニターを表示、変更、作成することができます。

### メトリクス

Blink にはメトリクスは含まれていませんが、Blink のオートメーションで使用するために、Datadog 環境からメトリクスをクエリしてリストアップすることができます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://www.blinkops.com/
[2]: https://library.blinkops.com/
[3]: https://www.docs.blinkops.com/docs/Integrations/Datadog/Actions
[4]: https://www.docs.blinkops.com/docs/Integrations/Datadog/
[5]: https://docs.datadoghq.com/ja/help/