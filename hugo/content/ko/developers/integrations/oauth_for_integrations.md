---
aliases:
- /ko/developers/integrations/oauth_for_data_integrations/
description: OAuth를 사용하여 통합을 인증합니다.
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
title: 통합을 위한 OAuth
---

## 개요

Datadog 고객은 OAuth를 사용하여 Datadog 조직에 대한 제3자 접근 권한을 안전하게 승인할 수 있습니다. 이 승인을 통해 고객은 API 키나 앱 키를 별도로 입력하지 않고도 통합 기능을 통해 Datadog에 데이터를 푸시하거나 Datadog에서 데이터를 가져올 수 있습니다. 예를 들어, 사용자는 온콜 알림 도구가 자신의 Datadog 조직 모니터를 읽기 전용으로 접근하도록 동의할 수 있습니다.

Datadog OAuth 구현에 관한 자세한 정보는 [Datadog OAuth2 설명서][1]를 참조하세요.

OAuth 클라이언트를 게시해도 통합이 게시되지 않습니다. 통합은 별도의 게시 프로세스를 완료한 후에만 [Integrations 페이지][16]에 표시됩니다. 통합 생성 및 게시에 대한 자세한 내용은 [통합 구축][18]을 참고하세요.

## 통합에서 OAuth를 언제 사용하나요?

Datadog의 공개 [API 엔드포인트][12]에 데이터를 직접 제출하거나 쿼리하는 모든 파트너 기반 SaaS 통합에는 OAuth 지원이 필요합니다. OAuth는 온프레미스에 배포된 소프트웨어나 Datadog Agent 점검에는 적용되지 않습니다.

## OAuth를 포함하는 통합 빌드

OAuth와의 통합을 구축할 때는 애플리케이션에 필요한 범위만 선택해야 합니다. 고객이 통합 승인에 동의하면, 애플리케이션에서 토큰을 통해 명시된 모든 범위를 사용할 수 있게 됩니다.

[Marketplace][2] 또는 [Integrations][3] 페이지에서 아래 단계를 따라 새 통합에 OAuth를 포함하거나 기존 통합에 OAuth를 추가할 수 있습니다. 기존 통합의 경우, `manifest.json`의 `app_uuid`를 변경할 필요가 없음에 유의하세요.

### 템플릿에서 앱 생성

1. [Datadog Developer Platform][4]으로 이동하여 **+New App**을 클릭합니다.

   각 통합 OAuth 클라이언트에 대해 앱을 생성해야 합니다. Datadog는 통합이 게시되면 이 앱을 통합과 연결합니다.

2. **Blank App**을 선택한 다음, 앱 이름을 추가합니다.
3. **생성**을 클릭합니다.
4. **기본 정보** 탭에서 상세 정보 보기에 표시된 필드를 작성합니다.
5. OAuth 클라이언트를 게시할 준비가 되면 **Mark Stable** 버튼을 클릭합니다.
6. **Save**을 클릭합니다.

### OAuth 클라이언트 생성

클라이언트는 애플리케이션 구성 요소로, 사용자가 Datadog 고객 데이터에 대한 애플리케이션 액세스 권한을 승인할 수 있도록 해줍니다. 액세스 권한을 확보하기 위해 클라이언트는 적절한 액세스 토큰을 필요로 합니다.

1. **Features**에서 **OAuth & Permissions** 탭으로 이동한 다음 **New Confidential OAuth Client**를 클릭합니다.

   통합용으로 생성한 OAuth 클라이언트는 **기밀 클라이언트**로, 클라이언트 ID와 클라이언트 시크릿을 제공합니다. 이 단계에서 생성한 클라이언트는 클라이언트의 비공개 버전이며, 해당 자격 증명은 테스팅용으로 사용할 수 있습니다. 아울러 이는 내부 조직 승인만 허용합니다. 이 클라이언트의 게시 버전을 생성하면, 모든 Datadog 조직에서 인증할 수 있는 새로운 자격 증명 세트를 받습니다.

   <div class="alert alert-info">해당 자격 증명은 클라이언트를 생성한 후에는 다시 표시되지 않으므로 안전한 곳에 저장해 두세요.</div>

