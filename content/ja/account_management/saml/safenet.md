---
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
title: SafeNet SAML IdP
---

## セットアップ

[メインの SAML コンフィギュレーション手順ガイド][1]に従い、[SafeNet Trusted Access for Datadog][2] のドキュメントを参照して、SafeNet をSAML IdP として設定します。

## Datadog

* IdP メタデータは、SafeNet Trusted Access コンソールで **Download Metadata** ボタンをクリックして入手できます。
* Datadog で、**Identity Provider (IdP) Initiated Login** チェックボックスをオンにします。
* Datadog の[サービスプロバイダーメタデータ][3]が必要です。

## 認証の検証

### STA コンソールの使用

Datadog のログイン URL にアクセスします。SafeNet Trusted Access のサインインページにリダイレクトされたら、プライマリディレクトリのログイン情報を入力し、二要素認証を承認してください。認証後に Datadog にリダイレクトされます。

**注**: IdP 始動モードの場合は、SafeNet Trusted Access コンソールで、Datadog に表示される **Assertion Consumer Service URL** を入力します。

### STA ユーザーポータルの使用

ユーザーポータル URL にアクセスし、STA ユーザーポータルダッシュボードにログインします。ダッシュボードには、アクセス可能なアプリケーションの一覧が表示されます。Datadog アプリケーションアイコンをクリックすると、認証後に Datadog にリダイレクトされます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/saml/#configure-saml
[2]: https://resources.safenetid.com/help/Datadog/Index.htm
[3]: https://app.datadoghq.com/account/saml/metadata.xml