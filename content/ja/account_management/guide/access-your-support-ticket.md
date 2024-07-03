---
aliases:
- /ja/developers/faq/access-your-support-ticket
- /ja/account_management/faq/access-your-support-ticket
title: Access Your Support Ticket
---

## サポートチケットの作成

新しいサポートチケットを作成するには、該当するサイトのリンクをクリックし、**Submit a request** をクリックしてチケットフォームに必要事項を記入してください。

{{< whatsnext desc="Datadog サイト別サポートページ:">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1、US3、US5、EU、AP1 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

{{< img src="/account_management/guide/access_your_support_ticket/support_page.png" alt="Datadog サポートランディングページ" style="width:100%;" >}}

Datadog の[ヘルプページ][2]から左側のナビゲーションから **?** -> **Resources** をクリックしてこのフォームにアクセスすることもできます。*Support Tickets & Billing Questions* の下にある **New Support Ticket** をクリックします。

## 既存のチケットにアクセスする

少なくとも 1 つの Datadog サポートチケットを開いている場合、この手順に従って、すべての Datadog サポートチケットにアクセスします。
1. サポートページから、右上の **Sign in** をクリックします。

2. Datadog Zendesk アカウントに初めてサインインする場合は、**New to your Datadog Zendesk account? Sign up** のリンクをクリックします。

3. 以前に Datadog サポートにメールしたことがある場合は、**Emailed us for support? Get a password** をクリックし、Datadog サポートに連絡する際に使用したものと同じメールアドレスを入力します。

4. パスワードがメールで届いたら、ログインして **Manage your tickets** をクリックすると、リクエストを確認できます。

5. ログイン後、**My Activities** のページが表示されない場合は、右上の自分の名前をクリックし、**My Activities** をクリックしてください。

6. 組織全体のチケットを表示したい場合は、Datadog サポートにリクエストを送信してください。

{{< whatsnext desc="Datadog サイト別サポートページ:">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1、US3、US5、EU、AP1 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

## トラブルシューティング
### エラー: Refused to connect
**Refused to connect** のエラーは、プライバシー設定でサードパーティ Cookie がブロックされていることが原因です。この問題を解決するには、ブラウザが Zendesk からのサードパーティ Cookie を許可していることを確認します。Google Chrome のヘルプで [Chrome で Cookie を消去、有効化、管理する][1]方法を確認してください。

お使いのブラウザに広告ブロック機能がある場合は、それをオフにして、サインインできるかどうかを確認してください。広告ブロックの中には、独自の例外リストがあるものもあります。この場合は、**datadog.zendesk.com** を許可リストに追加してください。

[1]: https://support.google.com/chrome/answer/95647
[2]: https://app.datadoghq.com/help