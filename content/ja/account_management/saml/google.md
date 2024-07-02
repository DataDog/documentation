---
title: Google SAML IdP
aliases:
  - /account_management/faq/how-do-i-configure-google-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configuring Teams & Organizations with Multiple Accounts
---

## Google を SAML IdP としてセットアップする

[Google のヘルプを参照してください][1]。

## サービスプロバイダーの詳細

前提として、Datadog の [SAML 構成ページ][2]で、**IDP initiated SSO** にチェックを入れる必要があります。

Application Name
: 任意の名前

Description
: 任意の説明

ACS URL
: [SAML 設定ページ][2]の **Assertion Consumer Service URL** に表示される URL (`/id/` を含む URL) を使用します。「Assertion Consumer Service URL」に複数の URL が表示される場合は、いずれか 1 つのみを入力してください。

Entity ID
: [SAML 設定ページ][2]の **Entity ID** に表示されている URL を使用します。

Start URL
: 空白にするか、[SAML 設定ページ][2]に記載されている **Single Sign On Login URL** を使用することができます。

Signed Response
: オフのままにします

Name ID
: **Basic Information** と **Primary Email** を選択します

## 属性のマッピング

* urn:oid:1.3.6.1.4.1.5923.1.1.1.6、基本情報、メインのメールアドレス

以下も追加してください。

* urn:oid:2.5.4.4、基本情報、姓
* urn:oid:2.5.4.42、基本情報、名

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup
