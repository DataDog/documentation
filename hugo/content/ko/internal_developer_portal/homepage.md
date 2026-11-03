---
aliases:
- /ko/software_catalog/developer_homepage
- /ko/internal_developer_portal/developer_homepage
description: Internal Developer Portal Homepage에서는 팀의 엔터티, GitHub 풀 요청, GitLab 머지
  요청, Jira 및 Linear 티켓, Datadog 작업 항목을 한곳에서 조회할 수 있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-idp-homepage/
  tag: 블로그
  text: IDP Homepage로 하루를 시작하세요
- link: /integrations/github/
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
- link: /integrations/gitlab-source-code/
  tag: 설명서
  text: GitLab 소스 코드 통합에 대해 알아보기
- link: /integrations/jira/#configure-a-jira-webhook
  tag: 설명서
  text: Jira 통합에 대해 알아보기
- link: /integrations/linear/#configure-a-linear-webhook
  tag: 설명서
  text: Linear 통합에 대해 알아보기
site_support_id: idp
title: 홈페이지
---
{{< img src="tracing/software_catalog/idp_homepage_2.png" alt="검토 대기 중인 풀 요청와 할당된 티켓을 표시하는 IDP Homepage입니다." style="width:100%;" >}}

## 개요 {#overview}

[IDP Homepage][5]에서는 팀의 엔터티와 일일 작업을 한 곳에서 조회할 수 있습니다.  

이러한 보기를 통해 다음 작업을 수행할 수 있습니다.
- Scorecard, 최근 배포, 모니터링, 이슈, 인시던트, 대시보드 및 On-Call 상태를 포함하여 팀의 엔터티에 대한 주요 정보를 조회합니다. 
- GitHub, GitLab, Jira 및 Linear 전반에 걸쳐 자신에게 할당된 작업을 추적합니다.
- 알림이 발생한 모니터링이나 실패한 배포를 식별합니다.

## 전제 조건 {#prerequisites}

이 Homepage는 Datadog Integrations의 데이터를 집계합니다. Homepage를 사용하기 전에 다음 항목을 구성합니다.

- **GitHub**: **Your PRs**의 **GitHub** 탭에 필요합니다. 관리자가 [GitHub 통합][1] 및 웹훅을 구성하고 각 사용자는 자신의 GitHub 계정으로 로그인합니다.
- **GitLab Source Code**: **Your PRs**의 **GitLab** 탭에 필요합니다. 관리자가 [GitLab Source Code 통합][2] 및 웹훅을 구성하고 각 사용자는 자신의 GitLab 계정으로 로그인합니다.
- **Jira**: **Your Tickets**의 **Jira** 탭에 필요합니다. 관리자가 [Jira 웹훅을 구성][3]합니다.
- **Linear**: **Your Tickets**의 **Linear** 탭에 필요합니다. 관리자가 [Linear 웹훅을 구성][4]합니다.

## Homepage 구성{#configure-the-homepage}

이 페이지를 개인화하려면 [IDP Homepage][5] 상단에서 **Configure**를 클릭합니다. **Homepage settings** 패널이 **Section layout** 및 **Integrations**이라는 탭 2개로 열립니다. 변경 후 **Save**를 클릭하여 적용하거나 **Cancel**을 클릭하여 변경 사항을 취소합니다.

### Section layout {#section-layout}

**Section layout** 탭은 Homepage에 표시할 섹션과 표시 순서를 제어합니다. 사용 가능한 섹션은 **Your PRs**, **Your Tickets**, **Services & Entities** 및 **Apps**입니다.

- 섹션 순서를 변경하려면 핸들을 드래그하여 새 위치로 이동합니다.
- 섹션을 표시하거나 숨기려면 섹션 옆의 표시 여부 아이콘을 클릭합니다.
- 기본 섹션 및 순서로 복원하려면 **Reset Layout**을 클릭합니다.

### 통합 {#integrations}

