---
description: Datadog が OAuth 2.0 をどのように使用しているかをご紹介します。
further_reading:
- link: /developers/authorization/oauth2_endpoints
  tag: ドキュメント
  text: OAuth 2.0 認可エンドポイントの使用方法について
title: Datadog の OAuth2
---

{{< callout btn_hidden="true" >}}
  Datadog Developer Platform はベータ版です。アクセス権をお持ちでない場合は、apps@datadoghq.com までご連絡ください。
{{< /callout >}} 

## 概要

このページでは、**機密**クライアントを作成した後、アプリケーションに OAuth プロトコルをエンドツーエンドで実装する方法を順を追って説明しています。

### OAuth プロトコルの実装

1. [Developer Platform][16] で OAuth クライアントを作成し、構成します。

2. ユーザーがインテグレーションをインストールした後、インテグレーションタイルの **Configure** タブにある **Connect Accounts** ボタンをクリックしてアカウントを接続することができます。

   ユーザーがこのボタンをクリックすると、OAuth クライアント作成プロセスの一部として提供した `onboarding_url` に誘導されます。このページは、プラットフォームのサインインページであるべきです。

3. ユーザーがサインインしたら、適切な URL パラメーターを指定して [OAuth2 Authorization エンドポイント][6]にリダイレクトします。この URL パラメーターには、アプリケーションで生成した `code_challenge` パラメーターが追加されています。

   `code_challenge` パラメーターの導出方法については、 [PKCE](#authorization-code-grant-flow-with-pkce) のセクションを参照してください。アプリケーションは、ステップ 5 のトークンリクエストのために `code_verifier` を保存する必要があります。

   - この POST リクエストの URL を作成するために、`onboarding_url` へのリダイレクトで提供される `site` クエリパラメーターを使用します。
   - このパラメーターは、ユーザーが Datadog インテグレーションタイルから認可を開始する場合にのみ提供されます。ユーザーが外部から認可を開始することを選択した場合のオプションについては、 [サードパーティロケーションからの認可の開始](#Initiate-authorization-from-a-third-party-location)セクションを参照してください。
   - 例えば、`site` は `https://app.datadoghq.com`、`https://app.datadoghq.eu`、`https://us5.datadoghq.com` の場合もあれば、`https://<custom_subdomain>.datadoghq.com` のように、説明しなければならないカスタムサブドメインを持っている場合もあります。
   - 複数の Datadog サイトを動的に扱うには、この構築した URL に Datadog の `authorize` パスを付加します。

4. ユーザーが **Authorize** をクリックすると、Datadog は認可エンドポイントに POST リクエストを作成します。ユーザーは、OAuth クライアントを設定する際に、クエリコンポーネントの認可パラメータ ー `code` で指定した `redirect_uri` にリダイレクトされます。

5. `redirect_uri` から、[Datadog トークンエンドポイント][10]に POST リクエストを行い、ステップ 4 の認可コード、ステップ 3 の `code_verifier` 、OAuth クライアント ID、クライアントシークレットを含むようにします。

   - この POST リクエストの URL を作成するために、`redirect_uri` へのリダイレクトで提供される `site` クエリパラメーターを使用します。
   - 例えば、`site` は `https://app.datadoghq.com`、`https://app.datadoghq.eu`、`https://us5.datadoghq.com` の場合もあれば、`https://<custom_subdomain>.datadoghq.com` のように、説明しなければならないカスタムサブドメインを持っている場合もあります。
   - 複数の Datadog サイトを動的に扱うには、この構築した URL に Datadog の `token` パスを付加します。

6. 成功すると、レスポンス本文で `access_token` と `refresh_token` を受け取ります。アプリケーションには、`You may now close this tab` というメッセージを含む確認ページが表示されるはずです。

7. Datadog API エンドポイントを呼び出すには、リクエストの認可ヘッダーの一部として `access_token` を使用します: ```headers = {"Authorization": "Bearer {}".format(access_token)}```
    - API エンドポイントへのコールを行う際、ユーザーの Datadog サイトを考慮していることを確認してください。例えば、ユーザーが EU 地域にいる場合、イベントのエンドポイントは `https://api.datadoghq.eu/api/v1/events` で、US1 にいるユーザーの場合、イベントのエンドポイントは `https://api.datadoghq.com/api/v1/events` になります。エンドポイントによっては、API キーが必要な場合もあり、以下のステップ 8 で作成します。

8. [API Key Creation エンドポイント][7]を呼び出し、Datadog ユーザーの代わりにデータを送信するための API キーを生成します。

   `API_KEYS_WRITE` スコープがクライアントに追加されていない場合、このステップは失敗します。このエンドポイントでは、一度だけ表示される API キーを生成します。**この値は安全なデータベースまたは場所に保存してください**。

クライアントの作成と公開については、[Datadog インテグレーションのための OAuth][5] を参照してください。

### サードパーティロケーションからの認可の開始

Datadog の認可プロセスは、インテグレーションタイルの **Connect Accounts** をクリックするか、インテグレーションの外部 Web サイトから開始することができます。例えば、Datadog のユーザーが使用する必要があるインテグレーション構成ページが Web サイトにある場合、そこから認可プロセスを開始するオプションをユーザーに提供することができます。

サードパーティーロケーション (Datadog インテグレーションタイルの外) から認可を開始する場合、認可フローでユーザーをルーティングし、`authorization` と `token` エンドポイント用の URL を構築する際に [Datadog サイト][17] (EU、US1、US3、US5 など) を考慮しなければなりません。

ユーザーが正しいサイトで認可していることを確認するために、常に US1 Datadog サイト (`app.datadoghq.com`) に誘導し、そこから地域を選択するようにします。認可フローが完了したら、後続の API コールでは、クエリパラメーターとして `redirect_uri` が返される正しいサイトを使用するようにします ([OAuth プロトコルの実装](#implement-the-oauth-protocol)のステップ 5 を参照)。

ユーザーが Datadog インテグレーションタイルから認可を開始する場合、要求されたすべてのスコープに対応する権限を持っていることが必要です。インテグレーションタイル以外の場所から認可を開始した場合、必要なすべての権限を持たないユーザーが認可を完了することがあります (ただし、インテグレーションタイルに戻ったときに適切な権限で再認可するよう促されます)。これを避けるには、サードパーティのプラットフォームから Datadog インテグレーションタイルにユーザーを誘導し、認可を開始する必要があります。

## PKCE による認可コード付与フロー

OAuth2 プロトコルはいくつかの付与フローをサポートしていますが、[PKCE による](#authorization-code-grant-flow-with-pkce)[認可コード付与フロー][8]は、ユーザーが一度明示的に同意し、クライアントの資格を安全に保存できる長期的なアプリケーションに推奨する付与タイプです。

この付与タイプでは、アプリケーションが一意の認可コードを安全に取得し、それをアクセストークンと交換することで、Datadog API へのリクエストを行うことができます。認可コードの付与フローは、3 つのステップで構成されています。

1. アプリケーションは、一連の Datadog スコープにアクセスするために[ユーザーに認可をリクエスト][6]します。
2. ユーザーが **Authorize** をクリックすると、アプリケーションは[一意の認可コードを取得][12]します。
3. アプリケーションは[認可コードをアクセストークンに交換][10]し、アクセストークンは Datadog の API にアクセスするために使用されます。

### PKCE 拡張機能を使用する

[Proof key for code exchange (PKCE)][11] は、OAuth2 の認可コード付与フローを拡張して、OAuth2 クライアントを傍受攻撃から保護するための拡張機能です。攻撃者がフローを傍受し、アプリケーションに返される前の認可コードにアクセスした場合、アクセストークンを取得し、Datadog の API にアクセスすることができます。

このような攻撃を軽減するために、PKCE 拡張機能では、認可リクエストとトークンリクエストをグラントフロー全体で安全に関連付けるために、以下のパラメーターが用意されています。

| パラメーター             | 定義                                                                                                                           |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Code Verifier         | 動的に生成される暗号用乱数文字列。                                                                                 |
| Code Challenge        | コードベリファイアの変換。`code_challenge` は `base64url` エンコーディングを使用しなければなりません。                                           |
| Code Challenge Method | `code_challenge` を `code_verifier` から導出するために使用するメソッド。`code_challenge` の計算には [SHA-256][16] を使用しなければなりません。 |

[PKCE プロトコル][11]は、以下のアクションを完了することで、認可コードの付与フローとインテグレーションします。

- アプリケーションは `code_verifier` というランダムな文字列を生成し、それに対応する `code_challenge` を `code_challenge_method` を用いて導出します。

- アプリケーションは Datadog に対して、`code_challenge` と `code_challenge_method` のパラメーターで認可リクエストを送信し、認可コードを取得することができます。

- アプリケーションはアクセストークンを取得するために、認可コードと `code_verifier` を指定して Datadog にトークンリクエストを送信します。トークンエンドポイントは `code_verifier` を `code_challenge_method` を使って変換し、元の `code_challenge` の値と比較することで認可コードを検証します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: /ja/api/latest/scopes/
[3]: /ja/developers/datadog_apps/#oauth-api-access
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[5]: /ja/developers/integrations/oauth_for_integrations
[6]: /ja/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#request-authorization-from-a-user
[7]: /ja/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints#create-an-api-key-on-behalf-of-a-user
[8]: https://tools.ietf.org/html/rfc6749#section-4.1
[9]: /ja/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#obtain-an-authorization-code
[10]: /ja/developers/authorization/oauth2_endpoints/?tab=tokenendpoints#exchange-authorization-code-for-access-token
[11]: https://datatracker.ietf.org/doc/html/rfc7636
[12]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
[13]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.2
[14]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.3
[15]: https://datatracker.ietf.org/doc/html/rfc6234#section-4.1
[16]: https://app.datadoghq.com/apps
[17]: /ja/getting_started/site/