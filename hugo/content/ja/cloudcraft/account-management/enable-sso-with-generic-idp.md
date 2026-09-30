---
title: 汎用のアイデンティティプロバイダで SSO を有効化する
---

Cloudcraft で Single Sign-On (SSO) を有効にすると、Cloudcraft への認証とログインを簡素化できます。

この記事では、特定のアイデンティティプロバイダ用のガイドがない場合に SSO を設定する方法を説明します。アイデンティティプロバイダが Azure AD または Okta の場合は、次の記事を参照してください:

- [Azure AD で SSO を有効にする][1]
- [Okta で SSO を有効にする][2]

Cloudcraft で SSO を使用するための一般的な情報については、[アカウントで SSO を有効にする][3]をご覧ください。

## SAML/SSO のセットアップ

<div class="alert alert-info">Only the account owner can configure the SAML SSO feature. If the account owner is unable to configure SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">contact the Cloudcraft support team</a> to enable this feature.</div>

1. Cloudcraft で、**User** > **Security & SSO** に移動します。
2. Azure で新しいアプリケーションを作成するために必要な詳細は、**Cloudcraft サービスプロバイダーの詳細**セクションに記載されています。

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/service-provider-details.png" alt="Identity Provider 設定用 Entity ID と Assertion Consumer Service URL が表示されている Cloudcraft のサービス プロバイダー詳細のスクリーンショット。" responsive="true" style="width:100%;">}}

3. アイデンティティプロバイダに管理者としてログインします。
4. ドキュメントに従って、SAML 連携用の新しいアプリケーションを作成します。
5. プロバイダー側のフィールドを Cloudcraft のフィールドにマッピングします (左が ID プロバイダ側のラベル、右が Cloudcraft 側のラベル):

    - **Single sign on URL**: アサーションコンシューマーサービス URL
    - **Audience URI**: サービスプロバイダーエンティティ ID
    - **Name ID**: NameId Format

6. **Name ID** ドロップダウンがある場合は **emailAddress** などを選択します。

<div class="alert alert-info">サインインするアプリケーションを利用者が識別しやすいように、アプリロゴを追加することもできます。大半のプロバイダの制限に適合するロゴは<a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">こちら</a>から取得できます。</div>

7. アプリケーションを設定し、組織内の該当ユーザー全員がアクセスできるようにします。
8. プロバイダが生成したメタデータファイル (Federation XML と呼ばれる場合があります) をダウンロードします。
9. Cloudcraft に戻り、メタデータ XML ファイルをアップロードします。

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/upload-metadata.png" alt="SAML Single Sign-On が正常に構成され、セキュリティ設定インターフェイスにアイデンティティプロバイダー URL が表示されている状態のスクリーンショット。" responsive="true" style="width:100%;">}}

10. **SAML Single Sign-On is enabled** オプションを切り替えます。
11.  ユーザーにアイデンティティプロバイダー経由でのみ Cloudcraft にアクセスさせたい場合は、**Strict mode** オプションを有効にします。

[1]: /ja/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /ja/cloudcraft/account-management/enable-sso-with-okta/
[3]: /ja/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/support