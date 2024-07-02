---
title: Use Passkeys (FIDO2) In Browser Tests
kind: guide
description: Learn how to ensure your Synthetic browser tests can log in to your applications. 
further_reading:
  - link: /synthetics/guide/app-that-requires-login/
    tag: Documentation
    text: Learn more about authentication in browser test
  - link: /synthetics/guide/browser-tests-totp
    tag: Documentation
    text: TOTPs for Multi-Factor Authentication (MFA) in browser tests
  - link: "synthetics/settings/?tab=specifyvalue#global-variables"
    tag: Documentation
    text: Learn more about global variables
---

## Overview

Passkeys (FIDO2) offer stronger security than the standard username and password tuple, and rely on cryptographic login credentials that are unique across every website. Passkeys never leave your user's devices and are never stored on a web application server. This security model eliminates the risks of phishing, all forms of password theft, and replay attacks.

You can use passkeys as a replacement for a username and password, or as a second factor authentication. By generating, storing, and leveraging passkeys, Synthetic Monitoring can help you test your critical passkey-protected user journeys without disabling this important security measure.

## Create your Virtual Authenticator global variable

Passkeys in Synthetic Monitoring are handled by Virtual Authenticator global variables. To create a Virtual Authenticator global variable storing your passkeys, see the [**Global Variables** section in Synthetic Monitoring & Continuous Testing Settings][4].

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Create a Virtual Authenticator global variable" style="width:70%;" >}}

## Use passkeys in your Synthetic browser tests
<div class="alert alert-warning">Synthetic Monitoring supports passkeys in browser tests for Chrome and Edge.</div>

### Add passkeys to a browser test

1. Click [Digital Experience > New Test > Browser Test][3].
2. **Save & Edit Recording** をクリックします。
3. On the recording page, click **Add Variable** > **Create variable from Global Variable**.
4. Supply the passkeys stored in your virtual authenticator global variable that you created in the [previous step](#create-your-virtual-authenticator-global-variable).

{{< img src="synthetics/guide/browser-tests-passkeys/synthetics_add_variable.png" alt="Adding your Virtual Authenticator global variable to your browser test" style="width:70%;" >}}

### 登録フローのフロー

[ブラウザテスト][3]で、パスキーを使用して登録をテストする方法

1. テストに [Virtual Authenticator グローバル変数をインポート][5]します。
2. パスキーを登録するページに移動します。テストを記録する際、Datadog はインポートされた Virtual Authenticator グローバル変数を使って新規のパスワードを自動的に作成し、保存します。
3. テストの手順を記録したら、**Save & Launch Test** をクリックします。

### ログインフローのテスト

[ブラウザテスト][3]でパスキーを使ってログインフローをテストするには、まず Datadog パスキーを Web アプリケーションに登録する必要があります (上記セクション参照)。この作業は、パスキーとアプリケーションごとに 1 回必要です。

次のいずれかの方法を選択できます。

- レコーダー内から登録フローを完了する。ただし、登録のステップは記録しない。
- 登録フローとログインフローの両方のステップを埋め込んだテストを作成する。

1. [Virtual Authenticator グローバル変数をインポート][5]します。 
2. パスキーでログインするページに移動します。テストを記録する際、Datadog は選択された Virtual Authenticator を使って Web アプリケーションにあらかじめ登録されたパスキーを使用して、自動的にログインします。
3. テストの手順を記録したら、**Save & Launch Test** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings/variables
[2]: /account_management/rbac/?tab=datadogapplication#custom-roles
[3]: /synthetics/browser_tests/
[4]: /synthetics/settings/?tab=virtualauthenticator
[5]: /synthetics/browser_tests#use-global-variables
