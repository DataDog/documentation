---
title: Switching Between Organizations
further_reading:
- link: account_management/multi_organization/
  tag: ドキュメント
  text: マルチオーガニゼーションアカウントの管理
---

If you belong to multiple Datadog organizations, the org switcher at the bottom left of the nav bar allows you to toggle between organizations. You can also view all organizations and switch between them from the [**Organizations** page][1] in **Personal Settings**.

{{< img src="account_management/org_switching_062024.png" alt="Two ways of switching organizations" style="width:90%;" >}}

セキュリティ上、切り替え先のオーガニゼーションに対する有効なセッションが必要です。アクティブなセッションがない場合は、ユーザー名およびパスワードまたは SAML を使用して認証を行うように求められます。

1. **混合認証アプローチ**: SAML とユーザー名およびパスワード認証の両方を設定している場合は、一方でログインしてすべてにアクセスできるのではなく、オーガニゼーションが必要とするタイプ (ユーザー名およびパスワードまたは SAML) でログインする必要があります。

2. **SAML Strict**: If your org is set for [SAML Strict][2], you must authenticate with SAML. You are required to re-authenticate each time you switch organizations. Since IdPs persist sessions, this is often a redirect.

## マルチオーガニゼーションユーザーのパスワードリセット

マルチオーガニゼーションユーザーごとに固有のパスワードがオーガニゼーションに共有されます。パスワードをリセットすると、あなたが所属するオーガニゼーションにも影響が生じます。

**注**: 同じパスワードを 2 回使用することはできません。

## トラブルシューティング

問題が発生してログインできない場合は、次のことを試してください。

1. これまで必要なかった場合でも、パスワードを再入力またはリセットします。

2. 他のチームメンバーがユーザー名およびパスワードでログインできるかどうかを確認します。できる場合は、手順 1 を試します。できない場合は、手順 3 を試します。

3. このアカウントでユーザー名およびパスワード、SAML、Google OAuth のどれが必要かをチームの管理メンバーに確認して、正しい方法を使用します。

If the above troubleshooting steps fail, contact the [Datadog support team][3] and let them know the expected behavior and what you've tried so far.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/personal-settings/organizations
[2]: /account_management/saml/#saml-strict
[3]: /help/
