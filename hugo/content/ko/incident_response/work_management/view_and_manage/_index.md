---
aliases:
- /ko/service_management/case_management/view_and_manage/
- /ko/incident_response/case_management/view_and_manage/
further_reading:
- link: incident_response/work_management/settings
  tag: 설명서
  text: Work Management 설정
- link: https://www.datadoghq.com/blog/datadog-risk-management
  tag: 블로그
  text: Datadog Case Management을 사용하여 위험을 중앙 집중화하고 해결하는 방법
- link: https://www.datadoghq.com/blog/work-management/
  tag: 블로그
  text: Datadog Work Management로 사람 및 에이전트 작업을 중앙 집중화
title: 작업 항목 보기 및 관리
---
## 개요 {#overview}

[Work Management 페이지][1]에서 작업 항목을 생성일, 상태 또는 우선순위별로 정렬할 수 있습니다. 기본적으로 작업 항목은 생성일순으로 정렬됩니다. **목록** 뷰와 **보드** 뷰 사이를 토글로 전환하세요.  목록 뷰는 상세 표를 제공하며, 보드 뷰는 드래그 앤 드롭 기능을 갖춘 칸반 보드를 제공합니다.

프로젝트 내의 작업 항목을 일괄 편집하려면 확인란을 사용하여 하나 이상의 작업 항목을 선택합니다. 그런 다음 드롭다운 메뉴를 사용하여 상태 관리, 할당, 아카이브 등과 같은 작업을 일괄 수행합니다. 작업 항목을 다른 프로젝트로 이동하면 새 작업 항목 ID가 할당됩니다. 이전 작업 항목 URL은 새 작업 항목으로 리디렉션되지 않습니다.

## 키보드 단축키 {#keyboard-shortcuts}
아래의 키보드 단축키를 사용하여 빠르게 탐색하세요.

| 작업                   | 단축키       |
| ------------------       | ----------     |
| 위로 이동                  | `↑` 또는 `K`     |
| 아래로 이동                | `↓` 또는 `J`     |
| 작업 항목 선택         | `X`            |
| 선택한 작업 항목 보기  | `Enter` 또는 `O` |
| 작업 항목 생성       | `C`            |
| 상태 설정               | `S`            |
| 사용자에게 할당           | `A`            |
| 우선순위 설정             | `P`            |
| 프로젝트로 이동          | `V`            |
| 아카이브 / 아카이브 해제      | `E`            |

## 작업 항목 검색 {#search-work-items}

프로젝트 내에서 다음 방법으로 작업 항목을 검색할 수 있습니다.
- **속성 키-값 쌍**: 예를 들어, 이벤트 상관관계 패턴에서 생성된 모든 작업 항목을 찾으려면 `creation_source:Event Management`를 검색합니다. 개별 이벤트에서 생성된 작업 항목의 경우 `creation_source:Event`를 검색합니다.
- **제목**: 검색어를 큰따옴표로 묶으세요. 예를 들어, 제목에 "kubernetes pods"라는 용어가 포함된 모든 작업 항목을 찾으려면 `"kubernetes pods."`를 검색합니다.

더 복잡한 쿼리를 작성하려면 대소문자를 구분하는 부울 연산자 `AND`, `OR`, `-`(제외)를 사용할 수 있습니다. 예를 들어, `priority:(P2 OR P3)`는 우선순위가 `P2`이거나 `P3`인 작업 항목을 반환합니다.

아울러, 좌상단의 검색 바에서 모든 프로젝트의 작업 항목을 검색할 수 있습니다.

## 뷰 생성하기{#create-a-view}

**뷰**는 작업 항목 목록을 가장 관련성 높은 항목으로 좁힐 수 있도록 저장된 쿼리 필터입니다. 프로젝트에는 각 상태(열림, 진행 중, 닫힘, 아카이브됨)에 대한 기본 뷰가 제공됩니다. 또한, 본인에게 할당된 작업 항목과 본인이 생성한 작업 항목에 대한 기본 뷰도 제공됩니다.

사용자 지정 뷰를 만들려면 다음을 수행하세요.
1. 프로젝트 내에서 **뷰 추가**를 선택합니다.
1. 뷰 이름을 지정합니다.
1. 검색 상자에 쿼리를 입력합니다. 미리보기가 새로고침되어 현재 검색 쿼리와 일치하는 작업 항목이 표시됩니다.
1. (선택 사항) Slack, Microsoft Teams, PagerDuty 또는 Webhooks와 같은 타사 도구로 알림을 보냅니다. **+ 수신자 유형 추가**를 클릭하고 사전 구성된 채널 또는 수신자 중에서 선택합니다. 사용 가능한 도구 및 옵션에 대한 자세한 내용은 [알림 및 티켓 만들기][2]를 참조하세요.
1. **뷰 저장**을 클릭합니다.

