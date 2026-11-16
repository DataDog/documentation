---
aliases:
- /ja/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
description: 安全なシングルサインオンのために、サービスプロバイダーの詳細と属性マッピングを使用し、Google を Datadog の SAML ID
  プロバイダーとして構成します。
further_reading:
- link: /account_management/saml/
  tag: ドキュメント
  text: Datadog アカウントのための SAML の構成
- link: /account_management/multi_organization/
  tag: ドキュメント
  text: 複数のアカウントを持つチームと組織の構成
title: Google SAML IdP
---
## Google を SAML IdP としてセットアップする {#setting-up-google-as-a-saml-idp}

[Google の専用手順を参照][1]

## サービスプロバイダーの詳細 {#service-provider-details}

前提として、Datadog の [SAML 構成ページ][2]で {{< ui >}}IDP initiated SSO{{< /ui >}} にチェックを入れる必要があります。

アプリケーション名
: 任意の名前

説明
: 任意の説明

ACS URL
: [SAML セットアップページ][2]の {{< ui >}}Assertion Consumer Service URL for IdP Initiated Login{{< /ui >}} の下に表示される URL (`/id/` を含む URL) を使用します。Assertion Consumer Service URL に複数の値が表示される場合は、そのうちの 1 つだけを入力してください。

エンティティ ID
: [SAML セットアップページ][2]の {{< ui >}}Entity ID{{< /ui >}} の下に表示される URL を使用します。

開始 URL
: 空白のままにするか、[SAML セットアップページ][2]に記載されている {{< ui >}}Single Sign On Login URL{{< /ui >}} を使用します。

署名付き応答
: オフのまま

名前 ID
: {{< ui >}}Basic Information{{< /ui >}} と {{< ui >}}Primary Email{{< /ui >}} を選択します。

## 属性マッピング {#attribute-mapping}

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "基本情報" "メインのメールアドレス"

以下も追加してください。

* "urn:oid:2.5.4.4" "基本情報" "姓"
* "urn:oid:2.5.4.42" "基本情報" "名"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup