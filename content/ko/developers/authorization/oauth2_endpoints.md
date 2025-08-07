---
description: OAuth2 인증 엔드포인트를 사용하는 방법에 대해 알아봅니다.
further_reading:
- link: /developers/authorization/
  tag: 설명서
  text: OAuth2 인증에 대해 알아보기
title: OAuth2 인증 엔드포인트 참조
---

## 개요

보호되는 Datadog 리소스를 사용하는 애플리케이션의 경우 사용자를 대신해 Datadog API에 액세스하기 전 사용자 인증을 받아야 합니다. 이러한 엔드포인트는 애플리케이션이 코드 인증 플로우를 따르도록 합니다.

{{< tabs >}}
{{% tab "Authorization Endpoints" %}}

## 사용자에게 인증 요청

### `GET /oauth2/v1/authorize`

#### 개요

인증 코드 부여 플로우을 시작하려면 애플리케이션이 Datadog 인증 엔드포인트에 `GET` 요청을 해야 합니다. 그러면 사용자가 Datadog 인증 플로우로 리디렉션되고 애플리케이션에 요청한 범위 목록을 표시하는 동의 페이지가 사용자에게 렌더링됩니다. 또한, 사용자에게 액세스를 인증할 것을 요청하는 메시지가 나타납니다. 인증하면[Datadog 사이트][1]로 돌아갑니다. 

#### 요청 
인증 요청에서 애플리케이션은 `application/x-www-form-urlencoded` 형식을 사용하여 URI의 쿼리 구성 요소에 다음 파라미터를 추가하여 리디렉션 URI를 구성합니다.

| URL 파라미터                               | 설명                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | 사용자가 액세스를 허용하거나 거부한 후 애플리케이션의 리디렉션 엔드포인트입니다.                              |
| `client_id`                                   | OAuth2 클라이언트의 클라이언트 ID                                                                       |
| `response_type`                               | 이 인증 플로우에서 응답 유형은 `code`여야 합니다.                                                        |
| `code_challenge`(PKCE가 활성화된 경우)        | `code_verifier`의 변형입니다. Datadog는 코드 챌린지 계산에 `SHA-256`을 사용할 것을 권장합니다.     |
| `code_challenge_method`(PKCE가 활성화된 경우) | 코드 챌린지를 계산하는 데 사용되는 방법입니다. `SHA-256` 또는 `S256`을 지원합니다.  |

#### 요청 예시

Datadog의 동의 페이지를 렌더링하려면 지정된 파라미터를 사용해 엔드포인트로 리디렉션합니다.
```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### 성공 응답

사용자가 액세스 요청을 인증하면 애플리케이션을 통해 [인증 코드를 받으며](#obtain-an-authorization-code), 쿼리 구성 요소에서 인증 `code`, 리디렉션 URI, `domain` 파라미터로 사용자를 리디렉션합니다. 

#### 오류 응답

잘못된 `redirect_uri` 또는 `client_id`로 요청이 실패하면 지정된 URI로 리디렉션되지 않고 Datadog 오류 페이지가 표시됩니다.

사용자가 인증을 거부하거나 기타 이유로 요청이 실패하면 사용자는 `redirect_uri`로 리디렉션되고 쿼리 구성 요소에 [오류][2] 파라미터가 포함됩니다.

## 인증 코드 받기

### `POST /oauth2/v1/authorize`

#### 개요
사용자가 동의 페이지에서  **Authorize** 버튼을 클릭하면 `POST` 요청이 자동으로 [인증 엔드포인트][3]로 전송되어 요청을 확인하고 고유 인증 코드를 반환합니다. 사용자는 애플리케이션의 `redirect_uri`로 리디렉션되고 쿼리 구성 요소에 인증 코드 파라미터가 포함됩니다.

#### 요청 
애플리케이션에서 이 인증 요청을 할 필요는 없습니다. 이 단계는 이전 사용자 인증 요청의 응답으로, 사용자가 애플리케이션을 성공적으로 인증하면 Datadog에 자동으로 요청됩니다. 


[1]: https://docs.datadoghq.com/ko/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "Token Endpoints" %}}

## 액세스 토큰용 인증 코드 교환

### `POST /oauth2/v1/token`

#### 개요

인증 요청에서 인증 코드가 반환되면 애플리케이션은 이 코드를 액세스 토큰과 새로 고침 토큰으로 교환할 수 있습니다. 인증 코드는 리디렉션 URI에서 추출되어 `POST` 요청을 통해 Datadog의 OAuth2 [토큰 엔드포인트][1]로 전송됩니다. 

Datadog [액세스 토큰][2]은 Datadog API의 액세스 권한을 부여하는 유효 기간(TTL)이 1시간인, 수명이 짧은 토큰입니다. 마켓플레이스 OAuth 클라이언트용 [새로 고침 토큰][3]은 만료되지 않는, 수명이 긴 토큰(TTL 무한대)으로, 만료될 때마다 자동으로 새 액세스 토큰을 얻는 데 사용됩니다. 사용자가 권한을 취소하면 애플리케이션에 새로운 액세스 및 새로 고침 토큰 세트를 다시 인증해야 합니다(새로 고침 토큰이 만료됨). 

#### 요청

[액세스 토큰 요청][4]은 `application/x-www-form-urlencoded` 형식을 사용하며 `POST` 요청 본문에 다음 파라미터를 포함합니다.

|  HTTP 본문 파라미터               | 설명                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | 인증 요청에서 전송된 동일한 [리디렉션 엔드포인트][5]                                                                                                                                   |
| `client_id`                          | OAuth2 클라이언트의 클라이언트 ID                                                                                                                                                                |
| `client_secret`(발행된 경우)          | OAuth2 기밀 클라이언트의 클라이언트 암호                                                                                                                                                    |
| `grant_type`                         | 초기 액세스 토큰과 새로 고침 토큰을 받으려면 인증 유형이 `authorization_code`, 후속 액세스 토큰과 새로 고침 토큰을 받으려면 인증 유형이 `refresh_token`이어야 합니다. |
| `code_verifier`(PKCE가 활성화된 경우) | 인증 요청에 전송된 코드 챌린지를 도출하는 데 사용되는 원시 [코드 검증기][6]입니다.                                                                                                         |
| `code`                               | 이전 인증 POST 요청에서 생성 및 반환된 인증 코드입니다.                                                                                                         |

#### 요청 예시 

이 cURL 명령을 사용하여 액세스 토큰을 요청합니다.

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/oauth2/v1/token"
```

