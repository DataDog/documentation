---
description: Datadog가 OAuth 2.0을 사용하는 방법에 대해 알아보세요.
further_reading:
- link: /developers/authorization/oauth2_endpoints
  tag: 설명서
  text: OAuth 2.0 허가 엔드포인트 사용 방법 알아보기
title: Datadog의 OAuth2
---

## 개요

이 페이지에서는 **기밀** 클라이언트가 생성되면 애플리케이션에 OAuth 프로토콜을 엔드 투 엔드로 구현하는 방법에 대한 단계별 개요를 설명합니다.

{{< img src="developers/authorization/oauth_process.png" alt="사용자가 통합에서 계정 연결 버튼을 클릭한 후 OAuth 인증 프로세스가 어떻게 작동하는지 설명하는 다이어그램" style="width:100%;">}}

## OAuth 프로토콜 구현

1. Datadog Partner Sandbox Account 내 [개발자 플랫폼][16]에서 OAuth 클라이언트를 생성하고 설정합니다.

2. 사용자가 통합을 설치한 후 **Connect Accounts** 버튼을 클릭하면 통합 타일의 **Configure** 탭에서 자신의 계정을 연결할 수 있습니다. 

   {{< img src="developers/authorization/connect-accounts.png" alt="계정 연결 버튼 클릭" style="width:100%;" >}}

   사용자가 이 버튼을 클릭하면 OAuth 클라이언트 생성 과정의 일부로 제공된 `onboarding_url`로 리디렉션됩니다. 이 페이지는 플랫폼의 로그인 페이지여야 합니다.

