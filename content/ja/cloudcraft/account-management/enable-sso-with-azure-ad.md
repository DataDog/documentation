---
title: Azure AD で SSO を有効にする
---

アイデンティティプロバイダーとして Azure AD を使用してシングルサインオン (SSO) を有効にすると、Cloudcraft への認証とログインアクセスを簡素化できます。

この記事では、アイデンティティプロバイダーが Azure AD の場合の SSO のセットアップ方法について説明します。その他のアイデンティティプロバイダーについては、以下の記事を参照してください。

- [Okta で SSO を有効にする][1]
- [一般的なアイデンティティプロバイダーで SSO を有効にする][2]

Cloudcraft で SSO を使用するための一般的な情報については、[アカウントで SSO を有効にする][3]をご覧ください。

## SAML/SSO のセットアップ

<div class="alert alert-info">SAML Enterprise SSO 機能は Enterprise プランでのみ利用可能で、Cloudcraft のアカウント所有者ロールによってのみ構成できます。
</div>

1. Cloudcraft で、**User** > **Security & SSO** に移動します。
2. Azure で新しいアプリケーションを作成するために必要な詳細は、**Cloudcraft サービスプロバイダーの詳細**セクションに記載されています。

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/service-provider-details.png" alt="エンティティ ID とアサーションコンシューマーサービス URL を含むアイデンティティプロバイダー構成のための Cloudcraft サービスプロバイダー詳細のスクリーンショット。" responsive="true" style="width:100%;">}}

3. 管理者として Azure にログインします。
4. 画面左上のハンバーガーメニューをクリックし、**Azure Active Directory** を選択します。
5. 左メニューの **Manage** セクションで、**Enterprise applications** をクリックします。
6. **New application** をクリックし、**Non-gallery application** を選択します。
7. アプリケーション名として **Cloudcraft** を入力し、**Add** をクリックします。

次に、Cloudcraft から提供された詳細を使用して SAML インテグレーションを構成します。

1. **Getting started** セクションで、**Set up single sign on** を選択し、**SAML** をクリックします。
2. **Basic SAML Configuration** セクションで、**Edit** をクリックします。
3. Cloudcraft から提供された詳細を入力します。フィールドは以下のようにマッピングされ、最初の値は Azure AD のラベル、2 番目の値は Cloudcraft ダイアログのラベルです。
    - **Identifier**: サービスプロバイダーエンティティ ID
    - **Reply URL**: アサーションコンシューマーサービス URL
    - **Sign on URL**: アイデンティティプロバイダー主導の SSO を許可する場合は空白のままにします。

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/saml-settings.png" alt="識別子 (エンティティ ID) と返信 URL (アサーションコンシューマーサービス URL) のフィールドを示す、基本 SAML 構成インターフェイスのスクリーンショット。" responsive="true" style="width:80%;">}}

4. **Save** をクリックして、前の画面に戻ります。
5. **SAML Signing Certificate** セクションで、**Federation Metadata XML** を選択し、XML ファイルをコンピュータにダウンロードします。
6. Cloudcraft に戻り、メタデータ XML ファイルをアップロードします。

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/upload-metadata.png" alt="SAML シングルサインオンの構成に成功し、セキュリティ設定インターフェイスにアイデンティティプロバイダーの URL が表示されたステータス。" responsive="true" style="width:100%;">}}

7. **SAML Single Sign-On is enabled** オプションを切り替えます。
8. Azure ポータルに戻ります。
9. **Test single sign-on with Cloudcraft** セクションで、**Test** をクリックしてインテグレーションをテストします。
10. ユーザーが Azure AD 経由でのみ Cloudcraft にアクセスするようにしたい場合は、**Strict mode** オプションを有効にすると、他のすべてのログイン方法が無効になります。

**注**: 組織内のユーザーにアクセスを許可するには、[Azure AD ドキュメント][4]を参照してください。

[1]: /ja/cloudcraft/account-management/enable-sso-with-okta/
[2]: /ja/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /ja/cloudcraft/account-management/enable-sso/
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal
[5]: https://app.cloudcraft.co/support