#### 성공 응답

액세스 토큰 요청이 유효하고 인증된 경우 [토큰 응답][7]은 HTTP 응답 본문에 포함된 액세스 토큰 및 새로 고침 토큰과 함께 `200 OK` 상태 코드를 반환합니다. 

#### 오류 응답

토큰 엔드포인트에 실패한 요청은 애플리케이션에서 처리해야 합니다. 예를 들어 애플리케이션 내 적절한 오류 페이지로 사용자를 리디렉션할 수 있습니다.

발급된 클라이언트 암호가 있는 기밀 클라이언트가 `client_secret` 파라미터 없이 토큰을 요청하면 `401 Unauthorized` 상태 코드가 반환됩니다.

토큰 요청이 잘못된 요청이나 잘못된 인증 코드와 같은 기타 이유로 실패하면 (달리 명시되지 않는 한) `400 Bad Request` 상태 코드가 [`error`][8] 파라미터와 함께 반환됩니다. 

## 토큰 취소

### `POST /oauth2/v1/revoke`

#### 개요

사용자는 언제든지 액세스 권한을 취소하거나 토큰을 새로 고칠 수 있습니다. 토큰이 취소되면 더 이상 Datadog API에 액세스하는 데 토큰을 사용할 수 없습니다. 특정 토큰을 취소하려면 애플리케이션에서 Datadog의 [토큰 취소 엔드포인트][9]로 POST 요청을 보내면 됩니다. 

#### 요청
[취소 요청][10]은 `application/x-www-form-urlencoded` 형식을 사용하며 `HTTP POST` 요청 **본문**에 다음 파라미터를 포함해야 합니다.

| HTTP 본문 파라미터          | 설명                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | OAuth2 클라이언트의 클라이언트 ID                                                                                      |
| `client_secret`(발행된 경우)                    | OAuth2 기밀 클라이언트 클라이언트 암호                                                                                       |
| `token`                        | 취소할 토큰 문자열                                                                                           |
| `token_type_hint`(선택 항목)   | 취소할 토큰 유형의 힌트를 제공하여 토큰 조회를 최적화합니다. 예를 들어, `access_token` 또는 `refresh_token`을 사용합니다.  |

#### 코드 예제 

취소 요청을 하려면 이 cURL 명령을 사용하세요.

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### 성공 응답

토큰이 성공적으로 취소되었거나 `token` 파라미터가 유효하지 않은 경우, [취소 응답][11]은 `200 OK` 상태 코드를 반환합니다.

#### 오류 응답

토큰 요청이 누락되거나 잘못된 파라미터 등의 이유로 실패하면 400 잘못된 요청 상태 코드(달리 명시되지 않는 한)가 [`error`][8] 파라미터와 함께 반환됩니다.

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
{{% tab "API Key Creation Endpoints" %}}

## 사용자를 대신해 API 키 생성하기

### `POST /api/v2/api_keys/marketplace`

#### 개요

유효한 OAuth 액세스 권한 또는 새로 고침 토큰을 받으면 이를 사용하여 인증 사용자를 대신하여 API 키를 생성할 수 있습니다. 

이 엔드포인트를 통해 생성된 API 키는 OAuth를 통해 Datadog로 데이터를 전송할 수 있는 유일한 방법입니다. API 키는 Datadog 조직당 하나만 존재할 수 있으며, API 키 값은 생성 후 한 번만 표시되므로 저장해 두어야 합니다.

**이 엔드포인트에 액세스하려면 비공개 `API_KEYS_WRITE` 범위가 OAuth 클라이언트와 연결되어 있어야 합니다.**

<div class="alert alert-info">설정하는 데 문제가 있는 경우 범위, 마켓플레이스@Datadog.com으로 문의하세요. </div>

#### 요청 예시

이 cURL 명령을 사용하여 `api_keys` 엔드포인트에 요청합니다.

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### 성공 응답

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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}