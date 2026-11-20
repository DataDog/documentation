---
further_reading:
- link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
  tag: ブログ
  text: Datadog Synthetic テストでの多要素認証の導入
- link: /synthetics/guide/browser-tests-passkeys
  tag: ドキュメント
  text: ブラウザテストにおけるパスキーについて学ぶ
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: ドキュメント
  text: グローバル変数の詳細はこちら
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: ブログ
  text: クライアントが Datadog を使ってブラウザテストをスケールするのを手助けした方法
title: ブラウザテストで多要素認証 (MFA) に時間ベースのワンタイムパスワード (TOTP) を使用する
---
## 概要 {#overview}

TFA や MFA などの多要素認証方法は、不正アクセスからアプリケーションを保護するのに役立ちますが、これらの方法によって機能のテストが難しくなる場合があります。

Datadog Synthetic MFA グローバル変数を使用すると、重要なセキュリティ対策を無効にしたり、別のツールで認証コードを手動で入力したりすることなく、アプリケーションの TOTP ベースの MFA モジュールや重要なユーザー体験をテストできます。MFA 対応のユーザー体験をテストするために、専用の環境を作成または維持する必要はありません。

**注**: Datadog は SHA-1 アルゴリズムで TOTP を生成するため、他のアルゴリズムを使用するトークンはサポートしていません。お使いの TOTP トークンが Google Authenticator で動作する場合、Datadog と互換性がある可能性が高いです。


## シークレットキーまたは QR コードをグローバル変数に保存します {#store-your-secret-key-or-qr-code-in-a-global-variable}

シークレットキーを入力するための、または認証プロバイダーからの QR コードをアップロードするためのグローバル変数を作成してください。[{{< ui >}}Settings{{< /ui >}}] ページの [{{< ui >}}Global Variables{{< /ui >}}] タブで、[{{< ui >}}Create Global Variable{{< /ui >}}] をクリックしてください。
1.  [{{< ui >}}Choose variable type{{< /ui >}}] で、[{{< ui >}}MFA Token{{< /ui >}}] を選択します。
2. [{{< ui >}}Define variable{{< /ui >}}] に、{{< ui >}}Variable Name{{< /ui >}} (変数名) を入力してください。変数名には、大文字の英字、数字、アンダースコアのみを使用できます。
3. 変数の {{< ui >}}Description{{< /ui >}} (説明) を入力してください (オプション)。
4. 変数に関連付ける {{< ui >}}Tags{{< /ui >}} (タグ) を選択してください (オプション)。
5. シークレットキーの作成または新しい QR コードの追加については、認証アプリのドキュメントの手順に従ってください。
6. 変数に {{< ui >}}Secret Key{{< /ui >}} (シークレットキー) を入力するか、QR コード画像をアップロードしてください。

    **注**: QR コードをアップロードすると、Datadog はシークレットキーのみを読み取ります。プロバイダーが異なるコード長や更新期間を使用している場合は、ステップ 7 で設定してください。

7. (オプション) 異なるコード長や更新期間を使用するには、[{{< ui >}}Generate the OTP{{< /ui >}}] の下の [{{< ui >}}Advanced Options{{< /ui >}}] を展開して値を調整してください。
8. [{{< ui >}}\+ Generate{{< /ui >}}] をクリックして TOTP を作成してください。生成された TOTP は [{{< ui >}}Copy{{< /ui >}}] アイコンでコピーできます。
9. [{{< ui >}}Permissions settings{{< /ui >}}] で、組織内のロールに基づいて変数へのアクセスを制限してください。ロールの詳細については、[RBAC のドキュメント][1] を参照してください。

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA トークンを作成する" style="width:100%;" >}}

## Synthetic テストで TOTP を使用する {#use-totp-in-your-synthetic-tests}
グローバル変数に保存されたシークレットキーまたは QR コードは、すべての Synthetic テストで使用できます。[ブラウザテスト][2] を作成する際は、グローバル変数に保存されたシークレットキーまたは QR コードから生成された TOTP を挿入して、アプリケーションの認証ワークフローを検証してください。

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="TOTP 検証の記録" video="true" >}}

[ブラウザテスト][2] で TOTP を使用するには:

1. グローバル変数をインポートしてください。
2. テストの記録中に [{{< ui >}}Hand{{< /ui >}}] アイコンをクリックして、TOTP を生成してください。
3. テストブラウザアプリケーションで、フィールドをクリックして TOTP を貼り付けてください。計算されたコードをテストに挿入すると、別のテストステップが作成されます。
4. テストステップの記録後、[{{< ui >}}Save & Launch Test{{< /ui >}}] をクリックしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /ja/synthetics/browser_tests/