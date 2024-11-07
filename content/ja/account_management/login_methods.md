---
title: Login Methods の構成
---

ログイン方法は、ユーザーの認証方法と Datadog 組織へのログイン方法を決定します。ログイン方法を使用して、デフォルトのログイン方法を有効または無効にするには、次の特権アクセス権限のいずれかが必要です。

- Datadog 管理者ロール
- 組織管理 (`org_management`) 権限

ログイン方法がデフォルトで有効になっている場合、([ユーザーのログイン方法のオーバーライドによって][1]) 明示的にアクセスを拒否されていないユーザーは、ユーザー名 (メールアドレス) が組織に招待されているユーザーと一致すれば、そのログイン方法を使って Datadog にアクセスすることが可能です。

以下のログイン方法があります。

- Datadog のユーザー名とパスワード (Standard とも呼ばれる)
- Google でサインインする
- [SAML でサインインする][2]

## デフォルトのログイン方法を有効または無効にする

組織管理者は、組織のデフォルトのログイン方法を有効または無効にすることができます。新しい組織は、すべての組織とユーザーに対して **Datadog Username and Password** (Datadogのユーザー名とパスワード) と **Sign in with Google** (Google でサインインする) を有効にして設定した状態で開始します。SAML を構成すると、**Sign in with SAML** (SAML でサインインする) も有効になります。

1. [Login Methods][3] に移動します。
2. 各方法の **Enabled by Default** 設定を、組織の好みまたはポリシーの要件に従って、`On` または `Off` に設定します。
3. 選択内容を確認します。

**注**: 組織ですべてのログイン方法を無効にすることはできません。組織のデフォルトでは、少なくとも 1 つのログイン方法が有効になっている必要があります。

## ユーザーオーバーライドの見直し

オーバーライドを使用すると、個々のユーザーに対して利用可能なログイン方法を変更することができます。次の例では、組織のデフォルトでは **Sign in with Google** (Google でサインインする) が Off になっていますが、オーバーライドを設定することで、あるユーザーがこれを有効にしています。

{{< img src="account_management/login_methods_disabled_overrides_set.png" alt="ログイン方法は無効、ユーザーオーバーライドは有効" style="width:80%;">}}

[ユーザー管理][4]では、設定されているオーバーライド方法でユーザーを絞り込んだり、デフォルトのログイン方法を有効にしているユーザーを表示することができます。

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="User Management view filtered to show users by login methods set." style="width:80%;">}}

You can edit the user's overrides or remove the override altogether to allow the user to only use the defaults. For more information see [Edit a user's login methods][1].

[1]: /ja/account_management/users/#edit-a-users-login-methods
[2]: /ja/account_management/saml/
[3]: https://app.datadoghq.com/organization-settings/login-methods
[4]: https://app.datadoghq.com/organization-settings/users