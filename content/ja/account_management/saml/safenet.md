---
title: SafeNet SAML IdP
kind: documentation
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
---
## セットアップ

SafeNet の手順については、[SafeNet Trusted Access for Datadog][1] を参照してください。

## Datadog

[メインの SAML 構成手順ガイド][2]に従います。

* IdP メタデータは、SafeNet Trusted Access コンソールで **Download Metadata** ボタンをクリックして入手できます。
* Datadog で、**Identity Provider (IdP) Initiated Login** チェックボックスをオンにします。
* Datadog の[サービスプロバイダーメタデータ][3]が必要です。

## SafeNet

1. `Datadog` という名前のアプリケーションを追加します。
2. **STA Setup** で、**Upload Datadog Metadata** をクリックします。
3. **Metadata upload** ウィンドウで **Browse** をクリックし、前に取得した Datadog メタデータを検索して選択します。サービスプロバイダーメタデータの情報が **Account Details** に表示されます。
4. **Save Configuration** をクリックして詳細を保存すると、SafeNet Trusted Access で Datadog アプリケーションが有効になります。

## 認証の検証

### STA コンソールの使用

Datadog のログイン URL にアクセスすると、SafeNet Trusted Access のサインインページにリダイレクトされます。プライマリディレクトリのログイン情報を入力し、二要素認証を承認すると、認証後に Datadog にリダイレクトされます。

**注**: IdP 始動モードの場合は、SafeNet Trusted Access コンソールで、Datadog に表示される **Assertion Consumer Service URL** を入力します。

### STA ユーザーポータルの使用

ユーザーポータル URL にアクセスし、STA ユーザーポータルダッシュボードにログインします。ダッシュボードには、アクセス可能なアプリケーションの一覧が表示されます。Datadog アプリケーションアイコンをクリックすると、認証後に Datadog にリダイレクトされます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://resources.safenetid.com/help/Datadog/Index.htm
[2]: /ja/account_management/saml/#configure-saml
[3]: https://app.datadoghq.com/account/saml/metadata.xml