**Integrations** 탭은 활성화할 통합과 각 통합이 Homepage에 표시할 내용을 제어합니다. 통합은 **PR** 및 **Work Items**과 같이 통합이 채워지는 섹션별로 그룹화됩니다.

각 통합에는 활성화 또는 비활성화할 수 있는 토글이 있습니다. 통합을 비활성화하면 해당 데이터가 더 이상 Homepage에 표시되지 않습니다. 통합에 따라 다음 작업을 수행할 수도 있습니다. 

- 표시할 연결된 계정, 인스턴스 또는 조직을 선택합니다. 예를 들어, GitLab 통합에는 **인스턴스** 선택기가 포함되어 있습니다.
- 연결을 관리하려면 통합의 구성을 엽니다. 예를 들어, GitHub 통합에는 **Configure** 옵션이 포함되어 있습니다. 

## Your PRs{#your-prs}

**Your Tickets** 섹션은 소스 제어에서 개인 작업 항목을 통합하므로 Homepage를 벗어나지 않아도 자신에게 할당된 풀 요청 및 병합 요청를 추적할 수 있습니다. **GitHub** 및 **GitLab** 탭 간을 전환하여 각 소스를 확인합니다.

{{< img src="tracing/software_catalog/your_prs_table.png" alt="Your PRs 섹션은 GitHub 풀 요청을 상태별로 그룹화하여 표시합니다." style="width:100%;" >}}

### GitHub {#github}

**GitHub** 탭은 검토 상태별로 그룹화하여 주의가 필요한 풀 요청을 표시하므로 Homepage를 벗어나지 않아도 풀 요청를 처리할 수 있습니다. 

GitHub 계정으로 로그인하면 이 탭에는 상태별로 그룹화된 풀 요청이 로드됩니다. 조직에서 GitHub 통합을 구성하지 않은 경우 이 탭은 [GitHub 통합 타일][1]에서 활성화하라는 메시지와 함께 빈 상태로 표시됩니다. GitHub에서 PR을 읽으려면 이 통합에 다음 권한이 필요합니다.

- 멤버: 읽기
- 메타데이터: 읽기
- 풀 요청: 읽기
- 콘텐츠: 읽기
- 상태: 읽기
- 검사: 읽기

Datadog에 여러 GitHub 조직이 연결된 경우 조직 간에 전환하려면 통합 읽기 권한이 필요합니다.

### GitLab {#gitlab}

**GitLab** 탭은 검토 상태별로 그룹화하여 주의가 필요한 병합 요청을 표시합니다. 각 요청에 대해 검토 및 승인 상태, 파이프라인 상태와 병합 차단 요소, 해결된 토론 및 해결되지 않은 토론 수를 표시합니다. 

GitLab 계정으로 로그인하면 이 탭에는 상태별로 그룹화된 머지 요청이 로드됩니다. 조직에서 GitLab Source Code 통합을 구성하지 않은 경우 이 탭은 [GitLab Source Code 통합 타일][2]에서 활성화하라는 메시지와 함께 빈 상태로 표시됩니다.

Datadog 내에 여러 GitLab 인스턴스가 연결된 경우 **인스턴스** 선택기를 사용하여 확인할 인스턴스를 선택합니다. 

## Your Tickets{#your-tickets}

**Your Tickets** 섹션은 Jira, Linear 및 Datadog Work Management 전반에서 사용자에게 할당된 항목을 통합하므로 Homepage를 벗어나지 않아도 열려 있는 작업을 추적할 수 있습니다. **Jira**, **Linear** 및 **Work Items** 탭 간을 전환하여 각 소스를 확인하고 **Display**를 사용하여 항목이 표시되는 방식을 변경합니다.

{{< img src="tracing/software_catalog/your_tickets_table.png" alt="Your Tickets 섹션에서는 Jira 티켓을 상태별로 그룹화하여 표시합니다." style="width:100%;" >}}

### Jira {#jira}

