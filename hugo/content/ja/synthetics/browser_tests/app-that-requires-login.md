---
aliases:
- /ja/synthetics/guide/app-that-requires-login
description: Synthetic ブラウザテストがアプリケーションにログインできるようにする方法を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: /synthetics/guide/browser-tests-totp
  tag: ドキュメント
  text: ブラウザテストにおける多要素認証 (MFA) 用の TOTP
- link: /synthetics/guide/browser-tests-passkeys
  tag: ドキュメント
  text: ブラウザテストにおけるパスキーについて学ぶ
- link: /synthetics/browser_tests/test_steps
  tag: ドキュメント
  text: ブラウザテストのステップについて
- link: /synthetics/guide/kerberos-authentication/
  tag: ガイド
  text: Synthetic Monitoring の Kerberos 認証
title: 認証が必要なアプリケーションをブラウザテストで監視する
---
## 概要 {#overview}

<div class="alert alert-info">MFA の背後にあるアプリケーションのテストに関心がある場合は、<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">多要素認証セクション</a>を参照してください。</div>

ログイン後のユーザージャーニーを監視する必要がある場合があります。Datadog ブラウザテストでアプリケーションのログイン手順を通過し、ログイン後のページで検証を実行できるようにするには、2 つの方法があります。

- [ブラウザテストのレコーディングにログイン手順を含める](#include-the-login-steps-in-your-recording)
- [ブラウザテストで高度なオプションを活用する](#leverage-browser-test-configuration-options)

認証情報をアプリケーション全体で安全に保存および難読化するには、[難読化されたグローバル変数](#account-security)を使用してください。

## レコーディングにログイン手順を含める {#include-the-login-steps-in-your-recording}

最初の方法は、ブラウザテストの開始時にログインに必要な手順 (ユーザー名の入力、パスワードの入力、ログインボタンのクリック) を記録することです。その後、[後続の手順の記録を開始][1] できます。
テスト実行時に、ブラウザテストは、最初のログイン手順を体系的に実行してから、ジャーニーの残りの部分に進みます。

{{< img src="synthetics/guide/app_that_requires_login/login_test_2.mp4" video="true" alt="ログイン記録のデモ">}}

デフォルトでは、レコーダーの iframe/ポップアップは、お使いのブラウザを使用します。アプリケーションにログインした状態でレコーディングを開始すると、iframe/ポップアップにログイン後のページが直接表示される場合があり、その場合は先にログアウトしないとログイン手順を記録できません。

アプリケーションからログアウトせずに手順を記録するには、レコーダーのシークレットモードを使用してください。

{{< img src="synthetics/guide/app_that_requires_login/incognito_2.mp4" video="true" alt="シークレットモードでのログイン記録のデモ">}}

シークレットモードでポップアップを開くと、ブラウザのメインセッションやユーザーデータから完全に分離されたセッションを使用して、テスト構成で設定された開始 URL からテストのレコーディングを開始できます。新しく開いたシークレットモードのポップアップは、Cookie やローカルデータを含む、これまでのブラウザ履歴をすべて無視します。アカウントから自動的にログアウトされるため、初めて Web サイトにアクセスしたかのようにログイン手順の記録を開始できます。

**注:** [サブテスト機能][2] を使用してログイン手順を単一のサブテストにグループ化すると、ログインが必要な他のブラウザテストでそのサブテストを再利用できます。

### SSO ログイン {#sso-login}

Web サイトでログインに SSO を使用している場合は、アプリケーションの URL をブラウザテストの開始 URL として入力してください。テストは、最初のデフォルトの {{< ui >}}Navigate to URL{{< /ui >}} ステップの一部として必要なリダイレクトを実行します。

一部の SSO プロバイダーは、Datadog のブラウザテストをボットとして検出し、reCAPTCHA を追加するなどしてログインを阻止する場合があります。その場合は、テスト目的で [Synthetic ブラウザテストからのリクエストであると識別できる場合][3] (特定の認証情報や Synthetic テスト固有のヘッダーなど) にボット検出を無効にできるかどうか、SSO プロバイダーに問い合わせることを検討してください。

代替案として、SSO を使用しないアプローチを採用し、通常のユーザー名とパスワードの組み合わせを使用してログインを行う方法があります。

### パスキー {#passkeys}
Datadog Synthetic Monitoring は、フィッシング、パスワード盗難、リプレイ攻撃のリスクを軽減するセキュリティ手法である [パスキー][4] をサポートしています。ブラウザテストにおいて、パスキーは Google Chrome および Microsoft Edge でのみ機能します。

Virtual Authenticator のグローバル変数を作成し、それをテストにインポートしてください。次に、ブラウザ内でパスキーに関連するステップを記録してください。

### 多要素認証 {#multi-factor-authentication}

Datadog Synthetic Monitoring は、シークレットキーと現在時刻を組み合わせてワンタイムパスワードを生成する多要素認証手法である[時間ベースのワンタイムパスワード (TOTP)][5] をサポートしています。

ブラウザテストでは、通常のユーザーがブラウザ内で行うあらゆる操作を再現できます。テストを設定する際は、ブラウザ内で多要素認証 (2FA や TFA を含む) のステップを記録してください。

一部の MFA プロバイダーは、Datadog のブラウザテストをボットとして検出し、reCAPTCHA を追加するなどしてログインを阻止する場合があります。この場合は、MFA プロバイダーに連絡し、[Synthetic ブラウザテストからのリクエストであると識別できる場合][3] (特定の認証情報や Synthetic テスト固有のヘッダーなど) に、ボット検出を無効にできるかどうかを確認してください。

MFA プロセスにブラウザ外で実行される手順 (音声、テキストメッセージ、または TOTP を利用しないモバイルアプリケーションを開くなど) が含まれる場合は、テスト目的で [Synthetic ブラウザテストからのリクエストであると識別できる場合][3] (特定の認証情報セットや Synthetic テスト固有のヘッダーなど) に、MFA 設定を変更できるか、または MFA をオフにできるかを MFA プロバイダーに問い合わせることを検討してください。
アプリケーションが利用する MFA のタイプによっては、[JavaScript ステップ][6] が回避策として役立つ場合があります。

<div class="alert alert-info">Datadog は、テストシナリオをより簡単に記録できるように、常に機能を追加しています。お客様にとって最も重要な MFA システムに関する<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">フィードバックをお寄せ</a>いただけると幸いです。</div>

## ブラウザテストの構成オプションを活用する {#leverage-browser-test-configuration-options}

あるいは、組み込みのブラウザテスト構成オプションを使用して認証するように Datadog ブラウザテストを構成することもできます。以下を適用できます。

- 特定のヘッダー
- Cookie
- HTTP Basic、Digest、または NTLM 認証情報 (ユーザー名とパスワード)

詳細については、[高度なオプション][10] セクションを参照してください。

これらの構成オプションは、テストの実行ごとに設定され、記録時ではなく、実行時にブラウザテストのすべてのステップに適用されます。

これらのヘッダー、Cookie、および認証情報を記録ページに手動で適用し、ログイン後にテストが実行するステップを記録できます。テストの実行中、ブラウザテストは指定された構成を使用して自動的に認証を行い、記録されたすべてのステップを実行します。

{{< img src="synthetics/guide/app_that_requires_login/browser_test_adv_options_2.png" alt="ブラウザテストの構成オプションを使用してアプリにログインする">}}

SSO、パスキー、MFA など、他の認証方法を使用するアプリケーションについては、[レコーディングにログイン手順を含める][11] セクションを参照してください。

## アカウントのセキュリティ {#account-security}

### 認証データを保護する{#secure-your-authentication-data}

認証情報を [グローバル変数][7] として保存し (例: ユーザー名用に 1 つ、パスワード用に別のグローバル変数)、[{{< ui >}}Hide and obfuscate variable value{{< /ui >}}] を選択してテスト結果から値を非表示にします。Datadog インスタンスへのアクセス権を持つ個人に対して、ブラウザテストの権限を制限できます。

難読化された変数を作成した後、[これらのグローバル変数をインポート][8] してブラウザテストに取り込み、ログイン手順で使用できます。

**注:**Datadog のグローバル変数は安全に保存・暗号化されますが、一般的なテストのベストプラクティスとして、ダミーの認証情報を使ったテスト専用のアカウントを使用することを強く推奨します。

アカウントのセキュリティに関する詳細については、[Synthetic Monitoring のデータセキュリティ][9] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/test_steps/
[2]: /ja/synthetics/browser_tests/test_steps/#subtests
[3]: /ja/synthetics/guide/identify_synthetics_bots/
[4]: /ja/synthetics/guide/browser-tests-passkeys
[5]: /ja/synthetics/guide/browser-tests-totp
[6]: /ja/synthetics/browser_tests/test_steps/#test-your-ui-with-custom-javascript
[7]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[8]: /ja/synthetics/browser_tests/test_steps#a-global-variable
[9]: /ja/data_security/synthetics
[10]: /ja/synthetics/browser_tests/?tab=requestoptions#advanced-options
[11]: #include-the-login-steps-in-your-recording