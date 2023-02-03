---
app_id: flagsmith
app_uuid: 0ad66873-2958-4ca5-ae25-ee893b4c6e31
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: flagsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Flagsmith
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith
integration_id: flagsmith
integration_title: Flagsmith
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: flagsmith
oauth: {}
public_title: Flagsmith
short_description: Flagsmith のフラグ変更イベントが Datadog に表示されます
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Notification
  configuration: README.md#Setup
  description: Flagsmith のフラグ変更イベントが Datadog に表示されます
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---



## 概要

[Flagsmith][1] は、Web、モバイル、およびサーバー側のアプリケーション全体の機能管理を容易にします。Datadog Flagsmith インテグレーションにより、Datadog 内でフラグの変更に関する情報を直接表示できるようになります。

すべてのフラグ変更イベントは Datadog に送信されます。これらのイベントは、変更された環境でタグ付けされています。

## セットアップ

[Flagsmith インテグレーションタイル][2]に、[Datadog API キー][3]を入力します。API URL には、米国のサイトを使用している場合は `https://api.datadoghq.com`、EU のサイトを使用している場合は `https://api.datadoghq.eu` と入力します。

## 収集データ

### メトリクス

Flagsmith インテグレーションには、メトリクスは含まれません。

### サービスのチェック

Flagsmith インテグレーションには、サービスのチェック機能は含まれません。

### イベント

すべての Flagsmith イベントが Datadog のイベントストリームに送信されます。

## トラブルシューティング

サポートが必要な場合は、 [Flagsmith のドキュメント][4]をご覧いただくか、[Datadog サポート][5]までお問い合わせください。

[1]: https://www.flagsmith.com/
[2]: https://app.datadoghq.com/account/settings#integrations/flagsmith
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.flagsmith.com/integrations/datadog/
[5]: https://docs.datadoghq.com/ja/help/