---
description: OAuth2 인증 엔드포인트를 사용하는 방법에 대해 알아봅니다.
further_reading:
- link: /developers/authorization/
  tag: 설명서
  text: OAuth2 인증에 대해 알아보기
title: OAuth2 인증 엔드포인트 레퍼런스
---
{{< callout btn_hidden="true" >}}
Datadog 개발자 플랫폼은 현재 베타 버전입니다. 액세스 권한이 없는 경우 apps@datadoghq.com에 문의해 주세요.
{{< /callout >}} 

## 개요

보호된 Datadog 리소스를 사용하는 애플리케이션은 사용자가 권한을 부여해야 사용자 대신 Datadog API에 액세스할 수 있습니다. 이러한 엔드포인트는 인증 코드 플로우를 통해 애플리케이션에 연결합니다.

{{< tabs >}}
{{% tab "인증 엔드포인트" %}}

## 사용자로부터 인증 요청

### `GET /oauth2/v1/authorize`

#### 개요

인증 코드 플로우를 시작하기 위해, 애플리케이션은 Datadog의 인증 엔드포인트로 `GET`요청을 합니다. 그러면 사용자가 Datadog의 인증 플로우로 재접속되고 애플리케이션에서 요청한 범위 목록과 권한 부여 프롬프트를 표시하는 동의 페이지가 렌더링됩니다. 또한 요청이 발생하는 [Datadog 사이트][1]도 반환됩니다.

#### 요청
인증 요청에서 애플리케이션은 `application/x-www-form-urlencoded`형식을 사용하여 다음 파라미터를 URI의 쿼리 구성 요소에 추가하여 재접속할 URI를 설정합니다:

| URL 파라미터                               | 설명                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | 사용자가 액세스를 허용하거나 거부한 후 애플리케이션의 재접속 엔드포인트입니다.                              |
| `client_id`                                   | OAuth2 클라이언트의 클라이언트 ID입니다.                                                                       |
| `response_type`                               | 응답 유형은 이 허가 플로우에 대한 코드여야 합니다.                                                        |
| `code_challenge` (PKCE가 활성화된 경우)        | `code_verifier`의 변환입니다 .Datadog는 `SHA-256`를 사용하여 코드 챌린지를 계산할 것을 권장합니다.     |
| `code_challenge_method` (PKCE가 활성화된 경우) | 코드 챌린지를 계산하는 데 사용되는 방식입니다. `SHA-256` 또는 `S256`가 지원됩니다.  |

#### 요청 예시

Datadog의 동의 페이지를 렌더링하기 위해 사용자가 지정된 파라미터가 있는 엔드포인트로 재접속할 수 있게 합니다:
```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### 성공 응답

사용자가 성공적으로 액세스 요청을 허용하면 애플리케이션이 [인증 코드를 획득](#about-an-authorization-code)하고 쿼리 구성 요소에 있는 `site` 파라미터뿐만 아니라 `code` 권한이 있는 재접속할 URI로 사용자를 리디렉션합니다.

#### 오류 응답

잘못된 `redirect_uri` 또는 `client_id` 때문에 요청이 실패하면 사용자는 지정된 URI로 재접속되지 않고 대신 Datadog 오류 페이지가 표시됩니다.

사용자가 승인을 거부하거나 다른 이유로 인해 요청이 실패하면 쿼리 구성 요소에 [오류][2] 파라미터가 있는 `redirect_uri`로 재접속됩니다.

## 인증 코드 획득

### `POST /oauth2/v1/authorize`

#### 개요
사용자가 동의 페이지의 **Authorize** 버튼을 클릭하면 자동으로 `POST` 요청이 [인증 엔드포인트][3]로 전송되어 요청을 확인하고 고유한 인증코드를 반환합니다. 사용자는 쿼리 구성 요소에 있는 권한 코드 파라미터를 사용하여 애플리케이션`redirect_uri`으로 재접속됩니다.

#### 요청
인증 요청을 할 필요가 없습니다. 이 단계는 이전 사용자 인증 요청에 대한 응답이며, 사용자가 인증에 성공하면 Datadog이 자동으로 요청합니다.


[1]: https://docs.datadoghq.com/ko/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "토큰 엔드포인트" %}}

## 접근 토큰에 대한 교환 인증 코드

### `POST /oauth2/v1/token`

#### 개요

인증 코드가 인증 요청에서 반환되면 애플리케이션은 이 코드를 액세스 토큰 및 새로 고침 토큰으로 교환할 수 있습니다. 인증 코드는 재접속할 URI에서 추출되어 Datadog의 OAuth2 [토큰 엔드포인트][1]로 `POST` 요청을 보냅니다.

Datadog [접근 토큰][2]은 Datadog API에 대한 액세스를 허용하는 time-to-live (TTL)이 1시간인 짧은 수명 토큰입니다. 마켓플레이스 OAuth 클라이언트의 [새로고침 토큰][3]은 만료될 때마다 자동으로 새 액세스 토큰을 얻는 데 사용되는 만료(무한대의 TTL)가 없는 수명이 긴 토큰입니다. 사용자가 인증을 취소하면 애플리케이션에 대한 새로운 액세스 및 새로 고침 토큰 세트를 다시 승인해야 합니다(새로 고침 토큰이 만료됨).

#### 요청

[접근 토큰 요청][4]은 `POST` 요청 본문에 다음 파라미터와 함께 `application/x-www-form-urlencoded` 형식으로 작성됩니다:

|  HTTP 바디 파라미터               | 설명                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | 인증 요청에서 전송된 동일한 [재접속 엔드포인트][5]입니다.                                                                                                                                   |
| `client_id`                          | OAuth2 클라이언트의 클라이언트 ID입니다.                                                                                                                                                                |
| `client_secret` (발급된 경우)          | OAuth2 기밀 클라이언트의 클라이언트 기밀입니다.                                                                                                                                                    |
| `grant_type`                         | 허가 유형은 초기 접근 토큰 및 새로 고침 토큰을 수신하는 `authorization_code`이어야 하며, 허가 유형은 이후 액세스 및 새로 고침 토큰을 수신하는 `refresh_token`이어야 합니다. |
| `code_verifier` (PKCE가 활성화된 경우) | 원래 [코드 검증기][6]는 인증 요청에서 전송된 코드 챌린지를 도출하는 데 사용되었습니다.                                                                                                         |
| `code`                               | 이전 승인 POST 요청에서 생성되어 반환된 승인 코드입니다.                                                                                                         |

#### 요청 예시

접근 토큰 요청을 하려면 다음 cURL 명령을 사용합니다:

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/oauth2/v1/token"
```

