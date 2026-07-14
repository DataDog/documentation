---
description: 팀 핸들, 알림 및 리소스 연결을 사용하여 팀 자산을 구성하고, Datadog 환경을 필터링하며, 팀 멤버십을 관리합니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: 블로그
  text: Datadog의 Teams GitHub 통합으로 서비스 소유권을 최신 상태로 유지하기
title: Teams
---
## 개요 {#overview}
Datadog Teams를 사용하면 사용자 그룹이 Datadog 내에서 팀 자산을 구성하고, 해당 자산을 우선적으로 표시하도록 Datadog 전반의 사용 환경을 자동으로 필터링할 수 있습니다.

Teams를 사용하여 대시보드, 서비스, 모니터, 인시던트 등의 리소스를 사용자 그룹과 연결할 수 있습니다. 또한 Slack 채널, Jira 보드, GitHub 리포지토리 등 팀 전용 링크를 추가할 수도 있습니다.

팀 멤버십은 유연하게 관리할 수 있습니다. 사용자는 직접 팀에 가입하거나, 다른 팀원이 추가하거나, 관리자가 추가할 수 있습니다. 사용자는 여러 팀에 동시에 속할 수 있습니다.

## 설정 {#setup}

### 탐색 {#navigation}

[Organization Settings][1] 또는 [**Teams**][2]로 이동하여 팀 디렉터리 페이지에 접근할 수 있습니다. [팀 디렉터리 페이지][1]에는 조직 내 모든 팀이 나열됩니다.

### 팀 생성 {#create-team}

