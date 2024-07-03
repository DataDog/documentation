---
description: Learn how to use the OAuth2 authorization endpoints.
further_reading:
- link: /developers/authorization/
  tag: Documentation
  text: Learn about OAuth2 Authorization
title: OAuth2 Authorization Endpoints Reference
---

## 概要

保護された Datadog リソースを使用するアプリケーションは、ユーザーの代理で Datadog API にアクセスする前に、ユーザーによって認可される必要があります。これらのエンドポイントは、認可コード付与フローを通じてアプリケーションを誘導します。

{{< tabs >}}
{{% tab "認可エンドポイント" %}}

## ユーザーへの認可リクエスト

### `GET /oauth2/v1/authorize`

#### 概要

認可コード付与フローを開始するために、アプリケーションは Datadog の認可エンドポイントに `GET` リクエストを行います。これはユーザーを Datadog の認可付与フローにリダイレクトし、アプリケーションがリクエストしたスコープのリストと、ユーザーがアクセスを認可するためのプロンプトを表示する同意ページをレンダリングします。これはまた、リクエスト元の [Datadog サイト][1] を返します。

#### リクエスト
認可リクエストでは、アプリケーションは `application/x-www-form-urlencoded` フォーマットを用いて、URI のクエリコンポーネントに以下のパラメーターを追加することでリダイレクト URI を構築します。

| URL パラメーター                               | 説明                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | ユーザーがアクセスを許可または拒否した後の、アプリケーションのリダイレクトエンドポイント。                              |
| `client_id`                                   | OAuth2 クライアントの Client ID。                                                                       |
| `response_type`                               | レスポンスタイプは、この付与フロー用のコードでなければなりません。                                                        |
| `code_challenge`  (PKCE が有効な場合)        | `code_verifier` の変換。Datadog は `SHA-256` を使用してコードチャレンジを計算することを推奨します。     |
| `code_challenge_method`  (PKCE が有効な場合) | コードチャレンジの計算に使用する方式。`SHA-256`、または `S256` がサポートされています。  |

#### リクエスト例

Datadog の同意ページをレンダリングするには、指定されたパラメーターでエンドポイントにユーザーをリダイレクトします。
```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### 成功レスポンス

If a user successfully grants the access request, your application [obtains an authorization code](#obtain-an-authorization-code) and redirects the user to the redirect URI with the authorization `code`, as well as the `domain` parameter, in the query component. 

#### エラーレスポンス

無効な `redirect_uri` や `client_id` が原因でリクエストが失敗した場合、ユーザーは指定した URI にリダイレクトされず、代わりに Datadog のエラーページが表示されます。

ユーザーが認可を拒否した場合、あるいはその他の理由でリクエストが失敗した場合、ユーザーはクエリーコンポーネントに [error][2] パラメーターを指定して `redirect_uri` へとリダイレクトされます。

## 認可コードを取得する

### `POST /oauth2/v1/authorize`

#### 概要
ユーザーが同意ページの **Authorize** ボタンをクリックすると、`POST` リクエストが自動的に[認可エンドポイント][3]に送られ、リクエストを検証して固有の認可コードが返されます。ユーザーは、クエリコンポーネントに認可コードパラメーターを指定して、アプリケーションの `redirect_uri` にリダイレクトされます。

#### リクエスト
アプリケーションは、この認可リクエストを行う必要はありません。このステップは、前のユーザー認可リクエストに対する応答であり、ユーザーがアプリケーションの認可に成功すると、Datadog によって自動的にリクエストされます。


[1]: https://docs.datadoghq.com/ja/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "トークンエンドポイント" %}}

## アクセストークンの交換認可コード

### `POST /oauth2/v1/token`

#### 概要

認可リクエストから認可コードが返されると、アプリケーションはこのコードをアクセストークンやリフレッシュトークンに交換することができます。認可コードはリダイレクト URI から抽出され、Datadog の OAuth2 [トークンエンドポイント][1]に `POST` リクエストで送信されます。

Datadog の[アクセストークン][2]は、1 時間の TTL を持つ短命のトークンで、Datadog の API にアクセスを許可します。Marketplace OAuth クライアントの [Refresh トークン][3]は、有効期限がない長寿命なトークン (TTL は無限大) で、有効期限が切れるたびに新しいアクセストークンを自動的に取得するために使用されるトークンです。ユーザーが認可を取り消した場合、アプリケーションに対して新しいアクセストークンとリフレッシュトークンのセットを再認可する必要があります (リフレッシュトークンは期限切れとなります)。

#### リクエスト

[アクセストークンのリクエスト][4]は、`application/x-www-form-urlencoded` 形式の `POST` リクエストの本文に、以下のパラメーターを指定して行います。

|  HTTP 本体パラメーター               | 説明                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | 認可リクエストで送信されたのと同じ[リダイレクトエンドポイント][5]。                                                                                                                                   |
| `client_id`                          | OAuth2 クライアントのクライアント ID。                                                                                                                                                                |
| `client_secret` (発行された場合)          | OAuth2 機密クライアントのクライアントシークレット。                                                                                                                                                    |
| `grant_type`                         | 最初のアクセストークンとリフレッシュトークンを受け取るには、付与タイプを `authorization_code` とし、それ以降のアクセストークンとリフレッシュトークンを受け取るには、付与タイプを `refresh_token` にしてください。 |
| `code_verifier`  (PKCE が有効な場合) | 認可リクエストで送信されたコードチャレンジを導き出すために使用される生の[コードベリファイア][6]。                                                                                                         |
| `code`                               | 前回の認可 POST リクエストから生成され返された認可コード。                                                                                                         |

#### リクエスト例

アクセストークンのリクエストを行うには、この cURL コマンドを使用します。

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/oauth2/v1/token"
```

