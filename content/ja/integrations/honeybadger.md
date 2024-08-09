---
app_id: honeybadger
app_uuid: 385c386e-6394-41f4-8c92-5944e6b203f5
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 130
    source_type_name: Honeybadger
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- issue tracking
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: honeybadger
integration_id: honeybadger
integration_title: Honeybadger
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: honeybadger
public_title: Honeybadger
short_description: イベントストリームで Honeybadger の例外を表示、検索、議論。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::問題の追跡
  configuration: README.md#Setup
  description: イベントストリームで Honeybadger の例外を表示、検索、議論。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Honeybadger
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Honeybadger は例外とアップタイムを監視し、Web アプリをエラーフリーに保ちます。Honeybadger を Datadog に接続することで、Datadog のイベントストリームで Honeybadger のアラートを受け取ることができます。

## 計画と使用

### インフラストラクチャーリスト

Honeybadger からエラーをキャプチャするには、以下のようにします。

1. Honeybadger の[プロジェクトリスト][1]を開きます。
2. 監視するプロジェクトの "Settings" をクリックします。
3. "Alerts & Integrations" をクリックします。
4. 新しいインテグレーションとして "Datadog" を選択します。
5. [API キー][2]を追加します。
6. インテグレーションを保存します。
7. [Honeybadger インテグレーションタイル][3]の **Install Integration** ボタンをクリックします。

## リアルユーザーモニタリング

### データセキュリティ

Honeybadger インテグレーションには、メトリクスは含まれません。

### ヘルプ

Honeybadger インテグレーションには、イベントは含まれません。

### ヘルプ

Honeybadger インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.honeybadger.io/users/sign_in
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings#integrations/honeybadger
[4]: https://docs.datadoghq.com/ja/help/