1. [팀 디렉터리 페이지][1]에서 오른쪽 상단의 {{< ui >}}New Team{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Team Name{{< /ui >}}을 선택합니다..
1. {{< ui >}}Handle{{< /ui >}}은 팀 이름을 기반으로 자동으로 채워집니다.
1. 드롭다운 메뉴를 사용하여 팀 구성원과 팀 관리자를 선택합니다.
1. 선택 사항인 {{< ui >}}Description{{< /ui >}}을 입력합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

**참고**: 

- 팀 이름에 사용할 수 있는 문자는 `a-z`, `A-Z`, `0-9`, `._-:/`입니다. 공백은 밑줄(_)로 대체합니다. 
- 팀 핸들에 사용할 수 있는 문자는 `a-z`, `0-9`, `._-:/`입니다. 마지막 문자는 밑줄(_)이 될 수 없습니다.

### 팀 수정 {#modify-team}

1. [팀 디렉터리 페이지][1]에서 수정할 팀을 클릭합니다. [팀 세부 정보 페이지][3]가 나타납니다. 
1. 화면 상단의 {{< ui >}}Settings{{< /ui >}} 톱니바퀴 아이콘을 클릭합니다. 팝업 창이 나타납니다.
1. 수정할 항목을 선택합니다.
1. 변경 내용을 적용한 후 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 프로비저닝 소스 선택하기 {#choose-provisioning-source}

관리자와 팀 관리자가 팀 멤버십을 업데이트하는 방법을 결정하기 위해 다음 세 가지 옵션 중 하나를 선택합니다.

UI 및 API
: UI 작업 및 API 호출을 통해서만 멤버십 업데이트

SAML
: *SAML strict* 모델을 사용하여 ID 공급자 데이터가 팀 멤버십을 결정하도록 합니다.

모든 소스
: SAML을 기본값으로 사용하면서 UI 및 API를 통한 변경도 허용합니다.

1. [팀 디렉터리 페이지][1]에서 {{< ui >}}Teams Settings{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Team Provisioning Sources{{< /ui >}} 아래에서 원하는 옵션을 선택합니다.

기존 구성원이 있는 팀에서 SAML strict 옵션을 선택하면 현재 설정이 덮어써지고 해당 팀의 구성원이 제거됩니다. 모든 소스 옵션을 선택하면 기존 멤버십이 유지됩니다. SAML 속성을 사용해 팀과 팀 멤버십을 관리하려면 [SAML 속성을 Teams에 매핑][4]을 참조하세요.

## 팀 핸들 {#team-handle}

팀 핸들은 팀을 Datadog 리소스와 연결합니다. 팀 핸들은 검색창과 패싯에 `team:<team-handle>` 또는 `teams:<team-handle>` 형식으로 표시됩니다. 

팀 핸들을 찾으려면 다음 단계를 수행합니다.
1.  팀 디렉터리 페이지에서 팀 이름을 클릭합니다. 팀 세부 정보 페이지가 표시됩니다.
1. 페이지 상단에서 이름 오른쪽에 팀 핸들이 나타납니다.

리소스를 정의된 팀과 연결하려면 Datadog에 동일한 팀 핸들을 가진 Team이 존재해야 합니다. 정의된 팀과 연결된 리소스를 클릭하면 팀 핸들과 추가 정보가 포함된 작은 창이 표시됩니다. 정의된 팀은 아래의 Team 필터와 같은 추가 기능을 제공합니다. 

Datadog에서 정의된 팀과 연결되지 않은 팀 핸들은 태그와 유사하게 동작합니다. Teams 기능을 활용하려면 정의되지 않은 팀 핸들을 정의된 팀으로 변환하세요.

### 리소스를 팀 핸들과 연결 {#associate-resources-with-team-handles}

Datadog은 다음 리소스를 팀 핸들과 연결할 수 있도록 지원합니다.

- [Dashboards][5]
- [Incidents][6]
- [Monitors][7]
- [Resource Catalog][8]
- [Software Catalog][9]
- [Service Level Objectives][10]
- Synthetic 테스트, 전역 변수, Private Location

### 특정 커뮤니케이션 채널로 알림 보내기 {#send-notifications-to-a-specific-communication-channel}

Slack 또는 Microsoft Teams와 같은 커뮤니케이션 채널로 경보를 전달할 수 있도록 Team에 알림 채널을 추가합니다. `@team-<handle>`을 대상으로 하는 모니터 경보는 선택한 채널로 리디렉션됩니다. 

1. [팀 디렉터리 페이지][1]에서 수정할 팀을 클릭합니다. 
1. 화면 상단의 {{< ui >}}Settings{{< /ui >}} 톱니바퀴 아이콘을 클릭합니다. 팝업 창이 나타납니다.
1. {{< ui >}}Notifications{{< /ui >}}를 선택합니다.
1. 채널을 추가한 후 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 팀 필터 {#team-filter}

팀 필터는 팀과 연결된 콘텐츠만 표시하여 Datadog 전반의 사용 환경을 사용자 맞춤형으로 제공합니다. {{< ui >}}My Teams{{< /ui >}} 목록에는 사용자가 속한 팀과 즐겨찾기로 지정한 팀이 포함됩니다.

{{< img src="/account_management/teams/team-filter.png" alt="팀 필터를 빨간색 상자로 표시한 모니터 목록 페이지. 세 개의 My Teams 중 두 개가 선택된 상태.">}}

팀 필터를 활성화하면 사용자의 팀 또는 사용자의 팀이 소유한 서비스와 연결된 리소스만 표시됩니다. 팀 필터 상태는 전역적이며 지속적으로 유지되므로, Datadog은 서로 다른 제품 간을 이동하더라도 사용자의 팀 컨텍스트를 계속 적용합니다.

팀 필터는 검색 쿼리에 팀 기반 검색어를 추가하는 방식으로 동작합니다. 팀 필터를 활성화하면 검색창에서 추가된 팀 기반 검색어를 확인할 수 있습니다.

### 즐겨찾기 팀 {#favorite-teams}

특정 팀의 구성원이 아니더라도 해당 팀의 리소스에 관심이 있을 수 있습니다. 팀을 즐겨찾기에 추가하면 팀에 가입하지 않고도 해당 팀의 리소스에 대해 필터링된 보기를 사용할 수 있습니다.

즐겨찾기 팀은 팀 디렉터리 페이지 상단과 팀 필터에 사용자가 속한 팀과 함께 표시됩니다.

#### 즐겨찾기 팀 추가 또는 제거 {#add-or-remove-favorite-teams}

팀 디렉터리 페이지 또는 팀 필터에서 팀을 즐겨찾기에 추가하거나 제거할 수 있습니다.

[팀 디렉터리 페이지][1]에서:
1. 즐겨찾기에 추가할 팀을 클릭합니다. [팀 세부 정보 페이지][3]가 나타납니다.
1. 오른쪽 상단의 {{< ui >}}Add Favorite{{< /ui >}} 또는 {{< ui >}}Remove Favorite{{< /ui >}}을 클릭합니다.

또는 팀 디렉터리 페이지에서:
1. 추가하거나 제거하려는 팀 위에 마우스를 올립니다. 팀 이름 오른쪽에 인라인 아이콘이 나타납니다.
1. 별표 아이콘({{< ui >}}Add to Favorites{{< /ui >}} 또는 {{< ui >}}Remove from Favorites{{< /ui >}})을 클릭합니다.

팀 필터에서:
1. 필터가 접혀 있는 경우 {{< ui >}}My Teams{{< /ui >}}를 클릭하여 펼칩니다.
1. {{< ui >}}Add Favorites{{< /ui >}}를 클릭합니다. 검색 상자와 팀 목록이 나타납니다.
1. 팀 목록을 좁히려면 검색 상자에 팀 이름을 입력하기 시작합니다.
1. 원하는 팀 옆의 별표를 클릭하여 즐겨찾기에 추가하거나 제거합니다.

### 지원되는 제품 {#supported-products}

다음 표는 팀 필터를 사용할 수 있는 제품을 설명합니다.

| 제품 목록 페이지              | 필터 기준                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | 팀이 소유한 서비스(소유권은 [Software Catalog][12]에서 결정) |
| [Apps][21]                     | 팀 핸들                                                                        |
| [Case Management projects][22] | 팀 핸들                                                                        |
| [Connections][23]              | 팀 핸들                                                                        |
| [Connection Groups][24]        | 팀 핸들                                                                        |
| [Cross Org Connections][25]    | 팀 핸들                                                                        |
| [Datastore][26]               | 팀 핸들                                                                        |
| [Data Streams Monitoring][18]  | 팀 핸들                                                                        |
| [Dashboards][11]               | 팀 핸들                                                                        |
| [Incidents][13]                | 팀 핸들                                                                        |
| [Integrations][27]             | 팀 핸들                                                                        |
| [Logs Error Tracking][16]      | 팀이 소유한 서비스([Software Catalog][12] 내 소유권으로 결정) |
| [Logs Pipelines][28]           | 팀 핸들                                                                        |
| [Monitors][14]                 | 팀 핸들                                                                        |
| [Notebooks][20]                | 팀 핸들                                                                        |
| [Observability Pipelines][29]  | 팀 핸들                                                                        |
| [On-Call][30]                  | 팀이 소유한 서비스(소유권은 [Software Catalog][12]에서 결정) |
| [Powerpacks][32]               | 팀 핸들                                                                        |
| [Private Action Runner][31]    | 팀 핸들                                                                        |
| [Reference tables][33]         | 팀 핸들                                                                        |
| [Resource Catalog][8]          | 팀 핸들                                                                        |
| [RUM apps][34]                 | 팀 핸들                                                                        |
| [Security rules][35]           | 팀 핸들                                                                        |
| [Security suppressions][36]    | 팀 핸들                                                                        |
| [Service Level Objectives][17] | 팀 핸들                                                                        |
| [Sheets][37]                   | 팀 핸들                                                                        |
| [Software Catalog][12]         | 팀 핸들                                                                        |
| [Synthetic 테스트][19]          | 팀 핸들                                                                        |
| [Workflows][38]                | 팀 핸들                                                                        |


## 권한 {#permissions}

Teams Manage 권한이 있는 역할의 모든 사용자는 팀 생성, 팀 이름 변경, 팀 삭제 및 팀 핸들 변경을 수행할 수 있습니다. `user_access_manage` 권한이 있는 사용자는 팀 구성원 및 관리자를 추가, 제거 및 승격할 수 있습니다.

## 팀 관리 {#manage-teams}

팀을 사용자 지정하려면 [팀 관리][3]를 참조하세요.


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /ko/account_management/teams/manage/
[4]: /ko/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /ko/dashboards/#dashboard-details
[6]: /ko/incident_response/incident_management/
[7]: /ko/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /ko/tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[10]: /ko/service_level_objectives/#slo-tags
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://app.datadoghq.com/services
[13]: https://app.datadoghq.com/incidents
[14]: https://app.datadoghq.com/monitors/manage
[15]: https://app.datadoghq.com/apm/error-tracking
[16]: https://app.datadoghq.com/logs/error-tracking
[17]: https://app.datadoghq.com/slo/manage
[18]: https://app.datadoghq.com/data-streams
[19]: https://app.datadoghq.com/synthetics
[20]: https://app.datadoghq.com/notebook/list/
[21]: https://app.datadoghq.com/app-builder/apps/list
[22]: https://app.datadoghq.com/cases
[23]: https://app.datadoghq.com/actions/connections
[24]: https://app.datadoghq.com/actions/connections?sort=-updated_at&tab=groups
[25]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[26]: https://app.datadoghq.com/actions/datastores
[27]: https://app.datadoghq.com/integrations
[28]: https://app.datadoghq.com/logs/pipelines
[29]: https://app.datadoghq.com/observability-pipelines
[30]: https://app.datadoghq.com/on-call/summary
[31]: https://app.datadoghq.com/actions/private-action-runners
[32]: /ko/dashboards/widgets/powerpack/#powerpack-permissions
[33]: https://app.datadoghq.com/reference-tables
[34]: https://app.datadoghq.com/rum/list
[35]: https://app.datadoghq.com/security/configuration/notification-rules
[36]: https://app.datadoghq.com/security/configuration/suppressions
[37]: https://app.datadoghq.com/sheets
[38]: https://app.datadoghq.com/workflow