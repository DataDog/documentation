---
aliases:
- /ja/account_management/team/
description: Add or remove users in your organization. Modify user roles.
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/rbac/
  tag: Documentation
  text: Learn how to create, update and delete a Role
- link: /account_management/rbac/permissions/
  tag: Documentation
  text: Discover the list of permissions available
- link: /api/v1/users/
  tag: Documentation
  text: Manage your users with the USER API
title: User Management
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government site では、SAML ログインのみをサポートします。</div>
{{< /site-region >}}

Datadog の **Organization Settings** の **User** タブでは、ユーザーとそのユーザーに関連付けられたロールを管理できます。リストビューとグリッドビューを切り替えるには、右側の **List View** または **Grid View** をクリックします。

## 新しいメンバーの追加と招待の管理

オーガニゼーションにメンバーを追加するには

1. Organization Settings ページに移動し、**Users** タブをクリックします。
2. ページ右上隅 **Invite Users** をクリックします。
3. Datadog アカウントに招待するユーザーのメールアドレスを入力します。
4. ユーザーに 1 つ以上の[ユーザーロール][1]を割り当てます。
**注**: Invite User アクセス許可を持つユーザーは、自分が持っているロールにユーザーを招待できます。Invite User と Access Management の両方のアクセス許可を持つユーザーは、ユーザーをあらゆるロールに招待できます。
5. **Send Invites** をクリックします。

新規ユーザーにログイン用のリンクが記載されたメールが送信されます。新規ユーザーがログインするまで、ステータスは `Invite Pending` と表示されます。ログインする前に招待をキャンセルするには、リストビューの場合ユーザーの行の右にある、グリッドビューの場合ユーザーボックスにある、**Delete Invite** ボタンを選択します。

リストビューで招待を再送信するには、ユーザーをクリックしてユーザーサイドパネルを開き、**Resend Invite** をクリックします。または、グリッドビューで、ユーザーボックスにカーソルを合わせ、**Resend Invite** をクリックします。

## ユーザーのロールを編集する

Datadog Admin Role などの User Access Management アクセス許可を持つユーザーのみが他のユーザーのロールを変更できます。

ユーザーのロールを編集するには

1. **Organization Settings** の **Users** タブに移動します。
2. ユーザーの行の右にある **Edit** ボタンを選択します。
3. このユーザーの新しい[ユーザーロール][2]を選択するか、既存のロールの横にある 'X' をクリックして削除します。
4. **Save** をクリックして新しい設定を保存します。

{{< img src="account_management/users/user_role_update.png" alt="ユーザーロールの更新" style="width:80%;">}}

使用可能なすべてのロールとカスタムロールの作成方法については、[ロールベースのアクセス制御のドキュメント][2]を参照してください。

## ユーザーのログイン方法を編集する

Datadog Admin Role などの User Access Management アクセス許可を持つユーザーのみが他のユーザーのログイン方法を変更できます。

組織のデフォルトのログイン方法は、Login Methods ページで設定することができます。ここでは、組織内のすべてのユーザーが Datadog のユーザー名とパスワードを使用すること、Google でサインインすること、または SAML でサインインすることを許可または拒否することができます。User Management では、ユーザー単位でオーバーライドして、特定のユーザーに 1 つの方法または複数の方法の使用を許可することができます。これは、すべてのユーザーに SAML を使用させたいが、一部のユーザーには緊急時にユーザー名とパスワードでログインできるようにする必要がある場合に便利です。

ユーザーのログイン方法を編集するには

1. **Organization Settings** の **Users** タブに移動します。
2. ユーザーの行の右にある **Edit** をクリックします。
3. **Override Default Login Methods** の横のトグルを切り替えると、ユーザーに対してオーバーライドを有効または無効にすることができます。
4. オーバーライドを有効にする場合、ユーザーが Datadog にアクセスするために使用できるログイン方法のセットを選択します。これは、1 つのオプションにすることも組織に対して構成されたすべてのオプションにすることもできます。
5. **Save** をクリックします。


**注**: オーバーライドは、有効なログイン方法のみに設定することができます。SAML を設定していない場合、そのログイン方法をユーザーのオーバーライドとして選択することはできません。

## 既存のメンバーを無効にする

メンバーを無効にできるのは、Datadog Admin Role を持つユーザーなど、Access Management アクセス許可を持つユーザーのみです。ユーザーがダッシュボードまたはモニターを作成した可能性があるため、ユーザーを完全に削除することはできません。ユーザー ID は、ユーザーのアクションの記録を保持するために使用されます。ユーザーが無効になると、ユーザーが生成したアプリケーションキーは自動的に取り消されます。

1. **Organization Settings** の **Users** タブに移動します。
2. ユーザーの行の右にある **Edit** ボタンを選択します。
3. **Disable** トグルをクリックします。
4. **Save** をクリックして変更内容を保存します。
5. アクションを確認します。

**注**: デフォルトでは、無効になっているユーザーは、User Management ページのユーザーのリストから除外されます。正しいアクセス許可がある場合は、ステータスが `Disabled` のユーザーでフィルタリングして、再度有効にすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/users/default_roles/
[2]: /ja/account_management/rbac/