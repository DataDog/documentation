---
title: Azure Active Directory SAML IdP
kind: documentation
aliases:
  - /ja/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
  - link: /account_management/multi_organization/
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
次の手順に従って、Azure AD を Datadog 内の SAML ID プロバイダー (IdP) として構成します。**注**: Azure AD サブスクリプションが必要です。サブスクリプションをお持ちでない場合は、[無料アカウント][1]に新規登録してください。

## コンフィグレーション
### Azure

1. [Azure ポータル][2]を開き、グローバル管理者または共同管理者としてサインインします。

2. _Azure Active Directory_ -> _Enterprise applications_ -> _New application_ に移動します。

3. **Add from the gallery** セクションまでスクロールし、検索ボックスに **Datadog** と入力します。

4. 結果パネルから **Datadog** を選択します。

5. **Name** テキストボックスにアプリケーションの名前を入力し、**Add** をクリックします。

6. アプリケーションを追加したら、アプリケーションの左側のナビゲーションメニューから **Single sign-on** に移動します。

7. **Select a single sign-on method** ページで、**SAML** をクリックします。

8. [Datadog SAML ページ][3]から `Service Provider Entity ID` と `Assertion Consumer Service URL` を取得します。デフォルト値は次のとおりです。

    |                                |                                                                                                                |
    |--------------------------------|----------------------------------------------------------------------------------------------------------------|
    | Service Provider Entity ID     | `https://{{< region-param key="dd_full_site" >}}/account/saml/metadata.xml` |
    | Assertion Consumer Service URL | `https://{{< region-param key="dd_full_site" >}}/account/saml/assertion`    |

9.  Azure で、上記で取得した値を追加し、保存をクリックします。

    `Service Provider Entity ID` を **Identifier** に<br>
    `Assertion Consumer Service URL` を **Reply URL** に

10. **User Identifier** を `user.mail` に設定し、保存をクリックします。

11. **SAML Signing Certificate** セクションに移動し、**Notification Email** が正しいことを確認します。アクティブな署名証明書の有効期限が近づくと、証明書の更新手順が記載された通知が、この電子メールアドレスに送信されます。

12. 同じ **SAML Signing Certificate** セクションで、**Federation Metadata XML** を見つけ、Download を選択して証明書をダウンロードし、保存します。

### Datadog

1. [Datadog SAML ページ][3]に移動します。

2. Azure からダウンロードした **SAML XML Metadata** ファイルを選択してアップロードします。

3. **SAML is ready** と **Valid IdP metadata installed** というメッセージが表示されます。

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11"  style="width:70%;">}}

4. **Enable** をクリックして、SAML での Azure AD シングルサインオンの使用を開始します。

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12"  style="width:70%;">}}

## 高度な URL

Datadog ボタンまたはリンクで SSO を使用している場合は、サインオン URL が必要です。

1. [Datadog SAML ページ][3]からシングルサインオン URL を取得します。

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13"  style="width:70%;">}}

2. Azure で、Azure Application の SSO Configuration セクションに移動し、**Show advanced URL settings** をオンにして、シングルサインオン URL を追加します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://azure.microsoft.com/free/
[2]: https://portal.azure.com
[3]: https://app.datadoghq.com/saml/saml_setup