---
title: Google SAML IdP
kind: documentation
aliases:
  - /ja/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
  - link: /account_management/multi_organization/
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
## Google を SAML IdP としてセットアップする

[Google のヘルプを参照してください][1]。

## サービスプロバイダーの詳細

**前提条件**: Datadog の SAML 構成ページで、IdP 始動の SSO がオンになっている必要があります。

* **アプリケーション名**: 任意の名前
* **説明**: 任意の説明
* **ACS の URL**: https://app.datadoghq.com/saml/saml_setup の「Assertion Consumer Service URL」に表示される URL (`/id/` を含む URL) を使用します。「Assertion Consumer Service URL」に複数の URL が表示される場合は、いずれか 1 つのみを入力してください。
* **エンティティ ID**: `https://app.datadoghq.com/account/saml/metadata.xml`
* **開始 URL**: 空白でもかまいません。または、https://app.datadoghq.com/saml/saml_setup および https://app.datadoghq.com/account/team にリストされている「Single Sign On Login URL」を使用します。
* **署名付き応答**: オフのままにします。
* **名前 ID**: 基本情報、メインのメールアドレス

## 属性のマッピング

* urn:oid:1.3.6.1.4.1.5923.1.1.1.6、基本情報、メインのメールアドレス

以下も追加してください。

* urn:oid:2.5.4.4、基本情報、姓
* urn:oid:2.5.4.42、基本情報、名

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768