**Jira** 탭에는 사용자에게 할당된 Jira 티켓이 상태별로 그룹화되어 나열됩니다. 설정 후에는 할당된 티켓이 자동으로 나타납니다.

### Linear {#linear}

**Linear** 탭에는 사용자에게 할당된 Linear 이슈가 상태별로 그룹화되어 나열됩니다. 설정 후에는 할당된 이슈가 자동으로 나타납니다.

### Work Items{#work-items}

**Work Items** 탭에는 사용자에게 할당된 Datadog Work Management 작업 항목이 상태별로 그룹화되어 나열됩니다. 작업 항목이 나에게 할당되면 자동으로 나타납니다. 자세한 내용은 [Work Management][6]를 참조하세요.

## Services and entities {#services-and-entities}

{{< img src="tracing/software_catalog/services_entities_table_2.png" alt="Services and entities 섹션에는 Scorecard, 모니터링 및 On-Call 정보가 포함된 팀 서비스가 표시됩니다." style="width:100%;" >}}

**서비스 및 엔터티** 섹션에서는 연결된 Datadog 제품 및 Integrations에서 자동으로 집계된 팀의 주요 서비스와 엔터티를 표시합니다. 각 항목은 Scorecard 상태, 최근 배포, 모니터링 및 인시던트 상태, 연결된 대시보드, 현재 On-Call 등 엔터티에 대한 운영 컨텍스트를 요약합니다. 최근에 조회한 엔터티, 팀이 소유한 엔터티 또는 즐겨찾기에 추가한 엔터티별로 필터링할 수 있습니다. 

## 사용자 지정 앱을 사용하여 Homepage 확장 {#extend-the-homepage-with-custom-apps}

내장 섹션 외에도 **Apps** 섹션을 통해 사용자 지정 앱을 Homepage에 추가할 수 있으므로, Datadog, 내부 도구 또는 타사 서비스 등에서 가장 유용하다고 생각되는 데이터와 작업을 한곳에 모을 수 있습니다. Datadog에서는 이러한 앱을 빌드하는 다음 두 가지 방식을 제공합니다. 

- **App Builder**: 내부 도구를 위한 로우 코드 드래그 앤 드롭 빌더입니다. 앱은 사전 구축된 UI 구성 요소, Datadog 데이터 소스(메트릭, 로그, 모니터 등), GitHub 및 AWS와 같은 서비스를 위한 기본 제공 작업을 결합합니다. 자세한 내용은 [App Builder][7]를 참조하세요.
- **Datadog Apps**: CLI와 표준 개발 워크플로를 사용하여 React 및 TypeScript(또는 JavaScript)로 로컬에서 앱을 빌드할 수 있는 코드 기반 경로입니다. 소스 제어 및 CI/CD를 통한 팀 협업, AI 지원 로컬 개발, Action Catalog 이외의 서비스와의 통합 또는 앱의 UI와 로직에 대한 완전한 제어가 필요한 경우, Datadog Apps를 선택하세요. 자세한 내용은 [Datadog Apps][8]를 참조하세요.

여기서 사용자 지정 앱을 사용할 수 있도록 하려면 먼저 앱을 게시하고 권한을 정의하여 팀이 앱을 조회하고 사용할 수 있도록 합니다.

Homepage에 앱을 추가하려면 다음 작업을 수행합니다.

1. **Apps** 섹션에서 **Add App**을 클릭합니다.
2. 사전 구축된 앱으로 시작하려면 **blueprint**를 선택하거나, 조직에서 이미 구축한 **사용자 지정 앱**을 선택합니다.
3. 앱을 구성한 후 Homepage에 추가합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /ko/integrations/github/  
[2]: /ko/integrations/gitlab-source-code/
[3]: /ko/integrations/jira/#configure-a-jira-webhook
[4]: /ko/integrations/linear/#configure-a-linear-webhook
[5]: https://app.datadoghq.com/idp/home
[6]: /ko/service_management/case_management
[7]: /ko/actions/app_builder/
[8]: /ko/actions/datadog_apps