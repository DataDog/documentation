---
aliases:
- /ja/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configuring Teams & Organizations with Multiple Accounts
title: Azure Active Directory SAML IdP
---

## セットアップ

[Azure Active Directory シングルサインオン (SSO) とDatadog のインテグレーション][1]のチュートリアルに従って、Azure AD を SAML ID プロバイダー (IdP) として構成します。**注**: Azure AD サブスクリプションが必要です。サブスクリプションをお持ちでない場合は、[無料アカウント][2]に新規登録してください。

### Datadog

1. [Datadog SAML ページ][3]に移動します。

2. Azure からダウンロードした **SAML XML Metadata** ファイルを選択してアップロードします。

3. **SAML is ready** と **Valid IdP metadata installed** というメッセージが表示されます。

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" style="width:70%;">}}

4. **Enable** をクリックして、SAML での Azure AD シングルサインオンの使用を開始します。

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" style="width:70%;">}}

### 高度な URL

Datadog ボタンまたはリンクで SSO を使用している場合は、サインオン URL が必要です。

1. [Datadog SAML ページ][3]からシングルサインオン URL を取得します。

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" style="width:70%;">}}

2. Azure で、Azure Application の SSO Configuration セクションに移動し、**Show advanced URL settings** をオンにして、シングルサインオン URL を追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/datadog-tutorial
[2]: https://azure.microsoft.com/free/
[3]: https://app.datadoghq.com/saml/saml_setup