#### 성공 응답

접근 토큰 요청이 유효하고 승인된 경우 [토큰 응답][7]은 HTTP 응답 본문에 포함된 액세스 토큰 및 새로 고침 토큰과 함께 `200 OK` 상태 코드를 반환합니다.

#### 오류 응답

토큰 엔드포인트에 대한 실패한 요청은 애플리케이션의 적절한 오류 페이지로 사용자를 리디렉션하는 것처럼 애플리케이션에서 처리해야 합니다.

발급된 클라이언트 기밀이 있는 기밀 클라이언트가 `client_secret` 파라미터를 제공하지 않고 토큰 요청을 하면 `401 Unauthorized` 상태 코드가 반환됩니다.

잘못된 형식의 요청 또는 잘못된 승인 코드와 같은 다른 이유로 토큰 요청이 실패하면 (달리 명시하지 않는 한) `400 Bad Request` 상태 코드가 [`error`][8] 파라미터와 함께 반환됩니다.

## 토큰 취소

### `POST /oauth2/v1/revoke`

#### 개요

사용자는 언제든지 액세스를 취소하거나 토큰을 새로 고칠 수 있으며, 취소되면 더 이상 해당 토큰을 Datadog API에 액세스하는 데 사용할 수 없습니다. 주어진 토큰을 취소하려면 애플리케이션에서 Datadog의 [토큰 취소 엔드포인트][9]에 POST 요청을 합니다.

#### 요청
[취소 요청][10]은 `HTTP POST` 요청의 **바디**에서 다음 파라미터를 사용하여 `application/x-www-form-urlencoded` 형식을 지정합니다:

| HTTP 바디 파라미터          | 설명                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | OAuth2 클라이언트의 클라이언트 ID입니다.                                                                                      |
| `client_secret` (발급된 경우)                    | OAuth2 기밀 클라이언트의 클라이언트 기밀입니다.                                                                                       |
| `token`                        | 취소할 토큰 문자열입니다.                                                                                           |
| `token_type_hint` (선택사항)   | 토큰 조회를 최적화하는 데 도움이 되는 취소할 토큰 유형에 대한 힌트입니다. 예를 들어, `access_token` 또는 `refresh_token`입니다.  |

#### 코드 예시

취소 요청을 하려면 다음 cURL 명령을 사용합니다:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### 성공 응답

토큰이 성공적으로 취소되었거나 `token` 파라미터가 잘못된 경우 [취소 응답][11]은 `200 OK` 상태 코드를 반환합니다.

#### 오류 응답

누락되거나 잘못된 파라미터와 같은 이유로 토큰 요청이 실패하면 400 잘못된 요청 상태 코드가 (별다른 명시가 없는 한) [`error`][8] 파라미터와 함께 반환됩니다.

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

## 사용자 대신 API Key 만들기

### `POST /api/v2/api_keys/marketplace`

#### 개요

유효한 OAuth 액세스 또는 새로 고침 토큰을 받은 후 인증 사용자를 대신하여 API 키를 만드는 데 사용할 수 있습니다.

이 엔드포인트를 통해 생성된 API 키는 OAuth를 통해 Datadog로 데이터를 보낼 수 있는 유일한 방법이며, Datadog 조직당 하나의 API 키만 존재할 수 있으며, 생성 후 한 번씩 API 키 값이 나타나므로 이에 따라 저장합니다.

**이 엔드포인트에 접근하려면 개인 `API_KEYS_WRITE` 범위가 OAuth 클라이언트와 연결되어 있어야 합니다**.

<div class="alert alert-info">이 범위를 설정하는 데 문제가 있는 경우 marketplace@datadog.com 로 문의하세요. </div>

#### 요청 예시

다음 cURL 명령을 사용하여 `api_keys` 엔드포인트로 요청합니다:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### 성공 응답

접근 또는 새로 고침 토큰 요청이 유효하고 승인된 경우 다음이 반환됩니다:

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