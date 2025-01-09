---
aliases:
- /ko/developers/integrations/oauth_for_data_integrations/
description: OAuth를 사용하여 통합을 인증합니다.
title: 통합을 위한 OAuth
---
{{< callout btn_hidden="true" >}}
   Datadog Developer Platform은 베타 버전입니다. 액세스할 수 없는 경우 apps@datadoghq.com으로 문의하세요.
{{< /callout >}} 

## 개요

OAuth를 통해 사용자는 특정 범위의 사용자 Datadog 데이터에 액세하여 타사 통합을 승인할 수 있습니다. 이 권한으로 통합을 통해 Datadog에 데이터를 푸시하고 Datadog에서 데이터를 가져올 수 있습니다. 예를 들어, 사용자가 Datadog 모니터링에 대한 읽기 액세스를 위해 통합을 승인하면 통합은 모니터 데이터를 직접 읽고 추출할 수 있습니다.

Datadog의 OAuth 구현에 대한 자세한 내용은 [Datadog OAuth2 설명서][1]를 참조하세요.

## 통합에서 OAuth 사용

OAuth를 통해 Datadog 고객은 어디에서나 API 또는 앱 키를 직접 입력할 필요 없이 몇 번의 클릭만으로 쉽고 안전하게 타사 플랫폼을 인증할 수 있습니다. 기존 통합과 함께 OAuth를 사용하거나 새로운 통합 개발의 일부로 OAuth를 설정할 수 있습니다.

OAuth와의 통합을 구축할 때 애플리케이션이 액세스해야 하는 정확한 데이터 범위를 선택할 수 있으며, 고객은 요청한 세부 범위에 대한 액세스를 허용할 수 있습니다. 선택적 범위는 지원되지 않지만 통합에서 요청한 모든 범위는 고객이 승인할 때 액세스할 수 있습니다.

## OAuth를 포함하는 통합 빌드

