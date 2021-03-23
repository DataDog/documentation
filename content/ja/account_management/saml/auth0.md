---
title: Auth0 を SAML IdP として構成する方法
kind: documentation
aliases:
  - /ja/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
---
## セットアップ

[Auth0 と SAML2 Web App を使用して][1] SAML をセットアップします。

1. Auth0 の **Applications** ページで、既存の**クライアント**を変更するか、新しいクライアントを作成します。
2. クライアントの **Addons** タブで、**SAML2 Web App** を有効にします。
3. SAML2 Web App の **Settings** タブで、以下の構成を入力します。

### コンフィグレーション

以下は、公式の Auth0 [Datadog SAML 構成][2]です。

**Application Callback URL**

```text
https://app.datadoghq.com/account/saml/assertion
```

**Settings**

```json
{
  "audience": "https://app.datadoghq.com/account/saml/metadata.xml",
  "mappings": {},
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

## 追加情報

`first_name` と `give_name` は Auth0 ユーザーのルート属性です。これらは、Auth0 管理 API で作成時にのみ設定できます。[Normalized User Profiles][3]を参照してください。

追加のユーザー情報を指定するには、ユーザープロファイルの `user_metadata` セクションを使用します。次に例を示します。

{{< img src="account_management/saml/auth0_metadata.png" alt="これを更新" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml/saml2webapp-tutorial
[2]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[3]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema