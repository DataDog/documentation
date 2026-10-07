---
app_id: okta
app_uuid: 1bbd0367-66bf-41c9-be58-8f3313afd0e5
assets:
  dashboards:
    Okta-Overview: assets/dashboards/Okta-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 236
    source_type_name: Okta
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: okta
integration_id: okta
integration_title: Okta
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: okta
public_title: Okta
short_description: Okta セキュリティイベントログを Datadog に統合します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Okta セキュリティイベントログを Datadog に統合します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Okta
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Okta を接続して Okta システムイベントログを Datadog Log Management に統合します。

これらのログにより、すべてのアプリケーションやユーザーなどからのアクセスおよびライフサイクルイベントの可視性が向上します。Datadog Okta インテグレーションにより、アプリケーションへの脅威の検出、ユーザーアクティビティの追跡、認証と承認の問題のデバッグ、規制遵守の監査証跡の作成が可能になります。

Datadog が追跡できるすべての Okta イベントについては、[Okta Event Types API][1] を参照してください。

## SAML を使用した SSO

シングルサインオンについては、[Okta を SAML IdP として構成する][2]を参照してください。

## セットアップ

### 構成

Datadog Okta インテグレーションを有効にするには、Okta Integration Network 上の Datadog アプリの資格情報を使用した OAuth による方法と、API キーによる方法があります。

どちらの方法も以下のフィールドが必要です。

| パラメーター            | 説明                                                                                                                                                      |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Account name         | Datadog で Okta アカウントを識別します。アカウント名には、英数字とアンダースコアのみを使用できます。                                              |
| ドメイン               | Okta アカウントからログをリクエストするために使用される一意のアカウントドメイン。URL は有効で、`https://<your_domain>.okta.com` で始まる必要があります。                    |
| Authorization method | Okta から認可を受ける方法を指定します。方法は 2 つあり、アカウント API キーか、Okta インテグレーションネットワーク上の Datadog アプリからの資格情報です。 |


OAuth を使用してインテグレーションを有効にするには

1. Okta で、**Applications** > **API Services Integration** > **Add Integration** > **Datadog** に移動します。
2. インストール後、クライアント ID とクライアントシークレットの一組の資格情報が提供されます。これらの資格情報をコピーしてください。
3. Datadog で、[Okta インテグレーションタイル][3]を開きます。
4. **Configure** タブで **Add Account** をクリックし、次の情報を入力します。

    | パラメーター            | 説明                                                                                                                                                      |
    |----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | クライアント ID            | Okta が提供するクライアント ID。                                                                                                                                  |
    | クライアントシークレット        | Okta が提供するクライアントシークレット。                                                                                                                              |

5. **Save** をクリックします。


API キーを使用してインテグレーションを有効にするには

1. Okta で、**Security** > **API** > **Tokens** に移動し、新しい API トークンを追加します。
2. Datadog で、[Okta インテグレーションタイル][3]を開きます。
3. **Configure** タブで **Add Account** をクリックし、次の情報を入力します。

    | パラメーター | 説明                           |
    |-----------|---------------------------------------|
    | API key   | Okta アカウントの API トークンです。必要な最低権限は、読み取り専用の管理者権限です。 |

4. **Save** をクリックします。

## 収集データ

### メトリクス

Okta インテグレーションには、メトリクスは含まれません。

### イベント

Okta インテグレーションには、イベントは含まれません。

### サービスチェック

Okta インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://developer.okta.com/docs/reference/api/event-types/
[2]: https://docs.datadoghq.com/ja/account_management/saml/okta/
[3]: https://app.datadoghq.com/account/settings#integrations/okta
[4]: https://docs.datadoghq.com/ja/help/