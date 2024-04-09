---
further_reading:
- link: https://www.datadoghq.com/blog/oauth/
  tag: GitHub
  text: OAuth で Datadog のインテグレーションを認可する
- link: /developers/integrations/oauth_for_integrations
  tag: ドキュメント
  text: インテグレーションに OAuth を実装する
- link: /developers/authorization/oauth2_in_datadog/
  tag: ドキュメント
  text: Datadog の OAuth2 について
- link: /developers/authorization/oauth2_endpoints
  tag: API
  text: OAuth2 認可エンドポイントリファレンス
title: 認可
type: documentation
---

## 概要

Datadog は、[OAuth 2.0 (OAuth2) Authorization Framework][1] を使用し、ユーザーに代わってサードパーティアプリケーションの制限付き Datadog リソースへのアクセスを安全に認可することができます。アプリケーションが持つアクセスは、[スコープ][2]によって決定され、ユーザーがアプリケーションによってリクエストされた特定の詳細な権限のセットに対して明示的な同意を与えることができるようになります。

## クライアントと資格情報

OAuth2 クライアントは、ユーザーに代わって Datadog リソースへのアプリケーションのアクセスを承認できるようにするアプリケーションのコンポーネントです。OAuth2 は、パブリックと[機密][3]の 2 種類のクライアントを定義しています。

パブリッククライアント
: 一般的にブラウザベースのアプリケーションに使用され、機密情報を保存することができません。パブリッククライアントの例としては、[UI 拡張機能][4]の OAuth クライアントが挙げられます。

機密クライアント
: 機密データを保存することができ、認可リクエストを行うために追加の `client_secret` を必要とします。インテグレーション用の OAuth クライアントは機密クライアントです。

OAuth クライアントを作成すると、クライアント ID、およびオプションで機密クライアントのためのクライアントシークレットの形で、クライアント資格情報のセットが発行されます。

クライアント ID 
: 認可とトークンのエンドポイントにリクエストを行う際に、クライアントを識別するために使用します。

クライアントシークレット 
: 発行された場合、認可エンドポイントにリクエストを行う際にクライアントを認証するために使用されます。クライアントシークレットは、クライアント作成時に一度だけ公開される機密パスワードであるため、直ちにコピーして安全に保管してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: https://docs.datadoghq.com/ja/api/latest/scopes/
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[4]: https://docs.datadoghq.com/ja/developers/ui_extensions/#oauth-api-access