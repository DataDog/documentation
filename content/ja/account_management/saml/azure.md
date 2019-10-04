---
title: Azure AD を SAML IdP として構成する方法
kind: documentation
aliases:
  - /ja/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
disable_toc: true
further_reading:
  - link: account_management/saml
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
  - link: account_management/multi_organization
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
ここでは、Datadog で Azure AD を SAML IdP として構成する手順を説明します。
**注**: この設定には、Azure AD の Premium サブスクリプションが必要です。

#### コンフィグレーション

1. `https://portal.azure.com/` に移動します。

2. Azure にログインしたら、左側のメニューで Azure Active Directory タブに移動します。

3. **エンタープライズアプリケーション**サービスを選択します。

4. **新しいアプリケーション**ボタンをクリックします。

5. **ギャラリー以外のアプリケーション**を選択します。

    {{< img src="account_management/saml/non_gallery_application.png" alt="Non Gallery application" responsive="true" style="width:20%;">}}

6. アプリケーションに名前を付けます (例: **DatadogSSO_test**)。

7. **追加**をクリックします。

8. アプリケーションが正しく追加されたら、**シングルサインオンを構成する (必須)**に移動します。

9. シングルサインオンのモードとして **SAML ベースのサインオン**を選択します。

    {{< img src="account_management/saml/saml_based_sign_on.png" alt="Saml Based Sign on" responsive="true" style="width:70%;">}}

10. [Datadog の SAML ページ][1]に移動し、ページの右側で、**Service Provider Entity ID** と **Assertion Consumer Service** の URL を見つけます。これらの URL の値をコピーして、**識別子**と**応答 URL** のテキストフォームにそれぞれ貼り付けます。
    Datadog で以下をコピーします。

    {{< img src="account_management/saml/Step10Redo.png" alt="Step10Redo" responsive="true" style="width:70%;">}}

    Azure ポータルで貼り付けます。

    {{< img src="account_management/saml/set_values_azure.png" alt="Set value azure" responsive="true" style="width:70%;">}}

11. **ユーザー識別子**の値として、`user.mail` を設定します。

    {{< img src="account_management/saml/user_identifier.png" alt="User Identifier" responsive="true" style="width:70%;">}}

12. ページ下部の**通知用電子メール**に入力します。アクティブな署名証明書の有効期限が近づくと、証明書の更新手順が記載された通知が、この電子メールアドレスに送信されます。

    {{< img src="account_management/saml/notification_email.png" alt="Notification email" responsive="true" style="width:70%;">}}

13. 手順 5 のページの下部にある **DatadogSSO_test の構成**をクリックします。

14. DatadogSSO_test の構成の手順 3 まで下へスクロールして、シングルサインオンセクションを見つけ、**SAML XML メタデータ**ファイルをダウンロードします。

15. **SSO 構成セクション**のトップに移動し、**保存**をクリックします。

16. [Datadog の SAML ページ][1]に戻り、手順 14 でダウンロードした **SAML XML メタデータ**ファイルをアップロードします。

    {{< img src="account_management/saml/SAML_Configuration___Datadog10.png" alt="SAML_Configuration___Datadog10" responsive="true" style="width:70%;">}}

17. アップロードする XML ファイルを選択してから、必ず **Upload File** ボタンを押してください。

18. これで完了です。SAML is ready と表示され、有効な IdP メタデータがインストールされていることが示されます。

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" responsive="true" style="width:70%;">}}

19. **Enable** を押すと、Azure AD から Datadog にログインできるようになります。

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" responsive="true" style="width:70%;">}}


#### オプション

Datadog のボタンやリンクから SSO を使用する場合は、サインオン URL を追加する必要があります。それには、Azure アプリケーションの SSO 構成セクション (手順 8) に戻り、**詳細な URL 設定の表示**をチェックします。

次に、[Datadog の SAML ページ][1]に表示されるシングルサインオン URL を貼り付けます。

{{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" responsive="true" style="width:60%;">}}


#### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://app.datadoghq.com/saml/saml_setup