---
title: Teams
---

## 개요
Datadog Teams를 이용해 Datadog 내에서 사용자 그룹의 팀 자산을 구성하고, Datadog 전반에 걸친 경험을 자동으로 필터링해 자산의 우선 순위를 지정할 수 있습니다.

Teams를 사용해 대시보드, 서비스, 모니터, 인시던트 등의 리소스를 사용자 그룹에 연결할 수 있습니다. Slack 채널, Jira 보드, GitHub 저장소 등에 팀별 링크를 추가할 수도 있습니다.

누구나 Teams 멤버가 될 수 있습니다. 사용자가 직접 팀에 가입할 수도 있고, 다른 구성원이 추가할 수도 있으며, 관리자가 추가할 수도 있습니다. 사용자는 여러 팀에 속할 수 있습니다.

## 설정

### 탐색

[Organization Settings][1]에서 또는 [**Service Management > Teams**][2]로 이동하여 팀 디렉터리 페이지에 액세스합니다. [팀 디렉터리 페이지][1]에는 조직 내의 모든 팀이 나열됩니다.

### 팀 생성

1. [팀 디렉터리 페이지][1] 오른쪽 상단에 있는 **New Team**을 클릭합니다.
1. **Team Name**을 선택합니다.
1. **Handle**은 사용자의 팀 이름을 기준으로 자동으로 채워집니다.
1. **Description**은 선택 사항으로, 자세한 설명을 넣을 수 있습니다.
1. 드롭다운 메뉴를 사용하여 팀 구성원을 선택합니다.
1. **생성**을 클릭합니다.

**참고:** 팀 이름과 팀 핸들에 허용되는 문자는 `a-z`, `A-Z`, `0-9` 및 `._-:/`입니다. 공백을 밑줄로 바꾸세요.

### 팀 수정

1. [팀 디렉터리 페이지][1]에서 수정하려는 팀을 클릭합니다.
1. 화면 상단의 **Settings** 톱니바퀴를 클릭하면 팝업 창이 나타납니다.
1. 수정하려는 항목을 선택합니다.
1. 수정 후 **Save**를 클릭합니다.

### 프로비저닝 소스 선택

관리자와 팀 관리자가 팀 구성원 자격을 업데이트하는 방법에는 세 가지 옵션이 있습니다.

UI 및 API
: UI 작업 및 API 호출을 통해서만 구성원 자격 업데이트

SAML
: *엄격한 SAML* 모델을 사용해 ID 공급자 데이터가 팀 구성원 자격을 결정

모든 소스
: SAML을 시작점으로 사용하고 UI 및 API를 통해 재정의 허용

1. [팀 디렉터리 페이지][1]에서 **Teams Settings**를 클릭합니다.
1. **Team Provisioning Sources**에서 옵션 하나를 선택합니다.

기존 구성원이 포함된 팀이 있는 경우 SAML strict 옵션을 선택하면 설정이 재정의되고 해당 팀에서 팀 구성원이 제거됩니다. 모든 소스 옵션을 선택하면 기존 멤버십이 유지됩니다. SAML 속성을 사용하여 팀 및 팀 멤버십을 관리하려면 [SAML 속성을 Teams에 매핑][3]을 참조하세요.

## 팀 핸들

팀 핸들은 팀을 Datadog 리소스에 연결합니다. 팀 핸들은 검색창과 패싯에 `team:<team-handle>`이나 `teams:<team-handle>`의 형식으로 나타납니다.

팀 핸들 찾는 방법:
1. 팀 디렉터리 페이지에서 팀 이름을 클릭합니다. 측면 패널에 팀 상세 정보가 나타납니다.
1. 패널 상단에 있는 **handle** 필드를 찾습니다.

리소스를 정의된 팀과 연결하려면 팀과 해당 팀에 맞는 팀 핸들이 Datadog에 있어야 합니다. 정의된 팀과 연결된 리소스를 클릭하면 팀 핸들과 추가 정보가 있는 작은 창이 나타납니다. 정의된 팀에서 팀 필터와 같은 추가 기능을 이용할 수 있습니다.

Datadog에서 정의된 팀과 연결되지 않은 팀 핸들은 태그와 유사하게 처리됩니다. Teams 기능을 이용하려면 정의되지 않은 팀 핸들을 정의된 팀으로 변환하세요.

### 팀 핸들에 리소스 연결

Datadog에서는 다음 리소스를 팀 핸들과 연결할 수 있도록 지원합니다.

- [대시보드][4]
- [인시던트][5]
- [모니터][6]
- [리소스 카탈로그][7]
- [서비스 카탈로그][8]
- [서비스 수준 목표(Service Level Objectives)][9]
- 신서틱 테스트, 전역 변수, 프라이빗 위치