2. 이름, 설명, 리디렉션 URI, 온보딩 URL과 같은 클라이언트 정보를 입력합니다.
3. 범위를 검색하고 **Requested** 열의 확인란을 선택하여 OAuth 클라이언트 범위를 설정합니다.

   범위는 앱이 고객 Datadog 계정에서 액세스할 수 있는 데이터 유형을 결정합니다. 범위를 결정하면 통합이 필요한 범위에 액세스하게 됩니다. 필요한 경우 나중에 더 추가할 수 있으므로 사용 사례에 필요한 범위를 최소로만 요청해야 합니다.

   Datadog에 데이터를 제출하려면 `api_keys_write` 범위를 선택해야 합니다. 비공개 범위로 통합 파트너에게만 승인되므로 사용자 대신 API 키를 생성할 수 있습니다. 이를 사용해 Datadog에 데이터를 전송합니다.

4. **변경 사항 저장**을 클릭합니다.
5. OAuth 클라이언트를 생성하고 범위를 할당한 후, 통합에 OAuth PKCE 프로토콜을 구현하고, 승인 코드 허용 흐름을 완성하고, OAuth를 통해 사용 가능한 엔드포인트를 활용해 통합 코드 작성을 시작할 수 있습니다.

   인증 코드 승인 플로에서 인증 코드를 수신하고 토큰을 새로 고친 다음, 코드를 액세스 토큰으로 교환합니다. 해당 토큰은 Datadog에서 가져오려는 데이터에 액세스하는 데 사용할 수 있습니다.

   Datadog를 사용해 OAuth 프로토콜을 구현하는 방법에 대한 자세한 정보는 [Datadog OAuth2][1]를 참조하세요. 통합을 빌드하고 게시하는 방법에 대한 자세한 정보는 [통합 개발자 설명서][5]를 참조하세요.

### OAuth 클라이언트 테스트

OAuth 프로토콜을 구현한 후에는, 사용 사례에 따라 데이터를 Datadog으로 전송하거나 Datadog에서 가져올 수 있는지 확인하기 위해 OAuth 클라이언트를 테스트하세요.

**참고**: 통합 타일이 게시될 때까지는 샌드박스 조직의 OAuth 클라이언트만 승인할 수 있습니다. 즉, 샌드박스 계정으로 데이터를 전송하거나 샌드박스 계정에서 데이터를 가져오는 것만 가능합니다.

OAuth 클라이언트를 테스트하려면 다음 단계를 완료하세요.

#### 권한이 제대로 작동하는지 테스트합니다.

기본 인증 절차를 진행할 때 오류가 발생하지 않는지 확인합니다.

   1. Developer Platform으로 이동하여 앱에서 Edit 아이콘을 클릭하고 **OAuth and Permissions** 탭을 엽니다.
   2. OAuth 클라이언트를 선택하고, 클라이언트 세부 정보 페이지에서 **Test Authorization** 버튼을 클릭합니다.
   3. 그러면 온보딩 URL로 이동하여 고객이 진행하는 인증 절차가 시작됩니다. 이 버튼을 클릭하면 `onboarding_url`로 리디렉션되는 과정에서 `domain` 파라미터가 제공됩니다.
   4. OAuth 흐름을 거쳐 통합을 승인합니다.

#### API 키를 생성합니다.

OAuth 클라이언트가 `api_keys_write` 범위를 요청한 경우, 요청 헤더에 토큰을 포함하여 `marketplace` 엔드포인트에 성공적으로 요청할 수 있는지 확인합니다. 자세한 내용은 [OAuth2 인증 엔드포인트 레퍼런스][20]를 참고하세요.

요청이 성공하면 API 키가 반환되며 [API Keys Management 페이지][10]에서 확인할 수 있습니다. 사용자를 대신하여 Datadog에 데이터를 제출하려면 이 키를 안전하게 저장해야 합니다. **최초 요청 응답 후에는 이 API 키 값에 다시 액세스할 수 없습니다.**

#### 여러 Datadog 사이트를 테스트합니다.

