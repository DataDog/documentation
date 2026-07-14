---
title: 二要素認証をセットアップする
---

二要素認証 (2FA) は、アカウントに追加のセキュリティ層を提供します。2FA を有効にすると、信頼できるデバイスでのみ Cloudcraft アカウントにアクセスできます。

2FA をセットアップした後、次の 2 ステップでアカウントにログインします。

1. パスワードを入力します。
2. 仮想多要素認証アプリケーションからのコードを入力します。

<div class="alert alert-info">Google アカウントで Cloudcraft にログインする場合、Google が 2FA を提供しているため、Cloudcraft で 2FA を設定することはできません。Cloudcraft アカウントにログインする前に、必ず <a href="https://support.google.com/accounts/answer/185839" title="Protect your account with 2-Step Verification" referrerpolicy="no-referrer" rel="noopener noreferrer" target="_new">Google 側で 2FA プロセスを完了</a>してください。
</div>

## 2FA を有効にする

1. Google Authenticator や [Authy][1] などの認証アプリをスマートフォンにダウンロードします。
2. Cloudcraft アカウントにログインします。
3. **Account** アイコンをクリックし、**User settings** を選択します。
4. **Manage MFA** をクリックします。2FA のバーコードが表示されます。
5. スマートフォンの認証アプリを開き、バーコードをスキャンします。
6. 認証アプリによって生成された 6 桁の確認コードを入力し、**Verify** をクリックします。

次のウィンドウにはリカバリーキーが表示されます。リカバリーキーは、2FA を管理するデバイスへのアクセスを失った場合にアカウントに戻るのを助ける、数字と文字の長さ 18 文字の文字列で、一度だけ表示されます。これはワンタイムパスワードとして機能します。Cloudcraft はキーを印刷して安全な場所に保管することをお勧めします。

## 2FA を無効にする

2FA の無効化は推奨されず、全体的にアカウントのセキュリティを低下させる可能性があります。Heimdal Security には、[常に二要素認証を使用するべき理由][2]に関する優れた記事があります。

1. Cloudcraft アカウントにログインします。
2. **Account** アイコンをクリックし、**User settings** を選択します。
3. **Manage MFA** をクリックし、**Disable MFA** を選択します。

[1]: https://authy.com/
[2]: https://heimdalsecurity.com/blog/start-using-two-factor-authentication/