### 특정 커뮤니케이션 채널에 알림 보내기

Slack 또는 Microsoft Teams와 같은 커뮤니케이션 채널로 알림을 라우팅하려면 팀에 알림 채널을 추가하세요.  `@team-<handle>`을 대상으로 하는 모니터 알림이 선택한 채널로 리디렉션됩니다.

1. [팀 디렉터리 페이지][1]에서 수정하려는 팀을 클릭합니다.
1. 화면 상단의 **Settings** 톱니바퀴를 클릭하면 팝업 창이 나타납니다.
1. **Notifications**를 선택합니다.
1. 채널을 추가한 후 **Save**를 클릭합니다.

## 필터

팀 필터를 이용해 Datadog 전반에 걸친 사용자 경험을 팀과 관련된 내용에 맞춰 조정할 수 있습니다.

팀 필터는 각 목록 보기의 두 곳에 나타납니다.
- 왼쪽 상단에 있는 검색 패싯 목록
- 검색 표시줄의 검색어


사용자가 팀 필터를 활성화하면 팀과 연관된 리소스나 팀이 소유한 서비스만 볼 수 있습니다. 팀 필터 상태는 전역적이고 지속적이기 때문에 해당 제품과 관련한 사용자의 탐색 과정에서 팀 컨텍스트를 유지합니다.

아래 표에서는 팀 필터를 사용할 수 있는 제품을 설명합니다.

| 제품 목록 페이지       | 필터 기준                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [대시보드][10]         | 팀 핸들                                                                      |
| [리소스 카탈로그][7]   | 팀 핸들                                                                      |
| [서비스 카탈로그][11]    | 팀 핸들                                                                      |
| [인시던트][12]          | 팀 핸들                                                                      |
| [모니터][13]          | 팀 핸들                                                                      |
| [APM 오류 추적][14] | 팀이 소유한 서비스([서비스 카탈로그][11] 내 소유권으로 결정) |
| [로그 오류 추적][15] | 팀이 소유한 서비스([서비스 카탈로그][11] 내 소유권으로 결정) |
| [서비스 수준 목표(Service Level Objectives)][16] | 팀 핸들                                                                 |
| [데이터 스트림 모니터링][17]  | 팀 핸들                                                                 |
| [신서틱(Synthetic) 테스트][18]          | 팀 핸들                                                                 |
| [노트북][19]          | 팀 핸들                                                                      |



## 권한

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

SAML 속성을 사용해 팀과 팀 멤버십을 관리하려면 [SAML 속성을 Teams에 매핑][3]을 참고하세요.

### 팀 관리 권한 위임

열린 구성원 모델의 경우 **Anyone in the organization**을 추가하거나 삭제할 수 있도록 기본 팀 설정을 설정하고, 사용자가 팀을 만들거나 팀 세부 사항을 편집할 수 있도록 해당 역할에 `teams_manage` 권한을 할당합니다.

팀 중심의 구성원 모델을 선호하는 경우, **Team Managers** 또는 **Team Managers and Members**가 구성원을 추가 또는 삭제할 수 있도록 기본 팀 설정을 설정합니다. 모든 팀 매니저가 포함된 역할에 `teams_manage` 권한을 할당합니다.

엄격한 구성원 자격 모델을 적용하려면 **user_access_manage** 권한이 있는 사용자만 구성원을 추가하거나 제거할 수 있도록 기본 팀 설정을 설정합니다. 조직 관리자에게만 `teams_manage` 권한을 할당합니다.


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /ko/account_management/saml/mapping/#map-saml-attributes-to-teams
[4]: /ko/dashboards/#dashboard-details
[5]: /ko/service_management/incident_management/incident_details#overview-section
[6]: /ko/monitors/configuration/?tab=thresholdalert#add-metadata
[7]: /ko/infrastructure/resource_catalog/
[8]: /ko/tracing/service_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[9]: /ko/service_management/service_level_objectives/#slo-tags
[10]: https://app.datadoghq.com/dashboard/lists
[11]: https://app.datadoghq.com/services
[12]: https://app.datadoghq.com/incidents
[13]: https://app.datadoghq.com/monitors/manage
[14]: https://app.datadoghq.com/apm/error-tracking
[15]: https://app.datadoghq.com/logs/error-tracking
[16]: https://app.datadoghq.com/slo/manage
[17]: https://app.datadoghq.com/data-streams
[18]: https://app.datadoghq.com/synthetics
[19]: https://app.datadoghq.com/notebook/list/