테스트 클라이언트로 다른 조직을 테스트할 수는 없지만, 클라이언트를 EU 샌드박스에 복사하고 권한을 부여하여 여러 [Datadog 사이트][8]에서 OAuth 클라이언트가 작동하는지 확인할 수 있습니다.
   1. 다른 사이트의 샌드박스 계정에 액세스할 수 없다면 `ecosystems@datadog.com`에 문의하세요.
   2. Developer Platform에서 생성한 앱으로 이동한 다음, **Documentation** 우측 Gear 아이콘을 클릭하고 **Export App Manifest**를 클릭하여 *기존* US1 Datadog 사이트의 조직에서 앱 매니페스트를 내보냅니다.
   3. EU 샌드박스 조직에서 Developer Platform으로 이동한 다음, 2단계의 앱 매니페스트를 가져옵니다.
   4. 앱 매니페스트를 가져온 다음 **OAuth & Permissions** 탭으로 이동하여 OAuth 클라이언트, 클라이언트 ID, 클라이언트 시크릿을 확인합니다. 이 자격 증명을 사용해 OAuth 구현을 업데이트합니다.
   5. **Test Authorization** 버튼으로 이동하여 클릭하고 OAuth 플로를 완료합니다.

OAuth 클라이언트를 게시한 후에는 다른 조직에서 자유롭게 테스트할 수 있습니다.

##### 리전 간 지원

모든 Datadog 리전의 사용자에게 OAuth를 적용하려면 사용자 리전에 따라 올바른 API 호출을 수행해야 합니다. 사용자가 Datadog 타일에서 인증을 시작하면, 온보딩 URL에서 리디렉션될 때 사이트 파라미터가 전달됩니다. 이 파라미터를 이용해 인증 및 토큰 엔드포인트에 요청을 보냅니다.

사용자가 플랫폼에서 직접 인증을 시작하는 경우 이 사이트 파라미터는 전송되지 않고 대신 사용자에게 Datadog 인증 페이지에서 사이트를 선택하라는 메시지가 표시됩니다.

Datadog API에 사용자 리전과 일치하는 테스트 호출을 하세요. 예를 들어 US는 `https://trace.browser-intake-datadoghq.com`, EU는 `https://public-trace-http-intake.logs.datadoghq.eu` 입니다.

Datadog 사이트에 따라 목적지 목록을 확인하려면 [Network traffic][19] 페이지로 이동하여 오른쪽에 있는 **DATADOG SITE** 선택기를 사용하고 리전을 전환하세요.

### 모든 범위의 데이터 흐름 확인

요청한 각 범위에 대해 데이터를 보내고, 가져오고, 편집할 수 있는지 확인합니다.

### OAuth 클라이언트 게시

#### 풀 요청 생성 또는 업데이트
OAuth 클라이언트를 게시하려면, 아직 풀 요청을 열지 않은 경우, 먼저 [`integrations-extras`][5] 또는 [Marketplace][6] GitHub 리포지토리 중 하나에서 통합에 대한 풀 요청을 열어야 합니다.

풀 요청의 일환으로 다음 단계를 완료합니다.

1. README 파일에 다음 지침(추가하려는 사용자 지정 지침도 포함)이 포함된 `## Setup`의 `## Uninstallation` 섹션을 업데이트하세요.

   - 이 통합이 삭제되면 이전 승인이 철회됩니다.
   - 추가적으로, [API 키 페이지][10]에서 통합 이름을 검색하여 이 통합과 연결된 모든 API 키가 비활성화됩니다.

2. `manifest.json` 파일을 업데이트하여 새로운 `## Uninstallation` 섹션을 참조하도록 합니다. 해당 참조는 지원 필드 바로 아래에 표시되어야 합니다.

   ```
   "support": "README.md#Support",
   "uninstallation": "README.md#Uninstallation",
   ```

#### Developer Platform에서 게시 프로세스 시작

[Developer Platform][4]에서 다음에 따라 게시 프로세스를 시작합니다.

