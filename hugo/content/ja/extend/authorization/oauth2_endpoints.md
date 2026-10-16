---
aliases:
- /ja/developers/authorization/oauth2_endpoints/
description: OAuth2 認可エンドポイントの使用方法について
further_reading:
- link: /extend/authorization/
  tag: ドキュメント
  text: OAuth2 認可について
title: OAuth2 認可エンドポイントリファレンス
---
## 概要 {#overview}

保護された Datadog リソースを使用するアプリケーションは、ユーザーの代理で Datadog API にアクセスする前に、ユーザーによって認可される必要があります。これらのエンドポイントは、認可コード付与フローを通じてアプリケーションを誘導します。

{{< tabs >}}
{{% tab "認可エンドポイント" %}}

## ユーザーへの認可リクエスト {#request-authorization-from-a-user}

### `GET /oauth2/v1/authorize` {#get-oauth2v1authorize}

#### 概要 {#overview-1}

認可コード付与フローを開始するために、アプリケーションは Datadog の認可エンドポイントに対して `GET` リクエストを送信します。これにより、ユーザーが Datadog の認可付与フローにリダイレクトされ、アプリケーションが要求したスコープのリストと、ユーザーにアクセスを許可するよう求めるプロンプトが示された同意ページが表示されます。また、リクエストの送信元である [Datadog サイト][1]も返されます。

#### リクエスト {#request}
認可リクエストでは、アプリケーションは `application/x-www-form-urlencoded` 形式を使用して、URI のクエリコンポーネントに以下のパラメーターを追加することでリダイレクト URI を構築します。

| URL パラメーター                               | 説明                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | ユーザーがアクセスを許可または拒否した後のアプリケーションのリダイレクトエンドポイント。                             |
| `client_id`                                   | OAuth2 クライアントのクライアント ID。                                                                      |
| `response_type`                               | この認可フローでは、レスポンスタイプを `code` に設定する必要があります。                                                       |
| `code_challenge`  (PKCE が有効な場合)        | `code_verifier` の変換。Datadog は、コードチャレンジの計算に `SHA-256` を使用することを推奨しています。    |
| `code_challenge_method`  (PKCE が有効な場合) | コードチャレンジの計算に使用される方式。`SHA-256` または `S256` がサポートされています。 |

#### リクエスト例 {#example-request}

Datadog の同意ページをレンダリングするには、指定されたパラメーターでエンドポイントにユーザーをリダイレクトします。

