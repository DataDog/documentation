---
kind: 설명서
title: Teams
---

## 개요
Datadog Teams를 이용해 Datadog 내에서 사용자 그룹의 팀 자산을 구성하고, Datadog 전반에 걸친 경험을 자동으로 필터링해 자산의 우선 순위를 지정할 수 있습니다.

Teams를 사용해 대시보드, 서비스, 모니터, 인시던트 등의 리소스를 사용자 그룹에 연결할 수 있습니다. Slack 채널, Jira 보드, GitHub 저장소 등에 팀별 링크를 추가할 수도 있습니다.

누구나 Teams 멤버가 될 수 있습니다. 사용자가 직접 팀에 가입할 수도 있고, 다른 구성원이 추가할 수도 있으며, 관리자가 추가할 수도 있습니다. 사용자는 여러 팀에 속할 수 있습니다.

## 설정

### 탐색

[팀 디렉터리 페이지][1]를 찾으려면 다음을 따르세요.

1. 계정 메뉴에서 **Organization Settings**으로 이동합니다.
1. **Groups**에서 **Teams**를 선택합니다.

[팀 디렉터리 페이지][1]에는 조직 내 팀 목록이 모두 나타납니다. 오른쪽 상단에 있는 **Only My Teams** 슬라이더를 사용해 내 팀 보기와 조직 전체 팀 보기를 토글할 수 있습니다.

{{< img src="account_management/teams-directory.jpg" alt="Organization Settings 페이지, Teams 탭에 있는 패널에 캐싱 팀이 강조 표시됨. " >}}

### 팀 생성

1. [팀 디렉터리 페이지][1] 오른쪽 상단에 있는 **New Team**을 클릭합니다.
1. **Team Name**을 선택합니다.
1. **Handle**은 사용자의 팀 이름을 기준으로 자동으로 채워집니다.
1. **Description**은 선택 사항으로, 자세한 설명을 넣을 수 있습니다.
1. 드롭다운 메뉴를 사용하여 팀 구성원을 선택합니다.
1. **생성**을 클릭합니다.

### 팀 수정

1. [팀 디렉터리 페이지][1]에서 수정할 팀을 클릭합니다. 측면 패널에 팀 상세 정보가 나타납니다.
1. 수정할 항목 위에 마우스를 놓습니다. 연필 아이콘이 나타납니다.
1. 연필 아이콘을 클릭하면 팝업 창이 나타납니다.
1. 변경한 후 해당 버튼을 클릭하여 변경 내용을 저장합니다.

### 프로비저닝 소스 선택

관리자와 팀 관리자가 팀 구성원 자격을 업데이트하는 방법에는 세 가지 옵션이 있습니다.

UI 및 API
: UI 작업 및 API 호출을 통해서만 구성원 자격 업데이트

SAML
: *엄격한 SAML* 모델을 사용해 ID 공급자 데이터가 팀 구성원 자격을 결정

모든 소스
: SAML을 시작점으로 사용하고 UI 및 API를 통해 재정의 허용

1. [팀 디렉터리 페이지][1]에서 팀을 선택합니다. 측면 패널에 팀 상세 정보가 나타납니다.
1. **Settings**를 클릭합니다.
1. **Team Provisioning Sources**에서 옵션 하나를 선택합니다.

기존 구성원이 있는 팀이 있는 경우 엄격한 SAML 옵션을 선택하면 내 설정을 무시하고 해당 팀에서 팀 구성원이 제거됩니다. All Source 옵션을 선택하면 기존 구성원 자격이 유지됩니다. SAML 특성을 사용해 팀과 팀 구성원 자격을 관리하려면 [맵 SAML 특성을 팀에 연결][2]를 참고하세요.

## 팀 핸들

팀 핸들은 팀을 Datadog 리소스에 연결합니다. 팀 핸들은 검색창과 패싯에 `team:<team-handle>`이나 `teams:<team-handle>`의 형식으로 나타납니다.

팀 핸들 찾는 방법:
1. 팀 디렉터리 페이지에서 팀 이름을 클릭합니다. 측면 패널에 팀 상세 정보가 나타납니다.
1. 패널 상단에 있는 **handle** 필드를 찾습니다.

리소스를 정의된 팀과 연결하려면 팀과 해당 팀에 맞는 팀 핸들이 Datadog에 있어야 합니다. 정의된 팀과 연결된 리소스를 클릭하면 팀 핸들과 추가 정보가 있는 작은 창이 나타납니다. 정의된 팀에서 팀 필터와 같은 추가 기능을 이용할 수 있습니다.

Datadog에서 정의된 팀과 연결되지 않은 팀 핸들은 태그와 유사하게 처리됩니다. Teams 기능을 이용하려면 정의되지 않은 팀 핸들을 정의된 팀으로 변환하세요.

### 팀 핸들에 리소스 연결

Datadog에서는 다음 리소스를 팀 핸들과 연결할 수 있도록 지원합니다.

- [대시보드][3]
- [인시던트][4]
- [모니터][5]
- [리소스 카테고리][6]
- [서비스 카테고리][7]
- [서비스 수준 목표][8]
- 신서틱 테스트, 전역 변수, 프라이빗 위치

