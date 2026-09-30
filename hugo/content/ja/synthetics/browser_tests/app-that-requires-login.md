---
aliases:
- /ja/synthetics/guide/app-that-requires-login
description: Synthetic ブラウザテストでアプリケーションにログインできるようにする方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: /synthetics/guide/browser-tests-totp
  tag: ドキュメント
  text: ブラウザテストにおける多要素認証 (MFA) 用 TOTP
- link: /synthetics/guide/browser-tests-passkeys
  tag: ドキュメント
  text: ブラウザテストのパスキーについて
- link: /synthetics/browser_tests/actions
  tag: ドキュメント
  text: ブラウザテストステップについて
title: Browser Testing で認証が必要なアプリケーションを監視
---

## 概要 

<div class="alert alert-info">MFA が有効なアプリケーションのテストに興味がある場合は、<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">Multi-factor authentication セクション</a> を参照してください。</div>

ログイン後に配置されているユーザージャーニーを監視する必要がある場合、Datadog のブラウザテストでアプリケーションのログイン手順を実行しログイン後のページ検証を実行するには 2 つの方法があります。

- [ブラウザテストの記録にログイン手順を含める](#include-the-login-steps-in-your-recording)
- [ブラウザテストの高度なオプションを活用する](#leverage-browser-test-configuration-options)

認証情報をアプリケーション全体で確実に難読化し安全に保存するには、[難読化されたグローバル変数](#account-security)を使用します。

## 記録にログイン手順を含める

1 つ目は、ログインの実行に必要な手順をブラウザテストの初めに記録（ユーザー名とパスワードを入力してログインボタンをクリック）する方法です。それから、[後続ステップの記録を開始][1]します。
テストの実行時、ブラウザテストで初めのログイン手順が体系的にまず実行され、その後のジャーニーへと進みます。

{{< img src="synthetics/guide/app_that_requires_login/login_test_2.mp4" video="true" alt="ログインを記録するデモ">}}

デフォルトでは、レコーダーの iframe/ポップアップは独自のブラウザを使用します。すでにアプリケーションにログインした状態で記録を始めた場合、iframe/ポップアップがログイン後のページを直接表示する可能性があり、ログアウトしないとログイン手順を記録できなくなります。

アプリケーションからログアウトせずに手順を記録するには、レコーダーの**シークレットモード**を使用します。

{{< img src="synthetics/guide/app_that_requires_login/incognito_2.mp4" video="true" alt="シークレット モードでログインを記録するデモ">}}

シークレットモードでポップアップを開くと、独自のブラウザのメインセッションとユーザーデータから完全に分離されたセッションで、テストコンフィギュレーションに設定された開始 URL からテストの記録を開始できます。新しく開いたシークレットポップアップは、以前のブラウザ履歴 (Cookie やローカルデータなど) をすべて無視します。アカウントから自動的にログアウトされ、初めてウェブサイトにアクセスした場合と同じようにログイン手順の記録を開始できます。

**注:** 今後、ログインが必要な他のブラウザテストに再利用できるよう、ログイン手順を単一のサブテストにグループ化するには、[サブテスト機能][2]を使用します。

### SSO ログイン

SSO を使用してログインするウェブサイトの場合は、ブラウザテストの最初の URL としてアプリケーションの URL を入力します。テストで、デフォルトの最初の **Navigate to URL** 手順の一部として必要な再ダイレクトが実行されます。

一部の SSO プロバイダーでは、Datadog のブラウザテストがボットと認識され、ログインできない場合があります（例: reCAPTCHA の追加）。このような場合、[Synthetic ブラウザテストからのリクエストの検出][3]時 (特定の認証情報、Synthetic テスト固有のヘッダーなど) には、テストの目的のためボット検出機能を無効化することが可能かどうか、SSO プロバイダーにお問い合わせください。

その他、SSO 以外のアプローチを使用して通常のユーザー名とパスワードの組み合わせを利用してログインする方法があります。

### パスキー
Datadog Synthetic モニタリングは、フィッシングやあらゆる形態のパスワード盗難、リプレイ攻撃のリスクを排除するセキュリティ手法である[パスキー][4]をサポートしています。

Virtual Authenticator グローバル変数を作成し、テストにインポートします。次に、ブラウザ内でパスキーに関連するステップを記録します。

### 多要素認証

Datadog Synthetic モニタリングは、[Time-based One Time Passwords (TOTP)][5] をサポートしています。これは、秘密鍵と現在時刻を組み合わせてワンタイムパスワードを生成する多要素認証方法です。

ブラウザテストでは、通常のユーザーがブラウザ内で実行するすべてのアクションを再現できます。テストを設定するときは、ブラウザ内で多要素 (2FA または TFA を含む) 認証手順を記録します。

一部の MFA プロバイダーでは、Datadog のブラウザテストがボットと認識され、ログインできない場合があります（例: reCAPTCHA の追加）。このような場合、[Synthetic ブラウザテストからのリクエストの検出][3]時 (特定の認証情報、Synthetic テスト固有のヘッダーなど) には、ボット検出機能を無効化することが可能かどうか、MFA プロバイダーにお問い合わせください。

MFA プロセスに、ブラウザ外で実行される手順 (音声およびテキストメッセージの送信や TOTP を利用しないモバイルアプリケーションを開くなど) が含まれる場合、[Synthetic ブラウザテストからのリクエストの検出][3]時 (特定の認証情報、Synthetic テスト固有のヘッダーなど) には、テストの目的のため MFA 設定の変更または MFA の無効化が可能かどうか、MFA プロバイダーにお問い合わせください。
アプリケーションにより利用される MFA のタイプによっては、[JavaScript 手順][6]が有効な場合があります。

<div class="alert alert-info">Datadog では、テストシナリオをより簡単に記録できるよう、常に機能が追加されています。最も重要な MFA システムについて、ぜひ<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">ご意見をお聞かせください</a>。</div>

## ブラウザテストのコンフィギュレーションオプションを活用する

Datadog のブラウザテストがアプリケーションにログインできるようにする 2 つ目の方法は、利用可能なブラウザテストのコンフィギュレーションを使用することです。以下を適用することを設定できます。

- 特定のヘッダー
- Cookie
- 基本認証、ダイジェスト認証、または NTLM 資格情報

これらのコンフィギュレーションオプションは、テストの実行ごとに設定され、記録時間ではなく、実行時にブラウザテストのすべてのステップに適用されます。

記録元のページにこれらの構成済みヘッダー、Cookie、および資格情報を手動で適用してから、テストがログイン後に実行するステップを記録できます。デフォルトでは、ブラウザテストは、実行時に指定されたヘッダー、Cookie、または資格情報を使用した認証を自動的に通過し、記録されたすべてのステップを実行します。

{{< img src="synthetics/guide/app_that_requires_login/bt_adv_options.jpg" alt="ブラウザテストのコンフィギュレーションオプションでアプリにログイン">}}

## アカウントのセキュリティ

### 認証データの安全性を確保

資格情報を[グローバル変数][7]として保存し (例えば、ユーザー名用のグローバル変数とパスワード用のグローバル変数)、**Hide and obfuscate variable value** を選択してテスト結果からその値を隠します。Datadog のインスタンスにアクセスできる個人に対して、ブラウザテストの権限を制限することができます。

難読化された変数を作成したら、ブラウザテストに[そのグローバル変数をインポート][8]して、ログイン手順に利用します。

**注:** Datadog のグローバル変数は安全に保存され暗号化されますが、テストの一般的なベストプラクティスとして、ダミーの資格情報に紐づけられたテスト用のアカウントを使用することを強くお勧めします。

アカウントセキュリティについては、[Synthetic モニタリングのデータセキュリティ][9]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/actions/
[2]: /ja/synthetics/browser_tests/actions/#subtests
[3]: /ja/synthetics/guide/identify_synthetics_bots/
[4]: /ja/synthetics/guide/browser-tests-passkeys
[5]: /ja/synthetics/guide/browser-tests-totp
[6]: /ja/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[7]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[8]: /ja/synthetics/browser_tests/actions#a-global-variable
[9]: /ja/data_security/synthetics