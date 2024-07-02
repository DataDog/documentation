---
title: Auth0 SAML IdP
aliases:
  - /account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
---

## 設定およびコンフィギュレーション

[Auth0 を Datadog の ID プロバイダーとして構成する方法][1]に関するドキュメントに従って、Auth0 を SAML ID プロバイダーとして設定します。

## 追加情報

`first_name` と `give_name` は Auth0 ユーザーのルート属性です。これらは、Auth0 管理 API で作成時にのみ設定できます。[Normalized User Profiles][2]を参照してください。

追加のユーザー情報を指定するには、ユーザープロファイルの `user_metadata` セクションを使用します。次に例を示します。

{{< img src="account_management/saml/auth0_metadata.png" alt="これを更新" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[2]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema
