---
title: IdP 始動の SAML を使用した Datadog モバイルアプリ
kind: documentation
is_public: true
aliases:
  - /ja/account_management/faq/how-do-i-use-the-mobile-app-with-saml/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
  - link: /account_management/multi_organization/
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
## セットアップ

<div class="alert alert-warning">
IdP 始動の SAML を使用した Datadog モバイルアプリへのログインは、オプトイン機能です。アカウントでこの機能を有効にするには、SAML コンフィギュレーションを変更する前に <a href="https://docs.datadoghq.com/help/">Datadog サポート</a>までお問い合わせください。
</div>

アイデンティティプロバイダー (IdP) 始動の SAML を使用して Datadog モバイルアプリを使用するには、Datadog に追加の Relay State をパススルーして、ログイン時にモバイルアプリのランディングページをトリガーする必要があります。有効にすると、SAML からその特定のアプリへのすべてのサインインは、続行する前にインタースティシャルページにアクセスするようになります。

- Datadog モバイルアプリがインストールされた**モバイルデバイス**では、ユーザーは**まずモバイルブラウザを使用してアイデンティティプロバイダーでログイン** (下記の Google の例を参照) する必要があります。すると、アプリで自動的にリクエストが取得され、ユーザーのサインインが許可されます。

{{< img src="account_management/saml/google_idp_tile_sml.png" style="width:60%; background:none; border:none; box-shadow:none;" alt="Google IDP Relay State" >}}

- **デスクトップデバイス**またはアプリがインストールされていないアプリの場合、続行するにはユーザーは "Use the Datadog Website" をクリックする必要があります。

{{< img src="account_management/saml/datadog-mobile-idp-saml-landing-page.png" alt="Datadog Mobile SAML インタースティシャル" >}}

## プロバイダー
### OneLogin

OneLogin アプリを構成する場合は、**Application Details** ページの Relay State の値を `dd_m_idp` に設定します。
{{< img src="account_management/saml/one-login-mobile-idp-relay-state.png" alt="One Login のアプリケーション詳細ページ" >}}

### Okta

Okta アプリを構成する場合は、**Configure SAML** ページでデフォルトの RelayState 値を `dd_m_idp` に設定します。
{{< img src="account_management/saml/okta-mobile-idp-relay-state.png" alt="Okta のアプリケーション詳細ページ" >}}

### Google

Google app for Work SAML アプリを構成する場合は、Service Provider Details にある **Start URL** を `dd_m_idp` に設定します。
{{< img src="account_management/saml/google-mobile-idp-relay-state.png" alt="Google のサービスプロバイダー詳細ページ" >}}

## トラブルシューティング

Relay State を構成後、ログイン時に `403 Forbidden` エラーが表示される場合は、[サポート][1]にお問い合わせの上、組織にこの機能が有効化されていることをご確認ください。

[1]: /ja/help/