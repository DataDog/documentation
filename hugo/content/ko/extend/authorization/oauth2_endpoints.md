---
aliases:
- /ko/developers/authorization/oauth2_endpoints/
description: OAuth2 인가 엔드포인트 사용 방법을 알아보세요.
further_reading:
- link: /extend/authorization/
  tag: 문서
  text: OAuth2 인가에 대해 알아보기
title: OAuth2 인증 엔드포인트 참조
---
## 개요 {#overview}

보호된 Datadog 리소스를 사용하는 애플리케이션은 사용자를 대신하여 Datadog API에 액세스하기 전에 사용자로부터 인가를 받아야 합니다. 이 엔드포인트는 애플리케이션을 인가 코드 부여 흐름에 따라 진행하도록 안내합니다. 

{{< tabs >}}
{{% tab "승인 엔드포인트" %}}

## 사용자에게 인가 요청 {#request-authorization-from-a-user}

### `GET /oauth2/v1/authorize` {#get-oauth2v1authorize}

#### 개요 {#overview-1}

인가 코드 부여 흐름을 시작하려면 애플리케이션은 Datadog의 인가 엔드포인트에 `GET` 요청을 보냅니다. 이렇게 하면 사용자가 Datadog의 인가 부여 흐름으로 리디렉션되고, 애플리케이션에서 요청한 범위 목록과 액세스 인가를 요청하는 메시지가 포함된 동의 페이지가 표시됩니다. 또한 요청이 이루어진 [Datadog 사이트][1]를 반환합니다. 

#### 요청 {#request}
인가 요청에서 애플리케이션은 `application/x-www-form-urlencoded` 형식을 사용하여 URI의 쿼리 구성 요소에 다음 파라미터를 추가하여 리디렉션 URI를 구성합니다. 

| URL 파라미터                               | 설명                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | 사용자가 액세스를 허용하거나 거부한 후 애플리케이션의 리디렉션 엔드포인트입니다.                              |
| `client_id`                                   | OAuth2 클라이언트의 클라이언트 ID입니다.                                                                       |
| `response_type`                               | 이 부여 흐름에서는 응답 유형이 `code`이어야 합니다.                                                        |
| `code_challenge`  (PKCE가 활성화된 경우)        | `code_verifier`를 변환한 값입니다. Datadog은 코드 챌린지를 계산할 때 `SHA-256`을 사용할 것을 권장합니다.     |
| `code_challenge_method`  (PKCE가 활성화된 경우) | 코드 챌린지를 계산하는 데 사용되는 메서드입니다. `SHA-256` 또는 `S256`이 지원됩니다.  |

#### 요청 예시 {#example-request}

Datadog의 동의 페이지를 렌더링하려면 지정된 파라미터를 사용해 엔드포인트로 리디렉션하세요. 

```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### 성공 응답 {#success-response}

사용자가 액세스 요청을 성공적으로 허용하면 애플리케이션은 [인가 코드를 획득하고](#obtain-an-authorization-code), 쿼리 구성 요소에 인가 `code` 및 `domain` 파라미터를 포함하여 사용자를 리디렉션 URI로 리디렉션합니다. 

#### 오류 응답 {#error-response}

잘못된 `redirect_uri` 또는 `client_id`로 인해 요청이 실패하면 사용자는 지정된 URI로 리디렉션되지 않고 Datadog 오류 페이지가 표시됩니다.

사용자가 인가를 거부하거나 기타 이유로 요청이 실패하면 사용자는 쿼리 구성 요소에 [오류][2] 파라미터가 포함된 `redirect_uri`로 리디렉션됩니다.

## 인가 코드 획득 {#obtain-an-authorization-code}

### `POST /oauth2/v1/authorize` {#post-oauth2v1authorize}

#### 개요 {#overview-2}
사용자가 동의 페이지에서 **Authorize** 버튼을 클릭하면, 요청을 확인하고 고유한 인가 코드를 반환하기 위해 [인가 엔드포인트][3]로 `POST` 요청이 자동으로 전송됩니다. 사용자는 쿼리 구성 요소에 인가 코드 파라미터가 포함된 상태로 애플리케이션의 `redirect_uri`로 리디렉션됩니다.

#### 요청 {#request-1}
애플리케이션에서 이 인가 요청을 할 필요는 없습니다. 이 단계는 이전 사용자 인가 요청의 응답으로, 사용자가 애플리케이션을 성공적으로 인가하면 Datadog에 자동으로 요청됩니다. 


[1]: https://docs.datadoghq.com/ko/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "토큰 엔드포인트" %}}

## 인가 코드를 액세스 토큰으로 교환 {#exchange-authorization-code-for-access-token}

### `POST /api/v2/oauth2/token` {#post-apiv2oauth2token}

#### 개요 {#overview-3}

인가 요청에서 인가 코드가 반환되면 애플리케이션은 이 코드를 액세스 토큰과 새로 고침 토큰으로 교환할 수 있습니다. 인가 코드는 리디렉션 URI에서 추출되어 Datadog의 OAuth2 [토큰 엔드포인트][1]로 `POST` 요청을 통해 전송됩니다. 

Datadog [액세스 토큰][2]은 Datadog API 액세스 권한을 부여하며 TTL(Time-to-Live)이 1시간인 단기 토큰입니다. Marketplace OAuth 클라이언트용 [새로 고침 토큰][3]은 만료되지 않는(TTL 무한대) 장기 토큰으로, 액세스 토큰이 만료될 때마다 새 액세스 토큰을 자동으로 얻는 데 사용됩니다. 사용자가 인가를 취소하면 새 액세스 토큰 및 새로 고침 토큰 세트를 애플리케이션에 다시 인가해야 합니다(새로 고침 토큰은 만료됩니다). 

#### 요청 {#request-2}

[액세스 토큰 요청][4]은 `application/x-www-form-urlencoded` 형식으로 `POST` 요청 본문에 다음 파라미터를 포함하여 수행됩니다.

|  HTTP 본문 파라미터               | 설명                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | 인가 요청에서 전송한 것과 동일한 [리디렉션 엔드포인트][5]입니다.                                                                                                                                   |
| `client_id`                          | OAuth2 클라이언트의 클라이언트 ID입니다.                                                                                                                                                                |
| `client_secret` (발급된 경우)          | OAuth2 기밀 클라이언트의 클라이언트 암호입니다.                                                                                                                                                    |
| `grant_type`                         | 초기 액세스 토큰과 새로 고침 토큰을 받으려면 부여 유형이 `authorization_code`이어야 하며, 이후 액세스 토큰과 새로 고침 토큰을 받으려면 부여 유형이 `refresh_token`이어야 합니다. |
| `code_verifier` (PKCE가 활성화된 경우) | 인가 요청에 전송된 코드 챌린지를 도출하는 데 사용되는 원시 [코드 검증기][6]입니다.                                                                                                         |
| `code`                               | 이전 인가 POST 요청에서 생성 및 반환된 인가 코드입니다.                                                                                                         |

#### 요청 예시 {#example-request-1}

이 cURL 명령을 사용하여 액세스 토큰을 요청합니다.

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/api/v2/oauth2/token"
```

