---
description: Datadog가 OAuth 2.0을 사용하는 방법에 대해 알아보세요.
further_reading:
- link: /developers/authorization/oauth2_endpoints
  tag: 설명서
  text: OAuth 2.0 허가 엔드포인트 사용 방법 알아보기
title: Datadog OAuth2
---

{{< callout btn_hidden="true" >}}
  Datadog 개발자 플랫폼은 베타 버전입니다. 액세스할 수 없는 경우 apps@datadoghq.com 로 문의하세요.
{{< /callout >}} 

## 개요

이 페이지에서는 **기밀** 클라이언트가 생성되면 애플리케이션에 OAuth 프로토콜을 엔드 투 엔드로 구현하는 방법에 대한 단계별 개요를 설명합니다.

## OAuth 프로토콜 구현

1. [개발자 플랫폼][16]에서 OAuth 클라이언트를 생성하고 설정합니다.

2. 사용자가 통합을 설치한 후 **계정 연결(Connect Accounts)** 버튼을 클릭하여 통합 타일의 **설정(Configure)** 탭에서 계정을 연결할 수 있습니다.

   {{< img src="developers/authorization/connect-accounts.png" alt="계정 연결 버튼을 클릭" style="width:100%;" >}}

   사용자가 이 버튼을 클릭하면 OAuth 클라이언트 작성 프로세스의 일부로 제공한 `onboarding_url`로 연결됩니다. 이 페이지는 플랫폼의 로그인 페이지여야 합니다.

