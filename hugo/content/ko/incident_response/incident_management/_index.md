---
aliases:
- /ko/monitors/incident_management/
- /ko/service_management/incident_management/
description: 인시던트 생성 및 관리
further_reading:
- link: dashboards/querying/#incident-management-analytics
  tag: 설명서
  text: 인시던트 관리 분석
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: 학습 센터
  text: Incident Management 시작하기
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 인시던트 관리 개선하기
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: 블로그
  text: Datadog 모바일 앱을 사용하여 이동 중에도 인시던트를 관리 및 해결하기
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: 블로그
  text: 인시던트 포스트모템(사후 분석) 생성 모범 사례
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: 블로그
  text: Datadog을 이용한 Incident Management
- link: https://www.datadoghq.com/blog/datadog-service-management/
  tag: 블로그
  text: Datadog Service Management로 높은 서비스 가용성 보장하기
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: 블로그
  text: Datadog의 인시던트 관리 방법
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: 블로그
  text: Datadog Incident Response로 수정 및 커뮤니케이션 통합하기
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: 블로그
  text: Datadog과 ServiceNow ITSM을 통합하여 Incident Response 가속화하기
- link: https://app.datadoghq.com/release-notes?category=Incident%20Management
  tag: 릴리스 노트
  text: 최신 Incident Management 릴리스를 확인하세요! (앱 로그인 필요).
