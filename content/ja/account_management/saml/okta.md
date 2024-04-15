---
aliases:
- /ja/account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Datadog アカウントのための SAML の構成
- link: /account_management/multi_organization/
  tag: Documentation
  text: 複数のアカウントを持つチームとオーガニゼーションの構成

title: Okta SAML IdP
---

## セットアップ

Okta の [SAML アプリのインテグレーションを作成する][6]のドキュメントに従って、Okta を SAML IdP として構成します。

**注**: Datadog を Okta アプリケーションとしてセットアップする場合は、`pre-configured` コンフィギュレーションを使用するのではなく、手動で行うことをお勧めします。

**注**: US1 のお客様は、Okta の [Datadog の SAML 2.0 を構成する方法][1]のドキュメントにあるプリセット構成を使用して、Okta を SAML IdP として構成することが可能です。

## 一般設定の詳細

| Okta IDP 入力フィールド        | 予測値                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| シングルサインオン URL          | Assertion Consumer Service URL (この URL は [Configure SAML][2] ページの *Assertion Consumer Service URL* フィールドで確認できます) |
| Recipient URL               | Assertion Consumer Service URL (または *Use this for Recipient URL and Destination URL* チェックボックスをオンにします)                        |
| Destination URL             | Assertion Consumer Service URL (または *Use this for Recipient URL and Destination URL* チェックボックスをオンにします)                        |
| Audience URI (SP Entity ID) | サービスプロバイダーのエンティティ ID (この URL は [Configure SAML][2] ページの *Service Provider Entity ID* フィールドで確認できます)         |
| Name ID Format              | EmailAddress                                                                                                                   |
| 応答                    | Signed                                                                                                                         |
| Assertion Signature         | Signed                                                                                                                         |
| Signature Algorithm         | SHA256                                                                                                                         |
| Assertion Encryption        | アサーションは暗号化できますが、暗号化されていないアサーションも許可されます。                                                     |
| SAML Single Logout          | Disabled                                                                                                                       |
| authnContextClassRef        | PasswordProtectedTransport                                                                                                     |
| Honor Force Authentication  | 〇                                                                                                                            |
| SAML Issuer ID              | `http://www.okta.com/${org.externalKey}`                                                                                       |

## 属性ステートメントの詳細

| 名前       | 名前形式 (オプション) | 値                                             |
|------------|------------------------|---------------------------------------------------|
| NameFormat | URI リファレンス          | `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` |
| sn         | URI リファレンス          | `user.lastName`                                   |
| givenName  | URI リファレンス          | `user.firstName`                                  |

## グループ属性ステートメント (オプション)

これは [AuthN Mapping][3] を使用している場合にのみ必要です。

| 名前     | 名前形式 (オプション) | 値                                                                                                                     |
|----------|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| memberOf | 指定なし            | 正規表現 `.*` に一致 (このメソッドはすべてのグループを取得します。お使いのユースケースに適合しない場合は IDP 管理者にお問い合わせください) |


Datadog アカウントの SAML 構成の詳細については、[SAML に関するドキュメントページ][4]を参照してください。

Okta でアプリケーションの構成が完了する前に `IDP.XML` ファイルを Datadog にアップロードする必要がある場合は、[SAML テンプレートアプリ用の idp.xml メタデータファイルの取得に関する記事][5]で、フィールドプレースホルダーの説明を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-DataDog.html
[2]: https://app.datadoghq.com/saml/saml_setup
[3]: /ja/account_management/saml/#mapping-saml-attributes-to-datadog-roles
[4]: /ja/account_management/saml/
[5]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App
[6]: https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm?cshid=ext_Apps_App_Integration_Wizard-saml
