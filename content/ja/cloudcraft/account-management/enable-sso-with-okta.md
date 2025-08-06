---
title: Okta で SSO を有効にする
---

アイデンティティプロバイダーとして Okta を使用してシングルサインオン (SSO) を有効にすると、Cloudcraft への認証とログインアクセスを簡素化できます。

この記事では、アイデンティティプロバイダーが Okta の場合の SSO のセットアップ方法について説明します。その他のアイデンティティプロバイダーについては、以下の記事を参照してください。

- [Azure AD で SSO を有効にする][1]
- [一般的なアイデンティティプロバイダーで SSO を有効にする][2]

Cloudcraft で SSO を使用するための一般的な情報については、[アカウントで SSO を有効にする][3]をご覧ください。

## SAML/SSO のセットアップ

<div class="alert alert-info">Only the account owner can configure the SAML SSO feature. If the account owner is unable to configure SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">contact the Cloudcraft support team</a> to enable this feature.</div>

1. Cloudcraft で、**User** > **Security & SSO** に移動します。
2. Okta で新しいアプリケーションを作成するために必要な詳細は、**Cloudcraft サービスプロバイダーの詳細**セクションに記載されています。

{{< img src="cloudcraft/account-management/enable-sso-with-okta/service-provider-details.png" alt="エンティティ ID とアサーションコンシューマーサービス URL を含むアイデンティティプロバイダー構成のための Cloudcraft サービスプロバイダー詳細のスクリーンショット。" responsive="true" style="width:100%;">}}

3. 管理者として Okta にログインします。
4. **Application** をクリックします。
5. **Add Application** をクリックし、次に **Create New App** をクリックします。
6. サインオン方法として **SAML 2.0** を選択し、**Create** をクリックします。
7. アプリケーション名として **Cloudcraft** を入力し、残りの値はそのままにしておきます。
8. **Next** をクリックします。

<div class="alert alert-info">アプリのロゴを使用したい場合は、Okta のサイズ制限に準拠した<a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">こちらのロゴ</a>を使用できます。
</div>

9. 次に、Cloudcraft から提供された詳細を使用して SAML インテグレーションを構成します。フィールドは以下のようにマッピングされ、最初のものが Okta のラベル、2 番目のものが Cloudcraft のラベルです。
    - **Single sign on URL**: アサーションコンシューマーサービス URL
    - **Audience URI**: サービスプロバイダーエンティティ ID

{{< img src="cloudcraft/account-management/enable-sso-with-okta/saml-settings.png" alt="シングルサインオン URL およびエンティティ ID 構成用のフィールドがある SAML 設定インターフェイスのスクリーンショット。" responsive="true" style="width:80%;">}}

10. **Name ID format** ドロップダウンで、**EmailAddress** を選択します。
11. 次の画面に進み、"Are you a customer or partner?" (お客様ですか、パートナーですか？) の質問に対して **I'm an Okta customer adding an internal app** (私は社内アプリを追加している Okta ユーザーです) を選択します。
12. **Finish** をクリックします。これで Okta にアプリケーションがセットアップされたので、ユーザーを割り当て、完了したら **Sign On** タブに移動します。

{{< img src="cloudcraft/account-management/enable-sso-with-okta/sign-on-settings.png" alt="Okta アプリケーションインテグレーションインターフェイスの SAML 2.0 構成設定を表示したスクリーンショット。" responsive="true" style="width:80%;">}}

13. **View Setup Instructions** ボタンの下にある青いリンクをクリックして、Cloudcraft へのアップロードに必要なファイルをダウンロードします。
14. Cloudcraft に戻り、コンフィギュレーションファイルをアップロードします。

{{< img src="cloudcraft/account-management/enable-sso-with-okta/upload-metadata.png" alt="SAML シングルサインオンの構成に成功し、セキュリティ設定インターフェイスにアイデンティティプロバイダーの URL が表示されたステータス。" responsive="true" style="width:80%;">}}

15. **SAML Single Sign-On is enabled** オプションを切り替えます。
16. ユーザーにアイデンティティプロバイダー経由でのみ Cloudcraft にアクセスさせたい場合は、**Strict mode** オプションを有効にします。

[1]: /ja/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /ja/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /ja/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/app/support