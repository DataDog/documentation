---
aliases:
- /ja/developers/faq/access-your-support-ticket
- /ja/account_management/faq/access-your-support-ticket
- /ja/account_management/guide/access-your-support-ticket
description: GovCloud サポートポータルでの手順も含め、Datadog サポートチケットの作成および管理方法について説明します。
further_reading:
- link: /getting_started/support/
  tag: ドキュメント
  text: Datadog サポートの概要
title: サポートチケットを管理する
---
<div class="alert alert-info">Datadog サイトを選択し、該当するサポートポータルの手順を確認します。</div>

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

## サポートチケットを作成する{#create-a-support-ticket}

新しいサポートチケットを作成するには、[Datadog サポートサイト][1]に移動します。ページの下部で **Create a New Ticket** をクリックし、チケットフォームに必要事項を入力します。

このフォームには Datadog からもアクセスできます。左側のナビゲーションで **Help** にカーソルを合わせ、**Support** をクリックします。または、[Datadog ヘルプページ][2]に移動し、**New Support Ticket** をクリックします。

## 既存のチケットにアクセスする{#access-existing-tickets}

少なくとも 1 つの Datadog サポートチケットを開いている場合、この手順に従って、すべての Datadog サポートチケットにアクセスします。

1. [サポートページ][1]から、右上の **Sign in** をクリックします。
1.  Datadog Zendesk アカウントに初めてサインインする場合は、**New to your Datadog Zendesk account?Sign up** をクリックします。
1. 以前に Datadog サポートにメールで問い合わせたことがある場合は、**Emailed us for support?Get a password** をクリックし、Datadog サポートへの連絡に使用したメールアドレスを入力します。
1. パスワードがメールで届いたら、ログインして **Manage your tickets** をクリックすると、リクエストを確認できます。
1. ログイン後、**My Activities** のページが表示されない場合は、右上の自分の名前をクリックし、**My Activities** をクリックしてください。
1. 組織全体のチケットを表示するには、Datadog サポートにリクエストを送信します。

## パスワードの要件 {#password-requirements}

アカウントのセキュリティを確保するために、Datadog の Zendesk サポートポータルへのサインインに使用するパスワードは、次の要件を満たしている必要があります。

- パスワードの複雑さ
   - 少なくとも **12 文字**を含める必要があります。
   - **大文字と小文字 (A-Z)** を含める必要があります
   - 少なくとも **1 つの数字 (0-9)** を含める必要があります。
   - 少なくとも **1 つの特殊文字** (例: `!`、`@`、`#`、または`%`) を含める必要があります。
   - メールアドレスと酷似していては**なりません**。
   - 「Zendesk」という単語を含めては**なりません**。
- 禁止されているシーケンス
   - パスワードには、指定された数を超える連続した文字や数字を含めることはできません。たとえば、制限が 4 に設定されている場合、システムは `admin12345` のようなパスワードを拒否します。
- 以前のパスワード
   - ユーザーは、過去に使用した一定数のパスワードを再利用することはできません。
- 有効期限ポリシー
   -  パスワードは、少なくとも **90 日ごと**、またはシステムから要求されたときに更新する必要があります。
- 失敗した試行とロックアウト
   - ユーザーは、アカウントが一時的にロックアウトされるまでに、最大で **5 回の試行**が許可されます。

## トラブルシューティング {#troubleshooting}

### エラー: Refused to connect {#error-refused-to-connect}

**Refused to connect** エラーは、サードパーティ Cookie をブロックするプライバシー設定が原因で発生します。この問題を解決するには、ブラウザで Zendesk からのサードパーティ Cookie が許可されていることを確認します。[Chrome で Cookie を削除、有効化、管理する方法][3]に関する手順については、Google Chrome ヘルプを参照してください。

お使いのブラウザに広告ブロッカーがある場合は、それらを無効にしてサインインできるかどうかを確認します。一部の広告ブロッカーには、独自の例外リストがあります。この場合は、**datadog.zendesk.com** を許可リストに追加します。

### チケットが利用できなくなった {#ticket-is-no-longer-available}

Datadog は、クローズされたチケット (添付ファイルを含む) を、最終更新から 15 か月後に削除します。

関連する問題についてサポートが必要な場合は、新しいチケットを作成するか、Datadog ドキュメントを検索します。

