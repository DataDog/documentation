---
description: Synthetic ブラウザテストでアプリケーションにログインできるようにする方法について説明します。
further_reading:
- link: /synthetics/guide/app-that-requires-login/
  tag: Documentation
  text: ブラウザテストにおける認証について
- link: /synthetics/guide/browser-tests-totp
  tag: Documentation
  text: ブラウザテストにおける多要素認証 (MFA) 用 TOTP
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: Documentation
  text: グローバル変数について
title: ブラウザテストでパスキー (FIDO2) を使用する
---

## 概要

パスキー (FIDO2) は、標準的なユーザー名とパスワードのタプルよりも強力なセキュリティを提供するもので、すべての Web サイトを対象とする一意の暗号化ログイン資格情報に依拠しています。パスキーがユーザーのデバイスの外に出ることはなく、Web アプリケーションサーバー上に保存されることもありません。このセキュリティモデルでは、フィッシングやあらゆる形態のパスワード窃取、リプレイ攻撃のリスクが排除されます。

パスキーは、ユーザー名とパスワードに代えて、または多要素認証の 2 つ目の要素として使用することができます。パスキーを生成、保管、活用できる Synthetic モニタリングは、パスキーで保護された重要なユーザージャーニーをテストするのに役立ちます。

## Virtual Authenticator グローバル変数を作成する

Synthetic Monitoring におけるパスキーは Virtual Authenticator グローバル変数で管理されます。パスキーを保存する Virtual Authenticator グローバル変数を作成するには、Synthetic Monitoring の [**Global Variables - Virtual Authenticator** セクション][4] を参照してください。

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Virtual Authenticator グローバル変数の作成" style="width:70%;" >}}

## Synthetic ブラウザテストでパスキーを使用する
<div class="alert alert-danger">Synthetic モニタリングは、Chrome と Edge のブラウザテストでパスキーをサポートしています。</div>

### ブラウザー テストにパスキーを追加する

1. [Digital Experience > New Test > Browser Test][3] をクリックします。
2. **Save & Edit Recording** をクリックします。
3. 録画ページで **Add Variable** > **Create variable from Global Variable** をクリックします。
4. [前のステップ](#create-your-virtual-authenticator-global-variable) で作成した Virtual Authenticator グローバル変数に保存されているパスキーを入力します。

{{< img src="synthetics/guide/browser-tests-passkeys/synthetics_add_variable.png" alt="ブラウザー テストに Virtual Authenticator グローバル変数を追加" style="width:70%;" >}}

### 登録フローのフロー

[ブラウザテスト][3]で、パスキーを使用して登録をテストする方法

1. テストに [Virtual Authenticator グローバル変数をインポート][5]します。
2. パスキーを登録するページに移動します。テストを記録する際、Datadog はインポートされた Virtual Authenticator グローバル変数を使って新規のパスワードを自動的に作成し、保存します。
3. テストの手順を記録したら、**Save & Launch Test** をクリックします。

### ログインフローのテスト

[ブラウザテスト][3]でパスキーを使ってログインフローをテストするには、まず Datadog パスキーを Web アプリケーションに登録する必要があります (上記セクション参照)。この作業は、パスキーとアプリケーションごとに 1 回必要です。

次のいずれかのオプションを選択します。

- 登録フローとログイン フローの両方のステップを組み込んだテストを作成する
- レコーダー内で登録フローを完了するが、登録ステップは記録しない

**注**: パスキー認証を伴う各テスト シナリオで毎回新しいユーザーを作成しないよう、ユーザー作成と認証を同じステップにまとめることを推奨します。

1. [Virtual Authenticator グローバル変数をインポート][5]します。 
2. パスキーでログインするページに移動します。テストを記録する際、Datadog は選択された Virtual Authenticator を使って Web アプリケーションにあらかじめ登録されたパスキーを使用して、自動的にログインします。
3. テストの手順を記録したら、**Save & Launch Test** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings/variables
[2]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[3]: /ja/synthetics/browser_tests/
[4]: /ja/synthetics/platform/settings?tab=virtualauthenticator#global-variables
[5]: /ja/synthetics/browser_tests#use-global-variables