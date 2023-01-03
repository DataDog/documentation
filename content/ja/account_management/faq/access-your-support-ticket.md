---
aliases:
- /ja/developers/faq/access-your-support-ticket
kind: faq
title: サポートチケットにアクセスする
---

## チケットの作成

{{< site-region region="us,us3,us5,eu" >}}
新しいサポートチケットを作成するには、[https://help.datadoghq.com][1] にアクセスし、**Submit a request** をクリックしてチケットフォームに必要事項を記入してください。

[1]: https://help.datadoghq.com
{{< /site-region >}}
{{< site-region region="gov" >}}
新しいサポートチケットを作成するには、[https://help.dd-gov.com][1] にアクセスし、**Submit a request** をクリックしてチケットフォームに必要事項を記入してください。

[1]: https://help.ddog-gov.com
{{< /site-region >}}

## 既存のチケットにアクセスする

少なくとも 1 つの Datadog サポートチケットを開いている場合、この手順に従って、すべての Datadog サポートチケットにアクセスします。

{{< site-region region="us,us3,us5,eu" >}}
1. [https://help.datadoghq.com][1] にアクセスし、右上の **Sign in** をクリックします。

2. Zendesk に初めてサインインする場合、**New to your Datadog Zendesk account? Sign up** をクリックして Zendesk のアカウントを作成します。Datadog サポートにメールしたことがある場合は、**Have you emailed us? Get a password** をクリックします。

   **注**: Datadog サポートに連絡するために使用したメールアドレスを入力する必要があります。

  {{< img src="help/sign_in.png" alt="Zendesk にサインインする" style="width:70%" >}}

[1]: https://help.datadoghq.com
{{< /site-region >}}
{{< site-region region="gov" >}}
1. [https://help.dd-gov.com][1] にアクセスし、右上の **Sign in** をクリックします。

2. Zendesk に初めてサインインする場合、**New to Datadog? Sign up** をクリックして Zendesk のアカウントを作成します。Datadog サポートにメールしたことがある場合は、**Have you emailed us? Get a password** をクリックします。

   **注**: Datadog サポートに連絡するために使用したメールアドレスを入力する必要があります。

  {{< img src="help/sign_in_gov.png" alt="Zendesk にサインインする" style="width:50%" >}}

[1]: https://help.ddog-gov.com
{{< /site-region >}}

3. パスワードがメールで届いたら、ログインして **Manage your tickets** をクリックすると、リクエストを確認できます。
  {{< img src="help/my_activities.png" alt="マイアクティビティ"  >}}
5. ログイン後、**My Activities** のページが表示されない場合は、右上の自分の名前をクリックし、**My Activities** をクリックしてください。

{{< site-region region="us,us3,us5,eu" >}}
6. 組織全体のチケットを表示したい場合は、[Datadog サポート][1]にリクエストを送信してください。

[1]: https://help.datadoghq.com
{{< /site-region >}}
{{< site-region region="gov" >}}
6. 組織全体のチケットを表示したい場合は、[Datadog サポート][1]にリクエストを送信してください。

[1]: https://help.ddog-gov.com
{{< /site-region >}}

## エラー: Refused to connect
**Refused to connect** のエラーは、プライバシー設定でサードパーティ Cookie がブロックされていることが原因です。この問題を解決するには、ブラウザが Zendesk からのサードパーティ Cookie を許可していることを確認します。Google Chrome のヘルプで [Chrome で Cookie を消去、有効化、管理する][1]方法を確認してください。

お使いのブラウザに広告ブロック機能がある場合は、それをオフにして、サインインできるかどうかを確認してください。広告ブロックの中には、独自の例外リストがあるものもあります。この場合は、**datadog.zendesk.com** を許可リストに追加してください。

[1]: https://support.google.com/chrome/answer/95647