---
aliases:
- /ja/account_management/saml/azure/
- /ja/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: ドキュメント
  text: Datadog アカウントのための SAML の構成
- link: /account_management/multi_organization/
  tag: ドキュメント
  text: 複数のアカウントを持つチームとオーガニゼーションの構成
title: Microsoft Entra ID SAML IdP
---

## セットアップ

[Microsoft Entra の Datadog とのシングル サインオン (SSO) 統合][1] チュートリアルに従って、Entra ID を SAML アイデンティティ プロバイダー (IdP) として設定します。**注**: Entra ID サブスクリプションが必要です。サブスクリプションをお持ちでない場合は、[無料 アカウント][2] に登録してください。

### Datadog

1. [Datadog SAML ページ][3]に移動します。

2. Microsoft からダウンロードした **SAML XML Metadata** ファイルを選択してアップロードします。

3. **SAML is ready** と **Valid IdP metadata installed** というメッセージが表示されます。

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" style="width:70%;">}}

4. **Enable** をクリックして、SAML を使用した Entra ID のシングル サインオンを開始します:

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" style="width:70%;">}}

### 高度な URL

Datadog ボタンまたはリンクで SSO を使用している場合は、サインオン URL が必要です。

1. [Datadog SAML ページ][3]からシングルサインオン URL を取得します。

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" style="width:70%;">}}

2. Microsoft Entra ID で、アプリケーションの SSO Configuration セクションに移動し、**Show advanced URL settings** をチェックして、シングル サインオン URL を追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/entra/identity/saas-apps/datadog-tutorial
[2]: https://azure.microsoft.com/free/
[3]: https://app.datadoghq.com/saml/saml_setup