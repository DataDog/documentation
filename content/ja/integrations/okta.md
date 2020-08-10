---
categories:
  - ログの収集
  - security
ddtype: crawler
dependencies: []
description: Okta セキュリティイベントログを Datadog に統合します。
doc_link: 'https://docs.datadoghq.com/integrations/okta/'
git_integration_title: okta
has_logo: true
integration_title: Okta
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: okta
public_title: Datadog-Okta インテグレーション
short_description: Okta セキュリティイベントログを Datadog に統合します。
version: '1.0'
---
## 概要

Okta を接続して Okta セキュリティイベントログを Datadog のログ管理システムに統合します。

## SAML を使用した SSO

シングルサインオンについては、[Okta を SAML IdP として構成する方法][1]を参照してください。

## セットアップ

### コンフィギュレーション

Datadog Okta インテグレーションを有効にするには

1. Okta で、_Security_ -> _API_ -> _Tokens_ に移動し、Datadog で使用する新しい API トークンを追加します。
2. Datadog で、[Okta インテグレーションタイル][2]を開きます。
3. **Configuration** タブで _Add Account_ をクリックし、次の情報を入力します。

    | パラメーター    | 説明                                                                                                     |
    | ------------ | --------------------------------------------------------------------------------------------------------------- |
    | Account name | Datadog 内で Okta アカウントを識別するために使用されます。英数字とアンダースコアのみを含めることができます。 |
    | Domain       | Okta アカウントからログを要求するために使用される一意のアカウントドメイン。有効な URL でなければなりません。                  |
    | API key      | 上記で作成した Okta アカウントの API トークン。                                                             |

4. _Save_ をクリックします。

## 収集データ

### メトリクス

Okta インテグレーションには、メトリクスは含まれません。

### イベント

Okta インテグレーションには、イベントは含まれません。

### サービスのチェック

Okta インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/account_management/saml/okta/
[2]: https://app.datadoghq.com/account/settings#integrations/okta
[3]: https://docs.datadoghq.com/ja/help/