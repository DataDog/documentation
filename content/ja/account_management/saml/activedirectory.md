---
aliases:
- /ja/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configuring Teams & Organizations with Multiple Accounts
title: Microsoft Active Directory Federation Services SAML IdP
---

Datadog の SSO 用 SAML インテグレーションは、オーガニゼーションを外部のユーザー管理システムにリンクして、一元的なシステムで資格情報を維持および管理するための手段を提供します。このドキュメントは、Datadog 目線でシングルサインオンの概要を説明したメインの「[SAML を使用したシングルサインオン][1]」ドキュメントのアドオンとして使用してください。

Active Directory フェデレーションサービス (AD FS) 用の SAML コンフィギュレーションを開始するには、Microsoft の「[AD FS を使用してポータルに SAML 2.0 プロバイダーを構成する][2]」ドキュメントを参照してください。

SAML の構成が完了すると、ユーザーは [SAML コンフィギュレーションページ][3]で提供されるリンクを使ってログインできるようになります。ただし、ユーザーがログインするには招待とアクティベーションが必要ですのでご注意ください。新しいユーザーを招待する際には、必ず Active Directory のユーザーレコードに対応するメールアドレスを使用してください。アドレスが一致しない場合は以下のように拒否される可能性があります。

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla" style="width:60%;">}}

ほとんどの設定では、ユーザーの `user@domain` は Microsoft のログイン名になりますが、そのように制限されているわけではありません。ユーザーレコード内で使用される電子メールアドレスは、以下のように確認できます。

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK" style="width:60%;">}}

SAML に関連する Datadog のアプリ内エラーに関する質問は、[Datadog サポートチーム][4]にお問い合わせください。AD FS の SAML 設定やエラーに関するお問い合わせは、[Microsoft サポート][5]までご連絡ください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/saml/
[2]: https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-saml2-settings
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: /ja/help/
[5]: https://powerapps.microsoft.com/en-us/support/