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
次の手順に従って、Azure AD を Datadog 内の SAML ID プロバイダー (IdP) として構成します。**注**: Azure AD プレミアムサブスクリプションが必要です。

## コンフィグレーション
### Azure

1. [Azure ポータル][1]を開き、グローバル管理者または共同管理者としてサインインします。

2. _Azure Active Directory_ -> _Enterprise applications_ -> _New application_ に移動します。

3. **Add your own app** セクションで **Non-gallery application** を選択します。

4. **Name** テキストボックスにアプリケーションの名前を入力し、**Add** をクリックします。

5. アプリケーションを追加したら、アプリケーションの左側のナビゲーションメニューから **Single sign-on** に移動します。

6. **Single Sign-on Mode** ドロップダウンで **SAML-based Sign-on** を選択します。

7. [Datadog SAML ページ][2]から `Service Provider Entity ID` と `Assertion Consumer Service URL` を取得します。デフォルト値は次のとおりです。

    |                                |                                                                            |
    |--------------------------------|----------------------------------------------------------------------------|
    | Service Provider Entity ID     | `https://app.{{< region-param key="dd_site" >}}/account/saml/metadata.xml` |
    | Assertion Consumer Service URL | `https://app.{{< region-param key="dd_site" >}}/account/saml/assertion`    |

8. Azure で、上記で取得した値を追加します。

    `Service Provider Entity ID` を **Identifier** に<br>
    `Assertion Consumer Service URL` を **Reply URL** に

9. **User Identifier** を `user.mail` に設定します。

10. ページ下部の **Notification Email** に入力します。アクティブな署名証明書の有効期限が近づくと、証明書の更新手順が記載された通知が、この電子メールアドレスに送信されます。

11. **SAML Signing Certificate** セクションに移動し、**SAML XML Metadata** ファイルをダウンロードします。

12. **SSO 構成セクション**のトップに移動し、**保存**をクリックします。

### Datadog

1. [Datadog SAML ページ][2]に移動します。

2. Azure からダウンロードした **SAML XML Metadata** ファイルを選択してアップロードします。

3. **SAML is ready** と **Valid IdP metadata installed** というメッセージが表示されます。

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11"  style="width:70%;">}}

4. **Enable** をクリックして、SAML での Azure AD シングルサインオンの使用を開始します。

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12"  style="width:70%;">}}

## 高度な URL

Datadog ボタンまたはリンクで SSO を使用している場合は、サインオン URL が必要です。

1. [Datadog SAML ページ][2]からシングルサインオン URL を取得します。

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13"  style="width:70%;">}}

2. Azure で、Azure Application の SSO Configuration セクションに移動し、**Show advanced URL settings** をオンにして、シングルサインオン URL を追加します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://portal.azure.com
[2]: https://app.datadoghq.com/saml/saml_setup