#### 성공 응답 {#success-response-1}

액세스 토큰 요청이 유효하고 인가된 경우 [토큰 응답][7]은 HTTP 응답 본문에 포함된 액세스 토큰 및 새로 고침 토큰과 함께 `200 OK` 상태 코드를 반환합니다. 

#### 오류 응답 {#error-response-1}

토큰 엔드포인트에 실패한 요청은 애플리케이션에서 처리해야 합니다. 예를 들어, 애플리케이션 내 적절한 오류 페이지로 사용자를 리디렉션할 수 있습니다. 

발급된 클라이언트 암호가 있는 기밀 클라이언트가 `client_secret` 파라미터 없이 토큰을 요청하면 `401 Unauthorized` 상태 코드가 반환됩니다.

토큰 요청이 잘못된 요청이나 잘못된 인가 코드와 같은 기타 이유로 실패하면 (달리 명시되지 않는 한) `400 Bad Request` 상태 코드가 [`error`][8] 파라미터와 함께 반환됩니다. 

## 토큰 취소 {#revoke-tokens}

### `POST /oauth2/v1/revoke` {#post-oauth2v1revoke}

#### 개요 {#overview-4}

사용자는 언제든지 액세스 토큰이나 새로 고침 토큰을 취소할 수 있습니다. 취소된 토큰은 더 이상 Datadog API에 액세스하는 데 사용할 수 없습니다. 특정 토큰을 취소하려면 애플리케이션에서 Datadog의 [토큰 취소 엔드포인트][9]로 POST 요청을 수행합니다. 

#### 요청 {#request-3}
[취소 요청][10]은 `application/x-www-form-urlencoded` 형식으로 `HTTP POST` 요청의 **본문**에 다음 파라미터를 포함하여 수행됩니다.

| HTTP 본문 파라미터          | 설명                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | OAuth2 클라이언트의 클라이언트 ID입니다.                                                                                      |
| `client_secret` (발급된 경우)                    | OAuth2 기밀 클라이언트의 클라이언트 암호입니다.                                                                                       |
| `token`                        | 취소할 토큰 문자열입니다.                                                                                           |
| `token_type_hint` (선택 사항)   | 취소할 토큰 유형의 힌트를 제공하여 토큰 조회를 최적화합니다. 예: `access_token` 또는 `refresh_token`  |

#### 코드 예시 {#code-example}

취소 요청을 하려면 이 cURL 명령을 사용하세요.

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### 성공 응답 {#success-response-2}

토큰이 성공적으로 취소되었거나 `token` 파라미터가 유효하지 않은 경우, [취소 응답][11]은 `200 OK` 상태 코드를 반환합니다.

#### 오류 응답 {#error-response-2}

토큰 요청이 누락되거나 잘못된 파라미터 등의 이유로 실패하면 (달리 명시되지 않는 한) 400 Bad Request 상태 코드가 [`error`][8] 파라미터와 함께 반환됩니다.

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
{{% tab "API 키 생성 엔드포인트" %}}

## 사용자를 대신하여 API 키 생성 {#create-an-api-key-on-behalf-of-a-user}

### `POST /api/v2/api_keys/marketplace` {#post-apiv2api-keysmarketplace}

#### 개요 {#overview-5}

유효한 OAuth 액세스 권한 또는 새로 고침 토큰을 받으면 이를 사용하여 인증 사용자를 대신하여 API 키를 생성할 수 있습니다. 

이 엔드포인트를 통해 생성된 API 키는 OAuth를 통해 Datadog으로 데이터를 전송하는 유일한 방법입니다. Datadog 조직당 하나의 API 키만 존재할 수 있으며 API 키 값은 생성 후 한 번만 표시되므로 안전하게 저장하세요.

**이 엔드포인트에 액세스하려면 비공개 `API_KEYS_WRITE` 범위가 OAuth 클라이언트와 연결되어 있어야 합니다**. 

<div class="alert alert-info">이 범위를 설정하는 데 문제가 있는 경우 marketplace@datadog.com으로 문의하세요. </div>

#### 요청 예시 {#example-request-2}

이 cURL 명령을 사용하여 `api_keys` 엔드포인트에 요청을 보냅니다.

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### 성공 응답 {#success-response-3}

액세스 권한 또는 새로 고침 토큰 요청이 유효하고 인증된 경우 다음이 반환됩니다.

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

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}