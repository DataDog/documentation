---
description: Synthetic ブラウザテストでアプリケーションにログインできるようにする方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: GitHub
  text: エンドツーエンドテスト作成のベストプラクティス
- link: /synthetics/guide/browser-tests-totp
  tag: Documentation
  text: ブラウザテストにおける多要素認証 (MFA) 用 TOTP
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザテストについて
- link: /synthetics/browser_tests/actions
  tag: ドキュメント
  text: ブラウザテストステップについて
kind: ガイド
title: 認証が必要なアプリケーションでテストを実行する
---

## 概要 

<div class="alert alert-info">MFA の背後にあるアプリケーションのテストに興味がある場合は、<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">多要素認証セクション</a>から<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">フィードバックを送信</a>して、チームにとって最も重要なシステムの構築についてご意見をお聞かせください。</div>

ログイン後に配置されているユーザージャーニーを監視する必要がある場合、Datadog のブラウザテストでアプリケーションのログイン手順を実行しログイン後のページ検証を実行するには 2 つの方法があります。

- [ブラウザテストの記録にログイン手順を含める](#include-the-login-steps-in-your-recording)
- [ブラウザテストの高度なオプションを活用する](#leverage-test-configuration-options)

認証情報をアプリケーション全体で確実に難読化し安全に保存するには、[難読化されたグローバル変数](#account-security)を使用します。

## 記録にログイン手順を含める

1 つ目は、ログインの実行に必要な手順をブラウザテストの初めに記録（ユーザー名とパスワードを入力してログインボタンをクリック）する方法です。それから、[後続ステップの記録を開始][1]します。
テストの実行時、ブラウザテストで初めのログイン手順が体系的にまず実行され、その後のジャーニーへと進みます。

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="ログインの記録デモ">}}

デフォルトでは、レコーダーの iframe/ポップアップは独自のブラウザを使用します。すでにアプリケーションにログインした状態で記録を始めた場合、iframe/ポップアップがログイン後のページを直接表示する可能性があり、ログアウトしないとログイン手順を記録できなくなります。

アプリケーションからログアウトせずに手順を記録するには、レコーダーの**シークレットモード**を使用します。

{{< img src="synthetics/guide/app_that_requires_login/incognito.mp4" video="true" alt="シークレットモードでログインを記録するデモ">}}

シークレットモードでポップアップを開くと、独自のブラウザのメインセッションとユーザーデータから完全に分離されたセッションで、テストコンフィギュレーションに設定された開始 URL からテストの記録を開始できます。新しく開いたシークレットポップアップは、以前のブラウザ履歴 (Cookie やローカルデータなど) をすべて無視します。アカウントから自動的にログアウトされ、初めてウェブサイトにアクセスした場合と同じようにログイン手順の記録を開始できます。

**注:** 今後、ログインが必要な他のブラウザテストに再利用できるよう、ログイン手順を単一のサブテストにグループ化するには、[サブテスト機能][2]を使用します。

### SSO ログイン

SSO を使用してログインするウェブサイトの場合は、ブラウザテストの最初の URL としてアプリケーションの URL を入力します。テストで、デフォルトの最初の **Navigate to URL** 手順の一部として必要な再ダイレクトが実行されます。

一部の SSO プロバイダーでは、Datadog のブラウザテストがボットと認識され、ログインできない場合があります（例: reCAPTCHA の追加）。このような場合、[Synthetic ブラウザテストからのリクエストの検出][3]時 (特定の認証情報、Synthetic テスト固有のヘッダーなど) には、テストの目的のためボット検出機能を無効化することが可能かどうか、SSO プロバイダーにお問い合わせください。

その他、SSO 以外のアプローチを使用して通常のユーザー名とパスワードの組み合わせを利用してログインする方法があります。

### 多要素認証

Datadog Synthetic モニタリングは、[Time-based One Time Passwords (TOTP)][4] をサポートしています。これは、秘密鍵と現在時刻を組み合わせてワンタイムパスワードを生成する多要素認証方法です。

ブラウザテストでは、通常のユーザーがブラウザ内で実行するすべてのアクションを再現できます。テストを設定するときは、ブラウザ内で多要素 (2FA または TFA を含む) 認証手順を記録します。

一部の MFA プロバイダーでは、Datadog のブラウザテストがボットと認識され、ログインできない場合があります（例: reCAPTCHA の追加）。このような場合、[Synthetic ブラウザテストからのリクエストの検出][3]時 (特定の認証情報、Synthetic テスト固有のヘッダーなど) には、ボット検出機能を無効化することが可能かどうか、MFA プロバイダーにお問い合わせください。

MFA プロセスに、ブラウザ外で実行される手順 (音声およびテキストメッセージの送信や TOTP を利用しないモバイルアプリケーションを開くなど) が含まれる場合、[Synthetic ブラウザテストからのリクエストの検出][3]時 (特定の認証情報、Synthetic テスト固有のヘッダーなど) には、テストの目的のため MFA 設定の変更または MFA の無効化が可能かどうか、MFA プロバイダーにお問い合わせください。
アプリケーションにより利用される MFA のタイプによっては、[JavaScript 手順][5]が有効な場合があります。

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

認証情報を[グローバル変数][6]として保存 (たとえば、ユーザー名に 1 つのグローバル変数、パスワードに別のグローバル変数) し、この変数を難読化と設定して Datadog のインスタンスにアクセスが可能なすべてのユーザーに対して隠します。

難読化された変数を作成したら、ブラウザテストに[そのグローバル変数をインポート][7]して、ログイン手順に利用します。

**注:** Datadog のグローバル変数は安全に保存され暗号化されますが、テストの一般的なベストプラクティスとして、ダミーの資格情報に紐づけられたテスト用のアカウントを使用することを強くお勧めします。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/actions/
[2]: /ja/synthetics/browser_tests/actions/#subtests
[3]: /ja/synthetics/guide/identify_synthetics_bots/
[4]: /ja/synthetics/guide/browser-tests-totp
[5]: /ja/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[6]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[7]: /ja/synthetics/browser_tests/actions#a-global-variable