이 섹션에서는 [마켓플레이스][2] 또는 [통합][3] 페이지의 타일을 사용하여 새 통합을 작성하는 방법에 대해 설명합니다. 기존 통합을 기반으로 구축하거나 새 통합을 구축하여 두 페이지 중 하나의 기존 타일에 추가하려는 경우 [기존 오퍼링에 OAuth 추가](#Adding-oauth-to-an-existing-offering)를 참조하세요.

### 템플릿에서 앱 생성

1. [Datadog Developer Platform][4]으로 이동한 후 **+New App**을 클릭합니다.

   각 통합 OAuth 클라이언트에 대해 앱을 생성해야 합니다. Datadog는 통합이 게시되면 이 앱을 통합과 연결합니다.

2. **Blank App**을 선택하고 앱 이름을 추가합니다.
3. **생성**을 클릭합니다.
4. **기본 정보** 탭에서 상세 정보 보기에 표시된 필드를 작성합니다.
5. OAuth 클라이언트를 게시할 준비가 되면 **Mark Stable** 버튼을 클릭합니다.
6. **Save**를 클릭합니다.

### OAuth 클라이언트 생성

클라이언트는 애플리케이션 구성 요소로, 사용자가 Datadog 고객 데이터에 대한 애플리케이션 액세스 권한을 승인할 수 있도록 해줍니다. 액세스 권한을 확보하기 위해 클라이언트는 적절한 액세스 토큰을 필요로 합니다.

1. **기능** 아래에서 **OAuth 및 권한** 탭으로 이동한 다음 **OAuth 클라이언트 생성**을 클릭합니다.

   통합을 위해 생성한 OAuth 클라이언트는 **기밀 클라이언트**로, 클라이언트 ID와 클라이언트 암호를 제공합니다. 이 단계에서 생성한 클라이언트는 클라이언트의 비공개 버전입니다. 해당 자격 증명은 테스팅을 통해 사용할 수 있습니다. 이 클라이언트의 게시된 버전이 생성되면 새로운 자격 증명을 받게 됩니다. **이러한 자격 증명은 클라이언트를 생성한 후 절대 다시 표시되지 않습니다. 안전한 위치에 보관해 두시기 바랍니다.**

2. 이름, 설명, 재접속 URI 및 온보딩 URL과 같은 클라이언트 정보를 입력합니다.
3. 범위를 검색하고 **Requested** 열에서 해당 체크박스를 선택하여 OAuth 클라이언트의 범위를 설정합니다.

   범위는 앱이 고객 Datadog 계정에서 액세스할 수 있는 데이터 유형을 결정합니다. 범위를 결정하면 통합이 필요한 범위에 액세스하게 됩니다. 필요한 경우 나중에 더 추가할 수 있으므로 사용 사례에 필요한 범위를 최소로만 요청해야 합니다.

   데이터를 Datadog에 제출하기 위해서는 `api_keys_write` 범위를 선택해야 합니다. 이는 통합 파트너에게만 승인되는 비공개 범위로 사용자를 대신하여 API 키를 생성할 수 있으며, 이를 통해 데이터를 Datadog에 전송할 수 있습니다.

4. **변경 사항 저장**을 클릭합니다.
5. OAuth 클라이언트를 생성하고 범위를 할당한 후, 통합에 OAuth PKCE 프로토콜을 구현하고, 승인 코드 허용 흐름을 완성하고, OAuth를 통해 사용 가능한 엔드포인트를 활용해 통합 코드 작성을 시작할 수 있습니다.

   인증 코드 부여 플로우에서 인증 코드와 새로 고침 토큰을 받은 다음 Datadog에서 가져올 데이터에 액세스하기 위해 사용할 액세스 토큰에 대한 코드를 교환합니다.

   Datadog를 사용해 OAuth 프로토콜을 구현하는 방법에 대한 자세한 정보는 [Datadog OAuth2][1]를 참조하세요. 통합을 빌드하고 게시하는 방법에 대한 자세한 정보는 [통합 개발자 설명서][5]를 참조하세요.

### OAuth 클라이언트 테스트

OAuth 프로토콜을 구현한 후에는 OAuth 클라이언트를 테스트하여 사용 사례에 따라 Datadog으로 데이터를 보내거나 데이터를 가져올 수 있는지 확인해야 합니다.

**참고**: 통합 타일이 게시되기 전까지 샌드박스 조직의 OAuth 클라이언트만 승인할 수 있습니다. 즉, 샌드박스 계정으로 데이터를 보내거나 샌드박스 계정에서 데이터를 가져올 수 있습니다.

OAuth 클라이언트를 테스트하려면 다음 단계를 완료합니다:

#### 인증이 제대로 작동하는지 테스트합니다.
기본 승인 플로우를 통과할 때 오류가 발생하지 않도록 합니다.

   1. Developer Platform으로 이동하여 앱에서 Edit 아이콘을 클릭하고 **OAuth and Permissions** 탭을 엽니다.
   2. OAuth 클라이언트를 선택하고, 클라이언트 세부 정보 페이지에서 **Test Authorization** 버튼을 클릭합니다.
   3. 그러면 온보딩 URL로 연결되고 고객이 수행하는 인증 플로우가 시작됩니다. 이 버튼을 클릭하면 `onboarding_url`로 리디렉션될 때 `domain` 파라미터가 제공됩니다.
   4. OAuth 플로우를 살펴보고 통합을 승인합니다.

#### API 키 만들기
OAuth 클라이언트가 `api_keys_write` 범위를 요청할 경우 요청 헤더에서 토큰을 사용해  `marketplace_create_api` 엔드포인트에 성공적으로 요청할 수 있는지 확인합니다.

이 요청이 성공하면 [API 키 관리 페이지][10]에서 찾을 수 있는 API 키를 반환합니다. 이 키를 안전하게 저장하여 사용자를 대신하여 Datadog에 데이터를 제출하는 데 사용해야 합니다. **초기 요청 응답 이후에는 이 API 키 값에 다시 액세스할 수 없습니다**.

#### 여러 Datadog 사이트 테스트
EU Datadog 샌드박스 조직에서 인증을 시작하여 OAuth 클라이언트가 여러 [Datadog 사이트][8]에서 작업할 수 있는지 테스트합니다.
   1. 다른 사이트에서 샌드박스 계정에 액세스할 수 없는 경우 `ecosystems@datadog.com`에 문의하세요.
   2. Developer Platform에서 생성한 앱으로 이동하여 **Documentation** 오른쪽에 있는 기어 아이콘을 클릭하고 **Export App Manifest**를 클릭하여 *원래* US1 Datadog 사이트의 조직에서 앱 매니페스트를 내보냅니다.
   3. EU 샌드박스 조직에서 Developer Platform으로 이동한 후 2단계에서 앱 매니페스트를 가져옵니다.
   4. 매니페스트를 성공적으로 가져온 후 **OAuth & Permissions** 탭으로 이동합니다. 그런 다음 클라이언트 ID 및 클라이언트 비밀번호를 사용해 OAuth 클라이언트를 찾습니다. 이러한 자격 증명을 사용하려면 OAuth 구현을 업데이트하세요.
   5. **Test Authorization** 버튼을 클릭한 후 OAuth 플로우를 진행합니다.

### 모든 범위에 대한 데이터 플로우 확인
요청한 각 범위에 대해 데이터를 보내거나, 데이터를 가져오거나, 데이터를 편집할 수 있는지 확인합니다.

### OAuth 클라이언트 게시

#### 풀 리퀘스트 생성 또는 업데이트
OAuth 클라이언트를 게시하려면 먼저 [`integrations-extras`][5] 또는 [Marketplace][6] GitHub 리포지토리에서 통합에 대한 풀 리퀘스트를 열어야 합니다.

풀 리퀘스트의 일부로 다음 단계를 완료합니다:

1. 다음 지침(추가하려는 모든 사용자 지정 지침과 함께)이 포함된 `## Setup` 아래 `## Uninstallation`섹션으로 README 파일을 업데이트하세요.
       - 통합을 제거하면 이전의 모든 권한이 취소됩니다. 
       - 또한 [API 키 페이지][10]에서 통합 이름을 검색하여 이 통합과 관련된 모든 API 키가 비활성화되어 있는지 확인합니다.
2. `manifest.json` 파일을 업데이트하여 새로운  `## Uninstallation` 섹션을 참조하세요. 이 참조는 지원 필드 바로 아래에 표시되어야 합니다:
       - ```
           "support": "README.md#Support",
           "uninstallation": "README.md#Uninstallation",
         ```

#### Developer Platform에서 게시 프로세스 시작

[Developer Platform][4]에서 게시 프로세스를 시작하려면:

1. **General** 아래의 **Publishing** 탭으로 이동합니다. 게시 흐름의 1단계에서는 게시된 클라이언트 ID와 비밀번호를 받습니다. 이러한 클라이언트 자격 증명을 포함하도록 OAuth 구현을 업데이트해야 합니다. **참고:** 클라이언트 ID와 클라이언트 비밀번호를 안전한 위치에 저장하세요. 이 정보는 다시 표시되지 않습니다.

2. 2단계에서는 통합에 대한 추가 정보를 입력하고 아래에서 사용할 수 있는 게시된 `app_uuid`를 확인할 수 있습니다.

3. `integrations-extras` 또는 `Marketplace`에서 **새 통합**에 대한 풀 리퀘스트를 열 때 `manifest.json` 파일 `app_uuid` 필드에서 2단계의 `app_uuid` 값을 사용합니다. `app_uuid` 값이 일치하지 않으면 애플리케이션이 올바르게 게시되지 않습니다. **기존 통합**이 있으면 `app_uuid`를 업데이트할 필요가 없습니다.

OAuth 클라이언트가 게시를 위해 제출되면 팀에 알림이 전송됩니다. 필수 당사자가 풀 리퀘스트를 승인하고 통합할 준비가 되면 OAuth 클라이언트도 게시됩니다. 그런 다음 통합 타일이 샌드박스 계정에 게시되고(모든 고객에게 해당되지는 _않음_) OAuth 클라이언트가 모든 Datadog 조직(샌드박스 조직뿐만 아니라)에서 승인을 받을 수 있습니다.

이 시점에서 Datadog은 OAuth 클라이언트와 최종 테스트를 수행하여 승인이 원활하게 작동하는지 확인할 것을 권장합니다.

#### 게시를 위해 클라이언트를 제출한 후 변경

게시된 OAuth 클라이언트는 직접 편집할 수 없으므로 모든 테스트와 준비가 완료된 후에만 게시 플로우를 진행하세요. 게시를 위해 제출된 OAuth 클라이언트를 업데이트를 하려면 게시 플로우를 다시 진행한 후 다시 제출해야 합니다. **게시된 클라이언트 자격 증명은 다시 표시되지 않습니다**.

통합 타일 게시 및 풀 리퀘스트 작성에 대한 자세한 내용은 [마켓플레이스 및 통합 설명서][7]를 참조하세요.

## 기존 제품에 OAuth 추가

OAuth 클라이언트를 기존 통합에 추가하는 프로세스는 위에 간략하게 설명된 프로세스와 비슷하지만 몇 가지 차이점이 있습니다.

### UI 확장에 연결되지 않은 기존 통합이 있는 경우

위의 [단계](#build-an-integration-with-oauth)를 따르고, 풀 리퀘스트를 열어 통합 타일에 새로운 제거 지침을 추가했는지 확인하세요.

기존 통합이 있는 경우 `manifest.json` 파일에서 `app_uuid`를 변경할 필요가 없습니다.

### UI 확장에 현재 연결된 기존 통합이 있는 경우(동일한 타일 공유)

앱을 생성하는 대신 개발자 플랫폼에서 게시된 UI 확장을 포함하는 앱으로 이동하여 남은 [단계](#create-an-oauth-client)를 따릅니다.

통합의 OAuth 클라이언트를 생성하고 게시할 준비가 되면 앱에서 **Edit**를 클릭하고 **General** 아래의 **Publishing** 탭으로 이동합니다. 타일에 새로운 제거 명령을 추가하려면 풀 리퀘스트도 열어야 합니다.

**참고**: 기존 통합이나 UI 확장이 있는 경우 `manifest.json` 파일에서 `app_uuid`를 변경할 필요가 없습니다.

### UI 확장을 게시하여 통합을 동일한 타일에 추가하려는 경우

앱을 생성하는 대신 Developer Platform에서 게시된 UI 확장을 포함하는 앱으로 이동하여 남은 [단계](#create-an-oauth-client)를 따르세요.

풀 리퀘스트를 열어 README, 이미지 폴더 등에 대한 업데이트를 포함하여 통합에 대한 추가 정보로 기존 타일을 업데이트합니다. 게시 프로세스 중에 이 풀 리퀘스트에 대한 링크를 추가합니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog의 OAuth 2.0][1]
- [OAuth를 사용해 Datadog 통합 승인][11]

[1]: https://docs.datadoghq.com/ko/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering/#list-an-offering
[8]: https://docs.datadoghq.com/ko/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://www.datadoghq.com/blog/oauth/