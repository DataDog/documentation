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
custom_kind: インテグレーション
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
  - Offering::Integration
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

OneLogin を Datadog と連携して、OneLogin で発行されるログを確認できます。OneLogin インテグレーションは、ログイン、ファイル アクセス、管理者権限の更新を含む OneLogin のあらゆる [イベント][1] を追跡するためにログを収集します。このインテグレーションは、OneLogin 用の [OOTB SIEM ルール][2] と組み合わせて、コンプライアンスおよびセキュリティに利用できます。

## セットアップ

### ログ収集
#### クライアント ID とクライアントシークレットを生成する

1. OneLogin アカウントにログインします。
2. **Administration** > **Developers** > **Api Credentials** に移動します。
3. **New Credential** をクリックし、資格情報に意味のある名前を付けます。
4. 新しい資格情報に **Read All** アクセスを許可します。
5. 新しい資格情報をクリックすると、クライアント ID とクライアントシークレットが表示されます。

#### インストールと構成

1. Datadog の [OneLogin インテグレーション タイル][3] を開きます。
2. クライアント ID、クライアントシークレットを対応するフィールドに入力します。
3. オプションで、ログに関連付けるタグをカンマ区切りで追加することができます。

### メトリクス

OneLogin インテグレーションには、メトリクスは含まれません。

### イベント

OneLogin インテグレーションには、イベントは含まれません。

### サービスチェック

OneLogin インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://developers.onelogin.com/api-docs/1/events/event-resource
[2]: https://docs.datadoghq.com/ja/security/default_rules/?search=onelogin
[3]: https://app.datadoghq.com/account/settings#integrations/onelogin
[4]: https://docs.datadoghq.com/ja/help/