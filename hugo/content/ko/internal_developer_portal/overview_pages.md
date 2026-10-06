---
aliases:
- /ko/software_catalog/overview_pages
description: Internal Developer Portal 개요 페이지는 개발자에게 작업 항목 및 서비스 상태를 한눈에 파악할 수 있는
  보기를 제공하고, 엔지니어링 관리자에게는 안정성 및 Scorecard 성능을 전반적으로 파악할 수 있는 보기를 제공합니다.
further_reading:
- link: actions/app_builder
  tag: 문서
  text: App Builder
- link: monitors/
  tag: 문서
  text: Datadog Monitors
- link: /incident_response/incident_management/
  tag: 문서
  text: Incident Management
- link: /service_level_objectives/
  tag: 문서
  text: Service Level Objectives
- link: error_tracking
  tag: 문서
  text: Error Tracking
- link: watchdog
  tag: 문서
  text: Watchdog
site_support_id: idp
title: 개요 페이지
---
{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" header="Developer Overview Page 미리 보기에 참여하세요!" >}}
{{< /callout >}}

## 개요 {#overview}

Datadog의 Internal Developer Platform(IDP)은 각 이해관계자에게 가장 관련성이 높은 정보를 제공하는 **개요 페이지**와 함께 제공됩니다.
- 개발자는 작업 항목, 이슈 및 팀의 서비스 정보를 한곳에서 확인할 수 있습니다.
- SRE 및 엔지니어링 관리자는 팀 전반의 제품 안정성, 서비스 상태, Scorecard 성능 및 기타 주요 메트릭을 전체적으로 파악할 수 있습니다.

## Developer Overview Page {#developer-overview-page}

{{< img src="tracing/eng_reports/developer-overview-page.png" alt="Internal Developer Portal의 My Workspace 섹션에 있는 Developer Overview Page로, Overview에는 상위 수준의 경보, 인시던트 및 SLO 메트릭이 표시되고 My Tasks 섹션에는 JIRA 티켓이 표시됩니다." style="width:100%;" >}}

Developer Overview Page는 팀 및 서비스에 대한 다음 정보를 한곳에 모아 제공합니다.
- 팀의 Monitors, Incidents 및 SLOs
- GitHub PR
- 팀의 Services 및 Scorecard 성능
- Issues, Errors 및 Watchdog 경보

### Developer Overview Page 사용하기 {#using-the-developer-overview-page}

#### 시작하기 {#get-started}

Developer Overview Page에 표시되는 'My Pull Requests' 위젯은 [Datadog App Builder][9]로 구동되며 처음에는 데모 데이터를 보여줍니다.

Developer Overview Page에서 데이터를 사용하려면 [데이터 소스를 연결][10]하세요.
1. IDP에서 **Overview** 탭을 선택하고 왼쪽 메뉴에서 **My Workspace**를 선택하여 Developer Overview Page를 찾습니다.
1. 이 위젯의 경우 다음 단계를 따르세요.

   1. **+ Connect Data**를 클릭합니다.
   1. 새 연결을 만들거나 기존 연결을 선택합니다.

   <br>
   선택 항목을 저장하면 위젯에 연결의 데이터가 표시됩니다. 위젯에서 Change Connection을 클릭하여 선택한 연결을 변경할 수 있습니다.

<div class="alert alert-info">데이터 연결은 일회성 설정 작업이며, 선택한 연결은 전체 팀에 적용됩니다.</div>

#### 보기 개인화하기 {#personalize-your-view}

보기를 개인화하려면 페이지 상단의 필터에 값을 입력하세요.
- **Team**: [Datadog Team][8] 이름
- **Github_Org**: GitHub 조직의 이름
- **Github_Username**: GitHub 사용자 이름

<div class="alert alert-info">'My Workspace'로 돌아가도 이러한 필터 값은 유지됩니다.</div>

### 페이지 기능 {#page-features}

Developer Overview Page에는 기본적으로 다음 위젯이 포함되어 있습니다.

#### Monitors, Incidents 및 SLOs {#monitors-incidents-and-slos}

Datadog [Monitors][6], [Incident Management][3] 및 [SLOs][7]의 실시간 신호를 표시합니다. 이러한 제품을 활성화하기 전까지 위젯은 비어 있습니다.

#### GitHub Pull Requests {#github-pull-requests}

제공한 GitHub 조직 및 사용자 이름을 기반으로, 본인이 생성했거나 검토하도록 할당된 오픈 풀 리퀘스트를 나열합니다.

#### 팀 서비스 및 Scorecard 성능 {#team-services-and-scorecard-performance}

- **My team's services**: 선택한 **Team** 필터가 소유한 서비스를 나열합니다.
- **Scorecard performance by service**: 선택한 **Team** 필터가 소유한 각 서비스의 모든 Scorecard 평균 점수를 표시합니다.

#### 이슈 및 오류 {#issues-and-errors}

[Datadog Incidents][3] 및 [Error Tracking][4]에서 탐지된 이슈 및 오류를 표시합니다. 이러한 제품을 활성화하기 전까지 위젯은 비어 있습니다.

#### Watchdog 경보 {#watchdog-alerts}

[Datadog Watchdog][5]에서 경보를 캡처합니다.

### 추가 사용자 지정을 위한 복제 {#clone-for-further-customization}

보기를 사용자 지정하려면 오른쪽 상단에 있는 **Clone as dashboard**를 클릭하세요. 이렇게 하면 **My Workspace** 페이지의 콘텐츠가 미리 채워진 대시보드가 생성됩니다.

복제한 대시보드에서 수행할 수 있는 사용자 지정 예시는 다음과 같습니다.
- Datadog의 [Action Catalog][11]를 사용하여 [Embedded Apps][2]를 만들고 추가 타사 데이터(예: PagerDuty 온콜 정보) 표시
- [위젯][12]의 크기를 조정하고 재배치하며 추가/제거하여 보기의 전체 레이아웃과 디자인 업데이트
- [Note][13] 위젯을 사용하여 조직과 관련된 정보를 담은 공지 및 업데이트 섹션 추가

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/app_builder
[2]: /ko/actions/app_builder/embedded_apps/
[3]: /ko/incident_response/incident_management/
[4]: /ko/error_tracking/
[5]: /ko/watchdog/
[6]: /ko/monitors/
[7]: /ko/service_level_objectives/
[8]: /ko/account_management/teams/
[9]: /ko/actions/app_builder/#apps-created-by-datadog
[10]: /ko/actions/connections
[11]: /ko/actions/actions_catalog/
[12]: /ko/dashboards/widgets/
[13]: /ko/dashboards/widgets/note/