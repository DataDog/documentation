---
aliases:
- /ko/service_management/events/triage_inbox/
further_reading:
- link: /events/ingest/
  tag: 문서
  text: Datadog에 이벤트 전송
- link: /events/correlation/
  tag: 문서
  text: 이벤트 상관관계에 대해 자세히 알아보세요.
- link: https://www.datadoghq.com/blog/datadog-event-management/
  tag: 블로그
  text: AIOps 기반 Event Management를 통해 더 빠르게 알림을 집계하고 상호 연관성을 파악하여 조치를 취하세요.
site_support_id: case_management
title: Event Management 분류 받은 편지함
---
## 개요 {#overview}

Datadog Event Management [분류 받은 편지함][4]은 모든 소스의 관련 이벤트를 실행 가능한 작업 항목으로 통합하여 인시던트 대응을 간소화합니다. 이 중앙 집중식 보기는 노이즈를 줄이고 팀이 더 효과적으로 분류, 조사 및 협업하는 데 도움을 줍니다. 사용자 지정 저장된 뷰를 사용하면 우선순위가 높은 작업 항목에 집중하고 상관관계가 있는 경보, 관련 변경 사항 및 텔레메트리를 모두 한곳에서 검토할 수 있습니다.

## 작업 항목 분류 및 조사 {#triaging-and-investigating-work-items}

작업 항목 분류 및 조사는 수신되는 작업 항목을 정렬, 필터링 및 관리할 수 있는 분류 받은 편지함에서 시작됩니다. Datadog 내외에서 팀원들과 협업하여 대응을 조정하세요. 여기에서 필요에 따라 작업 항목의 우선순위를 지정하고, 할당하고, 조사하고, 에스컬레이션하여 더 빠른 해결을 도모할 수 있습니다.

{{< img src="/events/triage_inbox/event_mgmt_inbox.mp4" alt="Event Management 받은 편지함, 우선순위별 정렬, 상태 변경 및 우선순위 기능 강조" video=true >}}

## 시작하기 {#getting-started}

1. [{{< ui >}}Event Management{{< /ui >}} > {{< ui >}}Triage Inbox{{< /ui >}}][4]로 이동합니다.
2. 왼쪽 패널에서 프로젝트를 선택하여 {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Closed{{< /ui >}}, {{< ui >}}Archived{{< /ui >}}와 같은 기본 상태 보기를 표시합니다.
3. 디스플레이 설정 아이콘을 사용하여 {{< ui >}}split view{{< /ui >}}(상세 작업 항목용) 또는 {{< ui >}}table view{{< /ui >}}(일괄 작업 항목 검토 및 열 구성용) 중에서 선택합니다. {{< ui >}}Sort By{{< /ui >}} 드롭다운 옵션을 사용하여 받은 편지함 순위를 사용자 지정합니다. 옵션에는 {{< ui >}}Priority{{< /ui >}}, {{< ui >}}Created at{{< /ui >}}, 또는 {{< ui >}}Last Updated{{< /ui >}}가 포함됩니다. 나중에 사용자 지정 받은 편지함을 다시 사용하려면 {{< ui >}}Save{{< /ui >}}를 클릭합니다.
5. 분류 중에 작업 항목 카드에서 상태, 우선순위 및 할당을 직접 업데이트합니다.
6. 왼쪽 작업 항목 프로젝트 패널과 Datadog 탐색 모음을 축소하여 화면을 최대화합니다.
7. 작업 항목 카드에서 **경보** 개수 위에 마우스를 올리면 상관관계가 있는 경보를 미리 확인할 수 있습니다.

## 다음 단계 {#next-steps}

작업 항목을 분류 및 조사하는 방법을 배웠으므로, 이제 이러한 도구를 사용하여 팀과 [협업](#collaborate-and-integrate)하고, 근본 원인에 대해 [조치](#take-action)를 취하며, 대응 노력을 간소화해 보겠습니다.

## 협업 및 통합 {#collaborate-and-integrate}

오른쪽 분할 보기 측면 패널에서 다음을 수행할 수 있습니다.

- {{< ui >}}Tag and comment{{< /ui >}}: 사용자에게 태그를 지정하고 메모를 추가하여 작업 항목 타임라인에서 팀원과 협업합니다.
- {{< ui >}}Send notifications{{< /ui >}}: Slack, Microsoft Teams, 이메일 또는 웹훅을 사용하여 이해관계자에게 경고합니다.
- {{< ui >}}Escalate issues{{< /ui >}}: [Incident Management][1], [On-Call][2], [Workflow Automation][3] 또는 타사 도구를 사용하여 인시던트를 트리거하거나 온콜 담당자에게 호출을 보냅니다.
- {{< ui >}}Sync with external tools{{< /ui >}}: 외부 이해관계자가 최신 정보를 확인할 수 있도록 Jira 및 ServiceNow 레코드를 동기화 상태로 유지합니다.

   {{< img src="/events/triage_inbox/event_mgmt_inbox_right_hand_panel.png" alt="Event Management Inbox 오른쪽 패널, Escalate 드롭다운 강조 표시" style="width:100%;" >}}

## 조치 취하기 {#take-action}

- {{< ui >}}Mark root cause{{< /ui >}}: 잘못된 변경 사항 등 관련 이벤트를 식별하고 근본 원인으로 표시합니다.
- {{< ui >}}Run workflows{{< /ui >}}: 수동으로 수정 런북을 실행하거나 [작업 항목 자동화 규칙][5]을 사용하여 조건부로 트리거합니다.
- {{< ui >}}Merge work items{{< /ui >}}: 관련 작업 항목을 결합하여 조사를 간소화합니다.
- {{< ui >}}Split work items{{< /ui >}}: 개별 조사가 필요한 경보를 분리합니다.

**참고**: 작업 항목의 모든 경보가 해결되면 시스템이 자동으로 작업 항목을 닫습니다. 작업 항목을 수동으로 해결됨(resolved)으로 표시할 수도 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/incident_management/
[2]: /ko/incident_response/on-call/
[3]: /ko/actions/workflows/
[4]: https://app.datadoghq.com/event/correlation
[5]: /ko/incident_response/work_management/automation_rules/