---
title: SSO を有効にする
---

SSO を有効にすると、Cloudcraft への認証とアクセスを簡素化できます。

Cloudcraft では以下の方法で SSO をサポートしています。

- **Datadog SSO**: Datadog SSO は新しいアカウントに対して追加設定を必要としません。Cloudcraft の signup または login ページで **Sign in with Datadog** を選択してください。既存アカウントでこの機能を有効にする場合は、[Cloudcraft サポートチームに連絡][1]
  してください。
- **Google Workspace SSO**: Google Workspace SSO も追加設定は不要です。Cloudcraft の signup または login ページで **Sign in with Google** を選択してください。
- **SAML SSO**: Cloudcraft Pro および Enterprise アカウントで利用可能です。組織の既存 IdP (Identity Provider) とフェデレーションし、ユーザーが既存アカウントでログインできるようになり、アクセス権を組織で一元管理できます。

この記事では SAML SSO とその設定方法について説明します。

## SAML/SSO のセットアップ

<div class="alert alert-info">アカウントオーナーのみが SAML SSO 機能を設定できます。アカウントオーナーが SSO を設定できない場合は、<a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">Cloudcraft サポートチームに連絡</a>してこの機能を有効にしてください。</div>

1. **User** > **Security & SSO** に移動します。
2. IdP で Cloudcraft を新規アプリケーションとして登録します。詳細手順は次の記事を参照してください。
    - [Azure AD で SSO を有効にする][2]
    - [Okta で SSO を有効にする][3]
    - [汎用 IdP で SSO を有効にする][4]
3. 同じ画面に、アプリケーション作成に必要なサービスプロバイダー情報が表示されています。

{{< img src="cloudcraft/account-management/enable-sso/service-provider-details.png" alt="Cloudcraft の SAML サービスプロバイダー統合設定" responsive="true" style="width:100%;">}}

4. アプリケーション作成後、IdP から取得したメタデータファイルを Cloudcraft にアップロードします。
5. **SAML Single Sign-On is enabled** を選択します。
6. SAML SSO ユーザーのみに Cloudcraft へのアクセスを制限する場合は **Strict mode** を有効にします。

## その他の機能

SAML SSO を利用すると、多数のユーザーを管理する際に便利な追加機能が利用できます。

### Just-in-Time ユーザープロビジョニング

**Just-in-Time User Provisioning** を有効にすると、会社のメールアドレスで初回ログインした際に招待なしでユーザーアカウントが自動作成されます。

初回ログイン時にユーザーが参加するデフォルトチームは **Security & Single Sign-On** ページ最下部で変更できます。

### IdP 起点のログイン (IdP Initiated Login)

IdP ダッシュボードから直接 Cloudcraft にサインインできるようにします。

### Strict モード

**Strict mode** を有効にすると、すべてのユーザーが SAML SSO でログインする必要があり、既存のユーザー名／パスワードや Google Sign In は無効化されます。

アカウントからロックアウトされないよう、Strict mode を有効にする前に SAML SSO ログインが正しく機能していることを必ず確認してください。

[1]: https://app.cloudcraft.co/app/support
[2]: /ja/cloudcraft/account-management/enable-sso-with-azure-ad/
[3]: /ja/cloudcraft/account-management/enable-sso-with-okta/
[4]: /ja/cloudcraft/account-management/enable-sso-with-generic-idp/