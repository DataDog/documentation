---
description: ブラウザテストのステップでメールとその内容を検証します。
further_reading:
- link: /synthetics/browser_tests/actions
  tag: Documentation
  text: ブラウザテストのステップについて
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: ステップに高度なオプションを構成する
kind: documentation
title: ブラウザテストでメール検証を使用する
---

## 概要

Web アプリケーションジャーニーでは、アカウント作成後のメール認証、忘れたパスワードのリセット、注文確認の通知メール、コンタクトフォーム送信後のメール確認など、メールをトリガーにしてユーザーのメールボックスに送信することがよくあります。

Web サイトで優れたユーザー体験を維持するためには、アプリケーションのメールメカニズムが適切に動作していることを確認することが必要です。

## メール変数を作成

`EMAIL` というメール変数を追加するには

1. **Variables** をクリックし、ドロップダウンメニューから **Email** を選択します。
2. **Add Variable** をクリックすると、記録を開始するときに使用できる変数になります。

{{< img src="synthetics/guide/email-validation/adding-variable.mp4" alt="メール変数の作成" video="true" width="100%">}}

メール変数は、テストの実行ごとに Datadog が管理する一意のメールボックスを生成するため、ブラウザテストを競合なく実行することが可能です。

## ステップを記録

メール変数を作成したら、アプリ内トリガーの後に[メールが正しく送信されたか確認](#confirm-the-email-was-sent)することが可能です。

**Start Recording** をクリックし、メールがトリガーされるまでのすべてのステップをメール変数で記録します。変数の手のアイコンをクリックすると、フォームやフィールドのテキスト入力にその値が挿入されます。

{{< img src="synthetics/guide/email-validation/record-steps.mp4" alt="ステップを記録" video="true" width="100%">}}

フォームを完成させるためのステップを記録した後、**Sign Up** ボタンをクリックして、メール通知をトリガーします。この記録セッションに合わせたメールが、Datadog のメールボックス (例: `838-n3q-q2y.6238933596@synthetics.dtdg.co`) に送信されます。

### メールの送信を確認

メールが送信されたことを確認するには、**Assertion** をクリックし、**Test that an email was received** を選択します。メールの内容が特定のガイドラインに従っていることを確認するために、件名と本文に追加の検証を追加することができます。

{{< img src="synthetics/guide/email-validation/assertion-step.mp4" alt="アサーションを追加" video="true" width="100%">}}

この例では、メールの件名が `Welcome to Shopist!` で、本文に `Your verification code is...` という文があり、検証コードが `\d{1,6}` 正規表現パターンに一致する場合にアサーションが成功します。

### メール内のリンクを操作する

送信されたメール内のリンクをブラウザテストに操作させるには

1. **Navigation** をクリックし、**Go to email and click link** を選択します。**Next** をクリックします。
2. テストしたいリンクが含まれたメールが受信トレイに表示されます。**Next** をクリックします。
3. ブラウザテストで移動させたいリンクを選択します。iframe またはポップアップの URL は、指定されたリンクに直ちに更新されます。**Save Navigation Step** をクリックします。
4. iframe は、関連するページの URL にリダイレクトされます。ステップの記録を続けます。

この例では、ブラウザテストは `Welcome to Shopist` のメールを調べ、`Verify your email by clicking here` のリンクをクリックし、ユーザー登録メカニズムが期待通りに動作していることを確認します。

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="ナビゲーションステップの追加" video="true" width="100%">}}

ブラウザテストの最終ステップとして、`div` コンテンツが適切なアカウント検証をトリガーすることを確認するためのアサーションを作成します。例えば、このページには `Your account is now verified` が含まれています。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}