1. **General**의 **Publishing** 탭으로 이동하여 **Next: Send App Details to Datadog**을 클릭합니다. 탭 상단에서 게시된 클라이언트 ID와 시크릿을 확인할 수 있습니다. 해당 클라이언트 자격 증명을 포함하도록 OAuth 구현을 업데이트합니다. **참고:** 클라이언트 ID와 클라이언트 시크릿을 안전한 곳에 저장하세요. 이 정보는 다시 표시되지 않습니다.

2. Integration Publishing 섹션에서 단계에 따라 풀 요청에 OAuth 클라이언트 정보를 추가합니다. 여기에는 `manifest.json` 파일을 업데이트하고 `assets` 디렉터리에 파일을 추가하는 것이 포함됩니다.

3. 해당 필드에 GitHub 디렉터리 또는 풀 요청 링크를 추가합니다.
4. **Finish & Send**를 클릭합니다.

OAuth 클라이언트가 게시를 위해 제출되면 팀에 알림이 전송됩니다. 모든 필요 당사자가 풀 요청을 승인 및 병합할 준비가 되면, 그 시점에 OAuth 클라이언트도 게시됩니다. 통합 타일이 샌드박스 계정에 게시되며(모든 고객에게 적용되는 것은 아님), OAuth 클라이언트는 샌드박스 조직뿐 아니라 모든 Datadog 조직에서 권한을 받을 수 있습니다.

이 시점에서 OAuth 클라이언트를 사용해 최종 테스트를 수행하여 인증이 원활하게 작동하는지 확인하는 것이 좋습니다.

#### 클라이언트를 게시를 위해 제출한 후 변경 사항 적용

게시된 OAuth 클라이언트를 직접 편집할 수 없습니다. 그러므로 모든 항목이 테스트가 완료되어 게시 가능할 때에만 게시 플로를 시작합니다. 게시를 위해 OAuth 클라이언트를 제출한 뒤에 이를 업데이트하려면, 게시 플로를 다시 반복하고 다시 제출해야 합니다. **게시된 클라이언트 자격 증명은 다시 표시되지 않습니다.**

통합 타일을 게시하고 풀 요청을 생성하는 방법에 관한 자세한 내용은 [Marketplace 및 통합 문서][7]를 참조하세요.

## 트러블슈팅

### API 범위 목록에는 메트릭, 이벤트, 로그 전송이 포함되지 않음

Datadog에 데이터를 전송하려면 사용자를 대신하여 API 키를 생성할 때`api_keys_write` 범위를 사용하세요. 자세한 내용은 [API 키 생성](#create-an-api-key)을 참고하세요.


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

### AP 요청

특정 엔드포인트로 API 호출을 시도했는데 forbidden 오류가 발생하고, 해당 엔드포인트에 필요한 권한을 이미 활성화했다면, API 키, 세션, 또는 OAuth 토큰이 잘못되었거나 만료되었을 가능성이 있습니다.

#### API 키 및 토큰 만료

새로 고침 토큰은 사용자가 권한을 취소하거나 파트너가 토큰을 취소하지 않는 한 만료되지 않습니다. 파트너가 토큰을 취소하면 사용자는 통합을 재승인하여 새로운 새로 고침 및 액세스 토큰을 생성해야 합니다. 자세한 내용은 [OAuth2 인증 엔드포인트 레퍼런스][13]를 참고하세요.

#### 파트너 샌드박스 계정에서 API 키 검색

[api_keys/marketplace][14] 엔드포인트를 사용하여 키를 생성하면 키가 응답으로 반환됩니다. 키는 다시 생성하거나 확인할 수 없습니다. 지속적인 데이터 전송을 위해 키를 안전하게 보관해야 하며, 분실한 경우 다음 단계를 따라 키를 해지하고 다시 생성하세요.

1. [Datadog API Keys Management 페이지[15]로 이동합니다.
1. `OAuth Client API Key`라는 API 키를 찾아 선택합니다.
1. **Revoke**를 클릭하여 API 키를 비활성화합니다.
1. [API 키 생성](#create-an-api-key)의 단계에 따라 새 키를 만듭니다.
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

### 클라이언트 시크릿 재발급 및 시크릿 교체

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