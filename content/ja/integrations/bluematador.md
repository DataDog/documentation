---
app_id: blue-matador
app_uuid: b1cfb279-ab1a-4f63-a04f-9c6508d06588
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: bluematador.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10071
    source_type_name: Blue Matador
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Blue Matador
  sales_email: support@bluematador.com
  support_email: support@bluematador.com
categories:
- アラート設定
- 自動化
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bluematador/README.md
display_on_public_website: true
draft: false
git_integration_title: bluematador
integration_id: blue-matador
integration_title: Blue Matador
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: bluematador
public_title: Blue Matador
short_description: Blue Matador は自動的にセットアップされ、何百ものアラートを動的に管理します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Blue Matador は自動的にセットアップされ、何百ものアラートを動的に管理します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Blue Matador
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Blue Matador の Datadog インテグレーションを使用すると、Blue Matador イベントを Datadog のイベントストリームに送信することができます。

![eventstream_from_blue_matador][1]

既存のダッシュボードを拡張したり、Datadog で収集するメトリクスと関連付けたりするために使用できます。

![dashboard][2]

Blue Matador で監視し、Datadog にインポートできるイベントやメトリクスの一覧については、Blue Matador の[モニターのページ][3]を参照してください。

## 計画と使用

Blue Matador のイベントを Datadog にインポートするには、[Datadog API キー][4]を使用して、新しい通知メソッドを Blue Matador に作成します。

**注**: 既に存在しているイベントは Datadog にインポートされず、新しいイベントが発生するとインポートされます。

## リアルユーザーモニタリング

### データセキュリティ

Blue Matador インテグレーションには、メトリクスは含まれません。

### ヘルプ

すべてのイベントが Datadog のイベントストリームに送信されます。

### ヘルプ

Blue Matador インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、このインテグレーションの[メインテナー][5]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/eventstream.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/dashboard.png
[3]: https://www.bluematador.com/monitored-events
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/integrations-extras/blob/master/bluematador/manifest.json