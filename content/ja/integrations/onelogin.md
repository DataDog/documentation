---
app_id: onelogin
app_uuid: e895d126-f1a3-421a-96d7-03e870447e23
assets:
  dashboards:
    OneLogin-Overview: assets/dashboards/OneLogin-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 617
    source_type_name: OneLogin
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- セキュリティ
dependencies: []
description: OneLogin
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/onelogin/
draft: false
git_integration_title: onelogin
has_logo: false
integration_id: onelogin
integration_title: OneLogin
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: onelogin
public_title: OneLogin
short_description: OneLogin のイベントログとインテグレーションします。
supported_os:
- linux
- windows
- macos
team: web-integrations
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  configuration: README.md#Setup
  description: OneLogin のイベントログとインテグレーションします。
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: OneLogin
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Datadog と OneLogin を接続すると、OneLogin が公開するログを見ることができます。

## 計画と使用

### 収集データ
#### クライアント ID とクライアントシークレットを生成する

1. OneLogin アカウントにログインします。
2. **Administration** > **Developers** > **Api Credentials** に移動します。
3. **New Credential** をクリックし、資格情報に意味のある名前を付けます。
4. 新しい資格情報に **Read All** アクセスを許可します。
5. 新しい資格情報をクリックすると、クライアント ID とクライアントシークレットが表示されます。

#### インストールと構成

1. Datadog [OneLogin インテグレーションタイル][1]を開きます。
2. クライアント ID、クライアントシークレットを対応するフィールドに入力します。
3. オプションで、ログに関連付けるタグをカンマ区切りで追加することができます。

### データセキュリティ

OneLogin インテグレーションには、メトリクスは含まれません。

### ヘルプ

OneLogin インテグレーションには、イベントは含まれません。

### サービスチェック

OneLogin インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#integrations/onelogin
[2]: https://docs.datadoghq.com/ja/help/