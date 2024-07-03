---
aliases:
- /ja/account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configuring Teams & Organizations with Multiple Accounts
title: Okta SAML IdP
---

## セットアップ

Okta の[カスタム SAML アプリのインテグレーションを作成する][1]手順に従って、Okta を SAML IdP として構成します。

**注**: Okta アプリケーションとして Datadog を手動でセットアップしてください。あらかじめ構成されている Datadog アプリケーションは使用しないでください。

{{% site-region region="us" %}}

**注**: US1 のお客様は、Okta の[既存のアプリインテグレーションの追加][7]手順でプリセット構成を使用して、Okta を SAML IdP として構成することができます。[Okta Integration Network (OIN)][2] であらかじめ構成された最新の Datadog アプリケーションを使用してください。

[7]: https://help.okta.com/en-us/content/topics/apps/apps-add-applications.htm
[2]: https://www.okta.com/integrations/
{{% /site-region %}}

## 一般設定の詳細

| Okta IDP 入力フィールド        | 予測値                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| シングルサインオン URL          | Assertion Consumer Service URL (この URL は [Configure SAML ページ][3]の *Assertion Consumer Service URL* フィールドで確認できます) |
| Recipient URL               | Assertion Consumer Service URL (または *Use this for Recipient URL and Destination URL* チェックボックスをオンにします)                        |
| Destination URL             | Assertion Consumer Service URL (または *Use this for Recipient URL and Destination URL* チェックボックスをオンにします)                        |
| Audience URI (SP Entity ID) | サービスプロバイダーのエンティティ ID (この ID は [Configure SAML ページ][3]の *Service Provider Entity ID* フィールドで確認できます)         |
| Name ID Format              | EmailAddress                                                                                                                   |
| 応答                    | Signed                                                                                                                         |
| Assertion Signature         | Signed                                                                                                                         |
| Signature Algorithm         | SHA256                                                                                                                         |
| Assertion Encryption        | アサーションは暗号化できますが、暗号化されていないアサーションも許可されます。                                                     |
| SAML Single Logout          | Disabled                                                                                                                       |
| authnContextClassRef        | PasswordProtectedTransport                                                                                                     |
| Honor Force Authentication  | はい                                                                                                                            |
| SAML Issuer ID              | `http://www.okta.com/${org.externalKey}`                                                                                       |

## 属性ステートメントの詳細

| 名前       | 名前形式 (オプション) | 値                                             |
|------------|------------------------|---------------------------------------------------|
| NameFormat | URI リファレンス          | `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` |
| sn         | URI リファレンス          | `user.lastName`                                   |
| givenName  | URI リファレンス          | `user.firstName`                                  |

## グループ属性ステートメント (オプション)

これは [AuthN Mapping][4] を使用している場合にのみ必要です。

| 名前     | 名前形式 (オプション) | 値                                                                                                                     |
|----------|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| memberOf | 指定なし            | 正規表現 `.*` に一致 (このメソッドはすべてのグループを取得します。お使いのユースケースに適合しない場合は IDP 管理者にお問い合わせください) |


Datadog アカウントの SAML 構成の詳細については、[SAML に関するドキュメントページ][5]を参照してください。

Okta でアプリケーションの構成が完了する前に `IDP.XML` ファイルを Datadog にアップロードする必要がある場合は、[SAML テンプレートアプリ用の idp.xml メタデータファイルの取得に関する記事][6]で、フィールドプレースホルダーの説明を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm?cshid=ext_Apps_App_Integration_Wizard-saml
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: /ja/account_management/saml/mapping
[5]: /ja/account_management/saml/
[6]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App