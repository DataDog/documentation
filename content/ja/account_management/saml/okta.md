---
title: Okta を SAML IdP として構成する方法
kind: documentation
aliases:
  - /ja/account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
  - link: /account_management/multi_organization/
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
Datadog を Okta アプリケーションとしてセットアップする場合は、「事前設定された」構成を使用するのではなく、手動で行うことをお勧めします。

## 一般設定の詳細

* **Single Sign On URL**: https://app.datadoghq.com/account/saml/assertion
    (注: IdP 始動のログインを使用する場合は、Datadog で IdP 始動のログインを有効にした後に生成される、ID 固有の公開 URL を使用してください。この URL は、'[Configure SAML][1]' ページの 'Assertion Consumer Service URL' フィールドにあります。URL の例: `https://app.datadoghq.com/account/saml/assertion/id/` 。この URL は、**Recipient URL** フィールドと **Destination URL** フィールドにも適用されます。)

* **Recipient URL**: https://app.datadoghq.com/account/saml/assertion (または、Okta で「Use this for Recipient URL and Destination URL」チェックボックスをオンにします。)

* **Destination URL**: https://app.datadoghq.com/account/saml/assertion (または、Okta で「Use this for Recipient URL and Destination URL」チェックボックスをオンにします。)

* **Audience URI (SP Entity ID)**: https://app.datadoghq.com/account/saml/metadata.xml

* **Default Relay State**:

* **Name ID Format**: EmailAddress

* **Response**: Signed

* **Assertion Signature**: Signed

* **Signature Algorithm**: RSA_SHA256

* **Digest Algorithm**: SHA256
* **Assertion Encryption**: アサーションは暗号化できますが、暗号化されていないアサーションも許可されます。
* **SAML Single Logout**: Disabled
* **authnContextClassRef**: PasswordProtectedTransport
* **Honor Force Authentication**: Yes
* **SAML Issuer ID**: `http://www.okta.com/`

## 属性ステートメントの詳細

* **NameFormat**: urn:oasis:names:tc:SAML:2.0:attrname-format:uri
* **sn**: user.lastName
* **givenName**: user.firstName

Datadog アカウントの SAML 構成の詳細については、[SAML に関するドキュメント][2]を参照してください。カスタムサブドメイン機能をご使用の場合も、同じドキュメントで詳細をご確認いただけます。

Okta でアプリケーションの構成が完了する前に `IDP.XML` ファイルを Datadog にアップロードする必要がある場合は、[SAML テンプレートアプリ用の idp.xml メタデータファイルの取得に関する記事][3]で、フィールドプレースホルダーの説明を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/saml/saml_setup
[2]: /ja/account_management/saml/
[3]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App