title: Incident Management
---
{{< learning-center-callout header="교육 웨비나 세션 참가" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Incidents">}}
  기반 활성화 세션을 탐색하고 등록하세요. Datadog Incident Management가 DevOps 팀과 SRE가 인시던트 대응 워크플로를 처음부터 끝까지 보다 효과적으로 관리할 수 있도록 지원하며, 가장 중요한 순간에 시간을 절약하고 불편을 줄이는 방법을 알아보세요.
{{< /learning-center-callout >}}

Datadog Incident Management는 팀 구성원이 조직 서비스에 대한 중단 및 위협을 식별, 완화, 분석하도록 돕습니다. Incident Management를 사용하면 팀이 공유 프레임워크와 툴킷을 기반으로 협업할 수 있도록 지원하는 자동화 기반 대응 프로세스를 설계할 수 있습니다. 인시던트 분석을 사용하여 인시던트 대응 프로세스의 효과를 평가할 수도 있습니다.

인시던트는 메트릭, 트레이스, 로그와 함께 Datadog 내에 존재합니다. 팀은 모니터 경보, 보안 신호, 이벤트, 케이스 등에서 인시던트를 선언할 수 있습니다. 모니터를 구성하여 [인시던트를 자동으로 선언][30]할 수도 있습니다.

## 시작하기 {#get-started}

Incident Management는 별도의 설치가 필요하지 않습니다. 학습 센터 코스를 수강하거나, 가이드 워크스루를 읽거나, 인시던트를 선언하여 시작하세요.

{{< whatsnext desc="Incident Management에 대해 자세히 알아보기:">}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-to-incident-management" >}}실습 예시를 통해 Datadog Incident Management에 대해 알아보세요.{{< /nextlink >}}
    {{< nextlink href="https://docs.datadoghq.com/getting_started/incident_management/" >}}인시던트 워크플로 가이드 워크스루{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/investigate/declare" >}}인시던트 선언{{< /nextlink >}}
{{< /whatsnext >}}

## 과금 {#billing}

Incident Management는 좌석 기반 SKU입니다. Incident Management 요금 체계 및 Datadog 내 좌석 관리 방법에 대한 자세한 내용은 [요금 페이지][31] 및 [Incident Response 과금 설명서][32]를 참조하세요.

## 인시던트 조회 및 검색 {#view-and-search-for-incidents}

인시던트를 조회하려면 [Incidents][1] 페이지로 이동하여 진행 중인 모든 인시던트 피드를 확인하세요. 왼쪽에 나열된 속성을 통해 인시던트를 필터링하고, 검색 결과를 내보내고, [Incident Settings][2]에서 모든 인시던트에 대해 표시되는 추가 필드를 구성할 수 있습니다.

### 검색 예시 {#search-examples}

인시던트 검색은 Logs 및 Event Management와 동일한 이벤트 기반 [검색 구문][33]을 사용합니다. `key:value` 쌍을 불리언 연산자(`AND`, `OR`, `-`)와 결합하여 인시던트를 필터링하세요.

| 쿼리 | 설명 |
|-------|-------------|
| `severity:SEV-1` | 모든 SEV-1 인시던트 표시 |
| `severity:(SEV-1 OR SEV-2) state:active` | 모든 활성 SEV-1 또는 SEV-2 인시던트 표시 |
| `services:checkout AND -state:resolved` | 결제 서비스에 영향을 미치는 미해결 인시던트 표시 |
| `teams:platform` | 플랫폼 팀에 할당된 인시던트 표시 |
| `services:web*` | 'web'으로 시작하는 서비스에 영향을 미치는 인시던트 표시 |
| `Root\ Cause\ Category:Bug ` | 특정 근본 원인 속성이 있는 인시던트 표시 |
| `responder:john.smith@datadoghq.com ` | John Smith가 담당자인 인시던트 표시 |

### 필터링 및 내보내기 {#filter-and-export}

- **속성별 필터링**: 왼쪽의 패싯 패널을 사용하여 상태, 심각도, 복구 시간(시간) 및 기타 구성된 속성별로 필터링하세요.
- **검색 결과 내보내기**: 인시던트 목록 상단의 Export 버튼을 사용하여 검색 결과를 내보내세요.
- **뷰 저장**: 자주 사용하는 검색 쿼리와 필터를 저장하여 빠르게 액세스하세요.

### 모바일 액세스 {#mobile-access}

또한 [Apple App Store][4] 및 [Google Play Store][5]에서 [Datadog 모바일 앱][3]을 다운로드하여 모바일 장치 홈 화면에서 인시던트 목록을 확인하고 인시던트를 관리/생성할 수 있습니다.

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Datadog 모바일 앱의 두 가지 보기: 각 인시던트에 대한 상위 수준 세부 정보가 포함된 인시던트 목록 보기와 단일 인시던트에 대한 상세 패널 보기">}}

## 인시던트 설명하기 {#describing-the-incident}

인시던트를 선언할 때는 인시던트 관리 프로세스의 모든 이해관계자가 상황을 충분히 파악할 수 있도록 발생한 일, 발생 이유, 관련 속성을 자세히 설명하는 포괄적인 설명을 제공하는 것이 중요합니다. 인시던트 선언의 필수 요소에는 제목, 심각도 수준, 인시던트 지휘관이 포함됩니다. 효과적인 인시던트 관리 문서에는 다음이 포함됩니다.
- 상태, 영향, 근본 원인, 탐지 방법 및 서비스 영향을 포함한 인시던트 세부 정보 업데이트.
- 대응 팀 구성 및 관리, 사용자 지정 담당자 역할 사용, 상세한 인시던트 평가를 위한 메타데이터 속성 활용.
- 인시던트 해결 프로세스 전반에 걸쳐 모든 이해관계자에게 정보를 제공하기 위한 알림 구성.

자세한 내용은 [인시던트 설명하기][20] 문서를 참조하세요.

## 인시던트 데이터 평가 {#evaluate-incident-data}

인시던트 분석은 과거 인시던트의 통계를 집계하고 분석할 수 있도록 하여 인시던트 대응 프로세스의 효율성과 성능에 대한 인사이트를 제공합니다. 해결 시간 및 고객 영향과 같은 주요 메트릭을 시간 경과에 따라 추적할 수 있습니다. 대시보드 및 노트북의 그래프 위젯을 사용하여 이러한 분석을 쿼리할 수 있습니다. Datadog은 시작하는 데 도움이 되도록 인시던트 관리 개요 대시보드 및 노트북 인시던트 보고서와 같은 사용자 지정 가능한 템플릿을 제공합니다.

수집된 측정값 및 데이터를 시각화하기 위한 단계별 그래프 구성에 대한 자세한 내용은 [인시던트 관리 분석][10]을 참조하세요.

## Integrations {#integrations}

인시던트 관리는 다음을 포함한 다른 Datadog 제품과 긴밀하게 통합됩니다.

- [Datadog 상태 페이지][26]를 사용하여 공개 또는 비공개 상태 페이지를 만들고 이를 인시던트에 연결합니다.
- [Datadog On-Call][27]을 사용하여 페이지를 인시던트로 에스컬레이션하고 인시던트에서 팀을 수동 또는 자동으로 호출합니다.
- [Datadog Notebooks][28]를 사용하여 [postmortems][34]를 작성하고 검토합니다.
- [Datadog Workflow Automation][29]를 사용하여 자동화를 구축하고 실행합니다.

### 타사 통합 {#third-party-integrations}

Incident Management는 다음을 포함한 타사 애플리케이션과 통합됩니다.

- [Atlassian Statuspage][25]를 사용하여 Statuspage 인시던트를 생성하고 업데이트합니다.
- [Confluence][22]를 사용하여 인시던트 [postmortems][34]를 생성합니다.
- [CoTerm][21]을 사용하여 터미널 기반 인시던트 수정 활동을 실시간으로 추적합니다.
- [Jira][15]를 사용하여 인시던트에 대한 Jira 티켓을 생성합니다.
- [Microsoft Teams][23]를 사용하여 인시던트용 채널 및 화상 회의를 생성합니다.
- [PagerDuty][12] 및 [OpsGenie][13]를 사용하여 온콜 엔지니어를 호출하고 인시던트 해결 시 페이지를 자동으로 해결합니다.
- [ServiceNow][19]를 사용하여 인시던트에 대한 ServiceNow 티켓을 생성합니다.
- [Slack][11]을 사용하여 인시던트용 채널을 생성합니다.
- [Webhooks][16]를 사용하여 웹훅으로 인시던트 알림을 전송합니다(예: [Twilio로 SMS 전송][17]).
- [Zoom][24]을 사용하여 인시던트에 대한 화상 통화를 시작합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /ko/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /ko/incident_response/incident_management/investigate/declare
[7]: /ko/account_management/teams/
[8]: /ko/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[9]: /ko/tracing/#2-instrument-your-application
[10]: /ko/incident_response/incident_management/analytics_and_reporting/
[11]: /ko/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[12]: /ko/integrations/pagerduty/
[13]: /ko/integrations/opsgenie/
[15]: /ko/integrations/jira/
[16]: /ko/integrations/webhooks/
[17]: /ko/integrations/webhooks/#sending-sms-through-twilio
[18]: /ko/integrations/statuspage/
[19]: /ko/integrations/servicenow/
[20]: /ko/incident_response/incident_management/investigate/describe
[21]: /ko/coterm
[22]: /ko/integrations/confluence/
[23]: /ko/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[24]: /ko/integrations/zoom-incident-management/
[25]: /ko/integrations/statuspage/
[26]: /ko/incident_response/status_pages/
[27]: /ko/incident_response/on-call/
[28]: /ko/notebooks/
[29]: /ko/actions/workflows/
[30]: /ko/incident_response/incident_management/investigate/declare#from-a-monitor
[31]: https://www.datadoghq.com/pricing/?product=incident-response#products
[32]: /ko/account_management/billing/incident_response/
[33]: /ko/getting_started/search/#event-based-queries
[34]: /ko/incident_response/incident_management/post_incident/postmortems