## 필터

팀 필터를 이용해 Datadog 전반에 걸친 사용자 경험을 팀과 관련된 내용에 맞춰 조정할 수 있습니다.

팀 필터는 각 목록 보기의 두 곳에 나타납니다.
- 왼쪽 상단에 있는 검색 패싯 목록
- 검색 표시줄의 검색어


사용자가 팀 필터를 활성화하면 팀과 연관된 리소스나 팀이 소유한 서비스만 볼 수 있습니다. 팀 필터 상태는 전역적이고 지속적이기 때문에 해당 제품과 관련한 사용자의 탐색 과정에서 팀 컨텍스트를 유지합니다.

아래 표에서는 팀 필터를 사용할 수 있는 제품을 설명합니다.

| 제품 목록 페이지       | 필터 기준                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [대시보드][9]         | 팀 핸들                                                                      |
| [카테고리 리소스][6]   | 팀 핸들                                                                      |
| [서비스 카테고리][10]    | 팀 핸들                                                                      |
| [인시던트][11]          | 팀 핸들                                                                      |
| [모니터][12]          | 팀 핸들                                                                      |
| [APM 오류 추적][13] | 팀이 소유한 서비스([서비스 카탈로그][10] 내의 소유권에 따라 결정) |
| [로그 오류 추적][14] | 팀이 소유한 서비스([서비스 카탈로그][10] 내의 소유권에 따라 결정) |
| [서비스 수준 목표][15] | 팀 핸들                                                                 |
| [데이터 스트림 모니터링][16]  | 팀 핸들                                                                 |
| [신서틱 테스트][17]          | 팀 핸들                                                                 |


## 권한 허용

팀 관리 권한이 있는 역할이 있는 사용자는 팀을 만들고, 팀 이름을 바꾸고, 팀을 삭제하고, 팀 핸들을 변경할 수 있으며, `user_access_manage` 권한이 있는 사용자는 팀 구성원과 관리자를 추가, 삭제, 승격할 수 있습니다.

## 팀 관리

### 팀 멤버십

팀의 구성원을 구분하려면 팀 매니저로 지정하고, 구성원 목록에서 팀 매니저의 이름 옆에 "TEAM MANAGER" 배지가 나타납니다.

팀 설정에서 팀 구성원 자격을 수정할 수 있는 사용자를 지정합니다. 다음 옵션을 사용할 수 있습니다.
- `user_access_manage` 권한을 가진 사용자에게만 적용
- 팀 관리자
- 팀 관리자 및 구성원
- 조직의 모든 구성원

`user_access_manage` 권한이 있는 사용자는 구성원을 추가하거나 삭제할 수 있는 기본 규칙을 설정하거나 팀 세부 정보를 편집할 수 있습니다. 팀 디렉터리 페이지의 **Default Settings** 버튼을 사용해 기본 규칙을 설정할 수 있습니다. 팀 세부 정보 패널에서 개별 팀에 관한 정책을 재정의할 수 있습니다.

### SAML 속성 매핑

SAML 속성을 사용해 팀과 팀 구성원 자격을 관리하려면 [Map SAML 속성을 팀에 매핑][2]을 참고하세요.

### 팀 관리 권한 위임

열린 구성원 모델의 경우 **Anyone in the organization**을 추가하거나 삭제할 수 있도록 기본 팀 설정을 설정하고, 사용자가 팀을 만들거나 팀 세부 사항을 편집할 수 있도록 해당 역할에 `teams_manage` 권한을 할당합니다.

팀 중심의 구성원 모델을 선호하는 경우, **Team Managers** 또는 **Team Managers and Members**가 구성원을 추가 또는 삭제할 수 있도록 기본 팀 설정을 설정합니다. 모든 팀 매니저가 포함된 역할에 `teams_manage` 권한을 할당합니다.

엄격한 구성원 자격 모델을 적용하려면 **user_access_manage** 권한이 있는 사용자만 구성원을 추가하거나 제거할 수 있도록 기본 팀 설정을 설정합니다. 조직 관리자에게만 `teams_manage` 권한을 할당합니다.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /ko/account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /ko/dashboards/#edit-details
[4]: /ko/service_management/incident_management/incident_details#overview-section
[5]: /ko/monitors/configuration/?tab=thresholdalert#add-metadata
[6]: /ko/security/misconfigurations/resource_catalog
[7]: /ko/tracing/service_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[8]: /ko/service_management/service_level_objectives/#slo-tags
[9]: https://app.datadoghq.com/dashboard/lists
[10]: https://app.datadoghq.com/services
[11]: https://app.datadoghq.com/incidents
[12]: https://app.datadoghq.com/monitors/manage
[13]: https://app.datadoghq.com/apm/error-tracking
[14]: https://app.datadoghq.com/logs/error-tracking
[15]: https://app.datadoghq.com/slo/manage
[16]: https://app.datadoghq.com/data-streams
[17]: https://app.datadoghq.com/synthetics