{{% /site-region %}}

{{% site-region region="gov,gov2" %}}

## 前提条件 {#prerequisites}

登録確認コード、パスワードリセットメール、およびケース通知メールを受信するには、`ddog-gov.com` ドメインをメールの許可リストに追加します。これには、`help@ddog-gov.com` および `support@ddog-gov.com` が含まれます。

## ポータルでの登録 {#register-on-the-portal}

初めて使用する場合は、次の手順に従ってアカウントを登録します。

1. [Datadog GovCloud サポートポータル][4] に移動します。
1. **Sign Up** をクリックします。
1. 既存の GovCloud Datadog アカウントに関連付けられているメールアドレスを使用して、登録フォームに必要事項を入力します。このページを開いたままにしておきます。
1. 別のブラウザタブで、メールアカウントにアクセスします。`help@ddog-gov.com` からの確認メールを開き、確認コードをコピーします。
1. [Datadog GovCloud サポートポータル][4]で確認コードを入力します。
1. **Verify** をクリックします。

**注**: 登録後、ログイン時のユーザー名は、メールアドレスに `.ddgov.support` を追加した形式になります (例: `[name]@[domain].ddgov.support`)。ログインする際は、このフルユーザー名を使用します。

## ケースの作成{#create-a-case}

ケースを作成するには、次の手順を行います。

1. [Datadog GovCloud サポートポータル](https://govsupport.ddog-gov.com) に移動します。
1. ユーザー名の形式 `[name]@[domain].ddgov.support` でログインします。
1. **Create a New Case** をクリックします。
1. フォームに必要事項を入力します。
1. **Submit & Upload Files** をクリックします。
1. 必要に応じて、関連ファイルをアップロードします。許可されているファイル形式は、`.txt`、`.csv`、`.xls`、`.xlsx`、`.doc`、`.otf`、`.yaml`、`.log`、`.conf`、`.tf`、`.zip`、`.pcap`、`.png`、および `.jpeg` です。
1. **Submit** をクリックします。

## 既存のケースにアクセスする {#access-existing-cases}

Datadog のケースを 1 件以上作成している場合は、次の手順に従ってケースにアクセスします。

1. [Datadog GovCloud サポートポータル][4] にログインします。
1. フィルターを **Recently Viewed** から **Cases** に変更して、すべてのケースを表示します。
1. **Case Number** または **Subject** をクリックすると、詳細が表示されます。

**注**: 過去の Zendesk ケースは移行されていません。レガシー Zendesk は読み取り専用です。

## トラブルシューティング {#troubleshooting-1}

### 新しいケースが表示されない {#cannot-see-new-cases}

フィルターを **Recently Viewed** から **Cases** に変更します。

### ログインの問題 {#login-issues}

完全なユーザー名に `.ddgov.support` サフィックスが含まれていることを確認します。

### パスワードリセットメールが届かない {#password-reset-not-received}

**Forgot Your Password?** をクリックします。**Reset Your Password** ページを開き、`.ddgov.support` サフィックスを含む完全なユーザー名を **Enter your username** フィールドに入力します。それでもメールが届かない場合は、`ddog-gov.com` をメールの許可リストに追加します。

### ユーザー名が不明な場合{#do-not-know-your-username}

**Forgot Your Password?** をクリックします。> **Forgot your username?**> **Use Your Email Address** をクリックします。このリンクをクリックすると、GovCloud サポートポータルから移動し、Salesforce Identity が開きます。そのページのタイトルも **Reset Your Password** ですが、**Enter your email address** フィールドには、`.ddgov.support` ユーザー名ではなく職場のメールアドレスを入力します。

### 登録エラー{#registration-error}

アカウントがすでに存在している可能性があります。**Forgot Your Password?** をクリックし、`.ddgov.support` サフィックス (例: `[name]@[domain].ddgov.support`) を含む完全なユーザー名を、**Enter your username** フィールドに入力します。それでもアカウントにアクセスできない場合は、`support@ddog-gov.com` にお問い合わせください。

{{% /site-region %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.datadoghq.com/
[2]: https://app.datadoghq.com/help
[3]: https://support.google.com/chrome/answer/95647
[4]: https://govsupport.ddog-gov.com