```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### 成功レスポンス {#success-response}

ユーザーが正常にアクセスリクエストを許可した場合、アプリケーションは[認可コードを取得](#obtain-an-authorization-code)し、クエリコンポーネントに認可 `code` と `domain` パラメーターを追加して、リダイレクト URI にユーザーをリダイレクトします。

#### エラーレスポンス {#error-response}

無効な `redirect_uri` や `client_id` が原因でリクエストが失敗した場合、ユーザーは指定した URI にリダイレクトされず、代わりに Datadog のエラーページが表示されます。

ユーザーが認可を拒否した場合、あるいはその他の理由でリクエストが失敗した場合は、クエリコンポーネントに [error][2] パラメーターを追加して、ユーザーが `redirect_uri` にリダイレクトされます。

## 認可コードを取得する {#obtain-an-authorization-code}

### `POST /oauth2/v1/authorize` {#post-oauth2v1authorize}

#### 概要 {#overview-2}
ユーザーが同意ページで [**Authorize**] (認可) ボタンをクリックすると、リクエストを検証して一意の認可コードを返すために、`POST` リクエストが[認可エンドポイント][3]に自動的に送信されます。クエリコンポーネントに認可コードパラメーターが追加され、ユーザーがアプリケーションの `redirect_uri` にリダイレクトされます。

#### リクエスト {#request-1}
アプリケーションは、この認可リクエストを行う必要はありません。このステップは、前のユーザー認可リクエストに対する応答であり、ユーザーがアプリケーションの認可に成功すると、Datadog によって自動的にリクエストされます。


[1]: https://docs.datadoghq.com/ja/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "トークンエンドポイント" %}}

## 認可コードをアクセストークンと交換する {#exchange-authorization-code-for-access-token}

### `POST /api/v2/oauth2/token` {#post-apiv2oauth2token}

#### 概要 {#overview-3}

認可リクエストから認可コードが返されたら、アプリケーションはそのコードをアクセストークンおよびリフレッシュトークンと交換できます。認可コードはリダイレクト URI から抽出され、`POST` リクエストに含められて Datadog の OAuth2 [トークンエンドポイント][1]に送信されます。

Datadog [アクセストークン][2]は、Datadog API へのアクセスを許可する、TTL (有効期間) が 1 時間の短命なトークンです。Marketplace OAuth クライアントの[リフレッシュトークン][3]は、有効期限のない (TTL が無限である) 長命なトークンであり、アクセストークンの有効期限が切れるたびに新しいアクセストークンを自動的に取得するために使用されます。ユーザーが認可を取り消した場合は、アプリケーションに対して新しいアクセストークンとリフレッシュトークンのセットを再認可する必要があります (リフレッシュトークンは期限切れになります)。

#### リクエスト {#request-2}

[アクセストークンのリクエスト][4]は、`application/x-www-form-urlencoded` 形式の `POST` リクエストの本文に、以下のパラメーターを指定して行います。

|  HTTP 本文パラメーター               | 説明                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | 認可リクエストで送信されたものと同じ[リダイレクトエンドポイント][5]。                                                                                                                                  |
| `client_id`                          | OAuth2 クライアントのクライアント ID。                                                                                                                                                               |
| `client_secret` (発行されている場合)          | OAuth2 機密クライアントのクライアントシークレット。                                                                                                                                                   |
| `grant_type`                         | 最初のアクセストークンとリフレッシュトークンを受け取るには、付与タイプを `authorization_code` に設定します。それ以降のアクセストークンとリフレッシュトークンを受け取るには、付与タイプを `refresh_token` に設定します。|
| `code_verifier` (PKCE が有効な場合) | 認可リクエストで送信されたコードチャレンジを導き出すために使用される生の[コードベリファイア][6]。                                                                                                        |
| `code`                               | 前回の認可 POST リクエストから生成され返された認可コード。                                                                                                        |

#### リクエスト例 {#example-request-1}

アクセストークンのリクエストを行うには、この cURL コマンドを使用します。

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/api/v2/oauth2/token"
```

#### 成功レスポンス {#success-response-1}

アクセストークンのリクエストが有効で認可された場合、[トークンレスポンス][7]は、アクセストークンとリフレッシュトークンを HTTP レスポンスの本文に含めて、`200 OK` ステータスコードを返します。

#### エラーレスポンス {#error-response-1}

トークンのエンドポイントへのリクエストに失敗した場合は、アプリケーション上でユーザーを適切なエラーページにリダイレクトするなどして、アプリケーション側で処理する必要があります。

発行されたクライアントシークレットを持つ機密クライアントが `client_secret` パラメーターを指定せずにトークンリクエストを行うと、`401 Unauthorized` ステータスコードが返されます。

不正なリクエストや無効な認可コードなど、その他の理由でトークンリクエストが失敗した場合、(特に指定がない限り) `400 Bad Request` ステータスコードが [`error`][8] パラメーターとともに返されます。

## トークンの取り消し {#revoke-tokens}

### `POST /oauth2/v1/revoke` {#post-oauth2v1revoke}

#### 概要 {#overview-4}

ユーザーはいつでもアクセストークンまたはリフレッシュトークンを取り消すことができます。取り消されたトークンは、Datadog API へのアクセスに使用できなくなります。特定のトークンを取り消すには、アプリケーションから Datadog の[トークン取り消しエンドポイント][9]に対して POST リクエストを送信します。