## 작업 항목 세부 정보{#work-item-details}

작업 항목 세부 정보 페이지는 조사가 어떻게 진행되고 있는지를 알려주는 단일 정보 소스 역할을 합니다. 각 작업 항목에는 다음과 같은 속성이 있습니다.

상태
: 모든 작업 항목은 생성 시 기본적으로 열림 상태가 됩니다. 작업 항목을 진행하면서 진행 중 및 닫힘 상태로 변경할 수 있습니다. 작업 항목의 상태를 변경하려면 `S`를 입력합니다.

우선순위
: 기본적으로 우선순위는 정의되어 있지 않습니다. 작업 항목의 우선순위를 P1 - Critical, P2 - High, P3 - Medium, P4 - Low, P5 - Info로 설정할 수 있습니다. 작업 항목의 우선순위를 설정하려면 `P`를 입력합니다.

담당자
: 기본적으로 할당되지 않았습니다. 사용자에게 할당하려면 `A`를 입력합니다. 본인에게 할당하려면 `I`를 입력합니다.

속성
: 속성을 추가하면 구성 및 필터링이 가능합니다. 기본적으로 모든 작업 항목에는 팀, 데이터 센터, 서비스, 환경 및 버전이라는 속성이 있습니다.

아카이브
: 작업 항목을 아카이브하면 검색에서 제외됩니다. 작업 항목을 아카이브하려면 `E`를 입력합니다.

활동 타임라인
: 각 작업 항목은 상태, 담당자, 우선순위, 신호 및 추가된 모든 댓글에 대한 실시간 업데이트를 캡처하기 위해 활동 타임라인을 자동으로 생성합니다. 댓글에서 태그되면 이메일을 받게 됩니다. 댓글을 추가하려면 `M`을 입력하고, 제출하려면 `Cmd + Enter`를 입력합니다.

## 조치 취하기 {#take-action}

Work Management를 사용하여 정보, 컨텍스트 및 리소스를 수집하고 취해야 할 적절한 조치를 결정하세요. 여기에는 추가 조사, 인시던트로 에스컬레이션 또는 작업 항목 종료가 포함됩니다.

개별 작업 항목에서 수행 가능한 조치:
- [조사 노트북 생성][3]: 조사 정보를 수집하고 팀 구성원과 협력합니다.
- [인시던트 선언][4]: 작업 항목을 인시던트로 에스컬레이션하고 인시던트 대응 프로세스를 시작합니다.
- 수동으로 Jira 이슈 생성: `Shift + J`를 사용하여 Jira 이슈를 생성합니다. Jira 이슈 자동 생성 및 양방향 동기화 설정 방법에 대한 자세한 내용을 확인하려면 [설정][5] 설명서를 참조하세요.
- 수동으로 ServiceNow 인시던트 생성: `Shift + N`을 사용하여 ServiceNow 인시던트를 생성합니다.
- 작업 항목 종료: 더 이상 조치가 필요하지 않음을 팀에 알립니다. 작업 항목의 상태를 닫힘으로 업데이트합니다.
- [승인 요청][7]: 작업 항목에 대해 조치를 취하기 전에 하나 이상의 팀 구성원에게 승인을 요청합니다.

## Work Management Analytics {#work-management-analytics}

Work Management Analytics는 집계된 작업 항목 통계에 대한 쿼리 가능한 데이터 소스입니다. [Dashboards][8] 및 [Notebooks][3]의 다양한 그래프 위젯에서 이러한 분석을 통해 팀 생산성을 분석하고 이슈의 패턴을 파악할 수 있습니다.

다음 위젯은 시계열, 상위 목록, 쿼리 값, 표, 트리 맵, 파이 차트, 변경 및 목록과 같은 Work Management Analytics를 지원합니다.

## 내보내기 {#export}

작업 항목 세부 정보 페이지에서 직접 작업 항목을 내보낼 수 있습니다.
1. 개별 작업 항목에서 작업 항목 세부 정보 페이지 오른쪽 상단에 있는 **추가 옵션** 아이콘을 클릭합니다.
1. **PDF로 내보내기**를 선택합니다.
1. 표시되는 인쇄 대화 상자에서 대상으로 **PDF로 저장**을 선택합니다.
1. **저장**을 클릭하여 내보내기를 완료합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work
[2]: /ko/incident_response/work_management/notifications_integrations
[3]: /ko/notebooks/
[4]: /ko/incident_response/incident_management/#describing-the-incident
[5]: /ko/incident_response/work_management/settings/#jira
[7]: /ko/incident_response/work_management/approvals
[8]: https://docs.datadoghq.com/ko/dashboards/