---
further_reading:
- link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
  tag: ブログ
  text: Introducing multi-factor authentication in Datadog Synthetic tests
- link: /synthetics/guide/browser-tests-passkeys
  tag: ドキュメント
  text: ブラウザテストのパスキーについて
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: ドキュメント
  text: グローバル変数について
kind: ガイド
title: ブラウザテストにおいて、多要素認証 (MFA) に時間ベースのワンタイムパスワード (TOTP) を使用する
---

## 概要

TFA や MFA などの多要素認証方法は不正なアクセスからアプリケーションを保護するのに役立ちますが、これらの方法を使用しながら機能のテストを行うのは困難です。

Datadog Synthetic MFA グローバル変数を使用すると、重要なセキュリティ対策を無効にしたり、異なるツールで認証コードを手動で入力したりすることなく、アプリケーションの TOTP ベースの MFA モジュールと重要なユーザジャーニーをテストすることができます。MFA 対応のユーザージャーニーをテストするために専用の環境を構築・維持する必要はありません。

## シークレットキーや QR コードをグローバル変数に格納する

シークレットキーを入力したり、認証プロバイダーから QR コードをアップロードするためのグローバル変数を作成します。**Settings** ページの **Global Variables** タブで、**Create Global Variable** をクリックします。
1. **Choose variable type** で **MFA Token** を選択します。
2. **Define variable** で、**Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。
3. 変数の **Description** を入力します（任意）。
4. **Tags** を選択して変数と関連付けます（任意）。
5. 変数に**シークレットキー**を入力または QR コードイメージをアップロードします。
6. **+ Generate** をクリックして TOTP を作成します。**コピー**アイコンを使用すると、生成した TOTP をコピーできます。
7. **Permissions settings** で、オーガニゼーション内のロールに基づいて変数へのアクセスを制限します。ロールの詳細については、[RBAC ドキュメント][1]を参照してください。

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA トークンの作成" style="width:100%;" >}}

## Synthetic テストで TOTP を使う
グローバル変数に格納されたシークレットキーや QR コードは、すべての Synthetic テストで使用することができます。[ブラウザテスト][2]を作成する際に、グローバル変数に格納されたシークレットキーや QR コードから生成された TOTP を挿入して、アプリケーションの認証ワークフローを検証します。

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="TOTP 検証を記録" video="true" >}}

[ブラウザテスト][2]で TOTP を使用するには

1. グローバル変数をインポートします。
2. テストを記録する際は、**手の形**のアイコンをクリックして TOTPを生成します。
3. テスト用のブラウザアプリケーションで、フィールドをクリックして TOTP を貼り付けます。計算されたコードをテストに注入すると別のテストステップが作成されます。
4. テストの手順を記録したら、**Save & Launch Test** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /ja/synthetics/browser_tests/