#### 成功レスポンス

アクセストークンのリクエストが有効で認可された場合、[トークンレスポンス][7]は、アクセストークンとリフレッシュトークンを HTTP レスポンスの本文に含めて、`200 OK` ステータスコードを返します。

#### エラーレスポンス

トークンのエンドポイントへのリクエストに失敗した場合は、アプリケーション上でユーザーを適切なエラーページにリダイレクトするなどして、アプリケーション側で処理する必要があります。

発行されたクライアントシークレットを持つ機密クライアントが `client_secret` パラメーターを指定せずにトークンリクエストを行うと、 `401 Unauthorized` ステータスコードが返されます。

不正なリクエストや無効な認可コードなど、その他の理由でトークンリクエストが失敗した場合、(特に指定がない限り) `400 Bad Request` ステータスコードが [`error`][8] パラメーターとともに返されます。

## トークンの取り消し

### `POST /oauth2/v1/revoke`

#### 概要

ユーザーは、いつでもアクセス権を取り消したり、トークンを更新したりすることができます。トークンを取り消すと、Datadog の API にアクセスするためにトークンを使用することができなくなります。トークンを取り消すには、アプリケーションから Datadog の[トークン取り消しエンドポイント][9]に POST リクエストを行います。

#### リクエスト
[取り消しリクエスト][10]は、`application/x-www-form-urlencoded` 形式の `HTTP POST` リクエストの**本文**に、以下のパラメーターを指定して行います。

| HTTP 本体パラメーター          | 説明                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | OAuth2 クライアントのクライアント ID。                                                                                      |
| `client_secret` (発行された場合)                    | OAuth2 機密クライアントのクライアントシークレット。                                                                                       |
| `token`                        | 取り消すトークン文字列。                                                                                           |
| `token_type_hint` (オプション)   | トークンの検索を最適化するための、取り消すトークンの種類に関するヒント。例えば、`access_token` や `refresh_token` など。  |

#### コード例

取り消しリクエストを行うには、この cURL コマンドを使用します。

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### 成功レスポンス

トークンの取り消しに成功した場合、あるいは `token` パラメーターが無効な場合、[取り消しレスポンス][11]は `200 OK` ステータスコードを返します。

#### エラーレスポンス

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

## ユーザーに代わって API キーを作成する

### `POST /api/v2/api_keys/marketplace`

#### 概要

有効な OAuth アクセストークンまたはリフレッシュトークンを受け取ると、それを使って認可ユーザーの代わりに API キーを作成することができます。

このエンドポイントから作成される API キーは、OAuth を通して Datadog にデータを送信する唯一の方法です。API キーは Datadog の組織ごとに 1 つだけ存在でき、API キーの値は作成後に 1 度だけ表示されるので、それに従って保存してください。

**このエンドポイントにアクセスするには、プライベートな `API_KEYS_WRITE` スコープが OAuth クライアントに関連付けられなければなりません**。

<div class="alert alert-info">このスコープの設定に問題がある場合は、marketplace@datadog.com までご連絡ください。</div>

#### リクエスト例

`api_keys` エンドポイントにリクエストを行うには、この cURL コマンドを使用します。

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### 成功レスポンス

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}