3. 사용자가 로그인하면 애플리케이션에서 생성한 `code_challenge` 파라미터를 포함하는 적절한 URL 파라미터를 통해 [OAuth2 인증 엔드포인트][6]로 리디렉션됩니다.

   `code_challenge` 파라미터를 도출하는 방법을 알아보려면 [PKCE](#authorization-code-grant-flow-with-pkce) 섹션을 참조하세요. 5단계에서 토큰 요청을 하려면 애플리케이션에서 `code_verifier`를 저장해야 합니다.

   - 이 GET 요청의 URL을 빌드하려면 `onboarding_url` 리디렉션에 제공된 `site` 쿼리 파라미터를 사용합니다. 
   - 이 파라미터는 사용자가 Datadog 통합 타일에서 인증을 시작하는 경우에만 제공됩니다. 사용자가 외부에서 인증을 시작하기로 선택한 경우 [타사 위치에서 인증 시작하기](#Initiate-authorization-from-a-third-party-location) 섹션에서  더 많은 옵션을 확인하세요.
   - `site` 쿼리 파라미터는 인증하는 사용자가 위치한 [Datadog 사이트][17]와 사용 중인 하위 도메인을 제공합니다. 이 GET 요청의 URL은 인증 엔드포인트(`<site>/oauth2/v1/authorize?...`)를 구성하는 데 필요합니다.

4. 사용자가 **Authorize**을 클릭하면 Datadog에서 인증 엔드포인트에 POST 요청을 보냅니다. 사용자는 쿼리 구성 요소에서 인증 `code` 파라미터를 사용하여 OAuth 클라이언트를 설정할 때 제공한 `redirect_uri`로 리디렉션됩니다.

5. `redirect_uri`에서 [Datadog 토큰 엔드포인트][10]로 POST 요청을 합니다. 이 요청에 4단계에서 받은 인증 코드, 3단계에서 받은 `code_verifier`, OAuth 클라이언트 ID, 클라이언트 암호를 포함합니다.

   - 이 Post 요청의 URL을 작성하려면 `redirect_uri` 리디렉션에 제공된 `domain` 쿼리 파라미터를 사용하세요. 
   - 토큰 엔드포인트의 POST 요청 URL을 구성해야 합니다(`https://api.<domain>/oauth2/v1/token`).

6. 성공하면 응답 본문으로 `access_token` 및 `refresh_token`을 받게 됩니다. 애플리케이션에 다음 메시지(`You may now close this tab`)와 함께 확인 페이지가 표시됩니다.

7. 요청의 인증 헤더에 ```headers = {"Authorization": "Bearer {}".format(access_token)}```을 포함하고 `access_token`를 사용하여 Datadog API 엔드포인트에 호출합니다.
    - **참고**: API 엔드포인트는 각 Datadog 사이트마다 다릅니다. 예를 들어 사용자가 EU 지역에 있는 경우 이벤트 엔드포인트는 `https://api.datadoghq.eu/api/v1/events` 이고, 사용자가 US1에 있는 경우 이벤트 엔드포인트는 `https://api.datadoghq.com/api/v1/events` 입니다.
    - 이러한 API 호출에 `domain` 쿼리 파라미터를 직접 사용하여 올바른 엔드포인트에 연결하는지 확인합니다. 예를 들어 이벤트 엔드포인트를 호출하려면 요청 URL을 `https://api.<domain>/api/v1/events`로 작성합니다.
    - 일부 엔드포인트에는 8단계에서 생성한 API 키가 필요할 수도 있습니다. 

8. [API 키 생성 엔드포인트][7]를 호출하여 Datadog 사용자를 대신해 데이터를 전송할 수 있는 API 키를 생성합니다.

   `API_KEYS_WRITE` 범위가 클라이언트에 추가되지 않은 경우 이 단계가 실패합니다. 이 엔드포인트는 단 한 번만 표시되는 API 키를 생성하며, 사용자가 Datadog 계정 내에서 삭제하지 않는 한 키를 다시 생성할 수 없습니다. **이 값을 안전한 데이터베이스 또는 위치**에 저장하세요. 

OAuth 클라이언트 생성, 테스트, 게시와 관련한 자세한 내용은 [Datadog 통합][5]을 참조하세요.

### 타사 위치에서 인증 시작

사용자는 통합 타일에서 **Connect Accounts**을 클릭하여 Datadog에서 인증 프로세스를 시작할 수 있습니다. 사용자가 Datadog에서 계정 연결을 클릭하면 [Datadog 사이트][17] 관련 정보가 `onboarding_url` 및 `redirect_uri`로 리디렉션됩니다. 사용자의 Datadog 사이트는 사용자를 대신하여 API 호출하고 인증 코드를 수신해야 합니다. 사용자가 _통합 외부 웹사이트_에서 인증을 시작하는 경우 사용자의 사이트 정보는 제공되지 않습니다. 

또한 사용자가 Datadog 통합 타일에서 인증을 시작하는 경우 요청된 모든 범위에 대해 해당 권한이 있어야 합니다. 통합 타일 이외의 다른 위치에서 인증을 시작한 경우 필수 권한이 없는 사용자가 인증을 완료할 수 있지만 Datadog 통합 타일로 돌아오면 적절한 권한으로 재인증을 요청하는 메시지가 나타납니다.

Datadog는 파트너가 자체 플랫폼이 아닌 Datadog에서 인증을 시작하라는 메시지를 사용자에게 표시할 것을 권장합니다.

Datadog에서는 Datadog 통합 타일 이외의 타사 위치에서 인증을 시작하는 것을 권장하지 않지만, 이 경로를 선택한다면 모든 Datadog 사이트에서 사용자를 지원할 수 있어야 합니다. 또한, 사용자가 새롭게 생성하는 Datadog 사이트를 지원할 수 있어야 합니다. 보통 인증하는 동안 사용자가 플래폼에서 사이트를 수동 입력하도록 하는 방법을 사용하는 경우가 많습니다.

조직에는 하위 도메인(예: https://subdomain.datadoghq.com)이 있을 수 있다는 점에 유의하세요. API 하위 도메인은 API 호출에 포함되지 않아야 하므로 모든 API 호출에 URL을 빌드할 때 `redirect_uri` 리디렉션에서 반환되는 `domain` 쿼리 파라미터를 사용하는 것이 좋습니다. 사용자가 올바른 사이트에서 인증을 받도록 하려면 항상 US1 Datadog 사이트(`app.datadoghq.com`)로 연결하고 해당 사이트에서 리전을 선택할 수 있도록 하세요.

## PKCE를 사용한 인증 코드 부여 플로우

OAuth2 프로토콜은 여러 가지 인증 플로우를 지원하지만, [인증 코드 플로우][8] [PKCE 포함](#authorization-code-grant-flow-with-pkce)가 권장되는 인증 유형입니다. 사용자가 명시적으로 한 번만 동의하고 클라이언트 자격 증명을 안전하게 저장할 수 있는 장기 실행 애플리케이션에 사용하는 것이 좋습니다.

이 인증 유형을 사용하면 애플리케이션이 고유 인증 코드를 안전하게 획득하고 이를 액세스 토큰으로 교환하여 Datadog API에 요청할 수 있습니다. 인증 코드 부여 절차는 세 단계로 구성됩니다.

1. 애플리케이션은 Datadog 범위 세트에 액세스하기 위해 [사용자에게 인증을 요청][6]합니다.
2. 사용자가 **Authorize**을 클릭하면 애플리케이션이 [고유 인증 코드를 획득합니다][12].
3. 애플리케이션은 [인증 코드를 액세스 토큰으로 교환][10]하며, 이 토큰은 Datadog API에 액세스하는 데 사용됩니다.

### PKCE 확장 사용

[코드 교환을 위한 증명 키(PKCE)][11]는 OAuth2 인증 코드 부여 플로우의 확장으로, 인터셉트 공격으로부터 OAuth2 클라이언트를 보호합니다. 공격자가 이 플로우를 인터셉트하여 애플리케이션으로 반환하기 전에 인증 코드에 액세스하면 액세스 토큰을 획득하고 Datadog API에 액세스할 수 있습니다.

이러한 공격 위험을 줄이기 위해 PKCE 확장에는 다음 파라미터가 포함되어 안전하게 인증 플로우에서 토큰 요청과 인증 요청을 연결합니다.

| 파라미터             | 정의                                                                                                                           |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| 코드 검증기         | 동적으로 생성된 암호화 랜덤 문자열                                                                                 |
| 코드 챌린지        | 코드 검증기의 변환. `code_challenge`는 `base64url` 인코딩을 사용해야 합니다.                                           |
| 코드 챌린지 방법 | `code_verifier`에서 `code_challenge`를 도출하는 데 사용되는 방법입니다. `code_challenge`를 계산하려면 [SHA-256][16]을 사용해야 합니다. |

[PKCE 프로토콜][11]은 다음 작업을 완료하여 인증 코드 부여 흐름과 통합합니다:

- 애플리케이션은 `code_verifier` 임의 문자열을 생성하고 `code_challenge_method`를 사용하여 해당 `code_challenge`를 도출합니다.

- 인증 코드를 얻기 위해 애플리케이션에서 `code_challenge` 및 `code_challenge_method` 파라미터와 함께 인증 요청을 Datadog에 전송합니다.

- 애플리케이션은 인증 코드와 함께 토큰 요청을 Datadog 및 `code_verifier`에 전송하여 액세스 토큰을 받습니다. 토큰 엔드포인트는 `code_challenge_method`를 사용하여 `code_verifier`를 변환하고 원본 `code_challenge` 값과 비교하여 인증 코드를 확인합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: /ko/api/latest/scopes/
[3]: /ko/developers/datadog_apps/#oauth-api-access
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[5]: /ko/developers/integrations/oauth_for_integrations
[6]: /ko/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#request-authorization-from-a-user
[7]: /ko/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints#create-an-api-key-on-behalf-of-a-user
[8]: https://tools.ietf.org/html/rfc6749#section-4.1
[9]: /ko/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#obtain-an-authorization-code
[10]: /ko/developers/authorization/oauth2_endpoints/?tab=tokenendpoints#exchange-authorization-code-for-access-token
[11]: https://datatracker.ietf.org/doc/html/rfc7636
[12]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
[13]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.2
[14]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.3
[15]: https://datatracker.ietf.org/doc/html/rfc6234#section-4.1
[16]: https://app.datadoghq.com/apps
[17]: /ko/getting_started/site/