3. 사용자가 로그인하면 애플리케이션에서 생성된 추가 `code_challenge` 파라미터가 포함된 적절한 URL 파라미터가 있는 [OAuth2 허가 엔드포인트][6]로 재접속합니다.

   `code_challenge` 파라미터를 도출하는 방법을 확인하려면 [PKCE](#authorization-code-grant-flow-with-pkce) 섹션을 참조하세요. 5단계에서 토큰을 요청하려면 어플리케이션은 `code_verifier`를 저장해야 합니다.

   - GET 요청에 대한 URL을 작성하려면 `onboarding_url`로 재접속하는 데 제공되는 `domain` 쿼리 파라미터를 사용합니다.
   - 이 파라미터는 사용자가 Datadog 통합 타일에서 허가 프로세스를 시작하는 경우에만 제공됩니다. 사용자가 외부에서 허가 프로세스를 시작하도록 선택한 경우 자세한 옵션을 확인하려면 [제3자 위치에서 허가 프로세스 시작](#Initiate-authorization-from-a-third-party-location) 섹션을 참조하세요.
   - `domain` 쿼리 파라미터는 권한 부여 사용자가 속한 [Datadog 사이트][17]를 제공하며 허가 엔드포인트에 다음 GET 요청에 대한 URL을 설정하는 데 필요합니다: `https://api.<domain>/oauth2/v1/authorize?...`.

<div class="alert alert-info">`domain` 파라미터는 2023년 7월에 도입되었으며 이전 OAuth 클라이언트는 이 단계에 대해 `site` 파라미터를 사용합니다. `site`파라미터는 여전히 지원되지만 Datadog은 `Authorize` 엔드포인트에 대해 `domain` 파라미터를 사용할 것을 권장합니다. 나중에 추가 API 엔드포인트와 함께 사용할 수 있도록 이 값을 안전한 데이터베이스 또는 위치에 저장하세요.</div>

4. 사용자가 **Authorize**을 클릭하면, Datadog은 엔드포인트를 허가하기 위해 POST 요청을 합니다. 사용자는 쿼리 설정 요소에 권한 `code` 파라미터를 사용하여 OAuth Client를 설정할 때 제공한 `redirect_uri`로 리다이렉트됩니다.

5. `redirect_uri`에서 [Datadog 토큰 엔드포인트][10]에 4단계의 인증 코드, 3단계의 `code_verifier`, OAuth 클라이언트 ID 및 클라이언트 기밀을 포함하는 POST 요청을 합니다.

   - 이 POST 요청에 대한 URL을 생성하려면 `redirect_uri`로 재접속할 때 제공되는 `site` 쿼리 파라미터를 사용합니다.
   - `site` 쿼리 파라미터는 인증 사용자가 속한 [Datadog 사이트][17]뿐만 아니라 해당하는 경우 하위 도메인도 제공합니다. 토큰 엔드포인트 `https://<site>/oauth2/v1/token?...`에 POST 요청에 대한 URL을 설정해야 합니다.

6. 성공하면 응답 바디에 `access_token` 및 `refresh_token`가 수신됩니다. 애플리케이션에 다음 메시지가 포함된 확인 페이지가 표시됩니다: `You may now close this tab`.

7. 다음을 요청의 허가 헤더의 일부로 전송하여 Datadog API 엔드포인트를 호출하기 위해 `access_token`를 사용합니다: ```headers = {"Authorization": "Bearer {}".format(access_token)}```
    - **참고***: API 엔드포인트는 각 Datadog 사이트마다 다릅니다. 예를 들어 사용자가 EU 지역에 있는 경우 이벤트 엔드포인트는 `https://api.datadoghq.eu/api/v1/events`이지만 US1 사용자의 경우 이벤트 엔드포인트는 `https://api.datadoghq.com/api/v1/events`입니다.
    - `domain` 쿼리 파라미터를 이러한 API 호출에 직접 사용하여 올바른 엔드포인트에 연결하는지 확인합니다. 예를 들어 이벤트 엔드포인트를 호출하려면 요청 URL을 `https://api.<domain>/api/v1/events`로 작성합니다.
    - 일부 엔드포인트에는 8단계에서 생성되는 API 키도 필요할 수 있습니다.

8. [API 키 생성 엔드포인트][7]를 호출하여 Datadog 사용자를 대신하여 데이터를 보낼 수 있는 API 키를 생성합니다.

   `API_KEYS_WRITE` 범위가 클라이언트에 추가되지 않은 경우 이 단계는 실패합니다. 해당 엔드포인트는 한 번만 표시되는 API 키를 생성하며, 사용자가 Datadog 계정 내에서 삭제하지 않는 한 다시 생성할 수 없습니다. **이 값을 안전한 데이터베이스 또는 위치에 저장하세요**.

OAuth 클라이언트 생성, 테스트 및 게시에 대한 자세한 내용을 확인하려면 [Datadog 통합 OAuth][5]를 참조하세요.

### 제 3 자 위치에서 허가 프로세스 시작

사용자는 통합타일에서 **계정 연결(Connect Accounts)**을 클릭하여 Datadog에서 인증 프로세스를 시작할 수 있습니다. 사용자가 Datadog에서 계정 연결을 클릭하면 해당 [Datadog 사이트][17]에 대한 정보가 `onboarding_url`로 리다이렉트되어 전송됩니다. 사용자의 Datadog 사이트는 사용자를 대신하여 API 호출을 하고 인증코드를 받아야 하며, 사용자가 _통합의 외부 웹사이트_에서 인증을 시작하는 경우 사용자의 사이트 정보는 제공되지 않습니다.

또한, 사용자가 Datadog 통합 타일에서 허가 프로세스를 시작할 때, 요청된 모든 범위에 대해 해당 권한을 가져야 합니다. 통합 타일이 아닌 다른 곳에서 허가 프로세스를 시작할 경우, 필요한 모든 권한이 없는 사용자가 허가를 완료할 수도 있습니다(그러나 Datadog 통합 타일로 돌아갈 때 올바른 권한을 다시 부여할 것을 요청받음).

Datadog은 파트너에게 사용자가 자신의 플랫폼이 아닌 Datadog에서 허가 프로세스를 시작하도록 요청할 것을 권장합니다.

Datadog은 Datadog 통합 타일 외부의 제 3자 위치에서 인증 프로세스를 시작하는 것을 지원하지 않지만, 이 경로를 선택한 경우 모든 Datadog 사이트에서 사용자를 지원할 수 있는지 확인해야 합니다. 아울러 새로운 Datadog 사이트가 생성될 수 있는 경우에도 계속 지원할 의사가 있어야 합니다. 여기에는 일반적으로 권한 부여 시 사용자가 자신의 사이트를 플랫폼에 수동으로 입력할 수 있는 방법을 구현하는 것이 포함됩니다.

조직에도 하위 도메인이 있을 수 있습니다(예: https://subdomain.datadgohq.com ). 사용자가 올바른 사이트에서 권한을 부여하고 있는지 확인하려면 항상 US1 Datadog 사이트(`app.datadoghq.com`)로 연결하세요. 사용자는 이 사이트에서 해당 지역을 선택할 수 있습니다.

## PKCE를 사용한 권한 코드 허용 플로우

OAuth2 프로토콜은 여러 가지 권한 허용 플로우를 지원하지만 [권한 코드 허용 플로우][8] [PKCE 사용](#authorization-code-grant-flow-with-pkce)은 사용자가 한번 명시적으로 동의하고 클라이언트 자격 증명을 안전하게 저장할 수 있는 장기 실행 애플리케이션에 권장되는 허용 유형입니다.

이 허용 유형을 사용하면 애플리케이션이 고유한 권한 코드를 안전하게 받을 수 있고, Datadog API에 요청할 수 있는 액세스 토큰으로 교환할 수 있습니다. 권한 코드 허용 플로우는 다음 세 단계로 설정됩니다:

1. 애플리케이션이 [사용자에게 승인 요청][6]하여 Datadog 범위 집합에 액세스합니다.
2. 사용자가 **Authorize**을 클릭하면 애플리케이션이 [고유 인증 코드를 받습니다][12].
3. [접근 토큰에 대한 인증 코드 교환][10] 어플리케이션은 Datadog API에 액세스하는 데 사용됩니다.

### PKCE 확장 사용

[코드교환 증명키 (PKCE)][11]는 OAuth2 클라이언트를 방해 공격으로부터 보호하기 위한 OAuth2 권한 코드 허용 플로우의 확장입니다. 공격자가 플로우를 방해하고 애플리케이션으로 반환되기 전에 권한 코드에 대한 접근 권한을 얻으면 액세스 토큰을 얻을 수 있고 Datadog API에 대한 접근 권한을 얻을 수 있습니다.

이러한 공격의 위험을 완화하기 위해 PKCE 확장에는 허가 플로우 전반에 걸쳐 승인 요청과 토큰 요청을 안전하게 연결하는 다음 파라미터가 포함되어 있습니다:

| 파라미터             | 정의                                                                                                                           |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| 코드 검증기         | 동적으로 생성된 암호화 랜덤 문자열입니다.                                                                                 |
| 코드 챌린지        | 코드 검증자의 변환입니다. `code_challenge`는 `base64url`인코딩을 사용해야 합니다.                                           |
| 코드 챌린지 방식 | `code_verifier`에서 `code_challenge`를 유도하는 데 사용되는 방식입니다. `code_challenge`를 계산하려면 [SHA-256][16]을 사용해야 합니다. |

[PKCE 프로토콜][11]은 다음과 같은 작업을 수행함으로써 인증 코드 허가 플로우와 통합됩니다:

- 애플리케이션은 `code_verifier` 임의 문자열을 생성하고 `code_challenge_method`를 사용하여 해당 `code_challenge`을 도출합니다.

- 애플리케이션은 권한 부여 코드를 얻기 위해 `code_challenge` 및 `code_challenge_method` 파라미터와 함께 허가 요청을 Datadog에 보냅니다.

- 애플리케이션은 권한 코드 및 `code_verifier`와 함께 토큰 요청을 Datadog에 전송하고 액세스 토큰을 얻습니다. 토큰 엔드포인트는 `code_challenge_method`를 사용하여 `code_verifier`를 변환하고 원래 `code_challenge` 값과 비교하여 인증 코드를 확인합니다.

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