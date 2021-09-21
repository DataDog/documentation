---
title: 認証が必要なアプリケーションでテストを実行する
kind: ガイド
further_reading:
  - link: synthetics/browser_tests
    tag: Documentation
    text: ブラウザテストの設定
  - link: /synthetics/browser_tests/actions
    tag: Documentation
    text: ブラウザテストの手順を作成
  - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
    tag: ブログ
    text: エンドツーエンドテスト作成のベストプラクティス
---
ログイン後に配置されているジャーニーを監視する必要がある場合、Datadog のブラウザテストでアプリケーションのログイン手順を実行しログイン後のページ検証を実行するには 2 つの方法があります。

- [記録にログイン手順を含める](#include-the-login-steps-in-your-recording)
- [ブラウザのテストコンフィギュレーションオプションを活用する](#leverage-browser-test-configuration-options)

[セキュリティ保護されたグローバル変数を使用](#account-security)することで、認証情報をアプリケーション全体で確実に難読化し安全に保存することもできます。

<div class="alert alert-info">MFA の背後にあるアプリケーションのテストに興味がありますか？<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">以下のセクション</a>から<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">フィードバックを送信</a>して、チームにとって最も重要なシステムの構築についてご意見をお聞かせください。</div>

## 記録にログイン手順を含める

1 つ目は、ログインの実行に必要な手順をブラウザテストの初めに記録する（ユーザー名とパスワードをを入力してログインボタンを押す）方法です。それから、[後続ステップの記録を開始][1]します。
テストの実行時、ブラウザテストで初めのログイン手順が体系的にまず実行され、その後のジャーニーへと進みます。

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="ログインの記録デモ">}}

デフォルトでは、レコーダーの iframe/ポップアップは独自のブラウザを使用します。すでにアプリケーションにログインした状態で記録を始めた場合、iframe/ポップアップがログイン後のページを直接表示する可能性があり、ログアウトしないとログイン手順を記録できなくなります。

アプリケーションからログアウトせずに手順を記録するには、レコーダーの**シークレットモード**を使用します。

{{< img src="synthetics/guide/app_that_requires_login/incognito.mp4" video="true" alt="シークレットモードでログインを記録するデモ">}}

シークレットモードでポップアップを開くと、独自のブラウザのメインセッションとユーザーデータから完全に分離されたセッションで、テストコンフィギュレーションに設定された開始 URL からテストの記録を開始できます。新しく開いたシークレットポップアップは、以前のブラウザ履歴 (Cookie やローカルデータなど) をすべて無視します。アカウントから自動的にログアウトされ、初めてウェブサイトにアクセスした場合と同じようにログイン手順の記録を開始できます。

**注:** 今後、ログインが必要な他のブラウザテストに再利用できるよう、ログイン手順を単一のサブテストにグループ化するには、[サブテスト機能][2]を使用します。

### SSO ログイン

SSO を使用してログインするウェブサイトの場合は、ブラウザテストの最初の URL としてアプリケーションの URL を入力します。テストで、デフォルトの最初の **Navigate to URL** 手順の一部として必要な再ダイレクトが実行されます。

一部の SSO プロバイダーでは、Datadog のブラウザテストがボットと認識され、ログインできない場合があります（例: reCAPTCHA の追加）。このような場合、[Synthetic ブラウザテストからのリクエストの検出][3]時（特定の認証情報、Synthetic テスト固有のヘッダーなど）には、テストの目的のためボット検出機能を無効化することが可能かどうか、SSO プロバイダーにお問い合わせください。

その他、SSO 以外のアプローチを使用して通常のユーザー名とパスワードの組み合わせを利用してログインする方法があります。

### 多要素認証

ブラウザテストでは、通常のユーザーがブラウザ内で実行するアクションを再現できます。多要素認証 (または 2FA、TFA) 認証の手順をブラウザ内で実行する場合、ブラウザテストの設定時に記録することができます。一部の MFA プロバイダーでは、Datadog のブラウザテストがボットと認識され、ログインできない場合があります（例: reCAPTCHA の追加）。このような場合、[Synthetic ブラウザテストからのリクエストの検出][3]時（特定の認証情報、Synthetic テスト固有のヘッダーなど）には、テストの目的のためボット検出機能を無効化することが可能かどうか、MFA プロバイダーにお問い合わせください。

MFA プロセスに、音声およびテキストメッセージの送信やモバイルアプリケーションを開くなど、ブラウザ外で実行される手順が含まれる場合も、[Synthetic ブラウザテストからのリクエストの検出][3]時（特定の認証情報、Synthetic テスト固有のヘッダーなど）には、テストの目的のため MFA 設定の変更または MFA の無効化が可能かどうか、MFA プロバイダーにお問い合わせください。
アプリケーションにより利用される MFA のタイプによっては、[JavaScript 手順][4]が有効な場合があります。

<div class="alert alert-info">テストシナリオをより簡単に記録できるよう、常に機能が追加されています。<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">フィードバックを送信</a>して、最も重要な MFA システムについてご意見をお聞かせください。</div>

## ブラウザテストのコンフィギュレーションオプションを活用する

Datadog のブラウザテストがアプリケーションにログインできるようにする 2 つ目の方法は、利用可能なブラウザテストのコンフィギュレーションを使用することです。以下を適用することを設定できます。

- 特定のヘッダー
- Cookie
- 基本、ダイジェスト、Bearer または NTLM 資格情報

これらは、すべてのテスト実行およびブラウザテストのすべてのステップで設定されるため、ログイン直後にステップの記録を開始できます。

{{< img src="synthetics/guide/app_that_requires_login/browser_test_conf.png" alt="ブラウザテストのコンフィギュレーションオプションでアプリにログイン">}}

## アカウントのセキュリティ

### 認証データの安全性を確保

認証情報を[グローバル変数][5]として保存 (たとえば、ユーザー名に 1 つのグローバル変数、パスワードに別のグローバル変数) し、この変数をセキュアと設定して Datadog のインスタンスにアクセスが可能なすべてのユーザーに対して難読化します。

セキュアな変数を作成したら、ブラウザテストに[そのグローバル変数をインポート][6]して、ログイン手順に利用します。

**注:** Datadog のグローバル変数は安全に保存され暗号化されますが、テストの一般的なベストプラクティスとして、ダミーの資格情報に紐づけられたテスト用のアカウントを使用することを強くお勧めします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/actions/
[2]: /ja/synthetics/browser_tests/actions/#subtests
[3]: /ja/synthetics/guide/identify_synthetics_bots/
[4]: /ja/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[5]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[6]: /ja/synthetics/browser_tests/actions#a-global-variable
