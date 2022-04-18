---
title: ブラウザテストのメール検証
kind: ドキュメント
description: ブラウザテストのステップでメールとその内容を検証
further_reading:
  - link: /synthetics/browser_tests/actions
    tag: Documentation
    text: ブラウザテストのステップについて
  - link: /synthetics/browser_tests/advanced_options/
    tag: Documentation
    text: ステップに高度なオプションを構成する
---
## 概要

従来のウェブアプリケーションでは、通常、メールがトリガーされてユーザーの受信箱に送信される形態をとっています（アカウント作成後の確認メール、パスワードを忘れた場合のリセット用メール、注文確認メール、問い合わせを送信した後に送信される確認メールなど）。

アプリケーションのメール機構の正常動作は、ウェブサイトのユーザーエクスペリエンスを最適に維持するために大変重要です。

Datadog の[ブラウザテスト][1]では、以下を行うことができます。

- アプリ内トリガーの後処理としてメールが正常に送信されたことを確認
- メールの内容を確認
- 送信されたメール内に設置されたリンクをクリックし、別のURLへ移動してウェブ及びメールのステップを含むフロー全体を検証

Datadog ブラウザテストでメール検証を実行するには:

## メール変数を作成

ブラウザテストの詳細（開始 URL、デバイス、場所、頻度、通知）を入力したら、**Save Details & Record Test** へ移動して **Variables** を選択します。次に、メール変数のドロップダウンリストから **Email** を選択します。。

{{< img src="synthetics/guide/email-validation/adding-variable.mp4" alt="メール変数の作成" video="true"  width="100%">}}

上記の例では、`EMAIL` というメール変数が作成されています。新しく作成されたメール変数により、Datadog で管理される一意の受信箱が、テストを実行するたびに生成されます。これは、ブラウザテスト間での競合を避けるために重要なポイントです。

## ステップを記録

UI の左上にある **Start Recording** ボタンをクリックして、今作成されたメール変数を使用してメールがトリガーするステップを記録します。手の形のアイコンを使用すると、フォームのテキスト入力に変数を入力できます。

{{< img src="synthetics/guide/email-validation/record-steps.mp4" alt="ステップを記録" video="true"  width="100%">}}

フォームに入力するステップが記録され、`Sign up` ボタンのクリックでメールがトリガーされます。結果として、この記録セッション用に作成された Datadog の受信箱にメールが送信されます（この例では `838-n3q-q2y.6238933596@synthetics.dtdg.co`）。

## メールの送信を確認

メールが送信されたことを確認します。**Assertion** ボタンをクリックし、`Test that an email was received` アサーションを選択します。

{{< img src="synthetics/guide/email-validation/assertion-step.mp4" alt="アサーションを追加" video="true"  width="100%">}}

メールが、その内容に基づき特別なガイドラインを遵守するよう設定するには、題名と本文に対する確認を追加することが可能です。

上記の例では、メールの題名が `Welcome to Shopist!` で本文に `Your verification code is` という文が含まれ、認証コードが `\d{1,6}` の正規表現パターンに一致する場合に成功とするアサーションが設定されています。

## メール内のリンクをナビゲート

ブラウザテストで、送信したメールに含まれるリンク先へ移動し動作を確認できるようになりました。

実行するには、**Navigation** ステップを作成し、`Go to email and click link` を選択して、テスト対象のリンクを含むメールを選択します。ブラウザテストでナビゲートするリンクを選択すると、すぐに iframe またはポップアップの URL が設定されます。ステップの記録は通常通り継続されます。

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="ナビゲーションステップの追加" video="true"  width="100%">}}

上記の例では、ブラウザテストで “Welcome to Shopist” というメールの認証リンクをクリックし、ユーザー登録のメカニズムが正常に動作していることを確認します。“Welcome to Shopist” というメールが選択され、“Verify your email by clicking here” というリンクが指定されています。このステップが保存されると、iframe が該当ページにリダイレクトされます。

次に、`div` コンテンツをテストする最後のアサーションを作成し、適切なアカウント認証（`Your account is now verified.` という文が含まれるページ）がトリガーされたことを確認できます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests