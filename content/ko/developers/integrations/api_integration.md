---
aliases:
- /ko/developers/integrations/oauth_for_data_integrations/
- /ko/developers/integrations/oauth_for_integrations/
description: Datadog API 통합을 개발하고 게시하는 방법을 알아보세요.
further_reading:
- link: /developers/authorization/oauth2_in_datadog/
  tag: 설명서
  text: Datadog의 OAuth2
- link: /developers/integrations/
  tag: 설명서
  text: 통합 구축하기
- link: https://www.datadoghq.com/blog/oauth/
  tag: 블로그
  text: OAuth를 사용하여 Datadog 통합 승인
title: API 기반 통합 생성하기
---

## 개요

이 페이지에서는 기술 파트너에게 Datadog API 통합을 만드는 과정을 안내합니다.

[Datadog API 엔드포인트][21]를 사용하면 백엔드에서 데이터를 제출하고 사용자의 Datadog 계정에서 데이터를 가져와 고객 사용 경험을 개선할 수 있습니다. Technology Partner는 자사 환경 내에서 코드를 작성하고 호스팅합니다.

API 통합은 사용자를 인증하는 기존 SaaS 기반 플랫폼을 보유한 기술 파트너에게 이상적입니다.

API 통합은 Datadog에 다음 유형의 데이터를 보낼 수 있습니다.

- [메트릭][22]
- [로그][23]
- [이벤트][24]
- [서비스 점검][25]
- [트레이스][26]
- [인시던트][27]

## 개발 프로세스

### OAuth

사용자에게 직접 API와 애플리케이션 키를 요청하는 대신 Datadog는 [OAuth 클라이언트][14]를 사용해 API 기반 통합에 대한 인증과 액세스를 처리합니다. OAuth 구현 환경은 모든 [Datadog 사이트][12]를 지원해야 합니다.

Datadog 고객은 OAuth를 사용하여 Datadog 조직에 대한 제3자 접근 권한을 안전하게 승인할 수 있습니다. 이 승인을 통해 고객은 API 키나 앱 키를 별도로 입력하지 않고도 통합 기능을 통해 Datadog에 데이터를 푸시하거나 Datadog에서 데이터를 가져올 수 있습니다. 예를 들어, 온콜 알림 도구에서 읽기 전용으로 내 Datadog 조직 모니터에 접근하도록 동의할 수 있습니다.

참고: 이 기능은 통합을 구축하려는 승인된 Technology Partner에게만 제공됩니다. 다른 용도의 OAuth 클라이언트는 지원되지 않습니다.

OAuth 클라이언트를 게시해도 통합이 게시되지 않습니다. 통합은 별도의 게시 프로세스를 완료한 후에만 [Integrations 페이지][16]에 표시됩니다. 통합 생성 및 게시에 대한 자세한 내용은 [통합 구축][18]을 참고하세요.

### 통합에서 OAuth를 언제 사용하나요?

Datadog의 공개 [API 엔드포인트][12]에 데이터를 직접 제출하거나 쿼리하는 모든 파트너 기반 SaaS 통합에는 OAuth 지원이 필요합니다. OAuth는 온프레미스에 배포된 소프트웨어나 Datadog Agent 점검에는 적용되지 않습니다.

[Marketplace][2] 또는 [Integrations][3] 페이지에서 아래 단계를 따라 새 통합에 OAuth를 포함하거나 기존 통합에 OAuth를 추가할 수 있습니다.

### OAuth 클라이언트 생성
클라이언트는 애플리케이션이 고객의 Datadog 데이터에 접근하도록 사용자가 권한을 부여할 수 있게 해주는 애플리케이션 구성 요소입니다. 접근 권한을 얻기 위해 클라이언트는 적절한 액세스 토큰이 필요합니다.
1. OAuth를 설정하기 전에 Integration Developer Platform 가이드 대로 통합을 설정합니다. 구성 방법 선택 시 **API with OAuth**를 선택하세요.
2. 이름, 온보딩 URL, 리디렉션 URI 등 클라이언트 세부 정보를 입력합니다.
3. OAuth 클라이언트 시크릿을 생성합니다.
4. 클라이언트 시크릿은 다시 표시되지 않으므로 저장해 두세요. 비밀번호를 분실한 경우 새 비밀번호를 다시 생성할 수 있습니다.

   이 단계에서 생성하는 클라이언트는 비공개 버전이며, 해당 크리덴셜은 내부 조직 내에서만 테스트용으로 사용할 수 있습니다. 통합이 게시되면 이 클라이언트의 새로운 게시 버전이 생성되고, 모든 Datadog 조직에서 권한을 부여할 수 있는 새로운 크리덴셜 세트를 받게 됩니다.

5. 적절한 범위를 선택합니다.

   범위는 앱이 고객의 Datadog 계정에서 액세스할 수 있는 데이터 유형을 결정합니다. 이를 통해 통합에서 필요한 범위에 액세스할 수 있습니다. 필요에 따라 나중에 더 많은 범위를 추가할 수 있으므로 사용 사례에 필요한 최소한의 범위만 요청하세요. Datadog에 데이터를 제출하려면 범위를 선택해야 합니다.
6. 수정 사항을 저장합니다.

### OAuth 프로토콜 구현

OAuth 프로토콜을 구현하는 단계는 [Datadog OAuth2][1]를 참고하세요.

### OAuth 클라이언트 테스트

OAuth 프로토콜을 구현한 후에는, 사용 사례에 따라 데이터를 Datadog으로 전송하거나 Datadog에서 가져올 수 있는지 확인하기 위해 OAuth 클라이언트를 테스트하세요.

**참고**: 통합 타일이 게시될 때까지는 샌드박스 조직의 OAuth 클라이언트만 승인할 수 있습니다. 즉, 샌드박스 계정으로 데이터를 전송하거나 샌드박스 계정에서 데이터를 가져오는 것만 가능합니다.

OAuth 클라이언트를 테스트하려면 다음 단계를 완료하세요.
1. 권한이 올바르게 작동하는지 테스트
2. API 키 생성
3. 여러 Datadog 사이트 테스트
4. 리전 간 지원 확인
5. 모든 범위의 데이터 흐름 확인
6. 통합 및 OAuth 클라이언트 검토를 위해 제출

#### 권한이 올바르게 작동하는지 테스트

1. Developer Platform의 OAuth 클라이언트 페이지에서 **Test Authorization**을 선택합니다. 그러면 온보딩 URL로 이동하여 사용자 관점에서 인증 절차가 시작됩니다. 이 버튼을 클릭하면 `onboarding_url`으로 리디렉션되는 과정에서 `domain` 파라미터가 제공됩니다.
2. OAuth 흐름을 거쳐 통합을 승인합니다.

#### API 키 생성

OAuth 클라이언트가 `api_keys_write` 범위를 요청한 경우, 요청 헤더에서 토큰을 사용하여 `marketplace` 엔드포인트에 성공적으로 요청할 수 있는지 확인합니다. 자세한 내용은 [OAuth2 인증 엔드포인트 레퍼런스][20]를 참고하세요.

요청이 성공하면 API 키가 반환되며 [API Keys Management 페이지][10]에서 확인할 수 있습니다. 사용자를 대신하여 Datadog에 데이터를 제출하려면 이 키를 안전하게 저장해야 합니다. **최초 요청 응답 후에는 이 API 키 값에 다시 액세스할 수 없습니다.**

#### 여러 Datadog 사이트 테스트

여러 [Datadog 사이트][8]에서 테스트하는 기능은, 통합이 승인된 후 개발자 샌드박스에서 미리보기가 가능한 경우에만 사용할 수 있습니다.
1. 다른 사이트의 샌드박스 계정에 액세스할 수 없다면 `ecosystems@datadog.com`에 문의하세요.
2. 해당 통합은 다른 샌드박스에서도 사용할 수 있습니다.
3. 통합을 연결하고 OAuth 흐름을 완료합니다.


##### 리전 간 지원 확인

모든 Datadog 리전의 사용자에게 OAuth를 적용하려면 사용자 리전에 따라 올바른 API 호출을 해야 합니다. 사용자가 Datadog 타일에서 인증을 시작하면, 온보딩 URL에서 리디렉션될 때 사이트 파라미터가 전달됩니다. 이 파라미터를 이용해 인증 및 토큰 엔드포인트에 요청을 보냅니다.

사용자가 플랫폼에서 직접 인증을 시작하는 경우 이 사이트 파라미터는 전송되지 않고 대신 사용자에게 Datadog 인증 페이지에서 사이트를 선택하라는 메시지가 표시됩니다.

Datadog API에 사용자 리전과 일치하는 테스트 호출을 하세요. 예를 들어 US는 `https://trace.browser-intake-datadoghq.com`, EU는 `https://public-trace-http-intake.logs.datadoghq.eu` 입니다.

Datadog 사이트에 따라 목적지 목록을 확인하려면 [Network traffic][19] 페이지로 이동하여 오른쪽에 있는 **DATADOG SITE** 선택기를 사용하고 리전을 전환합니다.

#### 모든 범위의 데이터 흐름 확인

요청한 각 범위에 대해 데이터를 보내고, 가져오고, 편집할 수 있는지 확인합니다.

### OAuth 클라이언트 게시

#### 통합 및 OAuth 클라이언트 검토를 위해 제출
1. 통합에 필요한 모든 필수 필드를 작성한 후 검토를 위해 제출합니다.
2. 제출하면 통합 공개 버전에 대한 새로운 크리덴셜 세트를 받게 됩니다. **이 크리덴셜은 다시 표시되지 않으니 안전한 곳에 복사해 두세요.**
3. Datadog에서 통합을 승인하고 배포할 준비가 되면 OAuth 클라이언트도 게시됩니다. 게시된 통합 타일은 샌드박스 계정에서는 사용할 수 있지만 다른 고객에게는 제공되지 않습니다. 또한, OAuth 클라이언트는 샌드박스 조직뿐만 아니라 모든 Datadog 조직에서 승인할 수 있습니다.
4. 이 시점에서 OAuth 클라이언트를 사용해 최종 테스트를 하고 인증이 원활하게 작동하는지 확인합니다.

#### 클라이언트를 게시한 후 변경 사항 적용

게시된 OAuth 클라이언트는 직접 수정할 수 없습니다. 게시된 후 OAuth 클라이언트를 업데이트하려면 게시 절차를 다시 거쳐 다시 제출해야 합니다.

## 트러블슈팅

### API 범위 목록에는 메트릭, 이벤트, 로그 전송이 포함되지 않음

Datadog에 데이터를 전송하려면 사용자를 대신하여 API 키를 생성할 때 `api_keys_write` 범위를 사용합니다. 자세한 내용은 [API 키 생성](#create-an-api-key)을 참고하세요.


### 잘못된 클라이언트 ID

오류
: `invalid_request - Invalid client_id parameter value`

OAuth 클라이언트가 게시될 때까지는 클라이언트가 생성된 계정(파트너의 샌드박스 계정)에서만 클라이언트를 승인할 수 있습니다. 이 오류는 클라이언트가 게시되기 전에 해당 계정 외부에서 클라이언트를 승인하려고 할 때 발생합니다.

이미 OAuth 클라이언트를 게시했다면 제출 시 제공된 클라이언트 ID와 클라이언트 시크릿을 사용해야 합니다. 클라이언트 시크릿은 한 번만 표시되므로 분실한 경우 [ecosystems@datadog.com][11]에 문의하세요.

### 금지된 오류

오류
: `{"errors":["Forbidden"]}`

이 오류는 앱 키 또는 API 인증 크리덴셜 문제와 관련이 있을 수 있습니다.

#### 앱 키 사용

OAuth 클라이언트는 인증을 위해 `access_token`를 사용합니다. `access_token`를 사용하여 요청 인증 헤더에 포함시켜 Datadog API 엔드포인트를 호출합니다.

```python
headers = {"Authorization": "Bearer {}".format(access_token)}
```

자세한 내용은 [OAuth 프로토콜 구현][17]을 참고하세요.

### API 요청

특정 엔드포인트로 API 호출을 시도했는데 forbidden 오류가 발생하고, 해당 엔드포인트에 필요한 권한을 이미 활성화했다면, API 키, 세션, 또는 OAuth 토큰이 잘못되었거나 만료되었을 가능성이 있습니다.

#### API 키 및 토큰 만료

새로 고침 토큰은 사용자가 권한을 취소하거나 파트너가 토큰을 취소하지 않는 한 만료되지 않습니다. 파트너가 토큰을 취소하면 사용자는 통합을 재승인하여 새로운 새로 고침 및 액세스 토큰을 생성해야 합니다. 자세한 내용은 [OAuth2 인증 엔드포인트 레퍼런스][13]를 참고하세요.

#### 파트너 샌드박스 계정에서 API 키 검색

[api_keys/marketplace][14] 엔드포인트를 사용하여 키를 생성하면 키가 응답으로 반환됩니다. 키는 다시 생성하거나 확인할 수 없습니다. 지속적인 데이터 전송을 위해 키를 안전하게 보관해야 하며, 분실한 경우 다음 단계를 따라 키를 해지하고 다시 생성하세요.

1. [Datadog API Keys Management 페이지][15]로 이동합니다.
1. `OAuth Client API Key`라는 API 키를 찾아 선택합니다.
1. **Revoke**를 클릭하여 API 키를 비활성화합니다.
1. [API 키 생성](#create-an-api-key)의 단계를 따라 새 키를 만듭니다.
1. 통합을 다시 설치하고 OAuth 흐름을 반복합니다.


### 호스트 이름/IP가 인증서의 대체 이름과 일치하지 않음

오류
: `Hostname/IP does not match certificate's altnames`

Datadog API에 연결할 때 API 호출에 하위 도메인을 포함시키지 않습니다. 예를 들어, `bigcorp.datadoghq.eu` 대신 `datadoghq.eu`를 사용합니다.

### 리디렉션 URI가 일치하지 않음

오류
: `invalid_request - Mismatching redirect URI`

이 오류는 일반적으로 테스트 클라이언트와 게시된 클라이언트 간의 구성 차이로 인해 발생합니다. 다음 사항을 확인하세요.
- 인증 시 올바른 `client_id`를 사용하고 있는지 확인합니다. 예를 들어, 게시된 클라이언트의 client_id 대신 테스트 클라이언트의 `client_id`를 사용하고 있을 수 있습니다.
- 올바른 리디렉션 URI를 사용하고 있는지 확인합니다. 예를 들어, 클라이언트가 게시되었다면 리디렉션 URI는 테스트에 사용한 URI가 아닌 프로덕션 환경에 대해 구성된 URI와 일치해야 합니다.
- 올바른 클라이언트를 사용하고 있는지 확인합니다. 샌드박스 계정에 통합이 게시될 때까지 테스트 클라이언트를 사용하세요.

### 하위 도메인이 있는 애플리케이션

Datadog은 고객이 개별 하위도메인을 사용해 인증하는 멀티 테넌트 애플리케이션을 지원하지 않으며, 인증은 단일 도메인에서만 가능합니다.

### PKCE를 사용한 OAuth

오류
: `Invalid code or code verifier`

PKCE OAuth 흐름에 문제가 발생하면 `content-type` 헤더가 `application/json` 또는 `application/x-www-form-urlencoded`로 올바르게 설정되어 있는지 확인합니다.

### 클라이언트 시크릿 재생성 및 시크릿 교체

비밀번호가 유출되어 교체가 필요한 경우 [ecosystems@datadog.com][11]으로 문의하세요. 한 번에 하나의 비밀번호만 활성화할 수 있습니다. 비밀번호를 다시 생성하면 기존 비밀번호는 삭제되며, 통합을 다시 승인할 필요는 없습니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: /ko/developers/integrations/marketplace_offering/#list-an-offering
[8]: /ko/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: mailto:ecosystems@datadog.com
[12]: /ko/api/latest/using-the-api/
[13]: /ko/developers/authorization/oauth2_endpoints/#exchange-authorization-code-for-access-token
[14]: /ko/developers/authorization/oauth2_endpoints/#post-apiv2api_keysmarketplace
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/integrations
[17]: /ko/developers/authorization/oauth2_in_datadog/#implement-the-oauth-protocol
[18]: /ko/developers/integrations/
[19]: /ko/agent/configuration/network/
[20]: /ko/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints
[21]: https://docs.datadoghq.com/ko/api/latest/using-the-api/
[22]: https://docs.datadoghq.com/ko/api/latest/metrics/
[23]: https://docs.datadoghq.com/ko/logs/faq/partner_log_integration/
[24]: https://docs.datadoghq.com/ko/api/latest/events/
[25]: https://docs.datadoghq.com/ko/api/latest/service-checks/
[26]: https://docs.datadoghq.com/ko/tracing/guide/send_traces_to_agent_by_api/
[27]: https://docs.datadoghq.com/ko/api/latest/incidents/