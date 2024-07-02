---
title: The Datadog Mobile App with IdP Initiated SAML
is_public: true
aliases:
  - /account_management/faq/how-do-i-use-the-mobile-app-with-saml/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configuring Teams & Organizations with Multiple Accounts
---

## セットアップ

アイデンティティプロバイダー (IdP) 始動の SAML を使用して Datadog モバイルアプリを使用するには、Datadog に追加の Relay State をパススルーして、ログイン時にモバイルアプリのランディングページをトリガーする必要があります。有効にすると、SAML からその特定のアプリへのすべてのサインインは、続行する前にインタースティシャルページにアクセスするようになります。

- Datadog モバイルアプリがインストールされた**モバイルデバイス**では、ユーザーは**まずモバイルブラウザを使用してアイデンティティプロバイダーでログイン** (下記の Google の例を参照) する必要があります。すると、アプリで自動的にリクエストが取得され、ユーザーのサインインが許可されます。

{{< img src="account_management/saml/google_idp_tile_sml.png" style="width:60%; background:none; border:none; box-shadow:none;" alt="Google IDP Relay State" >}}

- **デスクトップデバイス**またはアプリがインストールされていないアプリの場合、続行するにはユーザーは "Use the Datadog Website" をクリックする必要があります。

{{< img src="account_management/saml/datadog-mobile-idp-saml-landing-page.png" alt="Datadog Mobile SAML インタースティシャル" >}}

## プロバイダー

**注:** Datadog IdP 始動の SAML は、ほとんどの ID プロバイダーで機能します。Datadog モバイルアプリを使用して ID プロバイダーを構成しているときに問題が発生した場合は、[Datadog サポート][1]までご連絡ください。

### OneLogin

OneLogin アプリを構成する場合は、**Application Details** ページの Relay State の値を `dd_m_idp` に設定します。
{{< img src="account_management/saml/one-login-mobile-idp-relay-state.png" alt="One Login のアプリケーション詳細ページ" >}}

### ヘルプ

Okta アプリを構成する場合は、**Configure SAML** ページでデフォルトの RelayState 値を `dd_m_idp` に設定します。
{{< img src="account_management/saml/okta-mobile-idp-relay-state.png" alt="Okta の Configure SAML ページ" >}}

### Google

SAML 用 Google アプリを構成する場合は、Service Provider Details にある **Start URL** を `dd_m_idp` に設定します。
{{< img src="account_management/saml/google-mobile-idp-relay-state.png" alt="Google のサービスプロバイダー詳細ページ" >}}

## トラブルシューティング

Relay State を構成後、ログイン時に `403 Forbidden` エラーが表示される場合は、[サポート][1]にお問い合わせの上、組織にこの機能が有効化されていることをご確認ください。

[1]: /help/