#### リクエスト {#request-3}
[取り消しリクエスト][10]は、`application/x-www-form-urlencoded` 形式の `HTTP POST` リクエストの**本文**に、以下のパラメーターを指定して行います。

| HTTP 本文パラメーター          | 説明                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | OAuth2 クライアントのクライアント ID。                                                                                     |
| `client_secret` (発行されている場合)                    | OAuth2 機密クライアントのクライアントシークレット。                                                                                      |
| `token`                        | 取り消すトークン文字列。                                                                                          |
| `token_type_hint` (オプション)   | トークンの検索を最適化するための、取り消すトークンのタイプに関するヒント。たとえば、`access_token` や `refresh_token` などです。 |

#### コード例{#code-example}

取り消しリクエストを行うには、この cURL コマンドを使用します。

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### 成功レスポンス {#success-response-2}

トークンの取り消しに成功した場合、あるいは `token` パラメーターが無効な場合、[取り消しレスポンス][11]は `200 OK` ステータスコードを返します。

#### エラーレスポンス{#error-response-2}

パラメーターが足りない、あるいは無効であるなど、何らかの理由でトークンリクエストに失敗した場合、(特に指定がない限り) 400 Bad Request ステータスコードが [`error`][8] パラメーターとともに返されます。

[1]: https://tools.ietf.org/html/rfc6749#section-3.2
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-1.4
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-1.5
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
[5]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2
[6]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
[7]: https://datatracker.ietf.org/doc/html/rfc6749#section-5.1
[8]: https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
[9]: https://datatracker.ietf.org/doc/html/rfc7009#section-2
[10]: https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
[11]: https://datatracker.ietf.org/doc/html/rfc7009#section-2.2
{{% /tab %}}
{{% tab "API キー作成エンドポイント" %}}

## ユーザーに代わって API キーを作成する {#create-an-api-key-on-behalf-of-a-user}

### `POST /api/v2/api_keys/marketplace` {#post-apiv2api-keysmarketplace}

#### 概要 {#overview-5}

有効な OAuth アクセストークンまたはリフレッシュトークンを受け取ると、それを使って認可ユーザーの代わりに API キーを作成することができます。

このエンドポイントを通じて作成された API キーは、OAuth を介して Datadog にデータを送信する唯一の方法です。Datadog 組織ごとに存在できる API キーは 1 つのみであり、API キーの値は作成後に一度だけ表示されるため、適切に保存してください。

**このエンドポイントにアクセスするには、プライベートな `API_KEYS_WRITE` スコープが OAuth クライアントに関連付けられなければなりません**。

<div class="alert alert-info">このスコープの設定に問題がある場合は、marketplace@datadog.com までご連絡ください。</div>

#### リクエスト例{#example-request-2}

`api_keys` エンドポイントにリクエストを行うには、この cURL コマンドを使用します。

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### 成功レスポンス {#success-response-3}

アクセスまたはリフレッシュトークンのリクエストが有効で認可された場合、以下が返されます。

```
{
  "data": {
    "type": "api_keys",
    "attributes": {
      "created_at": "2021-05-06T16:32:07.411970+00:00",
      "key": "ffffffffffffffffffffffffffffffff",
      "last4": "ffff",
      "modified_at": "2021-05-06T16:32:07.411970+00:00",
      "name": "Marketplace Key for App foobar"
    },
    "relationships": {
      "created_by": {
        "data": {
          "type": "users",
          "id": "abcdefgh-abcd-abcd-abcd-abcdefghijkl"
        }
      },
      "modified_by": {
        "data": {
          "type": "users",
          "id": "abcdefgh-abcd-abcd-abcd-abcdefghijkl"
        }
      }
    },
    "id": "abcdefgh-abcd-abcd-abcd-abcdefghijkl01234"
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}