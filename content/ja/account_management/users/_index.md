---
title: ユーザー管理
kind: documentation
description: オーガニゼーションのチームメンバーを追加または削除、チームメンバーのロールを変更。
aliases:
  - /ja/account_management/team/
further_reading:
  - link: account_management/saml
    tag: ドキュメント
    text: Datadog アカウントのための SAML の構成
  - link: account_management/users/default_roles
    tag: ドキュメント
    text: Datadog 所定の役割および許可
  - link: account_management/users/custom_roles
    tag: ドキュメント
    text: Datadog カスタムロールの作成
---
Datadog の **User Management** セクションでは、ユーザーとユーザーに関連付けられたロールを管理できます。

{{< img src="account_management/users/user_page.png" alt="User Management ページ" responsive="true">}}

## 新しいメンバーの追加

オーガニゼーションにメンバーを追加するには

1. User Management ページに移動します。
2. ページの右上隅の **Invite Users** を選択します。
3. Datadog アカウントに招待するユーザーのメールアドレスを入力します。
4. ユーザーに 1 つ以上の[ユーザーロール][1]を割り当てます。
**注**: Standard Access 権限を持つユーザーは自分と同じロールにユーザーを招待できます。Privileged Access 権限を持つユーザーはいずれのロールにもユーザーを招待できます。
5. **Send Invites** をクリックします。

{{< img src="account_management/users/invite_user.png" alt="オーガニゼーションにユーザーを追加する" responsive="true" style="width:80%;">}}

新規ユーザーにログイン用のリンクが記載された E メールが送信されます。新規ユーザーがログインするまで、ステータスは `Pending` と表示されます。
招待を再送信するには、ユーザーの行の右にある *Edit* ボタンを選択し、*Resend Invite* をクリックします。

{{< img src="account_management/users/resend_invite.png" alt="招待の再送信" responsive="true" style="width:80%;">}}

## ユーザーのロールを編集する

Datadog Admin Role などの Privileged Access 権限を持つユーザーのみが他のユーザーのロールを変更できます。

1. User Management ページに移動します。
2. ユーザーの行の右にある *Edit* ボタンを選択します。
3. このユーザーに割り当てる新しい[ユーザーロール][1]を選択します。
4. **Save** をクリックして新しい設定を保存します。

{{< img src="account_management/users/user_role_update.png" alt="ユーザーロールの更新" responsive="true" style="width:80%;">}}

## 既存のメンバーの無効化

Datadog Admin Role などの Privileged Access 権限を持つユーザーのみがメンバーを無効化できます。削除してはいけないイベントやダッシュボードをこのメンバーが所有している場合があるため、メンバーを完全に削除することはできません。メンバーを無効化すると、このメンバーが生成したアプリケーションキーが自動的に無効化されます。

1. User Management ページに移動します。
2. ユーザーの行の右にある *Edit* ボタンを選択します。
3. **Disable** トグルをクリックします。
4. **Save** をクリックして新しい設定を保存します。
5. アクションを確認します。

{{< img src="account_management/users/disable_user.png" alt="ユーザーの無効化" responsive="true" style="width:80%;" >}}

**注**: デフォルトでは、無効化されたユーザーは User Management ページのユーザー一覧から除外されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/users/default_roles